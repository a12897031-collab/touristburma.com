---
title: "Tourist Burma 2.0: AI-Native Web Architecture & System Design"
description: "A developer-ready technical specification and website architecture blueprint for building an AI-powered, spatial travel platform."
date: "2026-10-20"
author: "Engineering & Digital Innovation Division"
category: "Web Architecture"
tags: ["NextJS", "TypeScript", "Spatial AI", "TailwindCSS", "System Architecture", "Web Development"]
status: "Published"
---

# Tourist Burma 2.0: AI-Native Web Architecture & Development Guide

This document provides the full technical specification, component topology, and code patterns required to build and deploy **Tourist Burma 2.0** as a modern, AI-driven travel engine.

---

## 1. System Architecture Overview

The application adopts a **Jamstack / Serverless Architecture** using **Next.js 15 (App Router)** as the core web framework. It integrates a **Retrieval-Augmented Generation (RAG) engine** for natural language travel assistance and **PostGIS** for high-precision spatial queries.

```
┌─────────────────────────────────────────────────────────┐
│              Client Layer (Web / PWA)                   │
│        React 19 + Tailwind CSS + Framer Motion          │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│             API & Edge Layer (Next.js 15)               │
│     Server Components / Route Handlers / Middleware     │
└─────────────┬─────────────────────────────┬─────────────┘
              │                             │
              ▼                             ▼
┌───────────────────────────┐ ┌───────────────────────────┐
│    Spatial Data Layer     │ │     AI Agent Engine       │
│  PostgreSQL + PostGIS +   │ │  Google Gemini 1.5 Pro +  │
│      Prisma ORM           │ │    Vercel AI SDK Core     │
└───────────────────────────┘ └───────────────────────────┘
```

---

## 2. Directory & File Structure

```text
tourist-burma-app/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx
│   ├── (dashboard)/
│   │   └── vendor/page.tsx
│   ├── api/
│   │   ├── chat/route.ts          # AI Agent Streaming Route
│   │   └── itinerary/route.ts     # Spatial AI Routing Engine
│   ├── explore/
│   │   └── page.tsx               # Interactive Map & POI Grid
│   ├── layout.tsx
│   └── page.tsx                   # Landing Page
├── components/
│   ├── ai/
│   │   ├── ChatWindow.tsx
│   │   └── ItineraryCard.tsx
│   ├── map/
│   │   └── MapView.tsx            # Mapbox / Maplibre integration
│   └── ui/
│       ├── Button.tsx
│       └── Header.tsx
├── lib/
│   ├── ai/
│   │   └── prompts.ts             # System Prompts for Travel Agent
│   ├── db/
│   │   └── prisma.ts              # Prisma Client Instance
│   └── spatial/
│       └── queries.ts             # Raw PostGIS Queries
├── prisma/
│   └── schema.prisma              # Database Schema with Spatial Extensions
├── public/
│   └── images/
└── package.json
```

---

## 3. Database Schema (Prisma + PostGIS)

Below is the database modeling for vendors, Points of Interest (POIs), and dynamic AI itineraries.

```prisma
datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  extensions = [postgis]
}

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

model Provider {
  id          String   @id @default(uuid())
  name        String
  category    Category
  latitude    Float
  longitude   Float
  address     String?
  rating      Float    @default(5.0)
  isVerified  Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  tours       Tour[]

  @@map("providers")
}

model Tour {
  id          String   @id @default(uuid())
  title       String
  description String
  priceUsd    Decimal
  providerId  String
  provider    Provider @relation(fields: [providerId], references: [id])
}

enum Category {
  ECO_LODGE
  LOCAL_GUIDE
  ARTISAN
  SUSTAINABLE_TRANSPORT
}
```

---

## 4. Key AI & Spatial Code Implementations

### A. Spatial Proximity Querying (`lib/spatial/queries.ts`)

```typescript
import { prisma } from "@/lib/db/prisma";

export interface POIQueryInput {
  latitude: number;
  longitude: number;
  radiusInMeters: number;
  category?: string;
}

export async function getNearbyProviders({
  latitude,
  longitude,
  radiusInMeters,
  category,
}: POIQueryInput) {
  // Using raw PostGIS ST_DWithin query via Prisma
  const providers = await prisma.$queryRaw`
    SELECT 
      id, 
      name, 
      category, 
      latitude, 
      longitude,
      ST_Distance(
        ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography,
        ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography
      ) AS distance_meters
    FROM providers
    WHERE 
      is_verified = TRUE
      AND ST_DWithin(
        ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography,
        ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography,
        ${radiusInMeters}
      )
    ORDER BY distance_meters ASC
    LIMIT 20;
  `;

  return providers;
}
```

### B. Streaming AI Assistant API (`app/api/chat/route.ts`)

```typescript
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-1.5-pro"),
    system: `You are the Tourist Burma 2.0 AI Assistant—a helpful, culturally conscious travel guide.
             Your role is to help foreign travelers discover sustainable, locally owned experiences in Myanmar.
             Focus on heritage, eco-tourism, respectful engagement with local communities, and practical logistics.
             Do NOT recommend unethical operations or predatory commercial tour traps.`,
    messages,
  });

  return result.toDataStreamResponse();
}
```

---

## 5. Deployment Pipelines

To deploy the website to modern serverless environments:

### Vercel Deployment
1. Set up environment variables in your Vercel Dashboard:
   * `DATABASE_URL`: Connection string to PostgreSQL instance (e.g., Supabase / Neon with PostGIS enabled).
   * `GOOGLE_GENERATIVE_AI_API_KEY`: API key for Gemini models.
2. Run build pipeline:
   ```bash
   npm run build
   ```

### Cloudflare Pages / Next.js Edge Runtime
For low-latency delivery across Southeast Asia, leverage Edge Functions for API routes by placing `export const runtime = 'edge'` inside `app/api/chat/route.ts`.