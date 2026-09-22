import { AppLanguage, MaterialCategory, LotStatus } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  roleKabadiwala: string;
  roleRecycler: string;
  roleAdmin: string;
  selectRole: string;
  selectLanguage: string;
  switchRole: string;
  english: string;
  hindi: string;
  marathi: string;
  
  // Network / Sync
  online: string;
  offline: string;
  syncing: string;
  synced: string;
  syncFailed: string;
  offlineModeNotice: string;
  syncPendingCount: string;
  syncNow: string;
  simulatedOffline: string;
  simulatedOnline: string;

  // Nav
  home: string;
  prices: string;
  myLots: string;
  recyclers: string;
  earnings: string;
  safety: string;
  incomingLots: string;
  offers: string;
  pickups: string;
  transactions: string;
  rates: string;
  profile: string;
  notifications: string;
  settings: string;

  // Collector Home
  todayEarnings: string;
  totalEarnings: string;
  pendingLots: string;
  pickupsPending: string;
  completedTransactions: string;
  createNewLot: string;
  priceBoardSnapshot: string;
  viewAllPrices: string;
  nearbyRecyclers: string;
  safetyAlertTitle: string;
  safetyAlertDesc: string;
  learnSafety: string;
  quickActions: string;
  callHelp: string;

  // Create Lot Flow
  createLotTitle: string;
  step1Photo: string;
  step1Subtitle: string;
  takePhoto: string;
  chooseGallery: string;
  sampleScrapPhoto: string;
  step2Material: string;
  detectedMaterial: string;
  confidence: string;
  manualCorrection: string;
  selectMaterial: string;
  step3Weight: string;
  approxWeightKg: string;
  condition: string;
  quantityUnits: string;
  descriptionNotes: string;
  step4Value: string;
  estimatedPricePerKg: string;
  estimatedTotal: string;
  step5Details: string;
  generatedLotId: string;
  gpsLocation: string;
  gettingLocation: string;
  locationFallback: string;
  step6Confirm: string;
  saveDraft: string;
  submitLot: string;
  lotCreatedSuccess: string;

  // Conditions
  condGood: string;
  condAverage: string;
  condScrap: string;
  condDamaged: string;

  // Price Board
  priceBoardTitle: string;
  currentRates: string;
  historicalRates: string;
  myAreaFilter: string;
  allMaterials: string;
  readAloud: string;
  stopAudio: string;
  trendUp: string;
  trendDown: string;
  trendStable: string;
  lastUpdated: string;
  pricePerKg: string;

  // My Lots
  allFilter: string;
  draftFilter: string;
  quotedFilter: string;
  pickupRequestedFilter: string;
  pickupScheduledFilter: string;
  collectedFilter: string;
  handoverPendingFilter: string;
  completedFilter: string;
  syncPendingFilter: string;
  lotDetails: string;
  traceabilityTimeline: string;
  noLotsFound: string;

  // Recyclers list & details
  findRecyclerTitle: string;
  authorizedBadge: string;
  unverifiedBadge: string;
  cpcbAuthorized: string;
  materialsAccepted: string;
  requestOffer: string;
  requestPickup: string;
  callRecycler: string;
  minWeight: string;
  serviceRadius: string;
  workingHours: string;
  address: string;

  // Offers
  offersTitle: string;
  offeredPrice: string;
  acceptOffer: string;
  rejectOffer: string;
  offerAcceptedNotice: string;
  offerRejectedNotice: string;

  // Pickups
  pickupsTitle: string;
  pickupDate: string;
  pickupSlot: string;
  statusPickupScheduled: string;
  statusPickupRequested: string;
  statusCollected: string;
  cancelPickup: string;

  // Handover
  digitalHandoverTitle: string;
  handoverId: string;
  qrCodeScan: string;
  showToRecycler: string;
  verifyDetails: string;
  finalWeight: string;
  finalAmount: string;
  cashPayment: string;
  upiPayment: string;
  confirmHandover: string;
  handoverSuccess: string;

  // Earnings
  earningsTitle: string;
  todaySummary: string;
  thisWeekSummary: string;
  thisMonthSummary: string;
  pendingPaymentLabel: string;
  passbookTitle: string;
  cashCollected: string;
  digitalCollected: string;

  // Safety
  safetyTitle: string;
  safetySubtitle: string;
  listenGuide: string;
  dos: string;
  donts: string;

  // Recycler Side
  recyclerDashboard: string;
  totalPurchaseVal: string;
  incomingLotsSubtitle: string;
  makeOfferBtn: string;
  enterOfferPrice: string;
  calculateTotal: string;
  sendOfferBtn: string;
  schedulePickupTitle: string;
  scheduleBtn: string;
  markCollectedBtn: string;
  verifyHandoverBtn: string;
  finalWeighingKg: string;
  finalPricePerKgInput: string;
  materialVerifiedCheck: string;
  weightVerifiedCheck: string;
  priceVerifiedCheck: string;
  handoverConfirmedCheck: string;
  recordPaymentBtn: string;
  paymentMethodSelect: string;
  ratesManagementTitle: string;
  updateRateBtn: string;

  // Statuses
  statusDraft: string;
  statusReady: string;
  statusQuoted: string;
  statusHandoverPending: string;
  statusCompleted: string;

  // Extended UI strings for full app localization
  govtRegisteredPortal: string;
  loginConnectingDesc: string;
  scrapCollector: string;
  recyclerUnit: string;
  mobileNumberOrId: string;
  enterMobileOrId: string;
  password: string;
  enterPassword: string;
  loginToDashboard: string;
  demoUsersHelp: string;
  tapToAutoFill: string;
  errorEnterBoth: string;
  welcome: string;
  logout: string;
  signedOut: string;
  backOnline: string;
  youAreOffline: string;
  recordsWaitingSync: string;
  simulatedOfflineEnabled: string;
  addLot: string;
  overview: string;
  browse: string;
  facility: string;
  regulatoryActive: string;

  stepOf: string;
  uploadPhotoGpsTitle: string;
  confirmMaterialWeightTitle: string;
  paymentSettlementTitle: string;
  lotAcceptedMapTitle: string;
  photoAttached: string;
  attachPhoto: string;
  realtimeGpsDetected: string;
  scanningGps: string;
  refresh: string;
  gpsChainOfCustody: string;
  orSelectCommonScrap: string;
  conditionGrade: string;
  totalEstimatedPayout: string;
  officialRate: string;
  guaranteed100: string;
  pickupLocation: string;
  totalPayout: string;
  payoutMethodTitle: string;
  codTitle: string;
  codSubtitle: string;
  recommended: string;
  zeroDeduction: string;
  instantDispatch: string;
  onlineUpiTitle: string;
  onlineUpiSubtitle: string;
  instant: string;
  enterUpiId: string;
  payViaUpi: string;
  confirmCodAndMap: string;
  nextWeightMaterial: string;
  proceedToPayment: string;
  viewLotInMyLots: string;
  pickupCashInstructions: string;
  instruction1: string;
  instruction2: string;
  instruction3: string;

  liveRouteDispatch: string;
  realMapGps: string;
  routeSubtitle: string;
  distance: string;
  eta: string;
  mins: string;
  openStreetMapCarto: string;
  kmAway: string;
  enRouteTo: string;
  callDriver: string;
  copied: string;
  codAmountLabel: string;
  codScaleNotice: string;
  zeroDeductionGuarantee: string;

  awaitingQuotes: string;
  viewDetails: string;
  newLot: string;
  declaredWeight: string;
  estValue: string;
  createdDate: string;
  location: string;
  selectedRecycler: string;
  pickupSlotLabel: string;
  liveRecyclerRoute: string;
  recyclerOfferAvailable: string;
  pendingDecision: string;
  digitalHandoverRecord: string;
  viewQrSlip: string;
  officialWeighSlip: string;
  material: string;
  finalScaleWeight: string;
  finalRatePerKg: string;
  agreedRate: string;
  recyclerOffers: string;
  cleanDismantlingNote: string;
  trend30Days: string;

  authorizedRecyclerPortal: string;
  auditedSourcing: string;
  certifiedLotsPurchased: string;
  traceable100: string;
  incomingScrapLots: string;
  availableToQuote: string;
  scheduledInTransit: string;
  logisticsActive: string;
  pendingHandovers: string;
  awaitingScaleWeigh: string;
  manageBuyingRates: string;
  browseLotsQuote: string;
  centralAdminTitle: string;
  centralAdminDesc: string;
  resetDemoData: string;
  registeredRecyclers: string;
  totalLots: string;
  recyclerCompliance: string;
  traceabilityExplorer: string;
  searchLotPlaceholder: string;
  driverInTransit: string;
  liveGpsTracking: string;
  doorstepPickup: string;
  proposedPickupDate: string;
  notesForCollector: string;
  inspectDetails: string;
  reviseOffer: string;
  statutoryEwasteAuth: string;
  licenseNumber: string;
  regulatingBoard: string;
  validity: string;
  verificationStatus: string;
  activeAudited: string;
  facilityAddress: string;
  contactOfficer: string;
  logistics: string;
  passbookOfficialSlips: string;
  noTransactions: string;
  waitingForOffers: string;
  scheduledVehicles: string;
  verifiedAndSettled: string;
  instantValuationQuotes: string;
  passbook: string;
  allMaterialsAccepted: string;
  doorstepPickupOnly: string;
  govtCertifiedFacilities: string;
  authLicense: string;
  active: string;
  resetSuccess: string;
  milestonesVerified: string;
  validTill: string;
  allStatuses: string;
  allMaterialsFilter: string;
  readyForQuotes: string;
  offersMade: string;
  completedAndPaid: string;
  underLogistics: string;
  scheduledAndInTransit: string;
  pickupRequests: string;
  ratesBroadcastSuccess: string;
  acceptedBadge: string;
  notActivatedBadge: string;
  marketBaseline: string;
  dropOffOnly: string;
  minPickupWeight: string;
  completedSales: string;
  samplePhotoCopper: string;
  samplePhotoPcb: string;
  samplePhotoBattery: string;
  samplePhotoAluminium: string;
  samplePhotoMotors: string;
  samplePhotoComputers: string;

  // Common
  cancel: string;
  save: string;
  confirm: string;
  close: string;
  back: string;
  next: string;
  rupeeSymbol: string;
  kgUnit: string;
  tapToListen: string;

  // New keys for comprehensive full-app coverage
  adminPortal: string;
  cpcbCompliance: string;
  databaseResetSuccess: string;
  authorizedRecyclerCompliance: string;
  lotTraceabilityExplorer: string;
  searchLotsPlaceholder: string;
  collectorName: string;
  materialCategory: string;
  approximateWeight: string;
  lotId: string;
  paymentOnHandover: string;
  paymentMode: string;
  verifications: string;
  collectedLoaded: string;
  weightVerifiedScale: string;
  priceVerifiedAgreed: string;
  paymentComplete: string;
  verifying: string;
  closeReceipt: string;
  totalWeightRecycled: string;
  offerRequested: string;
  accreditationDetails: string;
  registrationNo: string;
  facilityDetails: string;
  pickupAvailable: string;
  directBuyingRates: string;
  verifiedBadge: string;
  scaleWeight: string;
  pickupsScheduled: string;
  acceptedMaterials: string;
  verifiedCertifications: string;
}

export const translations: Record<AppLanguage, Translations> = {
  en: {
    appName: 'KABADI2RECYCLE',
    tagline: 'CONNECT. RECYCLE. EARN.',
    roleKabadiwala: 'KABADIWALA / COLLECTOR',
    roleRecycler: 'AUTHORIZED RECYCLER',
    roleAdmin: 'ADMIN / MANAGEMENT',
    selectRole: 'Select Your Role',
    selectLanguage: 'Choose Language',
    switchRole: 'Switch Role',
    english: 'English',
    hindi: 'हिंदी (Hindi)',
    marathi: 'मराठी (Marathi)',

    online: 'ONLINE',
    offline: 'OFFLINE',
    syncing: 'SYNCING...',
    synced: 'SYNCED',
    syncFailed: 'SYNC FAILED',
    offlineModeNotice: 'Working offline. Records will sync when internet connects.',
    syncPendingCount: 'Records waiting to sync',
    syncNow: 'Sync Now',
    simulatedOffline: 'Simulate Offline',
    simulatedOnline: 'Simulate Online',

    home: 'Home',
    prices: 'Prices',
    myLots: 'My Lots',
    recyclers: 'Recyclers',
    earnings: 'Earnings',
    safety: 'Safety',
    incomingLots: 'Incoming Lots',
    offers: 'Offers',
    pickups: 'Pickups',
    transactions: 'Passbook',
    rates: 'My Rates',
    profile: 'Profile',
    notifications: 'Notifications',
    settings: 'Settings',

    todayEarnings: "Today's Earnings",
    totalEarnings: 'Total Earnings',
    pendingLots: 'Pending Lots',
    pickupsPending: 'Pending Pickups',
    completedTransactions: 'Completed Sales',
    createNewLot: '+ CREATE NEW LOT',
    priceBoardSnapshot: 'Today Market Scrap Rates',
    viewAllPrices: 'View All Prices →',
    nearbyRecyclers: 'Nearby Authorized Recyclers',
    safetyAlertTitle: 'Scrap Safety Reminder',
    safetyAlertDesc: 'Never burn copper cables or smash cathode-ray tubes. Avoid chemical leaks.',
    learnSafety: 'View Safety Guide',
    quickActions: 'Quick Actions',
    callHelp: 'Helpline Assistance',

    createLotTitle: 'Create New E-Waste Lot',
    step1Photo: 'Step 1: Capture Photo',
    step1Subtitle: 'Take a clear photo of your scrap pile or electronic items',
    takePhoto: 'Take Photo',
    chooseGallery: 'Upload Image',
    sampleScrapPhoto: 'Use Demo Scrap Photo',
    step2Material: 'Step 2: Material Type',
    detectedMaterial: 'Detected Category',
    confidence: 'Confidence Match',
    manualCorrection: 'Change Category Manually',
    selectMaterial: 'Select Material',
    step3Weight: 'Step 3: Weight & Condition',
    approxWeightKg: 'Approx Weight (Kilograms)',
    condition: 'Material Condition',
    quantityUnits: 'Quantity / Bundles',
    descriptionNotes: 'Notes (e.g. Copper wiring stripped)',
    step4Value: 'Step 4: Estimated Value',
    estimatedPricePerKg: 'Estimated Rate',
    estimatedTotal: 'Estimated Cash Amount',
    step5Details: 'Step 5: Location & Lot Reference',
    generatedLotId: 'Permanent Lot ID',
    gpsLocation: 'Collection Location',
    gettingLocation: 'Fetching GPS coordinates...',
    locationFallback: 'Dharavi Scrap Yard, Mumbai',
    step6Confirm: 'Step 6: Review & Save',
    saveDraft: 'Save as Draft',
    submitLot: 'Create Lot (Ready to Sell)',
    lotCreatedSuccess: 'Lot saved offline! Ready for recycler quotes.',

    condGood: 'Intact / Complete',
    condAverage: 'Partially Dismantled',
    condScrap: 'Raw Mixed Scrap',
    condDamaged: 'Burnt / Damaged',

    priceBoardTitle: 'E-Waste Market Price Board',
    currentRates: 'Live Buying Rates',
    historicalRates: 'Price Trends (30 Days)',
    myAreaFilter: 'My District / Area',
    allMaterials: 'All Materials',
    readAloud: 'Read Aloud (Voice)',
    stopAudio: 'Stop Voice',
    trendUp: 'Rising',
    trendDown: 'Falling',
    trendStable: 'Stable',
    lastUpdated: 'Updated 2 hrs ago',
    pricePerKg: '/ kg',

    allFilter: 'All',
    draftFilter: 'Draft',
    quotedFilter: 'Offer Received',
    pickupRequestedFilter: 'Pickup Requested',
    pickupScheduledFilter: 'Pickup Scheduled',
    collectedFilter: 'Collected',
    handoverPendingFilter: 'Handover Pending',
    completedFilter: 'Completed',
    syncPendingFilter: 'Sync Pending',
    lotDetails: 'Lot Details',
    traceabilityTimeline: 'Material Traceability Timeline',
    noLotsFound: 'No lots found in this category.',

    findRecyclerTitle: 'Authorized E-Waste Recyclers',
    authorizedBadge: 'GOVT AUTHORIZED (CPCB/SPCB)',
    unverifiedBadge: 'Pending Verification',
    cpcbAuthorized: 'Authorized Facility',
    materialsAccepted: 'Accepted Items',
    requestOffer: 'Request Best Offer',
    requestPickup: 'Request Doorstep Pickup',
    callRecycler: 'Call Directly',
    minWeight: 'Min Pickup Weight',
    serviceRadius: 'Service Radius',
    workingHours: 'Working Hours',
    address: 'Facility Address',

    offersTitle: 'Recycler Price Offers',
    offeredPrice: 'Offered Price',
    acceptOffer: 'Accept Offer & Request Pickup',
    rejectOffer: 'Decline Offer',
    offerAcceptedNotice: 'Offer accepted! Recycler notified for pickup schedule.',
    offerRejectedNotice: 'Offer declined.',

    pickupsTitle: 'Scheduled Pickups',
    pickupDate: 'Scheduled Date',
    pickupSlot: 'Pickup Time Slot',
    statusPickupScheduled: 'Pickup Confirmed',
    statusPickupRequested: 'Pickup Awaiting Confirmation',
    statusCollected: 'Material Picked Up',
    cancelPickup: 'Cancel Pickup',

    digitalHandoverTitle: 'Digital Handover & Receipt',
    handoverId: 'Handover Certificate ID',
    qrCodeScan: 'QR Code for Handover Verification',
    showToRecycler: 'Show this QR code to the authorized recycler agent',
    verifyDetails: 'Verification Checklist',
    finalWeight: 'Final Verified Weight',
    finalAmount: 'Final Cash Payable',
    cashPayment: 'Cash in Hand',
    upiPayment: 'Instant UPI / Bank',
    confirmHandover: 'Confirm Handover & Payment',
    handoverSuccess: 'Handover verified! Payment recorded in Passbook.',

    earningsTitle: 'Collector Earnings & Passbook',
    todaySummary: 'Today',
    thisWeekSummary: 'This Week',
    thisMonthSummary: 'This Month',
    pendingPaymentLabel: 'Pending Payout',
    passbookTitle: 'Transaction History',
    cashCollected: 'Cash Payment Received',
    digitalCollected: 'UPI / Digital Payment',

    safetyTitle: 'E-Waste Safety Manual',
    safetySubtitle: 'Protect your health and the environment while dismantling scrap',
    listenGuide: 'Listen in English',
    dos: 'What you SHOULD do',
    donts: 'What you MUST NOT do',

    recyclerDashboard: 'Recycler Portal',
    totalPurchaseVal: 'Total E-Waste Sourced',
    incomingLotsSubtitle: 'Browse scrap lots available from local collectors',
    makeOfferBtn: 'Make Buying Offer',
    enterOfferPrice: 'Your Price per kg (₹)',
    calculateTotal: 'Total Offer Amount',
    sendOfferBtn: 'Send Offer to Collector',
    schedulePickupTitle: 'Schedule Vehicle Pickup',
    scheduleBtn: 'Confirm Pickup Date',
    markCollectedBtn: 'Mark as Collected from Site',
    verifyHandoverBtn: 'Verify Handover & Weigh',
    finalWeighingKg: 'Final Verified Scale Weight (kg)',
    finalPricePerKgInput: 'Final Agreed Rate / kg (₹)',
    materialVerifiedCheck: 'Material Category & Quality Inspected',
    weightVerifiedCheck: 'Digital Scale Weight Confirmed',
    priceVerifiedCheck: 'Final Price Agreed with Collector',
    handoverConfirmedCheck: 'Official Handover Slip Generated',
    recordPaymentBtn: 'Record Payment & Close Lot',
    paymentMethodSelect: 'Mode of Payment',
    ratesManagementTitle: 'Manage Buying Rates (₹/kg)',
    updateRateBtn: 'Save Rate Updates',

    statusDraft: 'Draft',
    statusReady: 'Ready for Quotes',
    statusQuoted: 'Offer Received',
    statusHandoverPending: 'Ready for Handover',
    statusCompleted: 'Completed & Paid',

    govtRegisteredPortal: 'Government Registered E-Waste Portal',
    loginConnectingDesc: 'Connecting Informal Scrap Collectors Directly With Authorized Recyclers',
    scrapCollector: 'Scrap Collector',
    recyclerUnit: 'Recycler Unit',
    mobileNumberOrId: 'Mobile Number / ID',
    enterMobileOrId: 'Enter mobile number or ID',
    password: 'Password',
    enterPassword: 'Enter password',
    loginToDashboard: 'Login to Dashboard',
    demoUsersHelp: 'Fast Demo Auto-Fill (Tap to Test)',
    tapToAutoFill: 'Tap to autofill & test',
    errorEnterBoth: 'Please enter both your Mobile Number/ID and Password',
    welcome: 'Welcome',
    logout: 'Logout',
    signedOut: 'Signed out of session',
    backOnline: 'Back online! Syncing data...',
    youAreOffline: 'You are offline. Changes will save locally.',
    recordsWaitingSync: 'changes waiting to sync',
    simulatedOfflineEnabled: 'Simulated Offline Mode enabled',
    addLot: 'Add Lot',
    overview: 'Overview',
    browse: 'Browse',
    facility: 'Facility',
    regulatoryActive: 'Regulatory & Compliance Console Active',

    stepOf: 'Step',
    uploadPhotoGpsTitle: 'Upload Photo & Device Location',
    confirmMaterialWeightTitle: 'Confirm Material & Weight',
    paymentSettlementTitle: 'Payment & Settlement Mode',
    lotAcceptedMapTitle: 'Lot Accepted • Live Dispatch Map',
    photoAttached: 'Photo Attached',
    attachPhoto: 'Attach scrap photo',
    realtimeGpsDetected: 'Real-Time Device Location Detected',
    scanningGps: 'Scanning GPS...',
    refresh: 'Refresh',
    gpsChainOfCustody: 'Device coordinates are stamped into digital chain-of-custody for direct recycler pickup.',
    orSelectCommonScrap: 'Or select common electrical scrap:',
    conditionGrade: 'Condition Grade',
    totalEstimatedPayout: 'TOTAL ESTIMATED PAYOUT',
    officialRate: 'Official Rate',
    guaranteed100: '100% Guaranteed',
    pickupLocation: 'Pickup Location',
    totalPayout: 'Total Payout',
    payoutMethodTitle: 'Select Your Payout Settlement Method:',
    codTitle: 'Cash on Delivery (Cash on Pickup)',
    codSubtitle: 'Driver delivers exact cash right at your device location upon digital scale weighing.',
    recommended: 'Recommended',
    zeroDeduction: 'Zero Deduction',
    instantDispatch: 'Instant Lot Acceptance & Vehicle Dispatch',
    onlineUpiTitle: 'Online UPI Bank Transfer',
    onlineUpiSubtitle: 'Direct instant deposit via PhonePe, Google Pay, Paytm, or BHIM UPI.',
    instant: 'Instant',
    enterUpiId: 'Enter Your UPI ID',
    payViaUpi: 'Pay via UPI',
    confirmCodAndMap: 'Confirm Cash on Delivery & View Map',
    nextWeightMaterial: 'Next: Confirm Weight & Material',
    proceedToPayment: 'Proceed to Payment Mode (UPI / Cash)',
    viewLotInMyLots: 'View Lot in My Lots & Track Live',
    pickupCashInstructions: 'Pickup & Cash Handover Instructions',
    instruction1: 'Driver brings calibrated digital weighing scale with verified zero-tare reading.',
    instruction2: 'Exact cash will be counted and handed over immediately.',
    instruction3: 'Digital certificate & CPCB manifest will be updated in your passbook.',

    liveRouteDispatch: 'Live Route & Driver Dispatch',
    realMapGps: 'REAL MAP GPS',
    routeSubtitle: 'Recycler Facility → Your Device Location',
    distance: 'Distance',
    eta: 'ETA',
    mins: 'mins',
    openStreetMapCarto: 'OpenStreetMap Cartography',
    kmAway: 'km away',
    enRouteTo: 'En Route to:',
    callDriver: 'Call Driver',
    copied: 'Copied!',
    codAmountLabel: 'Cash on Delivery Amount:',
    codScaleNotice: 'Verified digital scale weighing at your doorstep before cash handover.',
    zeroDeductionGuarantee: 'Zero Deduction Guarantee',

    awaitingQuotes: 'Awaiting Recycler Quotes',
    viewDetails: 'View Details',
    newLot: 'New Lot',
    declaredWeight: 'Declared Weight',
    estValue: 'Est',
    createdDate: 'Created Date',
    location: 'Location',
    selectedRecycler: 'Selected Recycler',
    pickupSlotLabel: 'Pickup Slot',
    liveRecyclerRoute: 'Live Recycler-to-Device Route',
    recyclerOfferAvailable: 'Recycler Offer Available',
    pendingDecision: 'Pending Decision',
    digitalHandoverRecord: 'Digital Handover Record',
    viewQrSlip: 'View QR Slip',
    officialWeighSlip: 'OFFICIAL WEIGH SLIP',
    material: 'Material',
    finalScaleWeight: 'Final Scale Weight (kg)',
    finalRatePerKg: 'Final Rate / kg (₹)',
    agreedRate: 'Agreed Rate',
    recyclerOffers: 'Recycler Offers',
    cleanDismantlingNote: 'Clean dismantling protects your health and gives higher scrap resale value.',
    trend30Days: '30-Day Historical Trend',

    authorizedRecyclerPortal: 'AUTHORIZED RECYCLER PORTAL',
    auditedSourcing: 'Audited Sourcing',
    certifiedLotsPurchased: 'Certified Lots Purchased',
    traceable100: '100% Traceable',
    incomingScrapLots: 'Incoming Scrap Lots',
    availableToQuote: 'Available to quote →',
    scheduledInTransit: 'Scheduled & In-Transit',
    logisticsActive: 'Logistics active',
    pendingHandovers: 'Pending Handovers',
    awaitingScaleWeigh: 'Awaiting scale weigh',
    manageBuyingRates: 'Manage buying rates →',
    browseLotsQuote: 'Browse Lots & Quote',
    centralAdminTitle: 'Central Regulatory & Admin Desk',
    centralAdminDesc: 'E-Waste rules compliance, recycler licensing & material traceability ledger',
    resetDemoData: 'Reset Demo Data',
    registeredRecyclers: 'Registered Recyclers',
    totalLots: 'Total Lots',
    recyclerCompliance: 'Authorized Recycler Compliance',
    traceabilityExplorer: 'Lot Traceability Explorer',
    searchLotPlaceholder: 'Search Lot ID or material...',
    driverInTransit: 'Driver In-Transit',
    liveGpsTracking: 'Live GPS Dispatch Track',
    doorstepPickup: 'Doorstep Vehicle Pickup',
    proposedPickupDate: 'Proposed Pickup Date',
    notesForCollector: 'Notes for Collector',
    inspectDetails: 'Inspect Details',
    reviseOffer: 'Revise Offer',
    statutoryEwasteAuth: 'Statutory E-Waste Authorization',
    licenseNumber: 'License Number',
    regulatingBoard: 'Regulating Board',
    validity: 'Validity',
    verificationStatus: 'Verification Status',
    activeAudited: 'Active & Audited',
    facilityAddress: 'Facility Address',
    contactOfficer: 'Contact Officer',
    logistics: 'Logistics',
    passbookOfficialSlips: 'Official Digital Slips',
    noTransactions: 'No completed transactions recorded yet.',
    waitingForOffers: 'Waiting for offers',
    scheduledVehicles: 'Scheduled vehicles',
    verifiedAndSettled: 'Verified & Settled',
    instantValuationQuotes: 'Instant Valuation & Quotes',
    passbook: 'Passbook',
    allMaterialsAccepted: 'All Materials Accepted',
    doorstepPickupOnly: 'Doorstep Pickup Only',
    govtCertifiedFacilities: 'Government certified e-waste dismantling & refining facilities',
    authLicense: 'Auth License:',
    active: 'Active',
    resetSuccess: 'Database reset to initial verified state!',
    milestonesVerified: 'Chain-of-custody milestones verified',
    validTill: 'Valid till',
    allStatuses: 'All Statuses',
    allMaterialsFilter: 'All Materials',
    readyForQuotes: 'Ready for Quotes',
    offersMade: 'Offers Made',
    completedAndPaid: 'Completed & Paid',
    underLogistics: 'Under Logistics',
    scheduledAndInTransit: 'Scheduled & In-Transit',
    pickupRequests: 'Pickup Requests',
    ratesBroadcastSuccess: 'Rates updated and broadcast to all local collectors!',
    acceptedBadge: 'Accepted',
    notActivatedBadge: 'Not Activated',
    marketBaseline: 'Market Baseline:',
    dropOffOnly: 'Drop-off only',
    minPickupWeight: 'Min Pickup Weight',
    completedSales: 'Completed Sales',
    samplePhotoCopper: 'Copper Wiring Bundle',
    samplePhotoPcb: 'PCB / Motherboards',
    samplePhotoBattery: 'Lead Inverter Battery',
    samplePhotoAluminium: 'Aluminium Heat Sinks',
    samplePhotoMotors: 'Electric Motors & Stators',
    samplePhotoComputers: 'Server Racks / Towers',

    cancel: 'Cancel',
    save: 'Save',
    confirm: 'Confirm',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    rupeeSymbol: '₹',
    kgUnit: 'kg',
    tapToListen: 'Tap to hear audio',

    adminPortal: 'Central Admin & Regulatory Ledger',
    cpcbCompliance: 'CPCB / SPCB E-Waste Compliance',
    databaseResetSuccess: 'Database reset to seed data successfully!',
    authorizedRecyclerCompliance: 'Authorized Recycler Compliance Registry',
    lotTraceabilityExplorer: 'Lot Traceability Explorer',
    searchLotsPlaceholder: 'Search by Lot ID, Collector, or Material...',
    collectorName: 'Collector',
    materialCategory: 'Material Category',
    approximateWeight: 'Approximate Weight',
    lotId: 'Lot ID',
    paymentOnHandover: 'Payment Handover',
    paymentMode: 'Payment Mode',
    verifications: 'Verifications Required',
    collectedLoaded: 'Material loaded into vehicle',
    weightVerifiedScale: 'Scale weight verified',
    priceVerifiedAgreed: 'Price agreed & finalized',
    paymentComplete: 'Full payment received',
    verifying: 'Verifying...',
    closeReceipt: 'Close Handover Receipt',
    totalWeightRecycled: 'Total Weight Recycled',
    offerRequested: 'Offer Requested',
    accreditationDetails: 'Accreditation Details',
    registrationNo: 'Registration Number',
    facilityDetails: 'Facility Details',
    pickupAvailable: 'Doorstep Pickup',
    directBuyingRates: 'Direct Buying Rates',
    verifiedBadge: 'Verified',
    scaleWeight: 'Declared Weight',
    pickupsScheduled: 'Pickups Scheduled',
    acceptedMaterials: 'Accepted Materials',
    verifiedCertifications: 'Verified Certifications',
  },

  hi: {
    appName: 'कबाड़ी2रीसायकल',
    tagline: 'जुड़ें. रीसायकल करें. कमाएं.',
    roleKabadiwala: 'कबाड़ीवाला / स्क्रैप कलेक्टर',
    roleRecycler: 'अधिकृत रीसायकलर (कंपनियां)',
    roleAdmin: 'प्रबंधन / एडमिन',
    selectRole: 'अपनी भूमिका चुनें',
    selectLanguage: 'भाषा चुनें',
    switchRole: 'भूमिका बदलें',
    english: 'English',
    hindi: 'हिंदी (Hindi)',
    marathi: 'मराठी (Marathi)',

    online: 'ऑनलाइन',
    offline: 'ऑफ़लाइन',
    syncing: 'सिंक हो रहा है...',
    synced: 'सिंक हो गया',
    syncFailed: 'सिंक विफल',
    offlineModeNotice: 'इंटरनेट नहीं है। रिकॉर्ड्स ऑफ़लाइन सहेज लिए गए हैं।',
    syncPendingCount: 'बाकी रिकॉर्ड्स जो सिंक होने हैं',
    syncNow: 'अभी सिंक करें',
    simulatedOffline: 'ऑफ़लाइन मोड देखें',
    simulatedOnline: 'ऑनलाइन मोड देखें',

    home: 'होम',
    prices: 'भाव / रेट',
    myLots: 'मेरे लॉट',
    recyclers: 'रीसायकलर',
    earnings: 'कमाई',
    safety: 'सुरक्षा',
    incomingLots: 'नए लॉट',
    offers: 'ऑफर',
    pickups: 'पिकअप',
    transactions: 'पासबुक',
    rates: 'मेरे रेट',
    profile: 'प्रोफाइल',
    notifications: 'सूचनाएं',
    settings: 'सेटिंग्स',

    todayEarnings: 'आज की कमाई',
    totalEarnings: 'कुल कमाई',
    pendingLots: 'पेंडिंग लॉट',
    pickupsPending: 'बाकी पिकअप',
    completedTransactions: 'पूरे हुए सौदे',
    createNewLot: '+ नया लॉट बनाएं',
    priceBoardSnapshot: 'आज के ई-कचरा मंडी भाव',
    viewAllPrices: 'सभी भाव देखें →',
    nearbyRecyclers: 'नजदीकी अधिकृत रीसायकलर',
    safetyAlertTitle: 'सुरक्षा चेतावनी',
    safetyAlertDesc: 'तांबे के तार कभी न जलाएं। सीआरटी टीवी स्क्रीन को ध्यान से संभालें।',
    learnSafety: 'सुरक्षा नियम देखें',
    quickActions: 'त्वरित कार्य',
    callHelp: 'सहायता हेल्पलाइन',

    createLotTitle: 'नया ई-कचरा लॉट बनाएं',
    step1Photo: 'चरण 1: फोटो खींचें',
    step1Subtitle: 'सामान या कबाड़ के ढेर की साफ़ फोटो लें',
    takePhoto: 'कैमरा चालू करें',
    chooseGallery: 'फोटो चुनें',
    sampleScrapPhoto: 'डेमो कबाड़ फोटो लगाएं',
    step2Material: 'चरण 2: सामान का प्रकार',
    detectedMaterial: 'पहचाना गया सामान',
    confidence: 'मिलान प्रतिशत',
    manualCorrection: 'यदि गलत है तो खुद चुनें',
    selectMaterial: 'सामान चुनें',
    step3Weight: 'चरण 3: वजन और स्थिति',
    approxWeightKg: 'अनुमानित वजन (किलोग्राम)',
    condition: 'सामान की हालत',
    quantityUnits: 'संख्या / बंडल',
    descriptionNotes: 'विवरण (जैसे तार छीला हुआ)',
    step4Value: 'चरण 4: अनुमानित मूल्य',
    estimatedPricePerKg: 'अनुमानित भाव प्रति किलो',
    estimatedTotal: 'कुल अनुमानित रकम',
    step5Details: 'चरण 5: स्थान और लॉट नंबर',
    generatedLotId: 'स्थायी लॉट नंबर',
    gpsLocation: 'कलेक्शन की जगह',
    gettingLocation: 'जीपीएस लोकेशन प्राप्त हो रही है...',
    locationFallback: 'धारावी कबाड़ बाजार, मुंबई',
    step6Confirm: 'चरण 6: जांचें और सहेजें',
    saveDraft: 'ड्राफ्ट सहेजें',
    submitLot: 'लॉट तैयार करें (बेचने हेतु)',
    lotCreatedSuccess: 'लॉट सफलतापूर्वक सहेज लिया गया! ऑफ़लाइन सुरक्षित है।',

    condGood: 'साबुत / पूरी मशीन',
    condAverage: 'आधा खुला हुआ',
    condScrap: 'कटा-फटा कबाड़',
    condDamaged: 'जला या टूटा हुआ',

    priceBoardTitle: 'ई-कचरा बाजार भाव (रेट बोर्ड)',
    currentRates: 'आज के ताज़ा भाव',
    historicalRates: 'पिछले दिनों के भाव',
    myAreaFilter: 'मेरा इलाका',
    allMaterials: 'सभी सामान',
    readAloud: 'आवाज़ में सुनें (बोलकर बताएं)',
    stopAudio: 'आवाज़ बंद करें',
    trendUp: 'बढ़ रहा है',
    trendDown: 'गिर रहा है',
    trendStable: 'स्थिर',
    lastUpdated: '2 घंटे पहले अपडेट हुआ',
    pricePerKg: '/ किलो',

    allFilter: 'सभी',
    draftFilter: 'ड्राफ्ट',
    quotedFilter: 'ऑफर मिला',
    pickupRequestedFilter: 'पिकअप मांगी गई',
    pickupScheduledFilter: 'पिकअप तय',
    collectedFilter: 'गाड़ी में लोड हुआ',
    handoverPendingFilter: 'हैंडओवर बाकी',
    completedFilter: 'सफल सौदा',
    syncPendingFilter: 'सिंक बाकी',
    lotDetails: 'लॉट का पूरा विवरण',
    traceabilityTimeline: 'सामान की पूरी यात्रा (ट्रेसेबिलिटी)',
    noLotsFound: 'इस श्रेणी में कोई लॉट नहीं मिला।',

    findRecyclerTitle: 'सरकारी मान्यता प्राप्त रीसायकलर',
    authorizedBadge: 'सरकारी लाइसेंस प्राप्त (CPCB)',
    unverifiedBadge: 'जांच जारी है',
    cpcbAuthorized: 'अधिकृत रीसायकलर केंद्र',
    materialsAccepted: 'स्वीकार सामान',
    requestOffer: 'भाव (ऑफर) मांगें',
    requestPickup: 'गाड़ी घर/दुकान भेजने को कहें',
    callRecycler: 'सीधा फोन करें',
    minWeight: 'कम से कम वजन',
    serviceRadius: 'सेवा का दायरा',
    workingHours: 'काम के घंटे',
    address: 'फैक्ट्री / केंद्र का पता',

    offersTitle: 'रीसायकलर द्वारा मिले भाव',
    offeredPrice: 'दिया गया भाव',
    acceptOffer: 'ऑफर स्वीकारें और पिकअप मांगें',
    rejectOffer: 'अस्वीकार करें',
    offerAcceptedNotice: 'ऑफर स्वीकार कर लिया गया! रीसायकलर को सूचना भेज दी गई।',
    offerRejectedNotice: 'ऑफर अस्वीकार कर दिया गया।',

    pickupsTitle: 'पिकअप की तारीख व समय',
    pickupDate: 'पिकअप की तारीख',
    pickupSlot: 'समय',
    statusPickupScheduled: 'पिकअप पक्की हुई',
    statusPickupRequested: 'पिकअप का इंतजार',
    statusCollected: 'सामान उठ गया',
    cancelPickup: 'पिकअप रद्द करें',

    digitalHandoverTitle: 'डिजिटल हैंडओवर और रसीद',
    handoverId: 'हैंडओवर रसीद नंबर',
    qrCodeScan: 'सामान सुपुर्दगी क्यूआर कोड',
    showToRecycler: 'यह क्यूआर कोड रीसायकलर कर्मचारी को दिखाएं',
    verifyDetails: 'जांच सूची',
    finalWeight: 'कांटे पर निकला सही वजन',
    finalAmount: 'कुल मिलने वाली रकम',
    cashPayment: 'नकद भुगतान (Cash)',
    upiPayment: 'यूपीआई / ऑनलाइन ट्रांसफर',
    confirmHandover: 'हैंडओवर और पैसे मिलने की पुष्टि करें',
    handoverSuccess: 'सौदा पक्का हुआ! कमाई पासबुक में दर्ज हो गई।',

    earningsTitle: 'कलेक्टर पासबुक और कमाई',
    todaySummary: 'आज',
    thisWeekSummary: 'इस हफ्ते',
    thisMonthSummary: 'इस महीने',
    pendingPaymentLabel: 'बाकी भुगतान',
    passbookTitle: 'लेन-देन का ब्योरा',
    cashCollected: 'नकद मिला',
    digitalCollected: 'ऑनलाइन मिला',

    safetyTitle: 'ई-कचरा सुरक्षा मार्गदर्शिका',
    safetySubtitle: 'कबाड़ अलग करते समय अपनी सेहत और परिवार को सुरक्षित रखें',
    listenGuide: 'हिंदी में सुनें',
    dos: 'क्या करना चाहिए',
    donts: 'क्या कभी न करें',

    recyclerDashboard: 'रीसायकलर डैशबोर्ड',
    totalPurchaseVal: 'कुल खरीदा गया ई-कचरा',
    incomingLotsSubtitle: 'कबाड़ियों द्वारा तैयार नए लॉट देखें',
    makeOfferBtn: 'खरीद भाव (ऑफर) भेजें',
    enterOfferPrice: 'आपका भाव प्रति किलो (₹)',
    calculateTotal: 'कुल रकम',
    sendOfferBtn: 'कलेक्टर को ऑफर भेजें',
    schedulePickupTitle: 'पिकअप गाड़ी तय करें',
    scheduleBtn: 'तारीख पक्की करें',
    markCollectedBtn: 'सामान लोड होने की पुष्टि करें',
    verifyHandoverBtn: 'हैंडओवर व कांटा जांच करें',
    finalWeighingKg: 'कांटे का वजन (किलो)',
    finalPricePerKgInput: 'अंतिम तय भाव प्रति किलो (₹)',
    materialVerifiedCheck: 'सामान की गुणवत्ता जांची गई',
    weightVerifiedCheck: 'कांटे का वजन सही पाया गया',
    priceVerifiedCheck: 'तय रकम कलेक्टर से तय हुई',
    handoverConfirmedCheck: 'सरकारी ट्रांसफर रसीद तैयार हुई',
    recordPaymentBtn: 'भुगतान दर्ज करें और लॉट पूरा करें',
    paymentMethodSelect: 'भुगतान का तरीका',
    ratesManagementTitle: 'खरीद भाव बदलें (₹/किलो)',
    updateRateBtn: 'नया भाव लागू करें',

    statusDraft: 'ड्राफ्ट',
    statusReady: 'बिक्री हेतु तैयार',
    statusQuoted: 'ऑफर मिला',
    statusHandoverPending: 'हैंडओवर बाकी',
    statusCompleted: 'सौदा पूरा हुआ',

    govtRegisteredPortal: 'सरकारी पंजीकृत ई-कचरा पोर्टल',
    loginConnectingDesc: 'कचरा बीनने वाले कबाड़ियों को सीधे अधिकृत रीसायकलर्स से जोड़ना',
    scrapCollector: 'कबाड़ी / स्क्रैप कलेक्टर',
    recyclerUnit: 'अधिकृत रीसायकलर यूनिट',
    mobileNumberOrId: 'मोबाइल नंबर या आईडी',
    enterMobileOrId: 'मोबाइल नंबर या आईडी दर्ज करें',
    password: 'पासवर्ड',
    enterPassword: 'पासवर्ड दर्ज करें',
    loginToDashboard: 'डैशबोर्ड में लॉगिन करें',
    demoUsersHelp: 'तेज़ डेमो ऑटो-फिल (परीक्षण के लिए दबाएं)',
    tapToAutoFill: 'ऑटो-फिल करने के लिए दबाएं',
    errorEnterBoth: 'कृपया अपना मोबाइल नंबर/आईडी और पासवर्ड दोनों दर्ज करें',
    welcome: 'स्वागत है',
    logout: 'लॉगआउट',
    signedOut: 'सत्र से बाहर निकल गए',
    backOnline: 'इंटरनेट चालू हो गया! डेटा सिंक हो रहा है...',
    youAreOffline: 'आप ऑफ़लाइन हैं। डेटा फ़ोन में सुरक्षित रहेगा।',
    recordsWaitingSync: 'रिकॉर्ड सिंक होने बाकी हैं',
    simulatedOfflineEnabled: 'ऑफ़लाइन परीक्षण मोड सक्रिय किया गया',
    addLot: 'लॉट जोड़ें',
    overview: 'विवरण',
    browse: 'खोजें',
    facility: 'फैक्ट्री',
    regulatoryActive: 'सरकारी ई-कचरा निगरानी डेस्क सक्रिय',

    stepOf: 'चरण',
    uploadPhotoGpsTitle: 'फोटो अपलोड और उपकरण लोकेशन',
    confirmMaterialWeightTitle: 'सामग्री और वजन की पुष्टि करें',
    paymentSettlementTitle: 'भुगतान और निपटान माध्यम',
    lotAcceptedMapTitle: 'लॉट स्वीकृत • लाइव डिस्पैच नक्शा',
    photoAttached: 'फोटो संलग्न',
    attachPhoto: 'कचरे की फोटो जोड़ें',
    realtimeGpsDetected: 'सटीक लाइव जीपीएस लोकेशन मिली',
    scanningGps: 'जीपीएस खोजा जा रहा है...',
    refresh: 'ताज़ा करें',
    gpsChainOfCustody: 'रीसायकलर द्वारा सीधे पिकअप के लिए उपकरण के निर्देशांक सरकारी रिकॉर्ड में दर्ज हैं।',
    orSelectCommonScrap: 'या आम बिजली का कचरा चुनें:',
    conditionGrade: 'सामग्री गुणवत्ता ग्रेड',
    totalEstimatedPayout: 'कुल अनुमानित भुगतान',
    officialRate: 'सरकारी मान्यता प्राप्त दर',
    guaranteed100: '100% गारंटीकृत',
    pickupLocation: 'पिकअप का स्थान',
    totalPayout: 'कुल भुगतान',
    payoutMethodTitle: 'भुगतान प्राप्त करने का तरीका चुनें:',
    codTitle: 'कैश ऑन डिलीवरी (पिकअप पर तुरंत नकद)',
    codSubtitle: 'ड्राइवर डिजिटल कांटे पर तौलकर आपकी जगह पर ही पूरा नकद भुगतान करेगा।',
    recommended: 'सुझाया गया',
    zeroDeduction: 'शून्य कटौती',
    instantDispatch: 'तुरंत लॉट स्वीकृति और वाहन रवानगी',
    onlineUpiTitle: 'ऑनलाइन यूपीआई बैंक ट्रांसफर',
    onlineUpiSubtitle: 'PhonePe, Google Pay, Paytm या BHIM UPI द्वारा सीधे बैंक में जमा।',
    instant: 'तुरंत',
    enterUpiId: 'अपनी यूपीआई आईडी दर्ज करें',
    payViaUpi: 'यूपीआई से भुगतान लें',
    confirmCodAndMap: 'कैश ऑन डिलीवरी चुनें और नक्शा देखें',
    nextWeightMaterial: 'आगे: वजन और सामग्री चुनें',
    proceedToPayment: 'भुगतान के तरीके पर जाएं (यूपीआई / नकद)',
    viewLotInMyLots: 'मेरे लॉट में देखें और लाइव ट्रैक करें',
    pickupCashInstructions: 'पिकअप और नकद लेनदेन के निर्देश',
    instruction1: 'ड्राइवर शून्य-रीडिंग सत्यापित प्रमाणित डिजिटल कांटा लाएगा।',
    instruction2: 'कांटे पर वजन होते ही पूरा नकद हाथ में दिया जाएगा।',
    instruction3: 'डिजिटल प्रमाणपत्र और सरकारी ई-कचरा रसीद आपकी पासबुक में जुड़ेगी।',

    liveRouteDispatch: 'लाइव रूट और ड्राइवर रवानगी',
    realMapGps: 'सटीक लाइव जीपीएस',
    routeSubtitle: 'रीसायकलर गोदाम → आपका वर्तमान स्थान',
    distance: 'दूरी',
    eta: 'पहुंचने का समय',
    mins: 'मिनट',
    openStreetMapCarto: 'ओपन-स्ट्रीट-मैप जीपीएस',
    kmAway: 'किमी दूर',
    enRouteTo: 'रास्ते में है ओर:',
    callDriver: 'ड्राइवर को कॉल करें',
    copied: 'कॉपी हो गया!',
    codAmountLabel: 'नकद भुगतान की राशि:',
    codScaleNotice: 'नकद मिलने से पहले आपके सामने डिजिटल कांटे पर तौल की गारंटी।',
    zeroDeductionGuarantee: 'शून्य कटौती गारंटी',

    awaitingQuotes: 'रीसायकलर ऑफर का इंतज़ार',
    viewDetails: 'विवरण देखें',
    newLot: 'नया लॉट',
    declaredWeight: 'घोषित वजन',
    estValue: 'अनुमानित',
    createdDate: 'तारीख',
    location: 'स्थान',
    selectedRecycler: 'चुना हुआ रीसायकलर',
    pickupSlotLabel: 'पिकअप का समय',
    liveRecyclerRoute: 'लाइव वाहन पिकअप रूट',
    recyclerOfferAvailable: 'रीसायकलर का नया भाव उपलब्ध',
    pendingDecision: 'निर्णय बाकी',
    digitalHandoverRecord: 'डिजिटल हस्तांतरण रसीद',
    viewQrSlip: 'क्यूआर रसीद देखें',
    officialWeighSlip: 'सरकारी तौल पर्ची',
    material: 'सामग्री',
    finalScaleWeight: 'अंतिम कांटे का वजन (किलो)',
    finalRatePerKg: 'अंतिम दर / किलो (₹)',
    agreedRate: 'तय दर',
    recyclerOffers: 'रीसायकलर के ऑफर',
    cleanDismantlingNote: 'सुरक्षित डिस्मेंटलिंग आपकी सेहत बचाती है और बेहतर दाम दिलाती है।',
    trend30Days: '30 दिनों का ऐतिहासिक मंडी भाव',

    authorizedRecyclerPortal: 'अधिकृत रीसायकलर पोर्टल',
    auditedSourcing: 'सत्यापित खरीद',
    certifiedLotsPurchased: 'प्रमाणित लॉट खरीदे गए',
    traceable100: '100% ट्रैक करने योग्य',
    incomingScrapLots: 'आने वाले नए स्क्रैप लॉट',
    availableToQuote: 'बोली लगाने हेतु उपलब्ध →',
    scheduledInTransit: 'शेड्यूल और रास्ते में',
    logisticsActive: 'गाड़ी रास्ते में है',
    pendingHandovers: 'लंबित हस्तांतरण',
    awaitingScaleWeigh: 'कांटे पर वजन बाकी',
    manageBuyingRates: 'खरीद भाव बदलें →',
    browseLotsQuote: 'लॉट देखें और बोली लगाएं',
    centralAdminTitle: 'केंद्रीय नियामक और प्रशासनिक डेस्क',
    centralAdminDesc: 'ई-कचरा नियम अनुपालन, लाइसेंस और सामग्री ट्रैकिंग बहीखाता',
    resetDemoData: 'डेमो डेटा रीसेट करें',
    registeredRecyclers: 'पंजीकृत रीसायकलर्स',
    totalLots: 'कुल लॉट्स',
    recyclerCompliance: 'अधिकृत रीसायकलर अनुपालन स्थिति',
    traceabilityExplorer: 'लॉट स्रोत ट्रैकिंग एक्सप्लोरर',
    searchLotPlaceholder: 'लॉट आईडी या सामग्री खोजें...',
    driverInTransit: 'ड्राइवर रास्ते में है',
    liveGpsTracking: 'लाइव जीपीएस वाहन ट्रैकिंग',
    doorstepPickup: 'घर/दुकान पर वाहन पिकअप',
    proposedPickupDate: 'प्रस्तावित पिकअप तिथि',
    notesForCollector: 'कलेक्टर के लिए नोट',
    inspectDetails: 'जांच विवरण',
    reviseOffer: 'ऑफर बदलें',
    statutoryEwasteAuth: 'वैधानिक ई-कचरा प्राधिकरण',
    licenseNumber: 'लाइसेंस संख्या',
    regulatingBoard: 'नियामक बोर्ड',
    validity: 'वैधता',
    verificationStatus: 'सत्यापन स्थिति',
    activeAudited: 'सक्रिय और ऑडिटेड',
    facilityAddress: 'फैक्ट्री का पता',
    contactOfficer: 'संपर्क अधिकारी',
    logistics: 'लॉजिस्टिक्स',
    passbookOfficialSlips: 'सरकारी डिजिटल रसीदें',
    noTransactions: 'अभी तक कोई पूर्ण लेनदेन दर्ज नहीं है।',
    waitingForOffers: 'ऑफर का इंतज़ार',
    scheduledVehicles: 'शेड्यूल वाहन',
    verifiedAndSettled: 'सत्यापित और भुगतान संपन्न',
    instantValuationQuotes: 'तुरंत मूल्यांकन और बोलियां',
    passbook: 'पासबुक',
    allMaterialsAccepted: 'सभी सामग्री स्वीकार्य',
    doorstepPickupOnly: 'केवल द्वार पर पिकअप',
    govtCertifiedFacilities: 'सरकारी प्रमाणित ई-कचरा रीसायकल और शोधन सुविधाएं',
    authLicense: 'प्राधिकरण लाइसेंस:',
    active: 'सक्रिय',
    resetSuccess: 'डेटाबेस को पुनः प्रारंभिक सत्यापित स्थिति में लाया गया!',
    milestonesVerified: 'आधिकारिक डिजिटल मील के पत्थर सत्यापित',
    validTill: 'वैधता तक',
    allStatuses: 'सभी स्थितियां',
    allMaterialsFilter: 'सभी सामग्री',
    readyForQuotes: 'बोली हेतु तैयार',
    offersMade: 'ऑफर भेजे गए',
    completedAndPaid: 'सफल और भुगतान प्राप्त',
    underLogistics: 'लॉजिस्टिक्स में',
    scheduledAndInTransit: 'शेड्यूल और रास्ते में',
    pickupRequests: 'पिकअप अनुरोध',
    ratesBroadcastSuccess: 'नए दर अपडेट होकर सभी स्थानीय कबाड़ियों को भेज दिए गए हैं!',
    acceptedBadge: 'स्वीकृत',
    notActivatedBadge: 'निष्क्रिय',
    marketBaseline: 'मंडी आधार दर:',
    dropOffOnly: 'केवल ड्रॉप-ऑफ',
    minPickupWeight: 'न्यूनतम पिकअप वजन',
    completedSales: 'पूर्ण बिक्री',
    samplePhotoCopper: 'तांबे का तार बंडल',
    samplePhotoPcb: 'पीसीबी / मदरबोर्ड',
    samplePhotoBattery: 'लेड इन्वर्टर बैटरी',
    samplePhotoAluminium: 'एल्युमिनियम हीट सिंक',
    samplePhotoMotors: 'इलेक्ट्रिक मोटर और स्टेटर',
    samplePhotoComputers: 'कंप्यूटर सर्वर टावर',

    cancel: 'रद्द करें',
    save: 'सहेजें',
    confirm: 'पुष्टि करें',
    close: 'बंद करें',
    back: 'पीछे',
    next: 'आगे',
    rupeeSymbol: '₹',
    kgUnit: 'किलो',
    tapToListen: 'सुनने के लिए दबाएं',

    adminPortal: 'केंद्रीय व्यवस्थापक और नियामक खाता',
    cpcbCompliance: 'सीपीसीबी / एसपीसीबी ई-कचरा अनुपालन',
    databaseResetSuccess: 'डेटाबेस सफलतापूर्वक रीसेट किया गया!',
    authorizedRecyclerCompliance: 'अधिकृत रीसायकलर अनुपालन पंजी',
    lotTraceabilityExplorer: 'लॉट ट्रैसेबिलिटी एक्सप्लोरर',
    searchLotsPlaceholder: 'लॉट आईडी, कलेक्टर या सामग्री द्वारा खोजें...',
    collectorName: 'कलेक्टर',
    materialCategory: 'सामग्री श्रेणी',
    approximateWeight: 'अनुमानित वजन',
    lotId: 'लॉट आईडी',
    paymentOnHandover: 'हस्तांतरण भुगतान',
    paymentMode: 'भुगतान का प्रकार',
    verifications: 'सत्यापन आवश्यक',
    collectedLoaded: 'सामग्री वाहन में लोड की गई',
    weightVerifiedScale: 'तराजू वजन सत्यापित',
    priceVerifiedAgreed: 'सहमत दर अंतिम किया',
    paymentComplete: 'पूर्ण भुगतान प्राप्त हुआ',
    verifying: 'सत्यापित कर रहा है...',
    closeReceipt: 'हस्तांतरण रसीद बंद करें',
    totalWeightRecycled: 'कुल पुनर्चक्रित वजन',
    offerRequested: 'ऑफर अनुरोधित',
    accreditationDetails: 'मान्यता विवरण',
    registrationNo: 'पंजीकरण संख्या',
    facilityDetails: 'सुविधा विवरण',
    pickupAvailable: 'घर से उठाव',
    directBuyingRates: 'सीधी खरीद दरें',
    verifiedBadge: 'सत्यापित',
    scaleWeight: 'घोषित वजन',
    pickupsScheduled: 'शेड्यूल किए गए पिकअप',
    acceptedMaterials: 'स्वीकृत सामग्रियां',
    verifiedCertifications: 'सत्यापित प्रमाणपत्र',
  },

  mr: {
    appName: 'कबाडी2रिसायकल',
    tagline: 'जोडा. रिसायकल करा. कमवा.',
    roleKabadiwala: 'कबाडीवाला / भंगार गोळा करणारे',
    roleRecycler: 'अधिकृत रिसायकलर (कंपन्या)',
    roleAdmin: 'प्रशासन / व्यवस्थापन',
    selectRole: 'तुमची भूमिका निवडा',
    selectLanguage: 'भाषा निवडा',
    switchRole: 'भूमिका बदला',
    english: 'English',
    hindi: 'हिंदी (Hindi)',
    marathi: 'मराठी (Marathi)',

    online: 'ऑनलाइन',
    offline: 'ऑफलाइन',
    syncing: 'सिंक होत आहे...',
    synced: 'सिंक झाले',
    syncFailed: 'सिंक अयशस्वी',
    offlineModeNotice: 'इंटरनेट नाही. नोंदी ऑफलाइन साठवल्या आहेत.',
    syncPendingCount: 'सिंक होणे बाकी असलेल्या नोंदी',
    syncNow: 'आता सिंक करा',
    simulatedOffline: 'ऑफलाइन मोड पहा',
    simulatedOnline: 'ऑनलाइन मोड पहा',

    home: 'मुख्यपृष्ठ',
    prices: 'बाजार भाव',
    myLots: 'माझे लॉट्स',
    recyclers: 'रिसायकलर',
    earnings: 'कमाई',
    safety: 'सुरक्षा नियम',
    incomingLots: 'नवीन लॉट्स',
    offers: 'ऑफर',
    pickups: 'पिकअप',
    transactions: 'पासबुक',
    rates: 'माझे दर',
    profile: 'प्रोफाइल',
    notifications: 'सूचना',
    settings: 'सेटिंग्ज',

    todayEarnings: 'आजची कमाई',
    totalEarnings: 'एकूण कमाई',
    pendingLots: 'प्रलंबित लॉट',
    pickupsPending: 'बाकी पिकअप',
    completedTransactions: 'पूर्ण झालेले व्यवहार',
    createNewLot: '+ नवीन लॉट तयार करा',
    priceBoardSnapshot: 'आजचे ई-कचरा बाजार भाव',
    viewAllPrices: 'सर्व भाव पहा →',
    nearbyRecyclers: 'जवळचे अधिकृत रिसायकलर्स',
    safetyAlertTitle: 'सुरक्षा सूचना',
    safetyAlertDesc: 'तांब्याची वायर कधीही जाळू नका. सीआरटी टीव्ही काच फोडू नका.',
    learnSafety: 'सुरक्षा मार्गदर्शिका पहा',
    quickActions: 'जलद कृती',
    callHelp: 'मदत हेल्पलाइन',

    createLotTitle: 'नवीन ई-कचरा लॉट तयार करा',
    step1Photo: 'पायरी १: फोटो काढा',
    step1Subtitle: 'भंगाराचा किंवा साहित्याचा स्पष्ट फोटो काढा',
    takePhoto: 'कॅमेरा सुरू करा',
    chooseGallery: 'गॅलरीतून निवडा',
    sampleScrapPhoto: 'डेमो भंगार फोटो वापरा',
    step2Material: 'पायरी २: साहित्याचा प्रकार',
    detectedMaterial: 'ओळखलेले साहित्य',
    confidence: 'अचूकता टक्केवारी',
    manualCorrection: 'चूक असल्यास स्वतः निवडा',
    selectMaterial: 'साहित्य निवडा',
    step3Weight: 'पायरी ३: वजन आणि स्थिती',
    approxWeightKg: 'अंदाजे वजन (किलोग्रॅम)',
    condition: 'साहित्याची स्थिती',
    quantityUnits: 'नग / गठ्ठे',
    descriptionNotes: 'माहिती (उदा. तांब्याची वायर वेगळी केली)',
    step4Value: 'पायरी ४: अंदाजे किंमत',
    estimatedPricePerKg: 'अंदाजे दर प्रति किलो',
    estimatedTotal: 'एकूण मिळणारी अंदाजे रक्कम',
    step5Details: 'पायरी ५: ठिकाण आणि लॉट क्रमांक',
    generatedLotId: 'कायमस्वरूपी लॉट आयडी',
    gpsLocation: 'संकलन ठिकाण',
    gettingLocation: 'जीपीएस ठिकाण शोधत आहे...',
    locationFallback: 'धारावी भंगार बाजार, मुंबई',
    step6Confirm: 'पायरी ६: तपासा आणि जतन करा',
    saveDraft: 'मसुदा जतन करा',
    submitLot: 'लॉट विक्रीस तयार करा',
    lotCreatedSuccess: 'लॉट सुरक्षितपणे जतन झाला! ऑफलाइन उपलब्ध आहे.',

    condGood: 'अखंड / संपूर्ण मशीन',
    condAverage: 'अर्धे उघडलेले',
    condScrap: 'कच्चे संमिश्र भंगार',
    condDamaged: 'जळालेले किंवा फुटलेले',

    priceBoardTitle: 'ई-कचरा बाजार भाव तक्ता',
    currentRates: 'आजचे थेट दर',
    historicalRates: 'मागील दिवसांचे दर',
    myAreaFilter: 'माझा परिसर',
    allMaterials: 'सर्व साहित्य',
    readAloud: 'आवाजात ऐका (बोलून दाखवा)',
    stopAudio: 'आवाज थांबवा',
    trendUp: 'वाढत आहे',
    trendDown: 'कमी होत आहे',
    trendStable: 'स्थिर',
    lastUpdated: '२ तासांपूर्वी अद्यतनित',
    pricePerKg: '/ किलो',

    allFilter: 'सर्व',
    draftFilter: 'मसुदा',
    quotedFilter: 'ऑफर मिळाली',
    pickupRequestedFilter: 'पिकअप विनंती',
    pickupScheduledFilter: 'पिकअप निश्चित',
    collectedFilter: 'गाडीत भरले',
    handoverPendingFilter: 'हस्तांतरण बाकी',
    completedFilter: 'व्यवहार पूर्ण',
    syncPendingFilter: 'सिंक बाकी',
    lotDetails: 'लॉटचा तपशील',
    traceabilityTimeline: 'साहित्याचा संपूर्ण प्रवास (ट्रेसेबिलिटी)',
    noLotsFound: 'या प्रकारात कोणताही लॉट नाही.',

    findRecyclerTitle: 'शासकीय अधिकृत रिसायकलर्स',
    authorizedBadge: 'शासकीय परवानाधारक (MPCB/CPCB)',
    unverifiedBadge: 'तपासणी सुरू',
    cpcbAuthorized: 'अधिकृत रिसायकलिंग केंद्र',
    materialsAccepted: 'स्वीकारले जाणारे साहित्य',
    requestOffer: 'दर (ऑफर) मागा',
    requestPickup: 'दारात गाडी मागवा',
    callRecycler: 'थेट फोन करा',
    minWeight: 'किमान वजन मर्यादा',
    serviceRadius: 'सेवेचे अंतर',
    workingHours: 'कामाची वेळ',
    address: 'केंद्राचा पत्ता',

    offersTitle: 'रिसायकलरकडून आलेल्या ऑफर्स',
    offeredPrice: 'दिलेला दर',
    acceptOffer: 'ऑफर स्वीकारा आणि गाडी मागवा',
    rejectOffer: 'नाकारा',
    offerAcceptedNotice: 'ऑफर स्वीकारली! रिसायकलरला गाडी पाठवण्याची सूचना दिली.',
    offerRejectedNotice: 'ऑफर नाकारली.',

    pickupsTitle: 'नियोजित पिकअप',
    pickupDate: 'पिकअप दिनांक',
    pickupSlot: 'पिकअप वेळ',
    statusPickupScheduled: 'पिकअप निश्चित झाले',
    statusPickupRequested: 'पिकअप मंजुरी प्रलंबित',
    statusCollected: 'माल घेऊन गेले',
    cancelPickup: 'पिकअप रद्द करा',

    digitalHandoverTitle: 'डिजिटल हस्तांतरण आणि पावती',
    handoverId: 'हस्तांतरण पावती क्रमांक',
    qrCodeScan: 'हस्तांतरण क्यूआर कोड',
    showToRecycler: 'हा क्यूआर कोड रिसायकलरच्या कर्मचाऱ्याला दाखवा',
    verifyDetails: 'तपासणी सूची',
    finalWeight: 'काट्यावर भरलेले अंतिम वजन',
    finalAmount: 'अंतिम मिळणारी रोख रक्कम',
    cashPayment: 'रोख पैसे (Cash)',
    upiPayment: 'यूपीआय / बँक ट्रान्सफर',
    confirmHandover: 'हस्तांतरण आणि पैसे मिळाल्याची खात्री करा',
    handoverSuccess: 'व्यवहार पूर्ण! कमाई पासबुकमध्ये नोंदवली गेली.',

    earningsTitle: 'कबाडी पासबुक आणि कमाई',
    todaySummary: 'आज',
    thisWeekSummary: 'या आठवड्यात',
    thisMonthSummary: 'या महिन्यात',
    pendingPaymentLabel: 'येणे बाकी रक्कम',
    passbookTitle: 'व्यवहार इतिहास',
    cashCollected: 'रोख मिळाले',
    digitalCollected: 'ऑनलाइन मिळाले',

    safetyTitle: 'ई-कचरा सुरक्षा नियमावली',
    safetySubtitle: 'भंगार वेगळे करताना आरोग्य व पर्यावरणाचे रक्षण करा',
    listenGuide: 'मराठीत ऐका',
    dos: 'काय करावे',
    donts: 'काय कधीही करू नये',

    recyclerDashboard: 'रिसायकलर डॅशबोर्ड',
    totalPurchaseVal: 'एकूण खरेदी केलेला ई-कचरा',
    incomingLotsSubtitle: 'कबाडी व्यावसायिकांनी तयार केलेले लॉट्स',
    makeOfferBtn: 'खरेदी दर (ऑफर) पाठवा',
    enterOfferPrice: 'तुमचा दर प्रति किलो (₹)',
    calculateTotal: 'एकूण रक्कम',
    sendOfferBtn: 'कलेक्टरला ऑफर पाठवा',
    schedulePickupTitle: 'पिकअप वाहन निश्चित करा',
    scheduleBtn: 'तारीख निश्चित करा',
    markCollectedBtn: 'माल वाहनात भरल्याची नोंद करा',
    verifyHandoverBtn: 'हस्तांतरण व वजन पडताळणी',
    finalWeighingKg: 'काट्यावरील वजन (किलो)',
    finalPricePerKgInput: 'अंतिम ठरलेला दर / किलो (₹)',
    materialVerifiedCheck: 'साहित्याची गुणवत्ता तपासली',
    weightVerifiedCheck: 'काट्यावरील वजन अचूक आहे',
    priceVerifiedCheck: 'अंतिम रक्कम कबाडी व्यावसायिकाशी मान्य झाली',
    handoverConfirmedCheck: 'अधिकृत हस्तांतरण पावती तयार झाली',
    recordPaymentBtn: 'पेमेंट नोंदवून व्यवहार पूर्ण करा',
    paymentMethodSelect: 'पेमेंटचा प्रकार',
    ratesManagementTitle: 'खरेदी दर व्यवस्थापन (₹/किलो)',
    updateRateBtn: 'नवीन दर लागू करा',

    statusDraft: 'मसुदा',
    statusReady: 'विक्रीसाठी सज्ज',
    statusQuoted: 'ऑफर मिळाली',
    statusHandoverPending: 'हस्तांतरण प्रलंबित',
    statusCompleted: 'व्यवहार पूर्ण',

    govtRegisteredPortal: 'शासकीय नोंदणीकृत ई-कचरा पोर्टल',
    loginConnectingDesc: 'कचरा गोळा करणाऱ्या कबाडी बांधवांना थेट अधिकृत रिसायकलर्सशी जोडणे',
    scrapCollector: 'कबाडी / स्क्रॅप कलेक्टर',
    recyclerUnit: 'अधिकृत रिसायकलिंग युनिट',
    mobileNumberOrId: 'मोबाईल नंबर किंवा आयडी',
    enterMobileOrId: 'मोबाईल नंबर किंवा आयडी टाका',
    password: 'पासवर्ड',
    enterPassword: 'पासवर्ड टाका',
    loginToDashboard: 'डॅशबोर्डमध्ये लॉगिन करा',
    demoUsersHelp: 'डेमो ऑटो-फिल (चाचणीसाठी दाबा)',
    tapToAutoFill: 'ऑटो-फिल करण्यासाठी दाबा',
    errorEnterBoth: 'कृपया तुमचा मोबाईल नंबर/आयडी आणि पासवर्ड दोन्ही टाका',
    welcome: 'स्वागत आहे',
    logout: 'लॉगआउट',
    signedOut: 'सत्रातून बाहेर पडलात',
    backOnline: 'इंटरनेट पुन्हा सुरू! डेटा सिंक होत आहे...',
    youAreOffline: 'तुम्ही ऑफलाइन आहात. बदल फोनमध्ये साठवले जातील.',
    recordsWaitingSync: 'नोंदी सिंक होणे बाकी आहेत',
    simulatedOfflineEnabled: 'ऑफलाइन चाचणी मोड सुरू केला',
    addLot: 'लॉट जोडा',
    overview: 'आढावा',
    browse: 'शोधा',
    facility: 'कारखाना',
    regulatoryActive: 'शासकीय ई-कचरा नियमन डेस्क सुरू',

    stepOf: 'टप्पा',
    uploadPhotoGpsTitle: 'फोटो अपलोड आणि उपकरण स्थान',
    confirmMaterialWeightTitle: 'वस्तू आणि वजनाची खात्री करा',
    paymentSettlementTitle: 'पेमेंट व व्यवहार पद्धत',
    lotAcceptedMapTitle: 'लॉट स्वीकारला • थेट डिस्पॅच नकाशा',
    photoAttached: 'फोटो जोडला',
    attachPhoto: 'भंगाराचा फोटो जोडा',
    realtimeGpsDetected: 'थेट अचूक जीपीएस स्थान मिळाले',
    scanningGps: 'जीपीएस शोधत आहे...',
    refresh: 'ताजे करा',
    gpsChainOfCustody: 'थेट रिसायकलर पिकअपसाठी उपकरणाचे जीपीएस शासकीय नोंदीत सुरक्षित केले आहे.',
    orSelectCommonScrap: 'किंवा नेहमीचे इलेक्ट्रॉनिक भंगार निवडा:',
    conditionGrade: 'वस्तूचा दर्जा (ग्रेड)',
    totalEstimatedPayout: 'एकूण अंदाजे उत्पन्न',
    officialRate: 'शासकीय मान्यताप्राप्त दर',
    guaranteed100: '१००% हमी',
    pickupLocation: 'पिकअपचे ठिकाण',
    totalPayout: 'एकूण पेमेंट',
    payoutMethodTitle: 'पेमेंट मिळण्याची पद्धत निवडा:',
    codTitle: 'कॅश ऑन डिलिव्हरी (पिकअप वेळी रोख रक्कम)',
    codSubtitle: 'काट्यावर मोजून चालक तुमच्या जागेवरच पूर्ण रोख रक्कम सुपूर्द करेल.',
    recommended: 'शिफारस केलेले',
    zeroDeduction: 'शून्य कपात',
    instantDispatch: 'तात्काळ लॉट स्वीकृती आणि वाहन रवानगी',
    onlineUpiTitle: 'ऑनलाइन युपीआय बँक ट्रान्सफर',
    onlineUpiSubtitle: 'PhonePe, Google Pay, Paytm किंवा BHIM UPI द्वारे थेट बँक खात्यात.',
    instant: 'तात्काळ',
    enterUpiId: 'तुमचा युपीआय आयडी टाका',
    payViaUpi: 'युपीआय द्वारे पेमेंट घ्या',
    confirmCodAndMap: 'कॅश ऑन डिलिव्हरी निवडा आणि नकाशा पहा',
    nextWeightMaterial: 'पुढे: वजन आणि वस्तू निश्चित करा',
    proceedToPayment: 'पेमेंट पर्यायाकडे जा (युपीआय / रोख)',
    viewLotInMyLots: 'माझ्या लॉटमध्ये पहा आणि थेट ट्रॅक करा',
    pickupCashInstructions: 'पिकअप आणि रोख रकमेचे नियम',
    instruction1: 'चालक प्रमाणित अचूक डिजिटल वजन काटा सोबत आणेल.',
    instruction2: 'काट्यावर वजन होताच पूर्ण रोख रक्कम त्वरित दिली जाईल.',
    instruction3: 'डिजिटल प्रमाणपत्र आणि शासकीय पावती तुमच्या पासबुकमध्ये जमा होईल.',

    liveRouteDispatch: 'थेट मार्ग आणि वाहन रवानगी',
    realMapGps: 'थेट जीपीएस नकाशा',
    routeSubtitle: 'रिसायकलर गोदामापासून → तुमचे सध्याचे स्थान',
    distance: 'अंतर',
    eta: 'वेळ',
    mins: 'मिनिटे',
    openStreetMapCarto: 'ओपन-स्ट्रीट-मॅप नकाशा',
    kmAway: 'किमी दूर',
    enRouteTo: 'मार्गावर आहे या दिशेने:',
    callDriver: 'चालकाला फोन करा',
    copied: 'कॉपी झाले!',
    codAmountLabel: 'रोख रकमेचे मूल्य:',
    codScaleNotice: 'रोख रक्कम देण्यापूर्वी तुमच्यासमोर डिजिटल काट्यावर वजन करण्याची खात्री.',
    zeroDeductionGuarantee: 'शून्य कपात हमी',

    awaitingQuotes: 'ऑफरची प्रतीक्षा',
    viewDetails: 'तपशील पहा',
    newLot: 'नवीन लॉट',
    declaredWeight: 'नोंदवलेले वजन',
    estValue: 'अंदाजे',
    createdDate: 'तारीख',
    location: 'ठिकाण',
    selectedRecycler: 'निवडलेला रिसायकलर',
    pickupSlotLabel: 'पिकअप वेळ',
    liveRecyclerRoute: 'थेट वाहन पिकअप मार्ग',
    recyclerOfferAvailable: 'नवीन रिसायकलर ऑफर उपलब्ध',
    pendingDecision: 'निर्णय बाकी',
    digitalHandoverRecord: 'डिजिटल हस्तांतरण पावती',
    viewQrSlip: 'क्यूआर पावती पहा',
    officialWeighSlip: 'अधिकृत वजन पावती',
    material: 'वस्तू',
    finalScaleWeight: 'अंतिम काट्यावरील वजन (किलो)',
    finalRatePerKg: 'अंतिम दर / किलो (₹)',
    agreedRate: 'मान्य दर',
    recyclerOffers: 'रिसायकलर ऑफर्स',
    cleanDismantlingNote: 'सुरक्षित विलगीकरण आरोग्याचे रक्षण करते आणि चांगला दर मिळवून देते.',
    trend30Days: '३० दिवसांचा ऐतिहासिक बाजारभाव',

    authorizedRecyclerPortal: 'अधिकृत रिसायकलर पोर्टल',
    auditedSourcing: 'तपासलेली खरेदी',
    certifiedLotsPurchased: 'प्रमाणित लॉट्स खरेदी केले',
    traceable100: '१००% शोधण्यायोग्य',
    incomingScrapLots: 'येणारे नवीन भंगार लॉट्स',
    availableToQuote: 'दर देण्यासाठी उपलब्ध →',
    scheduledInTransit: 'नियोजित आणि मार्गावर',
    logisticsActive: 'गाडी मार्गावर आहे',
    pendingHandovers: 'प्रलंबित हस्तांतरण',
    awaitingScaleWeigh: 'काट्यावर वजन बाकी',
    manageBuyingRates: 'खरेदी दर व्यवस्थापन →',
    browseLotsQuote: 'लॉट्स पहा आणि दर द्या',
    centralAdminTitle: 'केंद्रीय नियामक व प्रशासन डेस्क',
    centralAdminDesc: 'ई-कचरा नियम पूर्तता, परवाना आणि वस्तू ट्रॅकिंग नोंदवही',
    resetDemoData: 'डेमो डेटा पूर्ववत करा',
    registeredRecyclers: 'नोंदणीकृत रिसायकलर्स',
    totalLots: 'एकूण लॉट्स',
    recyclerCompliance: 'अधिकृत रिसायकलर पूर्तता स्थिती',
    traceabilityExplorer: 'लॉट ट्रॅकिंग एक्सप्लोरर',
    searchLotPlaceholder: 'लॉट आयडी किंवा वस्तू शोधा...',
    driverInTransit: 'चालक मार्गावर आहे',
    liveGpsTracking: 'थेट जीपीएस वाहन ट्रॅकिंग',
    doorstepPickup: 'दारात वाहन पिकअप',
    proposedPickupDate: 'प्रस्तावित पिकअप तारीख',
    notesForCollector: 'कलेक्टरसाठी टीप',
    inspectDetails: 'तपशील तपासा',
    reviseOffer: 'ऑफर बदला',
    statutoryEwasteAuth: 'वैधानिक ई-कचरा प्राधिकृतता',
    licenseNumber: 'परवाना क्रमांक',
    regulatingBoard: 'नियामक मंडळ',
    validity: 'वैधता',
    verificationStatus: 'पडताळणी स्थिती',
    activeAudited: 'सक्रिय आणि तपासलेले',
    facilityAddress: 'कारखान्याचा पत्ता',
    contactOfficer: 'संपर्क अधिकारी',
    logistics: 'लॉजिस्टिक्स',
    passbookOfficialSlips: 'अधिकृत डिजिटल पावत्या',
    noTransactions: 'अद्याप कोणतेही पूर्ण झालेले व्यवहार नाहीत.',
    waitingForOffers: 'ऑफरची प्रतीक्षा',
    scheduledVehicles: 'नियोजित वाहने',
    verifiedAndSettled: 'पडताळलेले आणि पूर्ण झालेले',
    instantValuationQuotes: 'तात्काळ मूल्यांकन आणि कोट्स',
    passbook: 'पासबुक',
    allMaterialsAccepted: 'सर्व साहित्य स्वीकार्य',
    doorstepPickupOnly: 'केवळ दारात पिकअप',
    govtCertifiedFacilities: 'शासकीय प्रमाणित ई-कचरा रिसायकलिंग आणि शुद्धीकरण केंद्रे',
    authLicense: 'परवाना क्रमांक:',
    active: 'सक्रिय',
    resetSuccess: 'डेटाबेस पूर्ववत मूळ सत्यापित स्थितीत आला!',
    milestonesVerified: 'अधिकृत डिजिटल टप्पे सत्यापित',
    validTill: 'वैधता पर्यंत',
    allStatuses: 'सर्व स्थिती',
    allMaterialsFilter: 'सर्व साहित्य',
    readyForQuotes: 'दरासाठी तयार',
    offersMade: 'दिलेले ऑफर्स',
    completedAndPaid: 'पूर्ण आणि जमा झाले',
    underLogistics: 'लॉजिस्टिक्स मध्ये',
    scheduledAndInTransit: 'नियोजित आणि मार्गावर',
    pickupRequests: 'पिकअप विनंत्या',
    ratesBroadcastSuccess: 'नवीन दर अपडेट करून सर्व स्थानिक कबाडी बांधवांना पाठवले गेले आहेत!',
    acceptedBadge: 'स्वीकारले',
    notActivatedBadge: 'अक्रिय',
    marketBaseline: 'बाजार आधार दर:',
    dropOffOnly: 'केवळ ड्रॉप-ऑफ',
    minPickupWeight: 'किमान पिकअप वजन',
    completedSales: 'पूर्ण विक्री',
    samplePhotoCopper: 'तांब्याची वायर बंडल',
    samplePhotoPcb: 'पीसीबी / मदरबोर्ड',
    samplePhotoBattery: 'लेड इन्व्हर्टर बॅटरी',
    samplePhotoAluminium: 'ॲल्युमिनियम हीट सिंक',
    samplePhotoMotors: 'इलेक्ट्रिक मोटर्स व स्टेटर्स',
    samplePhotoComputers: 'संगणक सर्व्हर टॉवर',

    cancel: 'रद्द करा',
    save: 'जतन करा',
    confirm: 'खात्री करा',
    close: 'बंद करा',
    back: 'मागे',
    next: 'पुढे',
    rupeeSymbol: '₹',
    kgUnit: 'किलो',
    tapToListen: 'ऐकण्यासाठी दाबा',

    adminPortal: 'केंद्रीय प्रशासक आणि नियामक खाते',
    cpcbCompliance: 'सीपीसीबी / एसपीसीबी ई-कचरा अनुपालन',
    databaseResetSuccess: 'डेटाबेस यशस्वीरित्या रीसेट झाला!',
    authorizedRecyclerCompliance: 'अधिकृत रिसायकलर अनुपालन नोंदवही',
    lotTraceabilityExplorer: 'लॉट ट्रॅकिंग एक्सप्लोरर',
    searchLotsPlaceholder: 'लॉट आयडी, संकलक किंवा साहित्याद्वारे शोधा...',
    collectorName: 'संकलक',
    materialCategory: 'साहित्य श्रेणी',
    approximateWeight: 'अंदाजे वजन',
    lotId: 'लॉट आयडी',
    paymentOnHandover: 'हस्तांतरण देयक',
    paymentMode: 'देयक पद्धत',
    verifications: 'पडताळणी आवश्यक',
    collectedLoaded: 'साहित्य वाहनात भरले',
    weightVerifiedScale: 'वजन काट्यावर पडताळले',
    priceVerifiedAgreed: 'सहमत दर निश्चित',
    paymentComplete: 'पूर्ण देयक मिळाले',
    verifying: 'पडताळणी करत आहे...',
    closeReceipt: 'हस्तांतरण पावती बंद करा',
    totalWeightRecycled: 'एकूण पुनर्प्रक्रिया केलेले वजन',
    offerRequested: 'ऑफर विनंती केली',
    accreditationDetails: 'मान्यता तपशील',
    registrationNo: 'नोंदणी क्रमांक',
    facilityDetails: 'सुविधा तपशील',
    pickupAvailable: 'जागेवरून उचल',
    directBuyingRates: 'थेट खरेदी दर',
    verifiedBadge: 'पडताळलेले',
    scaleWeight: 'नोंदवलेले वजन',
    pickupsScheduled: 'नियोजित उचल',
    acceptedMaterials: 'स्वीकारलेले साहित्य',
    verifiedCertifications: 'पडताळलेली प्रमाणपत्रे',
  },
};

export const materialTranslations: Record<AppLanguage, Record<MaterialCategory, string>> = {
  en: {
    'PCB': 'Printed Circuit Boards (PCB)',
    'Cables': 'Electrical Cables',
    'Copper Cable': 'Pure Copper Wiring',
    'Aluminium': 'Aluminium Scrap / Heat Sinks',
    'Batteries': 'Lead-Acid / Li-Ion Batteries',
    'Motors': 'Electric Motors & Transformers',
    'CRT': 'CRT Television / Monitor Glass',
    'LCD': 'LCD Display Panels',
    'LED': 'LED Screens & Light Boards',
    'Magnetic assemblies': 'Hard Drive Magnets & Coils',
    'Mixed plastics': 'Electronic Plastic Casings',
    'Mobile phones': 'Old / Scrap Smartphones',
    'Computers': 'Desktop Towers & Motherboards',
    'Laptops': 'Old / Defective Laptops',
    'Small appliances': 'Mixers, Irons, Toasters',
    'Other e-waste': 'Assorted Electronic Scrap',
  },
  hi: {
    'PCB': 'पीसीबी सर्किट बोर्ड (हरा बोर्ड)',
    'Cables': 'बिजली के तार और केबल',
    'Copper Cable': 'तांबे का तार (कॉपर केबल)',
    'Aluminium': 'एल्युमिनियम कबाड़ / हीट सिंक',
    'Batteries': 'बैटरी (लेड-एसिड व लिथियम)',
    'Motors': 'बिजली की मोटरें व ट्रांसफार्मर',
    'CRT': 'सीआरटी टीवी और मॉनिटर पिक्चर ट्यूब',
    'LCD': 'एलसीडी स्क्रीन पैनल',
    'LED': 'एलईडी स्क्रीन व लाइट बोर्ड',
    'Magnetic assemblies': 'हार्ड ड्राइव मैग्नेट और कॉइल',
    'Mixed plastics': 'इलेक्ट्रॉनिक प्लास्टिक बॉडी',
    'Mobile phones': 'पुराने मोबाइल फोन',
    'Computers': 'कंप्यूटर सीपीयू व बोर्ड',
    'Laptops': 'पुराने / खराब लैपटॉप',
    'Small appliances': 'छोटे उपकरण (मिक्सर, प्रेस, पंखा)',
    'Other e-waste': 'अन्य मिला-जुला ई-कचरा',
  },
  mr: {
    'PCB': 'पीसीबी सर्किट बोर्ड (हिरवा बोर्ड)',
    'Cables': 'विजेच्या तारा आणि केबल्स',
    'Copper Cable': 'शुद्ध तांब्याची वायर',
    'Aluminium': 'ॲल्युमिनियम भंगार / हीट सिंक',
    'Batteries': 'बॅटऱ्या (लेड-ऍसिड व लिथियम)',
    'Motors': 'इलेक्ट्रिक मोटर्स व ट्रान्सफॉर्मर्स',
    'CRT': 'सीआरटी टीव्ही व मॉनिटर काच',
    'LCD': 'एलसीडी स्क्रीन पॅनेल्स',
    'LED': 'एलईडी स्क्रीन व लाईट बोर्ड',
    'Magnetic assemblies': 'हार्ड ड्राईव्ह मॅग्नेट्स व कॉईल्स',
    'Mixed plastics': 'इलेक्ट्रॉनिक प्लास्टिक बॉडी',
    'Mobile phones': 'जुने मोबाईल फोन्स',
    'Computers': 'संगणक सीपीयू व मदरबोर्ड',
    'Laptops': 'जुने / नादुरुस्त लॅपटॉप्स',
    'Small appliances': 'लहान उपकरणे (मिक्सर, इस्त्री, पंखे)',
    'Other e-waste': 'इतर संमिश्र ई-कचरा',
  },
};
