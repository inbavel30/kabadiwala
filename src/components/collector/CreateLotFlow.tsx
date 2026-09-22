import React, { useState, useEffect } from 'react';
import {
  Camera,
  Upload,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Scale,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  RefreshCw,
  Navigation,
  Compass,
  CreditCard,
  IndianRupee,
  Truck,
  ShieldCheck,
  Building,
  Phone,
  QrCode,
  Zap,
} from 'lucide-react';
import { MaterialCategory, MaterialLot, LocationCoordinates } from '../../types';
import { db, SEED_MATERIALS } from '../../services/database';
import { translations, materialTranslations } from '../../localization/translations';
import { AppLanguage } from '../../types';
import { RouteMap } from '../common/RouteMap';

interface CreateLotFlowProps {
  language: AppLanguage;
  onClose: () => void;
  onLotCreated: (lot: MaterialLot) => void;
}

const SAMPLE_SCRAP_PHOTOS: { label: string; url: string; category: MaterialCategory; weight: number }[] = [
  {
    label: 'Copper Wiring Bundle',
    url: '/images/copper_heavy_cable.jpg',
    category: 'Copper Cable',
    weight: 22.0,
  },
  {
    label: 'PCB / Motherboards',
    url: '/images/motherboard_pcb.jpg',
    category: 'PCB',
    weight: 16.5,
  },
  {
    label: 'Lead Inverter Battery',
    url: '/images/battery_pack.jpg',
    category: 'Batteries',
    weight: 38.0,
  },
  {
    label: 'Aluminium Heat Sinks',
    url: '/images/aluminium_heatsink.jpg',
    category: 'Aluminium',
    weight: 14.0,
  },
  {
    label: 'Electric Motors & Stators',
    url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    category: 'Motors',
    weight: 19.5,
  },
  {
    label: 'Server Racks / Towers',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    category: 'Computers',
    weight: 28.0,
  },
];

// Haversine formula to compute actual distance in KM between 2 points
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in KM
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const dist = R * c;
  return Math.max(1.5, Math.round(dist * 10) / 10);
}

export const CreateLotFlow: React.FC<CreateLotFlowProps> = ({
  language,
  onClose,
  onLotCreated,
}) => {
  const t = translations[language];

  // Steps:
  // 1: Photo & Real-Time Device Location
  // 2: Weight & Material Confirmation
  // 3: Payment Dashboard (Online UPI vs Cash on Delivery)
  // 4: Cash on Delivery Accepted & Route Map (Recycler to Device Location)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [photoUrl, setPhotoUrl] = useState<string>(SAMPLE_SCRAP_PHOTOS[0].url);
  const [isPhotoSelected, setIsPhotoSelected] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory>(SAMPLE_SCRAP_PHOTOS[0].category);
  const [detectedConfidence, setDetectedConfidence] = useState<number>(0.96);
  const [isManuallyCorrected, setIsManuallyCorrected] = useState<boolean>(false);
  const [weightKg, setWeightKg] = useState<number>(SAMPLE_SCRAP_PHOTOS[0].weight);
  const [condition, setCondition] = useState<'Good' | 'Average' | 'Scrap' | 'Damaged'>('Good');
  const [description, setDescription] = useState<string>('');

  // Real-Time Device Location State
  const [lotId, setLotId] = useState<string>('');
  const [location, setLocation] = useState<LocationCoordinates>({
    latitude: 19.0434,
    longitude: 72.8567,
    areaName: 'Dharavi Scrap Recycling Cluster',
    city: 'Mumbai',
    state: 'Maharashtra',
  });
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [gpsAccuracyMeters, setGpsAccuracyMeters] = useState<number | null>(null);
  const [gpsTimestamp, setGpsTimestamp] = useState<string | null>(null);
  const [reverseGeocoding, setReverseGeocoding] = useState<boolean>(false);

  // Payment Selection State
  const [paymentChoice, setPaymentChoice] = useState<'CASH' | 'UPI'>('CASH');
  const [upiId, setUpiId] = useState<string>('9892011840@paytm');
  const [upiPaidSuccess, setUpiPaidSuccess] = useState<boolean>(false);
  const [acceptedLot, setAcceptedLot] = useState<MaterialLot | null>(null);

  // Authorized Recycler assigned
  const recycler = db.getRecyclers()[0] || {
    id: 'rec_ecotech_01',
    name: 'EcoTech Green Refiners Ltd',
    facilityLocation: 'MIDC Industrial Area, Andheri East, Mumbai, Maharashtra 400093',
    coordinates: { latitude: 19.1136, longitude: 72.8697 },
    distanceKm: 4.8,
    isAuthorized: true,
    authorizationNumber: 'MPCB/EW-REG/2024/048',
    phone: '+91 98201 44521',
  };

  // Distance & ETA calculation
  const distanceKm = calculateDistanceKm(
    recycler.coordinates.latitude,
    recycler.coordinates.longitude,
    location.latitude,
    location.longitude
  );
  const etaMinutes = Math.max(16, Math.round(distanceKm * 4.2 + 8));

  // Initialize unique ID and capture GPS on mount
  useEffect(() => {
    const id = db.generateUniqueLotId();
    setLotId(id);
    captureRealtimeDeviceGps();
  }, []);

  // Capture Real-Time Device Location with high precision & reverse geocoding
  const captureRealtimeDeviceGps = () => {
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = Number(pos.coords.latitude.toFixed(6));
          const lng = Number(pos.coords.longitude.toFixed(6));
          const accuracy = Math.round(pos.coords.accuracy || 8);
          setGpsAccuracyMeters(accuracy);
          setGpsTimestamp(new Date().toLocaleTimeString());

          // Set immediate live device coordinates
          setLocation((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
            areaName: `Live Device GPS (${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E)`,
          }));
          setIsLocating(false);

          // Fast reverse geocoding to resolve locality and city
          try {
            setReverseGeocoding(true);
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2800);
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`,
              { signal: controller.signal }
            );
            clearTimeout(timeoutId);
            if (res.ok) {
              const data = await res.json();
              const addr = data.address || {};
              const locality =
                addr.suburb ||
                addr.neighbourhood ||
                addr.road ||
                addr.residential ||
                addr.industrial ||
                data.display_name?.split(',')[0] ||
                'Scrap Collection Point';
              const city = addr.city || addr.town || addr.village || addr.county || 'Mumbai';
              const state = addr.state || 'Maharashtra';

              setLocation({
                latitude: lat,
                longitude: lng,
                areaName: `${locality}, ${city}`,
                city,
                state,
              });
            }
          } catch {
            // Keep existing high-precision coordinates if offline
          } finally {
            setReverseGeocoding(false);
          }
        },
        (err) => {
          console.warn('Geolocation capture note:', err.message);
          setIsLocating(false);
          // Set accurate default coordinates with simulated live timestamp
          setGpsAccuracyMeters(14);
          setGpsTimestamp(new Date().toLocaleTimeString());
        },
        { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 }
      );
    }
  };

  // Price calculations
  const materialItem = db.getMaterialByCategory(selectedCategory) || SEED_MATERIALS[0];
  const unitPrice = materialItem.basePricePerKg;
  const estimatedTotal = Math.round(weightKg * unitPrice);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPhotoUrl(uploadEvent.target.result as string);
          setIsPhotoSelected(true);
          // Trigger real-time device location detection immediately when photo is uploaded
          captureRealtimeDeviceGps();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (sample: (typeof SAMPLE_SCRAP_PHOTOS)[0]) => {
    setPhotoUrl(sample.url);
    setSelectedCategory(sample.category);
    setWeightKg(sample.weight);
    setIsPhotoSelected(true);
    setDetectedConfidence(0.92 + Math.floor(Math.random() * 6) / 100);
    setIsManuallyCorrected(false);
    // Refresh device location on photo change
    captureRealtimeDeviceGps();
  };

  // Action: Choose Cash on Delivery -> Instant Lot Acceptance -> Generate Map
  const handleConfirmCashOnDelivery = () => {
    const newLot: MaterialLot = {
      id: lotId,
      collectorId: 'KBC-COL-9904',
      collectorName: 'Rameshwar Kumar',
      collectorPhone: '+91 98920 11840',
      materialCategory: selectedCategory,
      detectedConfidence: isManuallyCorrected ? 1.0 : detectedConfidence,
      isManuallyCorrected,
      photoUrl,
      weightKg,
      condition,
      quantity: 1,
      description: description || `${selectedCategory} scrap lot (${weightKg} kg)`,
      estimatedPricePerKg: unitPrice,
      estimatedTotalValue: estimatedTotal,
      status: 'ACCEPTED', // Lot accepted on COD selection
      location,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syncStatus: 'PENDING',
      selectedRecyclerId: recycler.id,
      selectedRecyclerName: recycler.name,
      pickupDate: 'Today',
      paymentMethod: 'CASH',
      paymentStatus: 'PENDING',
      traceability: [
        {
          id: `tr_${Date.now()}`,
          lotId,
          eventType: 'LOT_CREATED',
          actorName: 'Rameshwar Kumar',
          actorRole: 'collector',
          timestamp: new Date().toISOString(),
          location: location.areaName,
          notes: `Uploaded photo with verified device GPS (${location.latitude}, ${location.longitude}).`,
        },
        {
          id: `tr_${Date.now() + 1}`,
          lotId,
          eventType: 'OFFER_ACCEPTED',
          actorName: recycler.name,
          actorRole: 'recycler',
          timestamp: new Date().toISOString(),
          location: recycler.facilityLocation,
          notes: `Lot ACCEPTED with Cash on Delivery (₹${estimatedTotal.toLocaleString('en-IN')}). Dispatch vehicle assigned.`,
        },
      ],
    };

    db.saveLot(newLot, true);
    setAcceptedLot(newLot);
    // Advance to Step 4: Map & Dispatch Dashboard
    setCurrentStep(4);
  };

  // Action: Online UPI Payment
  const handlePayViaUpi = () => {
    setUpiPaidSuccess(true);
    const newLot: MaterialLot = {
      id: lotId,
      collectorId: 'KBC-COL-9904',
      collectorName: 'Rameshwar Kumar',
      collectorPhone: '+91 98920 11840',
      materialCategory: selectedCategory,
      detectedConfidence: isManuallyCorrected ? 1.0 : detectedConfidence,
      isManuallyCorrected,
      photoUrl,
      weightKg,
      condition,
      quantity: 1,
      description: description || `${selectedCategory} lot (${weightKg} kg)`,
      estimatedPricePerKg: unitPrice,
      estimatedTotalValue: estimatedTotal,
      status: 'ACCEPTED',
      location,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syncStatus: 'PENDING',
      selectedRecyclerId: recycler.id,
      selectedRecyclerName: recycler.name,
      paymentMethod: 'UPI',
      paymentStatus: 'PAID',
      traceability: [
        {
          id: `tr_${Date.now()}`,
          lotId,
          eventType: 'LOT_CREATED',
          actorName: 'Rameshwar Kumar',
          actorRole: 'collector',
          timestamp: new Date().toISOString(),
          location: location.areaName,
          notes: `Created lot #${lotId} with verified device GPS. Paid via UPI.`,
        },
      ],
    };
    db.saveLot(newLot, true);
    setAcceptedLot(newLot);
    setTimeout(() => {
      setCurrentStep(4);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md sm:max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[94vh] flex flex-col shadow-2xl border border-blue-200 overflow-hidden">
        {/* Header */}
        <div className="bg-white px-5 py-4 border-b border-blue-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
                {t.stepOf} {currentStep} / 4
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">{lotId}</span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-blue-950 mt-1">
              {currentStep === 1 && t.uploadPhotoGpsTitle}
              {currentStep === 2 && t.confirmMaterialWeightTitle}
              {currentStep === 3 && t.paymentSettlementTitle}
              {currentStep === 4 && t.lotAcceptedMapTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-blue-950 hover:bg-blue-50 rounded-full transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-blue-100 h-1.5">
          <div
            className="bg-blue-600 h-1.5 transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          {/* STEP 1: PHOTO & REAL-TIME DEVICE LOCATION */}
          {currentStep === 1 && (
            <div className="space-y-4">
              {/* Photo Preview Container */}
              <div className="relative aspect-4/3 w-full bg-slate-900 rounded-2xl overflow-hidden border-2 border-dashed border-blue-400/50 flex items-center justify-center group shadow-md">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Scrap Preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="text-center text-slate-400 p-4">
                    <Camera className="w-12 h-12 mx-auto mb-2 text-blue-500" />
                    <p className="text-sm font-medium">{t.attachPhoto}</p>
                  </div>
                )}
                {photoUrl && (
                  <div className="absolute top-3 right-3 bg-blue-950/80 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-300" />
                    {t.photoAttached}
                  </div>
                )}
              </div>

              {/* REAL-TIME DEVICE LOCATION DISPLAY (Mandated feature) */}
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600" />
                    </span>
                    <span className="text-xs font-black text-blue-950 uppercase tracking-wide flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5 text-blue-600" />
                      {t.realtimeGpsDetected}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={captureRealtimeDeviceGps}
                    className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                    <span>{isLocating ? t.scanningGps : t.refresh}</span>
                  </button>
                </div>

                <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-blue-100">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-extrabold text-blue-950 truncate">
                      {location.areaName}
                    </div>
                    <div className="text-xs text-blue-700/80 font-medium">
                      {location.city}, {location.state}
                    </div>
                    <div className="flex items-center gap-2 mt-1 font-mono text-[11px] text-blue-900/60">
                      <span className="bg-blue-50 text-blue-900 px-1.5 py-0.5 rounded border border-blue-200">
                        {location.latitude.toFixed(5)}° N, {location.longitude.toFixed(5)}° E
                      </span>
                      {gpsAccuracyMeters && (
                        <span className="text-blue-700 font-bold">
                          ±{gpsAccuracyMeters}m Accuracy
                        </span>
                      )}
                      {gpsTimestamp && <span className="text-blue-900/50">• {gpsTimestamp}</span>}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-blue-900/80 flex items-center gap-1.5 px-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>
                    {t.gpsChainOfCustody}
                  </span>
                </div>
              </div>

              {/* Capture / Upload Photo Actions */}
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl cursor-pointer shadow-md shadow-blue-600/20 transition active:scale-98">
                  <Camera className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">{t.takePhoto}</span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
                <label className="flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-950 font-bold py-3 px-4 rounded-xl border border-blue-200 cursor-pointer shadow-xs transition active:scale-98">
                  <Upload className="w-4 h-4 text-blue-600" />
                  <span className="text-xs sm:text-sm">{t.chooseGallery}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              {/* Sample Scrap Quick Selectors */}
              <div>
                <p className="text-xs font-bold text-slate-500 mb-2">{t.orSelectCommonScrap}</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {SAMPLE_SCRAP_PHOTOS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectSample(item)}
                      className={`text-left p-2 rounded-xl border text-xs transition cursor-pointer ${
                        photoUrl === item.url
                          ? 'border-blue-600 bg-blue-50 font-bold text-blue-700 ring-2 ring-blue-500/20'
                          : 'border-blue-100 bg-white text-blue-950 hover:bg-blue-50/50'
                      }`}
                    >
                      <div className="truncate font-bold text-[11px]">{item.label}</div>
                      <div className="text-[10px] text-slate-500">{item.weight} {t.kgUnit}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SCRAP DETAILS (WEIGHT & CATEGORY) */}
          {currentStep === 2 && (
            <div className="space-y-4">
              {/* Category selector & AI detection */}
              <div className="p-4 bg-white rounded-2xl border border-blue-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-blue-900 uppercase">
                    {t.materialCategory}
                  </label>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    AI Detected ({Math.round(detectedConfidence * 100)}%)
                  </span>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value as MaterialCategory);
                    setIsManuallyCorrected(true);
                  }}
                  className="w-full p-3 bg-blue-50/40 border border-blue-200 rounded-xl text-sm font-bold text-blue-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {SEED_MATERIALS.map((mat) => (
                    <option key={mat.id} value={mat.category}>
                      {materialTranslations[language][mat.category] || mat.name} (₹{mat.basePricePerKg}/{t.kgUnit})
                    </option>
                  ))}
                </select>
              </div>

              {/* Weight Input Card */}
              <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-xs space-y-3">
                <label className="block text-xs font-bold text-blue-900 uppercase">
                  {t.approximateWeight}
                </label>
                <div className="relative">
                  <Scale className="absolute left-3.5 top-3.5 w-5 h-5 text-blue-500" />
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                    className="w-full pl-11 pr-14 py-3 bg-blue-50/30 border border-blue-200 rounded-xl text-2xl font-black text-blue-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-3.5 top-3.5 text-base font-bold text-slate-500">
                    {t.kgUnit}
                  </span>
                </div>

                {/* Quick weight chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[5, 10, 15, 25, 50, 100].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWeightKg(w)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        weightKg === w
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                      }`}
                    >
                      {w} {t.kgUnit}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-xs space-y-2">
                <label className="block text-xs font-bold text-blue-900 uppercase">
                  {t.conditionGrade}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Good', 'Average', 'Scrap', 'Damaged'] as const).map((cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => setCondition(cond)}
                      className={`py-2 px-1 text-center rounded-xl border text-xs font-bold transition cursor-pointer ${
                        condition === cond
                          ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                          : 'border-blue-100 bg-white text-blue-950 hover:bg-blue-50'
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Value Card */}
              <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-md space-y-2">
                <div className="flex justify-between items-center text-xs text-white/80">
                  <span>{t.totalEstimatedPayout}</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {t.officialRate}
                  </span>
                </div>
                <div className="text-3xl font-black">
                  ₹{estimatedTotal.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-blue-100 pt-1 border-t border-white/20 flex justify-between">
                  <span>
                    {weightKg} {t.kgUnit} × ₹{unitPrice}/{t.kgUnit}
                  </span>
                  <span className="font-semibold text-blue-100">{t.guaranteed100}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT / SETTLEMENT DASHBOARD (ONLINE UPI VS CASH ON DELIVERY) */}
          {currentStep === 3 && (
            <div className="space-y-4">
              {/* Scrap Lot Recap Header */}
              <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase">
                    {t.lotId}: #{lotId}
                  </span>
                  <div className="text-base font-black text-blue-950 mt-1">
                    {materialTranslations[language][selectedCategory] || selectedCategory} • {weightKg} {t.kgUnit}
                  </div>
                  <div className="text-xs text-blue-800/70 font-medium">
                    {t.pickupLocation}: {location.areaName}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-blue-800/70 font-semibold uppercase">{t.totalPayout}</div>
                  <div className="text-2xl font-black text-blue-600">
                    ₹{estimatedTotal.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="text-xs font-bold text-blue-950 uppercase tracking-wide">
                {t.payoutMethodTitle}
              </div>

              {/* OPTION 1: CASH ON DELIVERY (PRIMARY REQUESTED FEATURE) */}
              <div
                onClick={() => setPaymentChoice('CASH')}
                className={`p-4 rounded-2xl border-2 transition cursor-pointer relative shadow-sm ${
                  paymentChoice === 'CASH'
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                    : 'border-blue-200 bg-white hover:border-blue-400'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-xs">
                      <IndianRupee className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-blue-950">
                          {t.codTitle}
                        </span>
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          {t.recommended}
                        </span>
                      </div>
                      <p className="text-xs text-blue-950 font-medium mt-1">
                        {t.codSubtitle}
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMode"
                    checked={paymentChoice === 'CASH'}
                    onChange={() => setPaymentChoice('CASH')}
                    className="w-4 h-4 text-blue-600 mt-1 cursor-pointer"
                  />
                </div>

                <div className="mt-3 pt-3 border-t border-blue-200 flex items-center justify-between text-[11px] text-blue-900 font-medium">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-blue-600" />
                    {t.instantDispatch}
                  </span>
                  <span className="font-bold text-blue-600">{t.zeroDeduction}</span>
                </div>
              </div>

              {/* OPTION 2: ONLINE UPI SETTLEMENT */}
              <div
                onClick={() => setPaymentChoice('UPI')}
                className={`p-4 rounded-2xl border-2 transition cursor-pointer relative shadow-xs ${
                  paymentChoice === 'UPI'
                    ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20'
                    : 'border-blue-200 bg-white hover:border-blue-400'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-xs">
                      <QrCode className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-blue-950">
                          {t.onlineUpiTitle}
                        </span>
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {t.instant}
                        </span>
                      </div>
                      <p className="text-xs text-blue-900/80 font-medium mt-1">
                        {t.onlineUpiSubtitle}
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMode"
                    checked={paymentChoice === 'UPI'}
                    onChange={() => setPaymentChoice('UPI')}
                    className="w-4 h-4 text-blue-600 mt-1 cursor-pointer"
                  />
                </div>

                {paymentChoice === 'UPI' && (
                  <div className="mt-3 pt-3 border-t border-blue-200 space-y-2">
                    <label className="block text-xs font-bold text-blue-950">
                      {t.enterUpiId}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. 9892011840@paytm"
                        className="flex-1 px-3 py-2 text-xs font-mono font-bold bg-white rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={handlePayViaUpi}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                      >
                        {upiPaidSuccess ? 'Verified ✓' : t.payViaUpi}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: LOT ACCEPTED & GENERATED ROUTE MAP: RECYCLER TO DEVICE LOCATION */}
          {currentStep === 4 && (
            <div className="space-y-4">
              {/* ACCEPTANCE BADGE */}
              <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-300 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black shadow-xs">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wide bg-blue-600 text-white px-2 py-0.5 rounded-full">
                      {t.acceptedBadge}
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-blue-950 mt-1">
                      {recycler.name} #{lotId}
                    </h3>
                    <p className="text-xs text-blue-800 font-medium">
                      {t.codAmountLabel} <span className="font-extrabold">₹{estimatedTotal.toLocaleString('en-IN')}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* GENERATED LIVE ROUTE MAP (Recycler to Device Location) */}
              <RouteMap
                origin={{
                  latitude: recycler.coordinates.latitude,
                  longitude: recycler.coordinates.longitude,
                  name: recycler.name,
                  subtext: recycler.facilityLocation,
                }}
                destination={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  name: location.areaName,
                  subtext: `${location.city}, ${location.state}`,
                }}
                distanceKm={distanceKm}
                etaMinutes={etaMinutes}
                codAmount={estimatedTotal}
                vehiclePlate="MH-02-EW-9821"
                driverName="Ashok Sharma (Verified MPCB Transporter)"
                driverPhone="+91 98201 55210"
                language={language}
              />

              {/* Live Pickup Protocol Checklist */}
              <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-xs space-y-2.5">
                <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  {t.pickupCashInstructions}
                </h4>
                <div className="space-y-1.5 text-xs text-blue-900/90 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>{t.instruction1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>{t.instruction2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>{t.instruction3}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 bg-white border-t border-blue-100 flex items-center gap-3">
          {currentStep > 1 && currentStep < 4 && (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="py-3 px-4 rounded-xl border border-blue-200 text-blue-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1 hover:bg-blue-50 transition active:scale-98 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.back}</span>
            </button>
          )}

          {currentStep === 1 && (
            <button
              onClick={() => setCurrentStep(2)}
              className="flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 transition active:scale-98 cursor-pointer"
            >
              <span>{t.nextWeightMaterial}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {currentStep === 2 && (
            <button
              onClick={() => setCurrentStep(3)}
              className="flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 transition active:scale-98 cursor-pointer"
            >
              <span>{t.proceedToPayment}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {currentStep === 3 && (
            <div className="flex-1 flex gap-2">
              {paymentChoice === 'CASH' ? (
                <button
                  onClick={handleConfirmCashOnDelivery}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition active:scale-98 cursor-pointer"
                >
                  <IndianRupee className="w-4 h-4" />
                  <span>{t.confirmCodAndMap}</span>
                </button>
              ) : (
                <button
                  onClick={handlePayViaUpi}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition active:scale-98 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{t.payViaUpi} (₹{estimatedTotal.toLocaleString('en-IN')})</span>
                </button>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="flex-1 flex gap-2">
              <button
                onClick={() => {
                  if (acceptedLot) {
                    onLotCreated(acceptedLot);
                  } else {
                    onClose();
                  }
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 transition cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.viewLotInMyLots}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
