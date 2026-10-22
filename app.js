/**
 * Tourist Burma 2.0: AI-Native Spatial Travel Platform
 * Vanilla JavaScript Engine (Spatial PostGIS Simulation, Generative AI Concierge, Cartography)
 * Ref: tourist_burma_2_0_architectural_vision.md & design.md
 */

// ============================================================================
// 1. DATA REPOSITORY: VERIFIED LOCAL MYANMAR PROVIDERS & SPATIAL POIs
// ============================================================================

const FALLBACK_HERITAGE_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><defs><linearGradient id='bg' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%232b1d14'/><stop offset='100%' stop-color='%23160e09'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23bg)'/><circle cx='150' cy='130' r='55' fill='none' stroke='%23d4af37' stroke-width='1.5' opacity='0.3'/><g fill='%23d4af37' opacity='0.85' transform='translate(134,100)'><path d='M16 2L14 8h4L16 2zM12 9l-2 3h12l-2-3H12zm-3 4l-3 4h20l-3-4H9zm-4 5l-3 5h24l-3-5H5zm-3 6l-2 5h26l-2-5H2z'/></g><text x='50%' y='210' fill='%23d4af37' font-family='sans-serif' font-size='11' font-weight='600' text-anchor='middle' letter-spacing='2'>TOURIST BURMA</text><text x='50%' y='228' fill='%23a89078' font-family='sans-serif' font-size='9' text-anchor='middle'>VERIFIED HERITAGE</text></svg>";

const INITIAL_PROVIDERS = [
  {
    id: "poi-bagan-ananda",
    name: "Ananda Temple (အာနန္ဒာဘုရား)",
    category: "SACRED_HERITAGE",
    region: "Bagan",
    latitude: 21.1708,
    longitude: 94.8679,
    address: "Old Bagan Archaeological Zone, East of Tharabar Gate",
    rating: 5.0,
    isVerified: true,
    image: "images/ananda-temple.jpg",
    tours: [
      {
        title: "Four Colossal Standing Buddhas & 1,400 Glazed Jataka Tiles",
        description: "Built in 1105 AD by King Kyansittha, revered as the 'Westminster Abbey of Burma'. Marvel at the four 9.5-meter gilded standing Buddhas facing cardinal directions and over 1,400 glazed terracotta tiles illustrating the Jataka tales.",
        priceUsd: 0
      }
    ],
    culturalNotes: "Strict barefoot protocol: Remove shoes and socks completely before crossing the outer archway. Dress respectfully with shoulders and knees covered. Maintain silence within inner ambulatory corridors."
  },
  {
    id: "poi-bagan-dhammayangyi",
    name: "Dhammayangyi Temple ()",
    category: "SACRED_HERITAGE",
    region: "Bagan",
    latitude: 21.1620,
    longitude: 94.8729,
    address: "Central Bagan Plain, 1 km Southeast of Old Bagan",
    rating: 4.98,
    isVerified: true,
    image: "images/dhammayangyi-temple.jpg",
    tours: [
      {
        title: "Massive Mortarless Brickwork & Mystic Walled Corridors Exploration",
        description: "The most massive temple in Bagan, constructed under King Narathu (1167–1170 AD). Renowned for interlocking brick masonry laid without mortar so tightly that a knife blade cannot penetrate, and its enigmatic blocked inner sanctuaries.",
        priceUsd: 0
      }
    ],
    culturalNotes: "Do not attempt to scale exterior terraces or brick ledges. Please observe quiet reverence near the dual Gautama and Maitreya Buddha shrines."
  },
  {
    id: "poi-bagan-bupaya",
    name: "Bupaya Pagoda (ဗူးဘုရား)",
    category: "SACRED_HERITAGE",
    region: "Bagan",
    latitude: 21.1764,
    longitude: 94.8581,
    address: "Northern Old Bagan Riverbank, Ayeyarwady River Promontory",
    rating: 4.95,
    isVerified: true,
    image: "images/bupaya-pagoda.jpg",
    tours: [
      {
        title: "Golden Gourd Stupa & Ayeyarwady River Sunset Panorama",
        description: "Perched on a scenic promontory on the bend of the Ayeyarwady River, this bulbous gourd-shaped gilded stupa traditionally dates to King Pyusawhti (c. 162–243 AD). Bagan's most celebrated riverside sunset vantage point overlooking local wooden longboats.",
        priceUsd: 0
      }
    ],
    culturalNotes: "Watch your step along the riverbank stone steps. Shoes and socks must be left at the lower gate. Commercial drone photography without archaeological permits is strictly prohibited."
  },
  {
    id: "poi-bagan-shwezigon",
    name: "Shwezigon Pagoda (ရွှေစည်းခုံစေတီတော်)",
    category: "SACRED_HERITAGE",
    region: "Bagan",
    latitude: 21.1953,
    longitude: 94.8939,
    address: "Nyaung-U Heritage Sector, Northeast Bagan Archaeological Zone",
    rating: 5.0,
    isVerified: true,
    image: "images/shwezigon-pagoda.jpg",
    tours: [
      {
        title: "Sacred Tooth Relic Shrine & 37 Nat Pantheon Pilgrimage",
        description: "Begun by King Anawrahta in 1059 AD and completed by King Kyansittha in 1102 AD. The golden bell prototype for all subsequent Burmese stupas, enshrining sacred bone and tooth relics of the Buddha, with dedicated pavilions honoring the 37 pre-Buddhist Nats.",
        priceUsd: 0
      }
    ],
    culturalNotes: "Circumambulate clockwise (sunwise) around the golden stupa terrace. Remove all hats, shoes, and socks. Traditional Thanaka face paste and longyis available at entry gates."
  },
  {
    id: "poi-bagan-01",
    name: "Minnanthu Women's Cotton & Lotus Guild",
    category: "ARTISAN",
    region: "Bagan",
    latitude: 21.1610,
    longitude: 94.8875,
    address: "Minnanthu Village, East of Bagan Archaeological Zone",
    rating: 4.96,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=700&q=80",
    tours: [
      {
        title: "Traditional Spun Yarn & Natural Dyeing Workshop",
        description: "Hands-on heritage weaving with rural master artisans using unbleached organic cotton and tree-bark dyes.",
        priceUsd: 25
      }
    ],
    culturalNotes: "Please dress respectfully (shoulders covered). Photography inside the loom pavilion is welcomed with courtesy."
  },
  {
    id: "poi-bagan-02",
    name: "U Min Lha Clean Heritage E-Bikes",
    category: "SUSTAINABLE_TRANSPORT",
    region: "Bagan",
    latitude: 21.1718,
    longitude: 94.8585,
    address: "Old Bagan Roundabout, Main Anawrahta Road",
    rating: 5.0,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80",
    tours: [
      {
        title: "Silent Sunrise E-Bike Trail & GPS Stupa Map",
        description: "Solar-charged silent electric bikes designed to preserve fragile temple foundations from vibration and exhaust emissions.",
        priceUsd: 14
      }
    ],
    culturalNotes: "Follow established sandy trails. Never ride over ancient brick ruins or climb crumbling stupa terraces."
  },
  {
    id: "poi-bagan-03",
    name: "Daw Khin Myo Monastic Heritage Walk",
    category: "LOCAL_GUIDE",
    region: "Bagan",
    latitude: 21.1708,
    longitude: 94.8679,
    address: "Ananda Temple Precinct, Old Bagan",
    rating: 4.98,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=700&q=80",
    tours: [
      {
        title: "11th-Century Murals & Monastic Lineage Walk",
        description: "In-depth interpretive walk led by a Bagan University archaeological scholar exploring hidden Jataka frescoes.",
        priceUsd: 45
      }
    ],
    culturalNotes: "Footwear and socks must be completely removed at temple archways. Avoid pointing feet at Buddha images."
  },
  {
    id: "poi-bagan-04",
    name: "Bagan Teak Sanctuary Eco-Lodge",
    category: "ECO_LODGE",
    region: "Bagan",
    latitude: 21.1550,
    longitude: 94.8720,
    address: "Myinkaba Perimeter, New Bagan Highway",
    rating: 4.88,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80",
    tours: [
      {
        title: "Reclaimed Teak Cottage & Organic Shan Breakfast",
        description: "Zero-plastic sanctuary built entirely from repurposed colonial teak timber with solar groundwater harvesting.",
        priceUsd: 85
      }
    ],
    culturalNotes: "Community-supported lodge. 15% of room tariffs fund local school potable water filtration stations."
  },
  {
    id: "poi-inle-01",
    name: "Paw Khone Sacred Lotus Thread Guild",
    category: "ARTISAN",
    region: "Inle Lake",
    latitude: 20.5312,
    longitude: 96.9021,
    address: "Paw Khone Stilt Village, Central Inle Lake",
    rating: 4.97,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=700&q=80",
    tours: [
      {
        title: "Sacred Lotus Fiber Extraction & Robe Weaving",
        description: "Discover the rare, thousand-year-old art of drawing delicate micro-fibers from lotus stems for Buddhist monastic robes.",
        priceUsd: 30
      }
    ],
    culturalNotes: "Support authentic family-operated looms. No high-pressure souvenir sales or tourist surcharges."
  },
  {
    id: "poi-inle-02",
    name: "Thitpar Traditional Leg-Rower Cooperative",
    category: "SUSTAINABLE_TRANSPORT",
    region: "Inle Lake",
    latitude: 20.5510,
    longitude: 96.9150,
    address: "Nyaungshwe Boat Pier / Floating Canal Junction",
    rating: 4.95,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80",
    tours: [
      {
        title: "Silent Canoe Expedition through Floating Gardens",
        description: "Hand-paddled wooden canoe tours that avoid loud diesel propellers, navigating tranquil floating tomato and lotus beds.",
        priceUsd: 22
      }
    ],
    culturalNotes: "Canoeists are licensed Intha fishermen working on fair-rotation cooperatives."
  },
  {
    id: "poi-inle-03",
    name: "Ko San Win Wetlands Biodiversity Guide",
    category: "LOCAL_GUIDE",
    region: "Inle Lake",
    latitude: 20.5600,
    longitude: 96.9180,
    address: "Inle Lake Sanctuary Office, Nyaungshwe",
    rating: 5.0,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=700&q=80",
    tours: [
      {
        title: "Dawn Migratory Waterbird & Eco-System Survey",
        description: "Spot endangered Sarus cranes and endemic lake species with an officially certified birding & wetland naturalist.",
        priceUsd: 40
      }
    ],
    culturalNotes: "Equipped with high-precision spotting scopes. Maintain silence near roosting reed beds."
  },
  {
    id: "poi-inle-04",
    name: "Inle Bamboo Stilt Eco-Resort",
    category: "ECO_LODGE",
    region: "Inle Lake",
    latitude: 20.5420,
    longitude: 96.9080,
    address: "Ywama Floating Sector, Inle Lake",
    rating: 4.91,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=80",
    tours: [
      {
        title: "Floating Bamboo Bungalow & Organic Lake Dining",
        description: "Built on stilts using sustainable giant Shan bamboo, zero-discharge sewage filters, and farm-to-table organic produce.",
        priceUsd: 78
      }
    ],
    culturalNotes: "All waste water is processed through natural bio-reed purification beds before returning to the lake."
  },
  {
    id: "poi-yangon-01",
    name: "Daw Than Than Downtown Heritage Architecture Walk",
    category: "LOCAL_GUIDE",
    region: "Yangon",
    latitude: 16.7745,
    longitude: 96.1585,
    address: "Pansodan Street & Strand Road Intersection",
    rating: 4.99,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=700&q=80",
    tours: [
      {
        title: "Yangon Heritage Trust Colonial & Monastic Circuit",
        description: "Explore century-old Victorian, Armenian, and Burmese architectural landmarks, hidden tea stalls, and bookmaker alleyways.",
        priceUsd: 35
      }
    ],
    culturalNotes: "A portion of walking fees is donated directly to the historic building restoration fund."
  },
  {
    id: "poi-yangon-02",
    name: "Turquoise Mountain Traditional Craft Guild",
    category: "ARTISAN",
    region: "Yangon",
    latitude: 16.7780,
    longitude: 96.1620,
    address: "Merchant Road Heritage Quarter, Downtown Yangon",
    rating: 4.93,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=700&q=80",
    tours: [
      {
        title: "Shan Silversmithing & Fine Woodcarving Studio Tour",
        description: "Witness master jewellers reviving intricate ethnic silversmithing, lacquer engraving, and master wood joining.",
        priceUsd: 20
      }
    ],
    culturalNotes: "Supports fair living wages and master-apprentice training for young Myanmar artisans."
  },
  {
    id: "poi-mandalay-01",
    name: "King Mindon Gold Leaf & Marble Guild",
    category: "ARTISAN",
    region: "Mandalay",
    latitude: 21.9610,
    longitude: 96.0820,
    address: "Maha Muni Pagoda Road, Crafts District",
    rating: 4.94,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=700&q=80",
    tours: [
      {
        title: "Centuries-Old Hammered Gold Leaf Apprenticeship",
        description: "Observe the rhythmic, demanding process of hand-hammering 24-karat gold into gossamer sheets for Myanmar shrines.",
        priceUsd: 18
      }
    ],
    culturalNotes: "Gold leaf sanctification is considered sacred. Only male visitors may apply gold leaf directly to the central Mahamuni Buddha statue."
  },
  {
    id: "poi-mandalay-02",
    name: "U Bein Bridge Solar Wooden Longboat Collective",
    category: "SUSTAINABLE_TRANSPORT",
    region: "Mandalay",
    latitude: 21.8912,
    longitude: 96.0580,
    address: "Taungthaman Lake, Amarapura",
    rating: 4.91,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=700&q=80",
    tours: [
      {
        title: "Quiet Twilight Lake Sail Beneath Historic Teak Bridge",
        description: "Glide silently across Taungthaman Lake at dusk with local boatmen using clean solar-electric conversion motors.",
        priceUsd: 20
      }
    ],
    culturalNotes: "Maintains 200-year-old traditional boatmaking techniques while adopting clean energy."
  },
  {
    id: "poi-shan-01",
    name: "Palaung Mountain Tea Cooperative & Homestay",
    category: "ECO_LODGE",
    region: "Shan Highlands",
    latitude: 22.6180,
    longitude: 97.3010,
    address: "Hsipaw Mountain Ridge Trail, Northern Shan State",
    rating: 4.97,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80",
    tours: [
      {
        title: "Highland Organic Tea Harvest & Village Homestay",
        description: "Stay in an authentic Palaung tribal village, pluck wild ancient tea leaves, and sleep in cozy Shan mountain lodges.",
        priceUsd: 55
      }
    ],
    culturalNotes: "Community-based tourism program. Respect village head guidelines and sacred mountain spirits (Nats)."
  },
  {
    id: "poi-shan-02",
    name: "Kalaw Pine Forest Indigenous Trekking Guild",
    category: "LOCAL_GUIDE",
    region: "Shan Highlands",
    latitude: 20.6280,
    longitude: 96.5650,
    address: "Kalaw Railway Station Trailhead",
    rating: 4.96,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=700&q=80",
    tours: [
      {
        title: "2-Day Ridge Trek from Kalaw to Inle Lake",
        description: "Trek through pine scented highlands, Danu villages, and organic ginger fields with indigenous mountain guides.",
        priceUsd: 60
      }
    ],
    culturalNotes: "Follow 'Leave No Trace' mountain ethics. Pack out all inorganic waste."
  }
];

// Region coordinates for quick camera navigation
const REGION_COORDINATES = {
  all: { center: [20.5, 96.0], zoom: 6 },
  bagan: { center: [21.1720, 94.8720], zoom: 13 },
  inle: { center: [20.545, 96.910], zoom: 12 },
  yangon: { center: [16.780, 96.160], zoom: 13 },
  mandalay: { center: [21.940, 96.070], zoom: 12 },
  shan: { center: [21.600, 96.900], zoom: 9 }
};

// ============================================================================
// 2. APPLICATION STATE
// ============================================================================

const AppState = {
  providers: [],
  filteredProviders: [],
  activeCategory: "ALL",
  activeRegion: "all",
  searchQuery: "",
  searchRadiusKm: 50,
  userLocation: { latitude: 21.1708, longitude: 94.8679 }, // Defaults to Ananda Temple in Bagan Heritage Zone
  currency: "USD", // "USD" or "MMK"
  exchangeRateMmK: 3500, // 1 USD = 3,500 MMK
  language: "EN", // "EN" or "MY"
  offlineSimulated: false,
  selectedProvider: null,
  activeMapMarkers: new Map(),
  itineraryPolyline: null
};

// ============================================================================
// 3. SPATIAL POSTGIS SIMULATION (Haversine ST_Distance & ST_DWithin)
// ============================================================================

/**
 * Calculates great-circle distance between two coordinates in kilometers.
 * Simulates PostGIS ST_Distance(geography, geography)
 */
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// ============================================================================
// 4. MAP ENGINE (LEAFLET + CUSTOM CARTOGRAPHIC STYLING)
// ============================================================================

let mapInstance = null;
let tileLayerInstance = null;

const MAP_TILE_THEMES = {
  dark: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    options: {
      attribution: 'Tiles &copy; Esri &mdash; Sources: Esri, HERE, Garmin, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), (c) OpenStreetMap contributors, and the GIS User Community',
      maxZoom: 19,
      className: 'map-dark-tiles'
    }
  },
  heritage: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    options: {
      attribution: 'Tiles &copy; Esri &mdash; Sources: Esri, HERE, Garmin, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), (c) OpenStreetMap contributors, and the GIS User Community',
      maxZoom: 19
    }
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    options: {
      attribution: '&copy; Esri &mdash; Earthstar Geographics',
      maxZoom: 18
    }
  }
};

function initMap() {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  // Initialize Leaflet Map centered on Myanmar
  mapInstance = L.map("map", {
    center: REGION_COORDINATES.all.center,
    zoom: REGION_COORDINATES.all.zoom,
    zoomControl: true
  });

  // Default to Dark Teak style
  setMapTheme("dark");

  // Handle map click for vendor coordinate picking
  mapInstance.on("click", (e) => {
    const { lat, lng } = e.latlng;
    const vendorLatInput = document.getElementById("vendorLat");
    const vendorLngInput = document.getElementById("vendorLng");
    if (vendorLatInput && vendorLngInput && document.getElementById("vendorModal").classList.contains("active")) {
      vendorLatInput.value = lat.toFixed(6);
      vendorLngInput.value = lng.toFixed(6);
      showToast(`Selected map point: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    }
  });
}

function setMapTheme(themeKey) {
  if (!mapInstance || !MAP_TILE_THEMES[themeKey]) return;
  if (tileLayerInstance) {
    mapInstance.removeLayer(tileLayerInstance);
  }
  const theme = MAP_TILE_THEMES[themeKey];
  tileLayerInstance = L.tileLayer(theme.url, theme.options).addTo(mapInstance);
}

function getCategoryColor(category) {
  switch (category) {
    case "SACRED_HERITAGE": return "var(--color-heritage-gold)";
    case "LOCAL_GUIDE": return "var(--color-inle-azure)";
    case "ECO_LODGE": return "var(--color-shan-jade)";
    case "ARTISAN": return "var(--color-bagan-terracotta)";
    case "SUSTAINABLE_TRANSPORT": return "var(--color-heritage-gold)";
    default: return "var(--color-heritage-gold)";
  }
}

function getCategoryIcon(category) {
  switch (category) {
    case "SACRED_HERITAGE": return "🛕";
    case "LOCAL_GUIDE": return "🧭";
    case "ECO_LODGE": return "🏡";
    case "ARTISAN": return "🏺";
    case "SUSTAINABLE_TRANSPORT": return "🚲";
    default: return "📍";
  }
}

/**
 * Render Leaflet Markers for active filtered POIs
 */
function renderMapMarkers() {
  if (!mapInstance) return;

  // Clear existing markers
  AppState.activeMapMarkers.forEach((marker) => {
    mapInstance.removeLayer(marker);
  });
  AppState.activeMapMarkers.clear();

  AppState.filteredProviders.forEach((poi) => {
    const iconColor = getCategoryColor(poi.category);
    const iconSymbol = getCategoryIcon(poi.category);

    // Create custom HTML icon
    const customIcon = L.divIcon({
      className: "custom-leaflet-marker",
      html: `
        <div class="marker-pin-outer" style="background: ${iconColor};">
          <div class="marker-pin-inner">${iconSymbol}</div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -30]
    });

    const marker = L.marker([poi.latitude, poi.longitude], { icon: customIcon });

    // Custom popup
    const formattedPrice = formatPrice(poi.tours[0].priceUsd);
    const popupHtml = `
      <div class="map-popup-card">
        <div class="map-popup-category">${poi.category.replace('_', ' ')}</div>
        <div class="map-popup-title">${poi.name}</div>
        <div class="map-popup-price">From ${formattedPrice}</div>
        <button class="map-popup-btn" onclick="openProviderDetailModal('${poi.id}')">View Experience & Verification</button>
      </div>
    `;

    marker.bindPopup(popupHtml);

    // Hover interactions
    marker.on("mouseover", () => {
      highlightPoiCard(poi.id, true);
    });
    marker.on("mouseout", () => {
      highlightPoiCard(poi.id, false);
    });

    marker.addTo(mapInstance);
    AppState.activeMapMarkers.set(poi.id, marker);
  });
}

function highlightPoiCard(poiId, isHighlighted) {
  const card = document.getElementById(`card-${poiId}`);
  if (card) {
    if (isHighlighted) {
      card.classList.add("highlighted");
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      card.classList.remove("highlighted");
    }
  }
}

// ============================================================================
// 5. POI FEED & SEARCH FILTERING ENGINE
// ============================================================================

function filterAndRenderProviders() {
  const query = AppState.searchQuery.toLowerCase().trim();
  const category = AppState.activeCategory;
  const region = AppState.activeRegion;

  let results = AppState.providers.filter((p) => {
    // 1. Category check
    if (category !== "ALL" && p.category !== category) return false;

    // 2. Region check
    if (region !== "all") {
      const regionMatch = p.region.toLowerCase().includes(region.toLowerCase());
      if (!regionMatch) return false;
    }

    // 3. Search query check
    if (query) {
      const matchName = p.name.toLowerCase().includes(query);
      const matchAddress = p.address.toLowerCase().includes(query);
      const matchTour = p.tours.some(t => 
        t.title.toLowerCase().includes(query) || t.description.toLowerCase().includes(query)
      );
      if (!matchName && !matchAddress && !matchTour) return false;
    }

    return true;
  });

  // Calculate distance relative to active user location
  results = results.map((p) => {
    const dist = calculateDistanceKm(
      AppState.userLocation.latitude,
      AppState.userLocation.longitude,
      p.latitude,
      p.longitude
    );
    return { ...p, distanceKm: dist };
  });

  // Sort by verified first, then closest distance
  results.sort((a, b) => a.distanceKm - b.distanceKm);

  AppState.filteredProviders = results;

  // Update UI counter
  const resultsCountEl = document.getElementById("resultsCount");
  if (resultsCountEl) {
    resultsCountEl.textContent = results.length;
  }

  renderPoiList();
  renderMapMarkers();
}

function renderPoiList() {
  const container = document.getElementById("poiList");
  if (!container) return;

  if (AppState.filteredProviders.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">☸</div>
        <div class="empty-title">No verified providers found</div>
        <p>Try broadening your search keywords, increasing your radius, or resetting category filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = AppState.filteredProviders
    .map((poi) => {
      const primaryTour = poi.tours[0] || { title: "Custom Experience", description: "", priceUsd: 25 };
      const formattedPrice = formatPrice(primaryTour.priceUsd);
      const distStr = poi.distanceKm !== undefined ? `${poi.distanceKm.toFixed(1)} km away` : "";

      return `
        <article 
          class="poi-card" 
          id="card-${poi.id}" 
          onmouseenter="highlightMapMarker('${poi.id}', true)"
          onmouseleave="highlightMapMarker('${poi.id}', false)"
        >
          <div class="poi-thumb-wrap" onclick="openProviderDetailModal('${poi.id}')">
            <img 
              class="poi-thumb" 
              src="${poi.image}" 
              alt="${poi.name}" 
              loading="lazy" 
              onerror="this.onerror=null; this.src=FALLBACK_HERITAGE_IMAGE;"
            />
            <span class="poi-category-tag cat-tag-${poi.category}">
              ${poi.category.replace('_', ' ')}
            </span>
          </div>

          <div class="poi-body">
            <div>
              <div class="poi-meta-row">
                <span class="poi-region">${poi.region}</span>
                <span class="poi-distance">${distStr}</span>
              </div>
              <h3 class="poi-title" onclick="openProviderDetailModal('${poi.id}')">${poi.name}</h3>
              <div class="poi-tour-title">"${primaryTour.title}"</div>
              <p class="poi-snippet">${primaryTour.description}</p>
            </div>

            <div class="poi-footer-row">
              <div class="poi-rating">
                <span>★</span>
                <span>${poi.rating.toFixed(2)}</span>
                <span style="color:var(--color-shan-jade); margin-left:4px;" title="Ethically Audited">✓ Verified</span>
              </div>
              <div class="poi-price-wrap">
                <div class="poi-price">${formattedPrice}</div>
                <div class="poi-price-sub">${poi.category === "SACRED_HERITAGE" ? "archaeological zone pass" : "direct community price"}</div>
              </div>
            </div>

            <div class="poi-actions-row">
              <button class="btn-card-action btn-card-map" onclick="flyToPoiCoordinates(${poi.latitude}, ${poi.longitude}, '${poi.id}')">
                📍 Map
              </button>
              <button class="btn-card-action btn-card-book" onclick="openProviderDetailModal('${poi.id}')">
                ${poi.category === "SACRED_HERITAGE" ? "✦ Heritage Details" : "✦ Details & Direct Inquiry"}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function highlightMapMarker(poiId, isHighlighted) {
  const marker = AppState.activeMapMarkers.get(poiId);
  if (marker && mapInstance) {
    if (isHighlighted) {
      marker.openPopup();
    }
  }
}

function flyToPoiCoordinates(lat, lng, poiId) {
  if (!mapInstance) return;
  if (window.innerWidth <= 900) {
    setMobileView("map");
  }
  mapInstance.flyTo([lat, lng], 15, { duration: 1.2 });
  const marker = AppState.activeMapMarkers.get(poiId);
  if (marker) {
    marker.openPopup();
  }
}

function setMobileView(mode) {
  const viewport = document.querySelector(".split-viewport");
  const toggleBtn = document.getElementById("btnMobileViewToggle");
  const toggleText = document.getElementById("mobileToggleText");
  if (!viewport) return;

  if (mode === "map") {
    viewport.classList.add("mobile-map-active");
    if (toggleText) toggleText.textContent = "View List";
    if (toggleBtn) {
      const icon = toggleBtn.querySelector(".toggle-icon");
      if (icon) icon.textContent = "📋";
    }
    setTimeout(() => {
      if (mapInstance) {
        mapInstance.invalidateSize();
      }
    }, 250);
  } else {
    viewport.classList.remove("mobile-map-active");
    if (toggleText) toggleText.textContent = "View Map";
    if (toggleBtn) {
      const icon = toggleBtn.querySelector(".toggle-icon");
      if (icon) icon.textContent = "🗺️";
    }
  }
}

// ============================================================================
// 6. CURRENCY & LANGUAGE LOCALIZATION
// ============================================================================

function formatPrice(usdAmount) {
  if (usdAmount === 0) {
    return "Heritage Zone Pass";
  }
  if (AppState.currency === "USD") {
    return `$${usdAmount} USD`;
  } else {
    const mmk = Math.round(usdAmount * AppState.exchangeRateMmK);
    return `${mmk.toLocaleString()} Ks`;
  }
}

function toggleCurrency() {
  AppState.currency = AppState.currency === "USD" ? "MMK" : "USD";
  const currencyLabel = document.getElementById("currencyLabel");
  const currencyIndicator = document.querySelector(".currency-indicator");
  if (currencyLabel && currencyIndicator) {
    if (AppState.currency === "USD") {
      currencyLabel.textContent = "USD ($)";
      currencyIndicator.textContent = "$";
    } else {
      currencyLabel.textContent = "MMK (Ks)";
      currencyIndicator.textContent = "Ks";
    }
  }

  // Re-render price displays
  renderPoiList();
  renderMapMarkers();
  showToast(`Switched currency to ${AppState.currency}`);
}

function toggleLanguage() {
  AppState.language = AppState.language === "EN" ? "MY" : "EN";
  const langBtn = document.getElementById("langToggleBtn");
  if (langBtn) {
    if (AppState.language === "EN") {
      langBtn.querySelector(".lang-code").textContent = "EN";
      langBtn.querySelector(".lang-alt").textContent = "မြန်မာ";
    } else {
      langBtn.querySelector(".lang-code").textContent = "မြန်မာ";
      langBtn.querySelector(".lang-alt").textContent = "EN";
    }
  }
  showToast(AppState.language === "EN" ? "Switched to English interface" : "မြန်မာဘာသာသို့ ပြောင်းလဲပြီးပါပြီ");
}

// ============================================================================
// 7. AI CONCIERGE (STREAMING & GENERATIVE ITINERARY ENGINE)
// ============================================================================

const CURATED_AI_RESPONSES = {
  bagan: {
    text: `Here is a **3-Day Low-Carbon, Culturally Conscious Itinerary for Bagan**. It connects Bagan's most revered monuments—**Ananda Temple**, **Shwezigon Pagoda**, **Dhammayangyi Temple**, and **Bupaya Pagoda**—using silent e-bikes and verified local guides while protecting ancient terracotta brickwork:`,
    itinerary: {
      title: "3-Day Conscious Bagan Heritage & Pagoda Circuit",
      days: [
        {
          day: "Day 1: Sacred Shwezigon & Ananda's Golden Spire",
          steps: [
            "06:30 AM — Silent e-bike ride to Shwezigon Pagoda (Nyaung-U) for quiet morning meditation before crowds arrive.",
            "10:00 AM — Explore Ananda Temple with Daw Khin Myo, admiring four 9.5m colossal standing Buddhas and glazed Jatakas.",
            "03:00 PM — Traditional spun yarn and natural dyeing workshop at Minnanthu Women's Cooperative ($25 USD)."
          ],
          waypoints: [[21.1953, 94.8939], [21.1708, 94.8679], [21.1610, 94.8875]]
        },
        {
          day: "Day 2: Dhammayangyi Masonry & Myinkaba Lacquerware",
          steps: [
            "07:30 AM — Witness dawn mist over the immense mortarless brickwork of Dhammayangyi Temple.",
            "11:00 AM — Master lacquerware workshop tour and bamboo carving in historic Myinkaba village.",
            "04:00 PM — Rest and organic Shan tea tasting at Bagan Teak Sanctuary Eco-Lodge."
          ],
          waypoints: [[21.1620, 94.8729], [21.1550, 94.8720]]
        },
        {
          day: "Day 3: Rural Plain & Bupaya Ayeyarwady River Sunset",
          steps: [
            "08:00 AM — Silent e-bike trail through sandy village paths and hidden 12th-century stupas with U Min Lha E-Bikes.",
            "01:30 PM — Farm-to-table lunch at Sanon Social Enterprise restaurant.",
            "05:00 PM — Golden hour and twilight meditation at Bupaya Pagoda watching traditional wooden boats on the Ayeyarwady River."
          ],
          waypoints: [[21.1718, 94.8585], [21.1764, 94.8581]]
        }
      ],
      culturalNote: "Remember: Footwear and socks must be removed before entering any pagoda archway or sacred enclosure."
    }
  },
  inle: {
    text: `Here is a **Curated Sustainable Inle Lake Journey**. This plan deliberately avoids commercial souvenir factories and supports independent Intha family craftspeople and silent paddling:`,
    itinerary: {
      title: "Eco-Conscious Inle Lake & Lotus Weavers Route",
      days: [
        {
          day: "Day 1: Silent Canals & Sacred Lotus Weaving",
          steps: [
            "07:00 AM — Board a silent wooden paddle canoe with Thitpar Cooperative ($22 USD).",
            "10:00 AM — Visit Paw Khone village to witness rare sacred lotus fiber extraction with master weavers.",
            "01:30 PM — Traditional steamed Inle fish lunch wrapped in fresh banana leaves at a stilt homestay."
          ],
          waypoints: [[20.5510, 96.9150], [20.5312, 96.9021]]
        },
        {
          day: "Day 2: Wetlands Sanctuary & Shan Highland Ridge",
          steps: [
            "06:30 AM — Biodiversity birding expedition spotting endangered Sarus cranes with Ko San Win ($40 USD).",
            "12:00 PM — Stroll through the rotating 5-day mountain market in floating Ywama.",
            "04:00 PM — Sunset tea over the stilt gardens at Inle Bamboo Eco-Resort."
          ],
          waypoints: [[20.5600, 96.9180], [20.5420, 96.9080]]
        }
      ],
      culturalNote: "Avoid purchasing antique items or endangered wildlife products. Support living, certified artisans directly."
    }
  },
  etiquette: {
    text: `### Sacred Cultural Etiquette for Travelers in Myanmar

1. **Footwear Protocol (Pha-nat Chut):** Always remove both shoes and socks at the outer precinct of any pagoda, temple, monastery, or private home.
2. **Sacred Attire:** Shoulders and knees must be covered. Wearing a traditional Burmese **Longyi** is appreciated and comfortable in the climate.
3. **Respect for Sangha (Monks & Nuns):** Never touch or pat monks, nuns, or novices on the head. Give way on walkways. Women should never hand objects directly to a monk (place it on a cloth or table instead).
4. **Photography Manners:** Ask polite permission (*"Dat-pone yite-lo ya-ma-la?"*) before taking close-up portraits of monks, pilgrims, and artisans. Never climb stupas or pose irreverently next to Buddha statues.
5. **Direct Economic Impact:** Choose community-owned homestays and certified local guides so your travel funds sustain local livelihoods.`,
    itinerary: null
  },
  shan: {
    text: `Here is a **2-Day Shan Mountain & Ancient Tea Trail** based around organic farming communities:`,
    itinerary: {
      title: "Highland Shan Tea & Homestay Circuit",
      days: [
        {
          day: "Day 1: Pine Ridge Trail to Palaung Village",
          steps: [
            "07:00 AM — Depart trailhead with Kalaw Indigenous Mountain Guide ($60 USD).",
            "12:30 PM — Organic Danu village vegetarian lunch with fresh mountain herbs and roasted sesame.",
            "04:30 PM — Arrival at Palaung Mountain Tea Cooperative Homestay; participate in evening tea leaf steaming."
          ],
          waypoints: [[20.6280, 96.5650], [22.6180, 97.3010]]
        },
        {
          day: "Day 2: Ancient Wild Tea Forests",
          steps: [
            "06:30 AM — Early morning walk through centuries-old wild tea canopies shrouded in misty mountain clouds.",
            "11:00 AM — Traditional Shan noodle soup tasting at family trail stop.",
            "03:00 PM — Return descent with panoramic valley views of the Shan plateau."
          ],
          waypoints: [[22.6180, 97.3010], [20.6280, 96.5650]]
        }
      ],
      culturalNote: "Carry a reusable canteen; do not leave single-use plastic bottles in tribal highland sanctuaries."
    }
  }
};

function initAiConcierge() {
  const btnOpen = document.getElementById("btnOpenAiDrawer");
  const btnClose = document.getElementById("btnCloseAiDrawer");
  const drawer = document.getElementById("aiDrawer");
  const backdrop = document.getElementById("aiDrawerBackdrop");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const btnClear = document.getElementById("btnClearChatHistory");

  if (!btnOpen || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add("active");
    backdrop.classList.add("active");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.setAttribute("aria-hidden", "false");
    if (chatInput) chatInput.focus();
  }

  function closeDrawer() {
    drawer.classList.remove("active");
    backdrop.classList.remove("active");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.setAttribute("aria-hidden", "true");
  }

  btnOpen.addEventListener("click", openDrawer);
  btnClose.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);

  // Clear chat history
  if (btnClear) {
    btnClear.addEventListener("click", () => {
      const messagesContainer = document.getElementById("chatMessages");
      if (messagesContainer) {
        messagesContainer.innerHTML = `
          <div class="chat-bubble ai-bubble">
            <div class="bubble-sender">
              <span class="bubble-tag">Tourist Burma AI</span>
              <span class="bubble-time">Just now</span>
            </div>
            <div class="bubble-content">
              <p><strong>Mingalaba!</strong> Conversation cleared. How can I assist your mindful journey today?</p>
            </div>
          </div>
        `;
      }
    });
  }

  // Handle prompt chips
  document.querySelectorAll(".prompt-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const promptText = chip.getAttribute("data-prompt");
      if (promptText) {
        submitUserChatMessage(promptText);
      }
    });
  });

  // Handle chat form submit
  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;
      chatInput.value = "";
      submitUserChatMessage(message);
    });

    // Enter key submits (without shift)
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event("submit"));
      }
    });
  }
}

function submitUserChatMessage(userText) {
  const messagesContainer = document.getElementById("chatMessages");
  if (!messagesContainer) return;

  // Append user message bubble
  const userBubble = document.createElement("div");
  userBubble.className = "chat-bubble user-bubble";
  userBubble.innerHTML = `
    <div class="bubble-sender">
      <span class="bubble-tag">You</span>
      <span class="bubble-time">Just now</span>
    </div>
    <div class="bubble-content">
      <p>${escapeHtml(userText)}</p>
    </div>
  `;
  messagesContainer.appendChild(userBubble);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Simulate streaming AI response
  simulateStreamingAiResponse(userText);
}

function simulateStreamingAiResponse(promptText) {
  const messagesContainer = document.getElementById("chatMessages");
  if (!messagesContainer) return;

  const lower = promptText.toLowerCase();
  let responseData = CURATED_AI_RESPONSES.bagan;

  if (lower.includes("inle") || lower.includes("lake") || lower.includes("boat") || lower.includes("lotus")) {
    responseData = CURATED_AI_RESPONSES.inle;
  } else if (lower.includes("etiquette") || lower.includes("shwedagon") || lower.includes("pagoda") || lower.includes("temple") || lower.includes("dress")) {
    responseData = CURATED_AI_RESPONSES.etiquette;
  } else if (lower.includes("shan") || lower.includes("tea") || lower.includes("hsipaw") || lower.includes("kalaw") || lower.includes("trek")) {
    responseData = CURATED_AI_RESPONSES.shan;
  }

  // Create empty AI response bubble
  const aiBubble = document.createElement("div");
  aiBubble.className = "chat-bubble ai-bubble";
  aiBubble.innerHTML = `
    <div class="bubble-sender">
      <span class="bubble-tag">Tourist Burma AI Concierge</span>
      <span class="bubble-time">Synthesizing PostGIS RAG...</span>
    </div>
    <div class="bubble-content">
      <p class="stream-text-target"></p>
    </div>
  `;
  messagesContainer.appendChild(aiBubble);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  const targetTextEl = aiBubble.querySelector(".stream-text-target");
  const fullText = responseData.text;
  let charIndex = 0;

  // Simulate typewriter streaming
  const streamInterval = setInterval(() => {
    charIndex += 4;
    targetTextEl.innerHTML = formatMarkdownToHtml(fullText.slice(0, charIndex));
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (charIndex >= fullText.length) {
      clearInterval(streamInterval);
      targetTextEl.innerHTML = formatMarkdownToHtml(fullText);

      // If response includes generative itinerary card, render it
      if (responseData.itinerary) {
        renderGenerativeItineraryCard(aiBubble.querySelector(".bubble-content"), responseData.itinerary);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  }, 18);
}

function renderGenerativeItineraryCard(parentEl, itinerary) {
  const cardEl = document.createElement("div");
  cardEl.className = "itinerary-gen-card";

  const allWaypoints = [];
  itinerary.days.forEach(d => {
    if (d.waypoints) allWaypoints.push(...d.waypoints);
  });

  const waypointsJson = JSON.stringify(allWaypoints);

  const daysHtml = itinerary.days
    .map((day) => `
      <div class="itinerary-day">
        <div class="day-badge">${day.day}</div>
        <div class="day-steps">
          ${day.steps.map(s => `<div class="day-item-step"><span>•</span> <span>${s}</span></div>`).join("")}
        </div>
      </div>
    `)
    .join("");

  cardEl.innerHTML = `
    <div class="itinerary-header">
      <div class="itinerary-title">✦ ${itinerary.title}</div>
      <span style="font-size:0.7rem; color:var(--color-shan-jade); font-weight:700;">Zero-Trap Audited</span>
    </div>
    <div class="itinerary-days-list">
      ${daysHtml}
    </div>
    <div style="font-size:0.725rem; color:#E29B7E; margin-top:8px;">
      <strong>Cultural Tip:</strong> ${itinerary.culturalNote}
    </div>
    <div class="itinerary-actions-row">
      <button class="btn-itinerary-map" onclick='flyCameraToWaypoints(${waypointsJson})'>
        📍 View Waypoints on Map
      </button>
      <button class="btn-itinerary-save" onclick="saveItineraryToVault('${itinerary.title}')">
        ✦ Save Itinerary Offline
      </button>
    </div>
  `;

  parentEl.appendChild(cardEl);
}

function flyCameraToWaypoints(coords) {
  if (!mapInstance || !coords || coords.length === 0) return;

  // Clear existing polyline
  if (AppState.itineraryPolyline) {
    mapInstance.removeLayer(AppState.itineraryPolyline);
  }

  // Draw connecting polyline
  AppState.itineraryPolyline = L.polyline(coords, {
    color: "#D4AF37",
    weight: 3.5,
    dashArray: "6, 8",
    opacity: 0.9
  }).addTo(mapInstance);

  // Fit bounds to include all waypoints
  const bounds = L.latLngBounds(coords);
  mapInstance.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });

  showToast("Map camera framed to itinerary waypoints.");

  // If on mobile screen, close AI drawer so map is visible
  if (window.innerWidth < 1024) {
    const drawer = document.getElementById("aiDrawer");
    const backdrop = document.getElementById("aiDrawerBackdrop");
    if (drawer) drawer.classList.remove("active");
    if (backdrop) backdrop.classList.remove("active");
  }
}

function saveItineraryToVault(title) {
  const saved = JSON.parse(localStorage.getItem("tb_saved_itineraries") || "[]");
  saved.push({ title, savedAt: new Date().toISOString() });
  localStorage.setItem("tb_saved_itineraries", JSON.stringify(saved));
  showToast(`Saved "${title}" to your offline itinerary vault.`);
}

// ============================================================================
// 8. VENDOR ONBOARDING / SPATIAL GEOTAGGING MODAL
// ============================================================================

function initVendorModal() {
  const btnOpen = document.getElementById("btnOpenVendorModal");
  const btnClose = document.getElementById("btnCloseVendorModal");
  const btnCancel = document.getElementById("btnCancelVendor");
  const modal = document.getElementById("vendorModal");
  const backdrop = document.getElementById("vendorModalBackdrop");
  const form = document.getElementById("vendorForm");
  const btnDetect = document.getElementById("btnDetectVendorCoords");
  const regionSelect = document.getElementById("vendorRegion");

  if (!btnOpen || !modal || !backdrop) return;

  function openModal() {
    modal.classList.add("active");
    backdrop.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    backdrop.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("active");
    backdrop.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    backdrop.setAttribute("aria-hidden", "true");
  }

  btnOpen.addEventListener("click", openModal);
  btnClose.addEventListener("click", closeModal);
  if (btnCancel) btnCancel.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  // Auto-fill coordinates based on selected region
  if (btnDetect && regionSelect) {
    btnDetect.addEventListener("click", () => {
      const region = regionSelect.value;
      const latInput = document.getElementById("vendorLat");
      const lngInput = document.getElementById("vendorLng");

      switch (region) {
        case "Bagan":
          latInput.value = (21.1680 + (Math.random() - 0.5) * 0.02).toFixed(6);
          lngInput.value = (94.8620 + (Math.random() - 0.5) * 0.02).toFixed(6);
          break;
        case "Inle Lake":
          latInput.value = (20.5450 + (Math.random() - 0.5) * 0.02).toFixed(6);
          lngInput.value = (96.9100 + (Math.random() - 0.5) * 0.02).toFixed(6);
          break;
        case "Yangon":
          latInput.value = (16.7800 + (Math.random() - 0.5) * 0.02).toFixed(6);
          lngInput.value = (96.1600 + (Math.random() - 0.5) * 0.02).toFixed(6);
          break;
        case "Mandalay":
          latInput.value = (21.9400 + (Math.random() - 0.5) * 0.02).toFixed(6);
          lngInput.value = (96.0700 + (Math.random() - 0.5) * 0.02).toFixed(6);
          break;
        case "Shan Highlands":
          latInput.value = (20.6300 + (Math.random() - 0.5) * 0.02).toFixed(6);
          lngInput.value = (96.5700 + (Math.random() - 0.5) * 0.02).toFixed(6);
          break;
      }
      showToast(`Set coordinates for ${region}`);
    });
  }

  // Handle form submission
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("vendorName").value.trim();
      const category = document.getElementById("vendorCategory").value;
      const region = document.getElementById("vendorRegion").value;
      const priceUsd = parseFloat(document.getElementById("vendorPriceUsd").value) || 25;
      const address = document.getElementById("vendorAddress").value.trim();
      const lat = parseFloat(document.getElementById("vendorLat").value);
      const lng = parseFloat(document.getElementById("vendorLng").value);
      const tourTitle = document.getElementById("vendorTourTitle").value.trim();
      const description = document.getElementById("vendorDescription").value.trim();

      const newProvider = {
        id: `custom-poi-${Date.now()}`,
        name,
        category,
        region,
        latitude: lat,
        longitude: lng,
        address,
        rating: 5.0,
        isVerified: true,
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=700&q=80",
        tours: [
          {
            title: tourTitle,
            description,
            priceUsd
          }
        ],
        culturalNotes: "Registered via Tourist Burma 2.0 Community Self-Certification Audit."
      };

      // Add to state and re-render
      AppState.providers.unshift(newProvider);
      filterAndRenderProviders();

      // Persist custom providers in localStorage
      const customSaved = JSON.parse(localStorage.getItem("tb_custom_providers") || "[]");
      customSaved.unshift(newProvider);
      localStorage.setItem("tb_custom_providers", JSON.stringify(customSaved));

      closeModal();
      form.reset();

      // Pan to new provider
      flyToPoiCoordinates(lat, lng, newProvider.id);
      showToast(`Successfully registered and verified "${name}"!`);
    });
  }
}

// ============================================================================
// 9. PROVIDER DETAIL & BOOKING INQUIRY MODAL
// ============================================================================

function openProviderDetailModal(poiId) {
  const poi = AppState.providers.find(p => p.id === poiId);
  if (!poi) return;

  AppState.selectedProvider = poi;

  const modal = document.getElementById("detailModal");
  const backdrop = document.getElementById("detailModalBackdrop");
  const coverImage = document.getElementById("detailCoverImage");
  const categoryBadge = document.getElementById("detailCategoryBadge");
  const title = document.getElementById("detailTitle");
  const locationSub = document.getElementById("detailLocation");
  const priceVal = document.getElementById("detailPriceVal");
  const desc = document.getElementById("detailDescription");
  const etiquette = document.getElementById("detailEtiquette");

  if (!modal || !backdrop) return;

  coverImage.style.backgroundImage = `url('${poi.image}'), url("${FALLBACK_HERITAGE_IMAGE}")`;
  coverImage.style.backgroundColor = "var(--color-teak-950)";
  coverImage.style.backgroundSize = "cover";
  coverImage.style.backgroundPosition = "center";
  categoryBadge.textContent = poi.category.replace('_', ' ');
  title.textContent = poi.name;
  locationSub.textContent = `${poi.address} · ${poi.region}, Myanmar`;
  
  const priceBoxLabel = document.querySelector(".detail-price-label");
  if (priceBoxLabel) {
    priceBoxLabel.textContent = poi.category === "SACRED_HERITAGE" ? "ENTRY ACCESS" : "DIRECT PRICE";
  }
  priceVal.textContent = formatPrice(poi.tours[0].priceUsd);
  desc.textContent = `${poi.tours[0].title} — ${poi.tours[0].description}`;

  if (poi.culturalNotes) {
    etiquette.innerHTML = `
      <p>• ${poi.culturalNotes}</p>
      <p>• Remove all footwear, including socks, before entering sacred precincts.</p>
      <p>• ${poi.category === "SACRED_HERITAGE" ? "Protect 1,000-year-old terracotta brickwork and mural plaster." : "Direct community booking guarantees zero commission leakages."}</p>
    `;
  }

  modal.classList.add("active");
  backdrop.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  backdrop.setAttribute("aria-hidden", "false");

  // Wire modal action buttons
  const btnFly = document.getElementById("btnFlyToMapFromDetail");
  if (btnFly) {
    btnFly.onclick = () => {
      closeDetailModal();
      flyToPoiCoordinates(poi.latitude, poi.longitude, poi.id);
    };
  }

  const btnInquire = document.getElementById("btnDirectInquiry");
  if (btnInquire) {
    if (poi.category === "SACRED_HERITAGE") {
      btnInquire.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <span>Temple Etiquette & Pilgrimage Guide</span>
      `;
      btnInquire.onclick = () => {
        showToast(`Cultural etiquette and archaeological notes loaded for ${poi.name}.`);
        closeDetailModal();
      };
    } else {
      btnInquire.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        <span>Direct Inquiry (No Booking Fees)</span>
      `;
      btnInquire.onclick = () => {
        showToast(`Inquiry sent directly to ${poi.name}. Zero middlemen.`);
        closeDetailModal();
      };
    }
  }
}

function closeDetailModal() {
  const modal = document.getElementById("detailModal");
  const backdrop = document.getElementById("detailModalBackdrop");
  if (modal) modal.classList.remove("active");
  if (backdrop) backdrop.classList.remove("active");
}

function initDetailModal() {
  const btnClose = document.getElementById("btnCloseDetailModal");
  const backdrop = document.getElementById("detailModalBackdrop");

  if (btnClose) btnClose.addEventListener("click", closeDetailModal);
  if (backdrop) backdrop.addEventListener("click", closeDetailModal);
}

// ============================================================================
// 10. TOAST NOTIFICATIONS & UTILITY FUNCTIONS
// ============================================================================

function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>✦</span> <span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(12px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}

function formatMarkdownToHtml(markdown) {
  let html = markdown
    .replace(/^### (.*$)/gim, '<h3 style="color:var(--color-heritage-gold); font-size:0.95rem; margin-top:8px;">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="color:var(--color-heritage-gold); font-size:1.05rem; margin-top:10px;">$1</h2>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/\n\n/gim, '</p><p>')
    .replace(/\n/gim, '<br />');
  return `<p>${html}</p>`;
}

// ============================================================================
// 11. EVENT LISTENERS & SETUP
// ============================================================================

function setupEventListeners() {
  // Region Buttons in Header
  document.querySelectorAll(".region-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".region-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const regionKey = btn.getAttribute("data-region");
      AppState.activeRegion = regionKey;

      if (REGION_COORDINATES[regionKey] && mapInstance) {
        const { center, zoom } = REGION_COORDINATES[regionKey];
        mapInstance.flyTo(center, zoom, { duration: 1.5 });
      }

      filterAndRenderProviders();
    });
  });

  // Category Filter Pills
  document.querySelectorAll(".cat-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".cat-pill").forEach(p => {
        p.classList.remove("active");
        p.setAttribute("aria-selected", "false");
      });
      pill.classList.add("active");
      pill.setAttribute("aria-selected", "true");

      AppState.activeCategory = pill.getAttribute("data-category");
      filterAndRenderProviders();
    });
  });

  // Search input live filtering
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      AppState.searchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = e.target.value ? "block" : "none";
      }
      filterAndRenderProviders();
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      AppState.searchQuery = "";
      clearSearchBtn.style.display = "none";
      filterAndRenderProviders();
    });
  }

  // Radius Slider
  const radiusSlider = document.getElementById("radiusSlider");
  const radiusValue = document.getElementById("radiusValue");
  if (radiusSlider && radiusValue) {
    radiusSlider.addEventListener("input", (e) => {
      const val = e.target.value;
      radiusValue.textContent = val;
      AppState.searchRadiusKm = parseInt(val, 10);
      filterAndRenderProviders();
    });
  }

  // GPS Locate Simulation
  const btnGeoLocate = document.getElementById("btnGeoLocate");
  if (btnGeoLocate) {
    btnGeoLocate.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            AppState.userLocation = {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            };
            showToast(`GPS Position Locked: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
            filterAndRenderProviders();
          },
          () => {
            // Fallback simulation toggle
            AppState.userLocation = { latitude: 20.5450, longitude: 96.9100 }; // Inle Lake
            showToast("Location unavailable. Showing nearby results around Inle Lake as a preview.");
            filterAndRenderProviders();
          }
        );
      }
    });
  }

  // Currency & Language Buttons
  const currencyBtn = document.getElementById("currencyToggleBtn");
  if (currencyBtn) currencyBtn.addEventListener("click", toggleCurrency);

  const langBtn = document.getElementById("langToggleBtn");
  if (langBtn) langBtn.addEventListener("click", toggleLanguage);

  // Map Style Buttons
  document.querySelectorAll(".map-style-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".map-style-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const styleKey = btn.getAttribute("data-style");
      setMapTheme(styleKey);
    });
  });

  // Recenter Myanmar Button
  const btnRecenter = document.getElementById("btnRecenterMyanmar");
  if (btnRecenter && mapInstance) {
    btnRecenter.addEventListener("click", () => {
      mapInstance.flyTo(REGION_COORDINATES.all.center, REGION_COORDINATES.all.zoom, { duration: 1.2 });
    });
  }

  // Mobile Floating View Switcher (List vs Map)
  const mobileToggleBtn = document.getElementById("btnMobileViewToggle");
  const splitViewport = document.querySelector(".split-viewport");
  if (mobileToggleBtn && splitViewport) {
    mobileToggleBtn.addEventListener("click", () => {
      const isMapActive = splitViewport.classList.contains("mobile-map-active");
      setMobileView(isMapActive ? "list" : "map");
    });
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && splitViewport) {
      splitViewport.classList.remove("mobile-map-active");
      if (mapInstance) mapInstance.invalidateSize();
    }
  });

  // Offline Simulation Banner Toggle
  const btnOffline = document.getElementById("btnToggleSimulatedOffline");
  if (btnOffline) {
    btnOffline.addEventListener("click", () => {
      AppState.offlineSimulated = !AppState.offlineSimulated;
      const statusText = document.getElementById("bannerStatusText");
      if (statusText) {
        if (AppState.offlineSimulated) {
          statusText.innerHTML = `<strong>Offline Mode Preview</strong> · Interface preview only; live offline caching is not connected`;
          showToast("Offline mode is a preview only; live offline caching is not connected.");
        } else {
          statusText.innerHTML = `<strong>Discover Myanmar</strong> · Explore cultural sites and local experiences`;
          showToast("Returned to the standard browsing view.");
        }
      }
    });
  }
}

// ============================================================================
// 12. INITIALIZATION
// ============================================================================

window.addEventListener("DOMContentLoaded", () => {
  // Load initial providers & restore custom stored ones
  const customProviders = JSON.parse(localStorage.getItem("tb_custom_providers") || "[]");
  AppState.providers = [...customProviders, ...INITIAL_PROVIDERS];

  // Initialize Map
  initMap();

  // Setup UI Interactions
  setupEventListeners();
  initAiConcierge();
  initVendorModal();
  initDetailModal();

  // Initial Filter & Render
  filterAndRenderProviders();

  console.log("Tourist Burma 2.0 Engine Initialized successfully.");
});
