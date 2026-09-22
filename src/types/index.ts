export type AppRole = 'collector' | 'recycler' | 'admin';
export type UserRole = AppRole;
export type AppLanguage = 'en' | 'hi' | 'mr';

export type SyncState = 'online' | 'offline' | 'syncing' | 'synced' | 'sync_failed';

export type MaterialCategory =
  | 'PCB'
  | 'Cables'
  | 'Copper Cable'
  | 'Aluminium'
  | 'Batteries'
  | 'Motors'
  | 'CRT'
  | 'LCD'
  | 'LED'
  | 'Magnetic assemblies'
  | 'Mixed plastics'
  | 'Mobile phones'
  | 'Computers'
  | 'Laptops'
  | 'Small appliances'
  | 'Other e-waste';

export type LotStatus =
  | 'DRAFT'
  | 'READY'
  | 'QUOTED'
  | 'ACCEPTED'
  | 'PICKUP_REQUESTED'
  | 'PICKUP_SCHEDULED'
  | 'COLLECTED'
  | 'HANDOVER_PENDING'
  | 'COMPLETED';

export type SyncItemStatus = 'PENDING' | 'SYNCED' | 'FAILED';

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  areaName: string;
  city: string;
  state: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  category: MaterialCategory;
  subcategory?: string;
  unit: 'kg' | 'piece' | 'ton';
  basePricePerKg: number;
  priceRange: { min: number; max: number };
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
  hazardLevel: 'low' | 'medium' | 'high';
  icon: string;
  imageUrl?: string;
  recoverySpecs?: string;
  descriptionKey: string;
}

export interface PriceRecord {
  id: string;
  materialCategory: MaterialCategory;
  subcategory: string;
  location: string;
  currentBuyingPrice: number;
  unit: string;
  minOffer: number;
  maxOffer: number;
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
  history: { date: string; price: number }[];
}

export interface RecyclerEntity {
  id: string;
  name: string;
  companyName: string;
  facilityLocation: string;
  coordinates: { latitude: number; longitude: number };
  distanceKm: number;
  isAuthorized: boolean;
  authorizationNumber: string; // e.g. MPCB/EW-REG/2024/048
  authorizingBody: string; // CPCB / MPCB / SPCB
  authorizationExpiry: string;
  contactPerson: string;
  phone: string;
  acceptedMaterials: MaterialCategory[];
  currentRates: Partial<Record<MaterialCategory, number>>;
  pickupAvailable: boolean;
  minPickupWeightKg: number;
  serviceArea: string;
  workingHours: string;
  rating: number;
  verifiedBadges: string[];
}

export interface CollectorEntity {
  id: string; // e.g. KBC-USR-9921
  name: string;
  phone: string;
  area: string;
  city: string;
  preferredLanguage: AppLanguage;
  joinedDate: string;
  totalEarnings: number;
  totalLotsRecycled: number;
}

export interface TraceabilityEvent {
  id: string;
  lotId: string;
  eventType:
    | 'LOT_CREATED'
    | 'MATERIAL_IDENTIFIED'
    | 'PRICE_ESTIMATED'
    | 'RECYCLER_OFFER'
    | 'OFFER_ACCEPTED'
    | 'PICKUP_SCHEDULED'
    | 'COLLECTED'
    | 'HANDOVER_VERIFIED'
    | 'PAYMENT_RECORDED'
    | 'COMPLETED';
  actorName: string;
  actorRole: 'collector' | 'recycler' | 'system';
  timestamp: string;
  location?: string;
  notes?: string;
  referenceId?: string;
}

export interface RecyclerOffer {
  id: string;
  lotId: string;
  recyclerId: string;
  recyclerName: string;
  pricePerKg: number;
  offeredTotal: number;
  pickupAvailable: boolean;
  proposedPickupDate?: string;
  notes?: string;
  createdAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
}

export interface MaterialLot {
  id: string; // e.g. KBC-2026-000102
  collectorId: string;
  collectorName: string;
  collectorPhone: string;
  materialCategory: MaterialCategory;
  detectedConfidence: number; // e.g. 0.92
  isManuallyCorrected: boolean;
  photoUrl: string;
  weightKg: number;
  condition: 'Good' | 'Average' | 'Scrap' | 'Damaged';
  quantity: number;
  description: string;
  estimatedPricePerKg: number;
  estimatedTotalValue: number;
  status: LotStatus;
  location: LocationCoordinates;
  createdAt: string;
  updatedAt: string;
  syncStatus: SyncItemStatus;
  activeOfferId?: string;
  selectedRecyclerId?: string;
  selectedRecyclerName?: string;
  pickupDate?: string;
  pickupSlot?: string;
  pickupNotes?: string;
  handoverId?: string;
  finalWeightKg?: number;
  finalPricePerKg?: number;
  finalTotalAmount?: number;
  paymentMethod?: 'CASH' | 'UPI' | 'BANK_TRANSFER';
  paymentStatus?: 'PENDING' | 'PARTIALLY_PAID' | 'PAID';
  paymentDate?: string;
  traceability: TraceabilityEvent[];
}

export interface HandoverRecord {
  id: string; // e.g. HO-KBC-2026-000102
  lotId: string;
  material: MaterialCategory;
  photoUrl: string;
  declaredWeightKg: number;
  finalWeightKg: number;
  quotedPrice: number;
  finalPrice: number;
  collectionLocation: string;
  handoverLocation: string;
  date: string;
  timestamp: string;
  collectorId: string;
  collectorName: string;
  recyclerId: string;
  recyclerName: string;
  qrPayload: string;
  materialVerified: boolean;
  weightVerified: boolean;
  priceVerified: boolean;
  handoverConfirmed: boolean;
  paymentMethod: 'CASH' | 'UPI' | 'BANK_TRANSFER';
  paymentStatus: 'PENDING' | 'PARTIALLY_PAID' | 'PAID';
}

export interface PaymentTransaction {
  id: string;
  lotId: string;
  handoverId: string;
  collectorId: string;
  collectorName: string;
  recyclerId: string;
  recyclerName: string;
  material: MaterialCategory;
  weightKg: number;
  quotedPrice: number;
  finalPrice: number;
  amountPaid: number;
  paymentMethod: 'CASH' | 'UPI' | 'BANK_TRANSFER';
  paymentStatus: 'PENDING' | 'PARTIALLY_PAID' | 'PAID';
  date: string;
  timestamp: string;
}

export interface EarningSummary {
  totalEarnings: number;
  todayEarnings: number;
  thisWeekEarnings: number;
  thisMonthEarnings: number;
  pendingPayouts: number;
  cashAmount: number;
  digitalAmount: number;
  totalWeightRecycledKg: number;
  transactionCount: number;
}

export interface SafetyTopic {
  id: string;
  category: string;
  titleKey: string;
  icon: string;
  hazardLevel: 'danger' | 'warning' | 'caution';
  dosKey: string[];
  dontsKey: string[];
  audioScriptKey: string;
}

export interface SyncQueueItem {
  id: string;
  entityType: 'LOT' | 'OFFER' | 'PICKUP' | 'HANDOVER' | 'PAYMENT' | 'RATE';
  entityId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  payload: any;
  timestamp: string;
  retryCount: number;
  status: SyncItemStatus;
  errorMessage?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'offer' | 'pickup' | 'handover' | 'payment' | 'sync' | 'safety';
  targetRole: AppRole;
  relatedLotId?: string;
}

export interface AuthUser {
  id: string;
  username: string;
  name: string;
  nameHi?: string;
  role: AppRole;
  phone: string;
  email?: string;
  organization?: string;
  licenseNumber?: string;
  avatarUrl?: string;
  defaultPassword?: string;
}

