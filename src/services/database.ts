import {
  MaterialCategory,
  MaterialItem,
  PriceRecord,
  RecyclerEntity,
  CollectorEntity,
  MaterialLot,
  RecyclerOffer,
  HandoverRecord,
  PaymentTransaction,
  SafetyTopic,
  SyncQueueItem,
  AppNotification,
  TraceabilityEvent,
  EarningSummary,
  AuthUser,
} from '../types';

// STORAGE KEYS
const STORAGE_PREFIX = 'kabadi2recycle_';
const KEYS = {
  LOTS: `${STORAGE_PREFIX}lots`,
  MATERIALS: `${STORAGE_PREFIX}materials`,
  PRICES: `${STORAGE_PREFIX}prices`,
  RECYCLERS: `${STORAGE_PREFIX}recyclers`,
  COLLECTORS: `${STORAGE_PREFIX}collectors`,
  OFFERS: `${STORAGE_PREFIX}offers`,
  HANDOVERS: `${STORAGE_PREFIX}handovers`,
  TRANSACTIONS: `${STORAGE_PREFIX}transactions`,
  SYNC_QUEUE: `${STORAGE_PREFIX}sync_queue`,
  NOTIFICATIONS: `${STORAGE_PREFIX}notifications`,
  INITIALIZED: `${STORAGE_PREFIX}initialized_v5`,
  ACTIVE_USER: `${STORAGE_PREFIX}active_user_v2`,
};

// DEFAULT AUTH USERS FOR 1-CLICK DEMO LOGIN & PASSWORDS
export const DEFAULT_AUTH_USERS: AuthUser[] = [
  {
    id: 'usr_collector_01',
    username: '9876543210',
    name: 'Rameshwar Kumar',
    nameHi: 'रमेश्वर कुमार (कबाड़ीवाला)',
    role: 'collector',
    phone: '+91 98765 43210',
    email: 'rameshwar.scrap@gmail.com',
    organization: 'Dharavi Green Waste Union',
    licenseNumber: 'KBC-COL-9904',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    defaultPassword: 'kabadi123',
  },
  {
    id: 'usr_recycler_01',
    username: 'recycler@ecorecycle.in',
    name: 'Sunil Deshmukh',
    nameHi: 'सुनील देशमुख (प्रबंधक)',
    role: 'recycler',
    phone: '+91 98201 44521',
    email: 'recycler@ecorecycle.in',
    organization: 'EcoTech Green Refiners Ltd',
    licenseNumber: 'MPCB/EW-REG/2024/048',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    defaultPassword: 'recycler123',
  },
];

// INITIAL SEED MATERIALS WITH REAL-TIME ELECTRICAL COMPONENT PHOTOGRAPHY
export const SEED_MATERIALS: MaterialItem[] = [
  {
    id: 'mat_pcb',
    name: 'Printed Circuit Boards (PCB / Motherboards)',
    category: 'PCB',
    subcategory: 'Green Motherboards & Gold-pin Microchips',
    unit: 'kg',
    basePricePerKg: 185,
    priceRange: { min: 160, max: 210 },
    trend: 'up',
    trendPercent: 6.2,
    hazardLevel: 'medium',
    icon: 'Cpu',
    imageUrl: '/images/motherboard_pcb.jpg',
    recoverySpecs: 'High Gold (0.4g/kg), Palladium, Electrolytic Copper & Silver',
    descriptionKey: 'High gold and copper recovery value. Keep dry and avoid breaking chip pins.',
  },
  {
    id: 'mat_copper_cable',
    name: 'Copper Cables (Heavy Gauge & Wires)',
    category: 'Copper Cable',
    subcategory: 'Electrical Rewiring & Stripped Copper Bundles',
    unit: 'kg',
    basePricePerKg: 460,
    priceRange: { min: 430, max: 490 },
    trend: 'up',
    trendPercent: 4.8,
    hazardLevel: 'low',
    icon: 'Zap',
    imageUrl: '/images/copper_heavy_cable.jpg',
    recoverySpecs: '99.5% Pure Electrolytic Copper Rods & Wire Drawing Grade',
    descriptionKey: 'Never burn insulation. Strip mechanically or sell as insulated cable.',
  },
  {
    id: 'mat_motor',
    name: 'Electric Motors & Transformer Coils',
    category: 'Motors',
    subcategory: 'Copper-Wound Stators, Alternators & Armatures',
    unit: 'kg',
    basePricePerKg: 140,
    priceRange: { min: 125, max: 155 },
    trend: 'up',
    trendPercent: 2.1,
    hazardLevel: 'low',
    icon: 'Settings2',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    recoverySpecs: 'Heavy Copper Enamel Wire (18-28% net wt), Silicon Core Steel',
    descriptionKey: 'Heavy copper core encased in cast iron or aluminum casing.',
  },
  {
    id: 'mat_battery',
    name: 'Lead-Acid & Li-Ion Battery Packs',
    category: 'Batteries',
    subcategory: 'Inverter, UPS & EV Battery Modules',
    unit: 'kg',
    basePricePerKg: 95,
    priceRange: { min: 85, max: 110 },
    trend: 'stable',
    trendPercent: 0.5,
    hazardLevel: 'high',
    icon: 'BatteryCharging',
    imageUrl: '/images/battery_pack.jpg',
    recoverySpecs: 'Refined Lead Ingots (55%), Cobalt, Lithium Carbonate Salts',
    descriptionKey: 'Corrosive sulfuric acid hazard. Keep upright, do not puncture or expose to fire.',
  },
  {
    id: 'mat_computer',
    name: 'Computer Towers & Server Cabinets',
    category: 'Computers',
    subcategory: 'Complete CPU Cabinets, SMPS & Chassis',
    unit: 'piece',
    basePricePerKg: 290,
    priceRange: { min: 240, max: 340 },
    trend: 'up',
    trendPercent: 4.1,
    hazardLevel: 'medium',
    icon: 'HardDrive',
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    recoverySpecs: 'Motherboard, RAM contacts, Power Supply, Sheet Steel, Copper Coils',
    descriptionKey: 'Includes power supply (SMPS), motherboard, RAM, and steel cabinet.',
  },
  {
    id: 'mat_crt',
    name: 'Cathode Ray Tubes (CRT Screens)',
    category: 'CRT',
    subcategory: 'Old TV / Monitor Funnel Glass & Deflection Yokes',
    unit: 'piece',
    basePricePerKg: 35,
    priceRange: { min: 25, max: 45 },
    trend: 'down',
    trendPercent: -3.5,
    hazardLevel: 'high',
    icon: 'Tv',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    recoverySpecs: 'Leaded funnel glass recycling, Copper yoke coils, Steel shadow mask',
    descriptionKey: 'Contains toxic leaded funnel glass and phosphors. High implosion danger if struck.',
  },
  {
    id: 'mat_aluminium',
    name: 'Aluminium Heat Sinks & Casings',
    category: 'Aluminium',
    subcategory: 'Extruded Computer Heat Sinks & Alloy Radiators',
    unit: 'kg',
    basePricePerKg: 135,
    priceRange: { min: 120, max: 145 },
    trend: 'stable',
    trendPercent: 1.0,
    hazardLevel: 'low',
    icon: 'Layers',
    imageUrl: '/images/aluminium_heatsink.jpg',
    recoverySpecs: '98% Recycled 6063 Aluminum Ingots for Industrial Remelting',
    descriptionKey: 'Pure extruded aluminum used in electronics cooling.',
  },
  {
    id: 'mat_mobile',
    name: 'Mobile Phones & Circuit Modules',
    category: 'Mobile phones' as any,
    subcategory: 'Smartphones, Feature Phones & Tablet Boards',
    unit: 'piece',
    basePricePerKg: 380,
    priceRange: { min: 320, max: 440 },
    trend: 'up',
    trendPercent: 5.4,
    hazardLevel: 'medium',
    icon: 'Smartphone',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=800&q=80',
    recoverySpecs: 'Highest Gold per ton (300g/t), Palladium, Tantalum, Silver, Copper',
    descriptionKey: 'Precious metals in logic boards; remove swollen lithium batteries safely.',
  },
  {
    id: 'mat_lcd_panel',
    name: 'LCD / LED Flat Display Panels',
    category: 'LCD',
    subcategory: 'Laptop Screens & Flat Television Displays',
    unit: 'piece',
    basePricePerKg: 65,
    priceRange: { min: 50, max: 80 },
    trend: 'up',
    trendPercent: 3.0,
    hazardLevel: 'medium',
    icon: 'Monitor',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    recoverySpecs: 'Indium Tin Oxide (ITO), Optical Polycarbonate films, Aluminum frame',
    descriptionKey: 'Liquid crystal and CCFL backlight tubes may contain mercury vapors.',
  },
  {
    id: 'mat_mixed_plastic',
    name: 'Electronic Plastic Housings (ABS/PC)',
    category: 'Mixed plastics',
    subcategory: 'Computer & Appliance Casings (Non-Brominated)',
    unit: 'kg',
    basePricePerKg: 28,
    priceRange: { min: 22, max: 34 },
    trend: 'stable',
    trendPercent: 0.0,
    hazardLevel: 'low',
    icon: 'Box',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    recoverySpecs: 'Pelletized High-Impact Polystyrene (HIPS) and ABS for injection moulding',
    descriptionKey: 'Sorted clean plastics without fire retardants or stickers.',
  },
];

// INITIAL SEED RECYCLERS
export const SEED_RECYCLERS: RecyclerEntity[] = [
  {
    id: 'rec_ecotech_01',
    name: 'EcoTech Green Refiners Ltd',
    companyName: 'EcoTech Recycling Pvt Ltd',
    facilityLocation: 'Turbhe MIDC, Navi Mumbai, Maharashtra 400705',
    coordinates: { latitude: 19.0688, longitude: 73.0116 },
    distanceKm: 4.2,
    isAuthorized: true,
    authorizationNumber: 'MPCB/EW-REG/2024/048',
    authorizingBody: 'Maharashtra Pollution Control Board (MPCB)',
    authorizationExpiry: '2028-12-31',
    contactPerson: 'Sunil Deshmukh (Procurement Lead)',
    phone: '+91 98201 44521',
    acceptedMaterials: ['PCB', 'Copper Cable', 'Batteries', 'Computers', 'Laptops', 'Mobile phones' as any],
    currentRates: {
      'PCB': 190,
      'Copper Cable': 475,
      'Batteries': 98,
      'Computers': 310,
    },
    pickupAvailable: true,
    minPickupWeightKg: 15,
    serviceArea: 'Mumbai, Navi Mumbai, Thane',
    workingHours: '08:30 AM - 07:00 PM (Mon-Sat)',
    rating: 4.9,
    verifiedBadges: ['CPCB R2 Certified', 'ISO 14001:2015', 'Digital Scale Audited'],
  },
  {
    id: 'rec_greenearth_02',
    name: 'GreenEarth Authorized Recyclers',
    companyName: 'GreenEarth E-Waste Solutions India Ltd',
    facilityLocation: 'Bhosari Industrial Estate, Pune, Maharashtra 411026',
    coordinates: { latitude: 18.6279, longitude: 73.8443 },
    distanceKm: 8.7,
    isAuthorized: true,
    authorizationNumber: 'CPCB-EW-AUT-2023-882',
    authorizingBody: 'Central Pollution Control Board (CPCB)',
    authorizationExpiry: '2027-08-15',
    contactPerson: 'Anjali Sawant (Plant Director)',
    phone: '+91 98112 33490',
    acceptedMaterials: ['PCB', 'Cables', 'Copper Cable', 'Aluminium', 'Motors', 'CRT', 'LCD'],
    currentRates: {
      'PCB': 185,
      'Copper Cable': 465,
      'Motors': 145,
      'CRT': 38,
      'Aluminium': 138,
    },
    pickupAvailable: true,
    minPickupWeightKg: 20,
    serviceArea: 'Pune, Pimpri-Chinchwad, Lonavala',
    workingHours: '09:00 AM - 06:30 PM (Mon-Sat)',
    rating: 4.8,
    verifiedBadges: ['CPCB Tier-1 Dismantler', 'Zero Landfill Certified'],
  },
  {
    id: 'rec_mahalakshmi_03',
    name: 'Mahalakshmi Metal Extractors',
    companyName: 'Mahalakshmi Non-Ferrous Recycling Corp',
    facilityLocation: 'Kalyan Scrap Yard, Thane District, Maharashtra 421301',
    coordinates: { latitude: 19.2437, longitude: 73.1355 },
    distanceKm: 12.4,
    isAuthorized: true,
    authorizationNumber: 'SPCB/MH/E-REC/109',
    authorizingBody: 'State Pollution Control Board (SPCB)',
    authorizationExpiry: '2026-11-20',
    contactPerson: 'Gopal Patil',
    phone: '+91 97654 88310',
    acceptedMaterials: ['Copper Cable', 'Aluminium', 'Motors', 'Magnetic assemblies', 'Mixed plastics'],
    currentRates: {
      'Copper Cable': 480,
      'Aluminium': 140,
      'Motors': 148,
      'Mixed plastics': 30,
    },
    pickupAvailable: false, // Drop-off facility
    minPickupWeightKg: 5,
    serviceArea: 'Thane, Kalyan, Dombivli',
    workingHours: '08:00 AM - 08:00 PM (Daily)',
    rating: 4.6,
    verifiedBadges: ['Government E-Scrap Passbook Registered'],
  },
];

// INITIAL SEED COLLECTOR
export const SEED_COLLECTOR: CollectorEntity = {
  id: 'KBC-COL-9904',
  name: 'Rameshwar "Ramesh" Kumar',
  phone: '+91 98920 11840',
  area: 'Dharavi 60 Feet Road',
  city: 'Mumbai',
  preferredLanguage: 'hi',
  joinedDate: '2025-04-10',
  totalEarnings: 42850,
  totalLotsRecycled: 18,
};

// INITIAL SAMPLE SEED LOTS
export const SEED_LOTS: MaterialLot[] = [
  {
    id: 'KBC-2026-000101',
    collectorId: 'KBC-COL-9904',
    collectorName: 'Rameshwar Kumar',
    collectorPhone: '+91 98920 11840',
    materialCategory: 'PCB',
    detectedConfidence: 0.94,
    isManuallyCorrected: false,
    photoUrl: '/images/motherboard_pcb.jpg',
    weightKg: 24.5,
    condition: 'Good',
    quantity: 3,
    description: 'High grade computer motherboard circuits without batteries.',
    estimatedPricePerKg: 185,
    estimatedTotalValue: 4532,
    status: 'COMPLETED',
    location: {
      latitude: 19.0434,
      longitude: 72.8567,
      areaName: 'Dharavi Scrap Market',
      city: 'Mumbai',
      state: 'Maharashtra',
    },
    createdAt: '2026-09-18T10:15:00Z',
    updatedAt: '2026-09-19T14:30:00Z',
    syncStatus: 'SYNCED',
    selectedRecyclerId: 'rec_ecotech_01',
    selectedRecyclerName: 'EcoTech Green Refiners Ltd',
    handoverId: 'HO-KBC-2026-000101',
    finalWeightKg: 24.5,
    finalPricePerKg: 190,
    finalTotalAmount: 4655,
    paymentMethod: 'CASH',
    paymentStatus: 'PAID',
    paymentDate: '2026-09-19T14:30:00Z',
    traceability: [
      {
        id: 'tr_101_1',
        lotId: 'KBC-2026-000101',
        eventType: 'LOT_CREATED',
        actorName: 'Rameshwar Kumar',
        actorRole: 'collector',
        timestamp: '2026-09-18T10:15:00Z',
        location: 'Dharavi Scrap Market',
        notes: 'Photo captured, weight entered: 24.5 kg PCB.',
      },
      {
        id: 'tr_101_2',
        lotId: 'KBC-2026-000101',
        eventType: 'RECYCLER_OFFER',
        actorName: 'EcoTech Green Refiners Ltd',
        actorRole: 'recycler',
        timestamp: '2026-09-18T11:05:00Z',
        notes: 'Offered ₹190/kg (Total ₹4,655). Free pickup scheduled.',
      },
      {
        id: 'tr_101_3',
        lotId: 'KBC-2026-000101',
        eventType: 'OFFER_ACCEPTED',
        actorName: 'Rameshwar Kumar',
        actorRole: 'collector',
        timestamp: '2026-09-18T11:30:00Z',
        notes: 'Collector approved quote. Pickup requested for Sep 19 morning.',
      },
      {
        id: 'tr_101_4',
        lotId: 'KBC-2026-000101',
        eventType: 'HANDOVER_VERIFIED',
        actorName: 'Sunil Deshmukh (EcoTech)',
        actorRole: 'recycler',
        timestamp: '2026-09-19T14:20:00Z',
        referenceId: 'HO-KBC-2026-000101',
        notes: 'Digital scale weight confirmed: 24.50 kg. Inspection passed.',
      },
      {
        id: 'tr_101_5',
        eventType: 'PAYMENT_RECORDED',
        lotId: 'KBC-2026-000101',
        actorName: 'EcoTech Green Refiners Ltd',
        actorRole: 'recycler',
        timestamp: '2026-09-19T14:30:00Z',
        notes: 'Paid ₹4,655 in Cash on the spot. Signed digital slip.',
      },
    ],
  },
  {
    id: 'KBC-2026-000102',
    collectorId: 'KBC-COL-9904',
    collectorName: 'Rameshwar Kumar',
    collectorPhone: '+91 98920 11840',
    materialCategory: 'Copper Cable',
    detectedConfidence: 0.91,
    isManuallyCorrected: false,
    photoUrl: '/images/copper_heavy_cable.jpg',
    weightKg: 18.0,
    condition: 'Average',
    quantity: 1,
    description: 'Stripped clean copper wire bundles from electrical rewiring.',
    estimatedPricePerKg: 460,
    estimatedTotalValue: 8280,
    status: 'QUOTED',
    location: {
      latitude: 19.0434,
      longitude: 72.8567,
      areaName: 'Dharavi Scrap Market',
      city: 'Mumbai',
      state: 'Maharashtra',
    },
    createdAt: '2026-09-21T08:30:00Z',
    updatedAt: '2026-09-21T09:15:00Z',
    syncStatus: 'SYNCED',
    selectedRecyclerId: 'rec_ecotech_01',
    selectedRecyclerName: 'EcoTech Green Refiners Ltd',
    traceability: [
      {
        id: 'tr_102_1',
        lotId: 'KBC-2026-000102',
        eventType: 'LOT_CREATED',
        actorName: 'Rameshwar Kumar',
        actorRole: 'collector',
        timestamp: '2026-09-21T08:30:00Z',
        notes: 'Created lot with 18.0 kg copper cable.',
      },
      {
        id: 'tr_102_2',
        lotId: 'KBC-2026-000102',
        eventType: 'RECYCLER_OFFER',
        actorName: 'EcoTech Green Refiners Ltd',
        actorRole: 'recycler',
        timestamp: '2026-09-21T09:15:00Z',
        notes: 'Offer sent: ₹475/kg (Total ₹8,550). Doorstep collection available.',
      },
    ],
  },
  {
    id: 'KBC-2026-000103',
    collectorId: 'KBC-COL-9904',
    collectorName: 'Rameshwar Kumar',
    collectorPhone: '+91 98920 11840',
    materialCategory: 'Batteries',
    detectedConfidence: 0.96,
    isManuallyCorrected: false,
    photoUrl: '/images/battery_pack.jpg',
    weightKg: 42.0,
    condition: 'Average',
    quantity: 2,
    description: 'Two commercial inverter lead-acid batteries intact with acid plugs sealed.',
    estimatedPricePerKg: 95,
    estimatedTotalValue: 3990,
    status: 'PICKUP_SCHEDULED',
    location: {
      latitude: 19.0434,
      longitude: 72.8567,
      areaName: 'Dharavi Scrap Market',
      city: 'Mumbai',
      state: 'Maharashtra',
    },
    createdAt: '2026-09-20T14:00:00Z',
    updatedAt: '2026-09-21T11:00:00Z',
    syncStatus: 'SYNCED',
    selectedRecyclerId: 'rec_greenearth_02',
    selectedRecyclerName: 'GreenEarth Authorized Recyclers',
    pickupDate: '2026-09-23',
    pickupSlot: '11:00 AM - 01:00 PM',
    pickupNotes: 'Authorized hazardous e-waste carrier vehicle #MH-04-AZ-2811 with acid spill kit.',
    traceability: [
      {
        id: 'tr_103_1',
        lotId: 'KBC-2026-000103',
        eventType: 'LOT_CREATED',
        actorName: 'Rameshwar Kumar',
        actorRole: 'collector',
        timestamp: '2026-09-20T14:00:00Z',
        notes: 'Created battery lot with safety seal verified.',
      },
      {
        id: 'tr_103_2',
        lotId: 'KBC-2026-000103',
        eventType: 'RECYCLER_OFFER',
        actorName: 'GreenEarth Authorized Recyclers',
        actorRole: 'recycler',
        timestamp: '2026-09-20T15:30:00Z',
        notes: 'Offered ₹98/kg (Total ₹4,116). Hazardous vehicle scheduled.',
      },
      {
        id: 'tr_103_3',
        lotId: 'KBC-2026-000103',
        eventType: 'OFFER_ACCEPTED',
        actorName: 'Rameshwar Kumar',
        actorRole: 'collector',
        timestamp: '2026-09-20T16:00:00Z',
        notes: 'Offer accepted by collector.',
      },
      {
        id: 'tr_103_4',
        lotId: 'KBC-2026-000103',
        eventType: 'PICKUP_SCHEDULED',
        actorName: 'GreenEarth Dispatch Desk',
        actorRole: 'recycler',
        timestamp: '2026-09-21T11:00:00Z',
        notes: 'Vehicle MH-04-AZ-2811 scheduled for Sep 23 between 11 AM - 1 PM.',
      },
    ],
  },
  {
    id: 'KBC-2026-000104',
    collectorId: 'KBC-COL-9904',
    collectorName: 'Rameshwar Kumar',
    collectorPhone: '+91 98920 11840',
    materialCategory: 'Motors',
    detectedConfidence: 0.88,
    isManuallyCorrected: false,
    photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    weightKg: 15.0,
    condition: 'Good',
    quantity: 4,
    description: 'Ceiling fan stators and water pump motors with heavy copper winding.',
    estimatedPricePerKg: 140,
    estimatedTotalValue: 2100,
    status: 'READY',
    location: {
      latitude: 19.0434,
      longitude: 72.8567,
      areaName: 'Dharavi Scrap Market',
      city: 'Mumbai',
      state: 'Maharashtra',
    },
    createdAt: '2026-09-22T08:00:00Z',
    updatedAt: '2026-09-22T08:00:00Z',
    syncStatus: 'SYNC_PENDING' as any,
    traceability: [
      {
        id: 'tr_104_1',
        lotId: 'KBC-2026-000104',
        eventType: 'LOT_CREATED',
        actorName: 'Rameshwar Kumar',
        actorRole: 'collector',
        timestamp: '2026-09-22T08:00:00Z',
        notes: 'Created offline lot. Waiting for recycler offers.',
      },
    ],
  },
];

// INITIAL SAMPLE OFFERS
export const SEED_OFFERS: RecyclerOffer[] = [
  {
    id: 'off_901',
    lotId: 'KBC-2026-000102',
    recyclerId: 'rec_ecotech_01',
    recyclerName: 'EcoTech Green Refiners Ltd',
    pricePerKg: 475,
    offeredTotal: 8550,
    pickupAvailable: true,
    proposedPickupDate: '2026-09-23',
    notes: 'Premium pure copper wire rate. Free doorstep weighing.',
    createdAt: '2026-09-21T09:15:00Z',
    status: 'PENDING',
  },
  {
    id: 'off_902',
    lotId: 'KBC-2026-000102',
    recyclerId: 'rec_greenearth_02',
    recyclerName: 'GreenEarth Authorized Recyclers',
    pricePerKg: 465,
    offeredTotal: 8370,
    pickupAvailable: true,
    proposedPickupDate: '2026-09-24',
    notes: 'CPCB certified handling with instant UPI or Cash payment.',
    createdAt: '2026-09-21T10:00:00Z',
    status: 'PENDING',
  },
];

// INITIAL SAFETY TOPICS
export const SAFETY_TOPICS: SafetyTopic[] = [
  {
    id: 'safe_cables',
    category: 'Copper & PVC Cables',
    titleKey: 'Do NOT Burn Cables',
    icon: 'Flame',
    hazardLevel: 'danger',
    dosKey: [
      'Use mechanical wire stripping tools or manual blades with gloves.',
      'Sell insulated cables directly to authorized recyclers with granulation plants.',
      'Work in open, well-ventilated outdoor shed areas.',
    ],
    dontsKey: [
      'NEVER set fire to cable heaps or plastic insulation.',
      'Burning PVC produces carcinogenic dioxins, furans and black toxic smoke.',
      'Never breathe smoke; it causes severe permanent lung damage.',
    ],
    audioScriptKey: 'Warning: Never burn plastic cables. Burning releases poisonous gases that harm your lungs and family. Strip wires with a knife or sell with insulation.',
  },
  {
    id: 'safe_batteries',
    category: 'Lead-Acid & Li-Ion Batteries',
    titleKey: 'Do NOT Break Open Batteries',
    icon: 'BatteryCharging',
    hazardLevel: 'danger',
    dosKey: [
      'Keep batteries upright on wooden pallets away from water puddles.',
      'Tape open terminals to prevent dead-shorts and fire sparks.',
      'Wash hands immediately with soap if acid touches your skin.',
    ],
    dontsKey: [
      'DO NOT crack battery bodies with hammers or chisels to drain acid.',
      'Sulfuric acid causes severe skin burns and permanent blindness.',
      'Do not throw lithium mobile batteries into regular metal scrap; they explode if punctured.',
    ],
    audioScriptKey: 'Battery Safety: Never smash batteries with a hammer. Acid inside can blind your eyes and burn skin. Always keep upright and wear rubber gloves.',
  },
  {
    id: 'safe_crt',
    category: 'Cathode Ray Tubes (CRT Screens)',
    titleKey: 'Do NOT Smash TV Screens',
    icon: 'Tv',
    hazardLevel: 'danger',
    dosKey: [
      'Handle CRT screens by the heavy metal band with two people.',
      'Store indoors in dry boxes to prevent accidental knocking.',
      'Always wear thick safety glasses and heavy leather gloves.',
    ],
    dontsKey: [
      'DO NOT strike the thin glass neck or vacuum funnel with a hammer.',
      'Sudden vacuum collapse causes explosive glass implosion.',
      'Funnel glass contains high levels of toxic lead dust; do not inhale powder.',
    ],
    audioScriptKey: 'CRT Warning: Old TV glass has a vacuum inside. If hit with a hammer, it explodes violently and releases poisonous lead dust.',
  },
  {
    id: 'safe_ppe',
    category: 'Protective Equipment (PPE)',
    titleKey: 'Always Use Basic Protection',
    icon: 'ShieldAlert',
    hazardLevel: 'caution',
    dosKey: [
      'Wear cut-resistant canvas or leather gloves while handling circuit boards.',
      'Wear sturdy closed shoes or boots to prevent nail and glass punctures.',
      'Use an N95 dust mask when sweeping scrap warehouse areas.',
    ],
    dontsKey: [
      'Do not dismantle electronics barefoot or in rubber slippers.',
      'Do not eat, chew tobacco, or drink tea with unwashed scrap-handling hands.',
    ],
    audioScriptKey: 'Protection Guide: Always wear tough shoes and gloves. Wash hands thoroughly before eating or drinking.',
  },
];

// INITIAL TRANSACTIONS (PASSBOOK)
export const SEED_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'TXN-2026-9041',
    lotId: 'KBC-2026-000101',
    handoverId: 'HO-KBC-2026-000101',
    collectorId: 'KBC-COL-9904',
    collectorName: 'Rameshwar Kumar',
    recyclerId: 'rec_ecotech_01',
    recyclerName: 'EcoTech Green Refiners Ltd',
    material: 'PCB',
    weightKg: 24.5,
    quotedPrice: 190,
    finalPrice: 190,
    amountPaid: 4655,
    paymentMethod: 'CASH',
    paymentStatus: 'PAID',
    date: '2026-09-19',
    timestamp: '2026-09-19T14:30:00Z',
  },
  {
    id: 'TXN-2026-8812',
    lotId: 'KBC-2026-000095',
    handoverId: 'HO-KBC-2026-000095',
    collectorId: 'KBC-COL-9904',
    collectorName: 'Rameshwar Kumar',
    recyclerId: 'rec_greenearth_02',
    recyclerName: 'GreenEarth Authorized Recyclers',
    material: 'Copper Cable',
    weightKg: 12.0,
    quotedPrice: 460,
    finalPrice: 460,
    amountPaid: 5520,
    paymentMethod: 'UPI',
    paymentStatus: 'PAID',
    date: '2026-09-15',
    timestamp: '2026-09-15T16:10:00Z',
  },
  {
    id: 'TXN-2026-8790',
    lotId: 'KBC-2026-000089',
    handoverId: 'HO-KBC-2026-000089',
    collectorId: 'KBC-COL-9904',
    collectorName: 'Rameshwar Kumar',
    recyclerId: 'rec_ecotech_01',
    recyclerName: 'EcoTech Green Refiners Ltd',
    material: 'Computers',
    weightKg: 35.0,
    quotedPrice: 280,
    finalPrice: 280,
    amountPaid: 9800,
    paymentMethod: 'CASH',
    paymentStatus: 'PAID',
    date: '2026-09-10',
    timestamp: '2026-09-10T12:00:00Z',
  },
];

// DATABASE REPOSITORY CLASS
class LocalDatabase {
  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized() {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(KEYS.INITIALIZED)) {
      localStorage.setItem(KEYS.LOTS, JSON.stringify(SEED_LOTS));
      localStorage.setItem(KEYS.MATERIALS, JSON.stringify(SEED_MATERIALS));
      localStorage.setItem(KEYS.RECYCLERS, JSON.stringify(SEED_RECYCLERS));
      localStorage.setItem(KEYS.COLLECTORS, JSON.stringify([SEED_COLLECTOR]));
      localStorage.setItem(KEYS.OFFERS, JSON.stringify(SEED_OFFERS));
      localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(SEED_TRANSACTIONS));
      localStorage.setItem(KEYS.SYNC_QUEUE, JSON.stringify([]));
      localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify([
        {
          id: 'notif_1',
          title: 'Welcome to KABADI2RECYCLE!',
          message: 'Connect directly with authorized recyclers and get certified fair prices for your e-waste.',
          timestamp: new Date().toISOString(),
          isRead: false,
          type: 'safety',
          targetRole: 'collector',
        },
        {
          id: 'notif_2',
          title: 'Offer Received from EcoTech',
          message: 'EcoTech offered ₹475/kg for your 18kg Copper Cable lot.',
          timestamp: '2026-09-21T09:15:00Z',
          isRead: false,
          type: 'offer',
          targetRole: 'collector',
          relatedLotId: 'KBC-2026-000102',
        },
      ]));
      localStorage.setItem(KEYS.INITIALIZED, 'true');
    } else {
      // Automatic migration: If localStorage contains stale placeholder photos (e.g. book photo for copper), migrate them
      const rawLots = localStorage.getItem(KEYS.LOTS);
      if (rawLots && rawLots.includes('photo-1544716278-ca5e3f4abd8c')) {
        try {
          const lots: MaterialLot[] = JSON.parse(rawLots);
          const cleanedLots = lots.map((l) => {
            if (l.photoUrl?.includes('photo-1544716278-ca5e3f4abd8c') || l.materialCategory === 'Copper Cable') {
              return { ...l, photoUrl: '/images/copper_heavy_cable.jpg' };
            }
            return l;
          });
          localStorage.setItem(KEYS.LOTS, JSON.stringify(cleanedLots));
        } catch {
          // ignore parsing error
        }
      }

      const rawMats = localStorage.getItem(KEYS.MATERIALS);
      if (rawMats && rawMats.includes('photo-1544716278-ca5e3f4abd8c')) {
        localStorage.setItem(KEYS.MATERIALS, JSON.stringify(SEED_MATERIALS));
      }
    }
  }

  // --- LOTS ---
  public getLots(): MaterialLot[] {
    const raw = localStorage.getItem(KEYS.LOTS);
    if (!raw) return [];
    try {
      const lots: MaterialLot[] = JSON.parse(raw);
      return lots.map((l) => {
        if (l.photoUrl?.includes('photo-1544716278-ca5e3f4abd8c') || (l.materialCategory === 'Copper Cable' && !l.photoUrl.startsWith('data:'))) {
          return { ...l, photoUrl: '/images/copper_heavy_cable.jpg' };
        }
        return l;
      });
    } catch {
      return [];
    }
  }

  public getLotById(id: string): MaterialLot | undefined {
    return this.getLots().find((l) => l.id === id);
  }

  public saveLot(lot: MaterialLot, queueForSync: boolean = true): MaterialLot {
    const lots = this.getLots();
    const existingIndex = lots.findIndex((l) => l.id === lot.id);

    const updatedLot = {
      ...lot,
      updatedAt: new Date().toISOString(),
      syncStatus: queueForSync ? ('PENDING' as const) : lot.syncStatus,
    };

    if (existingIndex >= 0) {
      lots[existingIndex] = updatedLot;
    } else {
      lots.unshift(updatedLot);
    }

    localStorage.setItem(KEYS.LOTS, JSON.stringify(lots));

    if (queueForSync) {
      this.addToSyncQueue({
        id: `sync_lot_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        entityType: 'LOT',
        entityId: lot.id,
        action: existingIndex >= 0 ? 'UPDATE' : 'CREATE',
        payload: updatedLot,
        timestamp: new Date().toISOString(),
        retryCount: 0,
        status: 'PENDING',
      });
    }

    return updatedLot;
  }

  public generateUniqueLotId(): string {
    const lots = this.getLots();
    const year = new Date().getFullYear();
    const count = lots.length + 1;
    const formattedCount = String(count + 104).padStart(6, '0');
    return `KBC-${year}-${formattedCount}`;
  }

  public generateHandoverId(lotId: string): string {
    return `HO-${lotId}`;
  }

  // --- AUTHENTICATION & USERS ---
  public getDefaultUsers(): AuthUser[] {
    return DEFAULT_AUTH_USERS;
  }

  public getActiveUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(KEYS.ACTIVE_USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  public setActiveUser(user: AuthUser | null): void {
    if (typeof window === 'undefined') return;
    if (user) {
      localStorage.setItem(KEYS.ACTIVE_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.ACTIVE_USER);
    }
  }

  // --- MATERIALS & PRICES ---
  public getMaterials(): MaterialItem[] {
    const raw = localStorage.getItem(KEYS.MATERIALS);
    if (!raw) return SEED_MATERIALS;
    try {
      const parsed: MaterialItem[] = JSON.parse(raw);
      return parsed.map((item) => {
        const seed = SEED_MATERIALS.find((s) => s.id === item.id || s.category === item.category);
        let img = item.imageUrl || seed?.imageUrl;
        if (img?.includes('photo-1544716278-ca5e3f4abd8c') || item.category === 'Copper Cable') {
          img = '/images/copper_heavy_cable.jpg';
        }
        return {
          ...item,
          imageUrl: img,
          recoverySpecs: item.recoverySpecs || seed?.recoverySpecs,
        };
      });
    } catch {
      return SEED_MATERIALS;
    }
  }

  public getMaterialByCategory(category: MaterialCategory): MaterialItem | undefined {
    return this.getMaterials().find((m) => m.category === category);
  }

  // --- RECYCLERS ---
  public getRecyclers(): RecyclerEntity[] {
    const raw = localStorage.getItem(KEYS.RECYCLERS);
    return raw ? JSON.parse(raw) : SEED_RECYCLERS;
  }

  public getRecyclerById(id: string): RecyclerEntity | undefined {
    return this.getRecyclers().find((r) => r.id === id);
  }

  public updateRecyclerRates(
    recyclerId: string,
    rates: Partial<Record<MaterialCategory, number>>
  ) {
    const recyclers = this.getRecyclers();
    const index = recyclers.findIndex((r) => r.id === recyclerId);
    if (index >= 0) {
      recyclers[index].currentRates = {
        ...recyclers[index].currentRates,
        ...rates,
      };
      localStorage.setItem(KEYS.RECYCLERS, JSON.stringify(recyclers));
      this.addToSyncQueue({
        id: `sync_rate_${Date.now()}`,
        entityType: 'RATE',
        entityId: recyclerId,
        action: 'UPDATE',
        payload: { recyclerId, rates },
        timestamp: new Date().toISOString(),
        retryCount: 0,
        status: 'PENDING',
      });
    }
  }

  // --- OFFERS ---
  public getOffers(): RecyclerOffer[] {
    const raw = localStorage.getItem(KEYS.OFFERS);
    return raw ? JSON.parse(raw) : [];
  }

  public getOffersForLot(lotId: string): RecyclerOffer[] {
    return this.getOffers().filter((o) => o.lotId === lotId);
  }

  public makeOffer(offerData: Omit<RecyclerOffer, 'id' | 'createdAt' | 'status'>): RecyclerOffer {
    const offers = this.getOffers();
    const newOffer: RecyclerOffer = {
      ...offerData,
      id: `off_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'PENDING',
    };
    offers.unshift(newOffer);
    localStorage.setItem(KEYS.OFFERS, JSON.stringify(offers));

    // Update lot status to QUOTED and add traceability
    const lot = this.getLotById(offerData.lotId);
    if (lot) {
      const traceEvent: TraceabilityEvent = {
        id: `tr_${Date.now()}`,
        lotId: lot.id,
        eventType: 'RECYCLER_OFFER',
        actorName: offerData.recyclerName,
        actorRole: 'recycler',
        timestamp: new Date().toISOString(),
        notes: `Recycler offered ₹${offerData.pricePerKg}/kg (Total ₹${offerData.offeredTotal}).`,
      };
      lot.status = 'QUOTED';
      lot.activeOfferId = newOffer.id;
      lot.selectedRecyclerId = offerData.recyclerId;
      lot.selectedRecyclerName = offerData.recyclerName;
      lot.traceability.push(traceEvent);
      this.saveLot(lot, true);
    }

    this.addNotification({
      id: `notif_${Date.now()}`,
      title: 'New Recycler Offer!',
      message: `${offerData.recyclerName} offered ₹${offerData.offeredTotal} for your lot.`,
      timestamp: new Date().toISOString(),
      isRead: false,
      type: 'offer',
      targetRole: 'collector',
      relatedLotId: offerData.lotId,
    });

    return newOffer;
  }

  public acceptOffer(offerId: string, lotId: string): boolean {
    const offers = this.getOffers();
    const offer = offers.find((o) => o.id === offerId);
    const lot = this.getLotById(lotId);
    if (!offer || !lot) return false;

    offer.status = 'ACCEPTED';
    localStorage.setItem(KEYS.OFFERS, JSON.stringify(offers));

    const traceEvent: TraceabilityEvent = {
      id: `tr_${Date.now()}`,
      lotId: lot.id,
      eventType: 'OFFER_ACCEPTED',
      actorName: lot.collectorName,
      actorRole: 'collector',
      timestamp: new Date().toISOString(),
      notes: `Collector accepted offer of ₹${offer.pricePerKg}/kg from ${offer.recyclerName}. Pickup requested.`,
    };

    lot.status = 'PICKUP_REQUESTED';
    lot.activeOfferId = offer.id;
    lot.selectedRecyclerId = offer.recyclerId;
    lot.selectedRecyclerName = offer.recyclerName;
    lot.pickupDate = offer.proposedPickupDate;
    lot.traceability.push(traceEvent);
    this.saveLot(lot, true);

    this.addNotification({
      id: `notif_${Date.now()}`,
      title: 'Offer Accepted by Collector',
      message: `${lot.collectorName} accepted your offer for lot ${lot.id}. Please schedule pickup vehicle.`,
      timestamp: new Date().toISOString(),
      isRead: false,
      type: 'pickup',
      targetRole: 'recycler',
      relatedLotId: lot.id,
    });

    return true;
  }

  public schedulePickup(
    lotId: string,
    pickupDate: string,
    pickupSlot: string,
    notes: string
  ): boolean {
    const lot = this.getLotById(lotId);
    if (!lot) return false;

    lot.status = 'PICKUP_SCHEDULED';
    lot.pickupDate = pickupDate;
    lot.pickupSlot = pickupSlot;
    lot.pickupNotes = notes;

    const traceEvent: TraceabilityEvent = {
      id: `tr_${Date.now()}`,
      lotId: lot.id,
      eventType: 'PICKUP_SCHEDULED',
      actorName: lot.selectedRecyclerName || 'Recycler Logistics',
      actorRole: 'recycler',
      timestamp: new Date().toISOString(),
      notes: `Vehicle pickup confirmed for ${pickupDate} (${pickupSlot}). ${notes}`,
    };
    lot.traceability.push(traceEvent);
    this.saveLot(lot, true);

    this.addNotification({
      id: `notif_${Date.now()}`,
      title: 'Pickup Scheduled!',
      message: `Your pickup is scheduled on ${pickupDate} (${pickupSlot}). Keep materials ready.`,
      timestamp: new Date().toISOString(),
      isRead: false,
      type: 'pickup',
      targetRole: 'collector',
      relatedLotId: lot.id,
    });

    return true;
  }

  public markCollected(lotId: string): boolean {
    const lot = this.getLotById(lotId);
    if (!lot) return false;

    lot.status = 'COLLECTED';
    const traceEvent: TraceabilityEvent = {
      id: `tr_${Date.now()}`,
      lotId: lot.id,
      eventType: 'COLLECTED',
      actorName: lot.selectedRecyclerName || 'Recycler Driver',
      actorRole: 'recycler',
      timestamp: new Date().toISOString(),
      notes: 'Material loaded into vehicle. Heading to weighing scale for handover verification.',
    };
    lot.traceability.push(traceEvent);
    this.saveLot(lot, true);

    return true;
  }

  // --- HANDOVER & PAYMENT ---
  public completeHandover(data: {
    lotId: string;
    finalWeightKg: number;
    finalPricePerKg: number;
    finalTotalAmount: number;
    paymentMethod: 'CASH' | 'UPI' | 'BANK_TRANSFER';
    handoverLocation: string;
  }): HandoverRecord | null {
    const lot = this.getLotById(data.lotId);
    if (!lot) return null;

    const handoverId = this.generateHandoverId(lot.id);
    const dateStr = new Date().toISOString().split('T')[0];
    const timestampStr = new Date().toISOString();

    const handoverRecord: HandoverRecord = {
      id: handoverId,
      lotId: lot.id,
      material: lot.materialCategory,
      photoUrl: lot.photoUrl,
      declaredWeightKg: lot.weightKg,
      finalWeightKg: data.finalWeightKg,
      quotedPrice: lot.estimatedPricePerKg,
      finalPrice: data.finalTotalAmount,
      collectionLocation: lot.location.areaName,
      handoverLocation: data.handoverLocation,
      date: dateStr,
      timestamp: timestampStr,
      collectorId: lot.collectorId,
      collectorName: lot.collectorName,
      recyclerId: lot.selectedRecyclerId || 'rec_ecotech_01',
      recyclerName: lot.selectedRecyclerName || 'EcoTech Green Refiners Ltd',
      qrPayload: `KABADI2RECYCLE|${handoverId}|${lot.id}|${data.finalWeightKg}KG|INR${data.finalTotalAmount}|${data.paymentMethod}`,
      materialVerified: true,
      weightVerified: true,
      priceVerified: true,
      handoverConfirmed: true,
      paymentMethod: data.paymentMethod,
      paymentStatus: 'PAID',
    };

    // Save handover
    const handoversRaw = localStorage.getItem(KEYS.HANDOVERS);
    const handovers: HandoverRecord[] = handoversRaw ? JSON.parse(handoversRaw) : [];
    handovers.unshift(handoverRecord);
    localStorage.setItem(KEYS.HANDOVERS, JSON.stringify(handovers));

    // Save transaction in Passbook
    const transaction: PaymentTransaction = {
      id: `TXN-${Date.now()}`,
      lotId: lot.id,
      handoverId: handoverId,
      collectorId: lot.collectorId,
      collectorName: lot.collectorName,
      recyclerId: handoverRecord.recyclerId,
      recyclerName: handoverRecord.recyclerName,
      material: lot.materialCategory,
      weightKg: data.finalWeightKg,
      quotedPrice: lot.estimatedPricePerKg,
      finalPrice: data.finalPricePerKg,
      amountPaid: data.finalTotalAmount,
      paymentMethod: data.paymentMethod,
      paymentStatus: 'PAID',
      date: dateStr,
      timestamp: timestampStr,
    };
    const txns = this.getTransactions();
    txns.unshift(transaction);
    localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(txns));

    // Update lot state & traceability
    lot.status = 'COMPLETED';
    lot.handoverId = handoverId;
    lot.finalWeightKg = data.finalWeightKg;
    lot.finalPricePerKg = data.finalPricePerKg;
    lot.finalTotalAmount = data.finalTotalAmount;
    lot.paymentMethod = data.paymentMethod;
    lot.paymentStatus = 'PAID';
    lot.paymentDate = timestampStr;

    lot.traceability.push({
      id: `tr_ho_${Date.now()}`,
      lotId: lot.id,
      eventType: 'HANDOVER_VERIFIED',
      actorName: handoverRecord.recyclerName,
      actorRole: 'recycler',
      timestamp: timestampStr,
      referenceId: handoverId,
      notes: `Verified weight: ${data.finalWeightKg} kg. Official electronic handover certificate issued.`,
    });

    lot.traceability.push({
      id: `tr_pay_${Date.now()}`,
      lotId: lot.id,
      eventType: 'PAYMENT_RECORDED',
      actorName: handoverRecord.recyclerName,
      actorRole: 'recycler',
      timestamp: timestampStr,
      referenceId: transaction.id,
      notes: `Paid ₹${data.finalTotalAmount} via ${data.paymentMethod}. Transaction complete.`,
    });

    lot.traceability.push({
      id: `tr_comp_${Date.now()}`,
      lotId: lot.id,
      eventType: 'COMPLETED',
      actorName: 'System',
      actorRole: 'system',
      timestamp: timestampStr,
      notes: 'Lifecycle finalized. E-waste transferred to registered recycling facility.',
    });

    this.saveLot(lot, true);

    this.addNotification({
      id: `notif_${Date.now()}`,
      title: 'Payment Received!',
      message: `₹${data.finalTotalAmount} received via ${data.paymentMethod} for lot ${lot.id}. Passbook updated.`,
      timestamp: timestampStr,
      isRead: false,
      type: 'payment',
      targetRole: 'collector',
      relatedLotId: lot.id,
    });

    return handoverRecord;
  }

  // --- TRANSACTIONS & PASSBOOK ---
  public getTransactions(): PaymentTransaction[] {
    const raw = localStorage.getItem(KEYS.TRANSACTIONS);
    return raw ? JSON.parse(raw) : [];
  }

  public getEarningsSummary(): EarningSummary {
    const txns = this.getTransactions();
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Calculate current week start
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    let total = 0;
    let today = 0;
    let thisWeek = 0;
    let thisMonth = 0;
    let cashTotal = 0;
    let digitalTotal = 0;

    txns.forEach((t) => {
      total += t.amountPaid;
      if (t.date === todayStr) {
        today += t.amountPaid;
      }
      const tDate = new Date(t.date);
      if (tDate >= weekAgo) {
        thisWeek += t.amountPaid;
      }
      if (tDate >= monthAgo) {
        thisMonth += t.amountPaid;
      }
      if (t.paymentMethod === 'CASH') {
        cashTotal += t.amountPaid;
      } else {
        digitalTotal += t.amountPaid;
      }
    });

    // Check pending lots with agreed quote
    const lots = this.getLots();
    const pendingLots = lots.filter(
      (l) => l.status === 'QUOTED' || l.status === 'PICKUP_SCHEDULED' || l.status === 'COLLECTED'
    );
    const pendingAmount = pendingLots.reduce((acc, l) => acc + (l.estimatedTotalValue || 0), 0);

    return {
      totalEarnings: total,
      todayEarnings: today,
      thisWeekEarnings: thisWeek,
      thisMonthEarnings: thisMonth,
      pendingPayouts: pendingAmount,
      cashAmount: cashTotal,
      digitalAmount: digitalTotal,
      totalWeightRecycledKg: txns.reduce((acc, t) => acc + t.weightKg, 0),
      transactionCount: txns.length,
    };
  }

  // --- SYNC QUEUE ---
  public getSyncQueue(): SyncQueueItem[] {
    const raw = localStorage.getItem(KEYS.SYNC_QUEUE);
    return raw ? JSON.parse(raw) : [];
  }

  public addToSyncQueue(item: SyncQueueItem) {
    const queue = this.getSyncQueue();
    queue.push(item);
    localStorage.setItem(KEYS.SYNC_QUEUE, JSON.stringify(queue));
  }

  public updateSyncQueueItem(item: SyncQueueItem) {
    const queue = this.getSyncQueue();
    const idx = queue.findIndex((q) => q.id === item.id);
    if (idx >= 0) {
      queue[idx] = item;
      localStorage.setItem(KEYS.SYNC_QUEUE, JSON.stringify(queue));
    }
  }

  public removeSyncQueueItem(id: string) {
    const queue = this.getSyncQueue().filter((q) => q.id !== id);
    localStorage.setItem(KEYS.SYNC_QUEUE, JSON.stringify(queue));
  }

  public clearSyncedQueue() {
    const queue = this.getSyncQueue().filter((q) => q.status !== 'SYNCED');
    localStorage.setItem(KEYS.SYNC_QUEUE, JSON.stringify(queue));
  }

  // --- NOTIFICATIONS ---
  public getNotifications(): AppNotification[] {
    const raw = localStorage.getItem(KEYS.NOTIFICATIONS);
    return raw ? JSON.parse(raw) : [];
  }

  public addNotification(notification: AppNotification) {
    const notifs = this.getNotifications();
    notifs.unshift(notification);
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  }

  public markNotificationRead(id: string) {
    const notifs = this.getNotifications();
    const item = notifs.find((n) => n.id === id);
    if (item) {
      item.isRead = true;
      localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    }
  }

  public resetAllToSeed() {
    localStorage.removeItem(KEYS.INITIALIZED);
    this.ensureInitialized();
  }
}

export const db = new LocalDatabase();
