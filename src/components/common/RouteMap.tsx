import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Truck,
  Building,
  Navigation,
  Phone,
  Clock,
  ShieldCheck,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  IndianRupee,
  Layers,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { AppLanguage } from '../../types';
import { translations } from '../../localization/translations';

export interface RoutePoint {
  latitude: number;
  longitude: number;
  name: string;
  subtext?: string;
}

export interface RouteMapProps {
  origin: RoutePoint; // Recycler Facility
  destination: RoutePoint; // Device / Collector Location
  distanceKm: number;
  etaMinutes: number;
  codAmount: number;
  vehiclePlate?: string;
  driverName?: string;
  driverPhone?: string;
  onCallDriver?: () => void;
  className?: string;
  language?: AppLanguage;
}

export const RouteMap: React.FC<RouteMapProps> = ({
  origin,
  destination,
  distanceKm,
  etaMinutes,
  codAmount,
  vehiclePlate = 'MH-02-EW-9821',
  driverName = 'Ashok Sharma (Verified MPCB Transporter)',
  driverPhone = '+91 98201 55210',
  onCallDriver,
  className = '',
  language = 'en',
}) => {
  const t = translations[language];
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const vehicleMarkerRef = useRef<L.Marker | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);

  const [tileStyle, setTileStyle] = useState<'streets' | 'voyager'>('streets');
  const [vehicleProgress, setVehicleProgress] = useState<number>(0.38);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);

  // Generate intermediate road points between origin and destination to mimic realistic roads
  const generateRoadWaypoints = (
    start: RoutePoint,
    end: RoutePoint
  ): [number, number][] => {
    const lat1 = start.latitude;
    const lon1 = start.longitude;
    const lat2 = end.latitude;
    const lon2 = end.longitude;

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    // Intermediate gentle road bends matching urban transit corridors
    const wp1: [number, number] = [lat1 + dLat * 0.22 + dLon * 0.08, lon1 + dLon * 0.22 - dLat * 0.08];
    const wp2: [number, number] = [lat1 + dLat * 0.52 - dLon * 0.06, lon1 + dLon * 0.52 + dLat * 0.06];
    const wp3: [number, number] = [lat1 + dLat * 0.78 + dLon * 0.04, lon1 + dLon * 0.78 - dLat * 0.04];

    return [
      [lat1, lon1],
      wp1,
      wp2,
      wp3,
      [lat2, lon2],
    ];
  };

  const roadWaypoints = generateRoadWaypoints(origin, destination);

  // Calculate current vehicle lat/lon based on progress
  const getVehicleCoordinates = (progress: number): [number, number] => {
    const points = roadWaypoints;
    const totalSegments = points.length - 1;
    const scaled = Math.max(0, Math.min(1, progress)) * totalSegments;
    const index = Math.min(Math.floor(scaled), totalSegments - 1);
    const subProgress = scaled - index;

    const pA = points[index];
    const pB = points[index + 1];

    const lat = pA[0] + (pB[0] - pA[0]) * subProgress;
    const lng = pA[1] + (pB[1] - pA[1]) * subProgress;
    return [lat, lng];
  };

  // Initialize Leaflet Map in pure Light Theme
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up any stale map instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const bounds = L.latLngBounds(
      [origin.latitude, origin.longitude],
      [destination.latitude, destination.longitude]
    );

    // Create Leaflet map instance
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: true,
      touchZoom: true,
      dragging: true,
      doubleClickZoom: true,
    });

    mapInstanceRef.current = map;

    // Crisp Light-Theme Tile Layers
    // Street: OpenStreetMap Standard Light
    // Voyager: CartoDB Voyager Light
    const tileUrl =
      tileStyle === 'streets'
        ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    const attribution =
      tileStyle === 'streets'
        ? '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
        : '&copy; <a href="https://carto.com/" target="_blank" rel="noreferrer">CARTO</a>';

    L.tileLayer(tileUrl, {
      attribution,
      maxZoom: 19,
      minZoom: 3,
    }).addTo(map);

    // Initial bounding fit with padding
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });

    // Custom Origin Marker (Recycler Facility - Blue Pin)
    const originIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
          <div style="background-color: #1e3a8a; color: white; padding: 6px; border-radius: 9999px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2.5px solid white; display: flex; align-items: center; justify-content: center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
              <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
              <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
              <path d="M10 6h4"/>
              <path d="M10 10h4"/>
              <path d="M10 14h4"/>
              <path d="M10 18h4"/>
            </svg>
          </div>
          <div style="background: white; border: 1.5px solid #1e3a8a; color: #1e3a8a; font-weight: 800; font-size: 10px; padding: 2px 7px; border-radius: 6px; white-space: nowrap; margin-top: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
            ${t.recyclerUnit}: ${origin.name.split(' ')[0]}
          </div>
        </div>
      `,
      iconSize: [0, 0],
    });

    const originMarker = L.marker([origin.latitude, origin.longitude], {
      icon: originIcon,
      zIndexOffset: 100,
    }).addTo(map);

    originMarker.bindPopup(`
      <div style="font-family: sans-serif; padding: 4px;">
        <div style="font-size: 11px; font-weight: 800; color: #1e3a8a; text-transform: uppercase;">${t.recyclerUnit}</div>
        <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 2px;">${origin.name}</div>
        <div style="font-size: 11px; color: #475569; margin-top: 2px;">${origin.subtext || t.authorizedBadge}</div>
      </div>
    `);

    // Custom Destination Marker (Device Location - Live Pulsing Blue Pin)
    const destIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
          <div style="position: relative;">
            <div style="position: absolute; inset: -4px; border-radius: 9999px; background-color: #3b82f6; opacity: 0.5; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: relative; background-color: #2563eb; color: white; padding: 6px; border-radius: 9999px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2.5px solid white; display: flex; align-items: center; justify-content: center;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          </div>
          <div style="background: #eff6ff; border: 1.5px solid #2563eb; color: #1e40af; font-weight: 800; font-size: 10px; padding: 2px 7px; border-radius: 6px; white-space: nowrap; margin-top: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 4px;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 9999px; background-color: #3b82f6;"></span>
            ${t.location} GPS
          </div>
        </div>
      `,
      iconSize: [0, 0],
    });

    const destMarker = L.marker([destination.latitude, destination.longitude], {
      icon: destIcon,
      zIndexOffset: 120,
    }).addTo(map);

    destMarker.bindPopup(`
      <div style="font-family: sans-serif; padding: 4px;">
        <div style="font-size: 11px; font-weight: 800; color: #2563eb; text-transform: uppercase;">${t.location}</div>
        <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 2px;">${destination.name}</div>
        <div style="font-size: 11px; color: #475569; margin-top: 2px;">${destination.subtext || t.verifiedBadge}</div>
      </div>
    `);

    // Route Polyline - Clean blue transit route on light map
    // Draw an underlay shadow path for contrast
    L.polyline(roadWaypoints, {
      color: '#93c5fd',
      weight: 8,
      opacity: 0.6,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);

    const polyline = L.polyline(roadWaypoints, {
      color: '#2563eb',
      weight: 5,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round',
      dashArray: '1, 0',
    }).addTo(map);

    routePolylineRef.current = polyline;

    // Moving Vehicle Marker (Transporter Driver)
    const [initLat, initLng] = getVehicleCoordinates(vehicleProgress);
    const vehicleIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%);">
          <div style="background-color: #2563eb; color: white; padding: 7px; border-radius: 12px; box-shadow: 0 4px 12px rgba(37,99,235,0.45); border: 2.5px solid white; display: flex; align-items: center; justify-content: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
              <path d="M15 18H9"/>
              <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
              <circle cx="17" cy="18" r="2"/>
              <circle cx="7" cy="18" r="2"/>
            </svg>
          </div>
          <div style="background: #1e293b; color: white; font-family: monospace; font-weight: 700; font-size: 9px; padding: 1.5px 5px; border-radius: 4px; white-space: nowrap; margin-top: 3px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            ${vehiclePlate}
          </div>
        </div>
      `,
      iconSize: [0, 0],
    });

    const vehicleMarker = L.marker([initLat, initLng], {
      icon: vehicleIcon,
      zIndexOffset: 300,
    }).addTo(map);

    vehicleMarker.bindPopup(`
      <div style="font-family: sans-serif; padding: 4px;">
        <div style="font-size: 11px; font-weight: 800; color: #2563eb; text-transform: uppercase;">${t.verifiedBadge} (${t.scheduledAndInTransit})</div>
        <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 2px;">${driverName}</div>
        <div style="font-size: 11px; color: #475569;">Vehicle: ${vehiclePlate}</div>
        <div style="font-size: 11px; color: #2563eb; font-weight: 700; margin-top: 3px;">${t.codAmountLabel}: ₹${codAmount.toLocaleString('en-IN')}</div>
      </div>
    `);

    vehicleMarkerRef.current = vehicleMarker;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [origin.latitude, origin.longitude, destination.latitude, destination.longitude, tileStyle]);

  // Vehicle progress animation along road
  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(() => {
      setVehicleProgress((prev) => {
        const next = prev + 0.012;
        return next > 0.95 ? 0.15 : next;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isLiveActive]);

  // Update vehicle marker location as vehicle moves
  useEffect(() => {
    if (!vehicleMarkerRef.current) return;
    const [lat, lng] = getVehicleCoordinates(vehicleProgress);
    vehicleMarkerRef.current.setLatLng([lat, lng]);
  }, [vehicleProgress]);

  // Recenter map bounds
  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    const bounds = L.latLngBounds(
      [origin.latitude, origin.longitude],
      [destination.latitude, destination.longitude]
    );
    mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
  };

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(driverPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className={`bg-white rounded-2xl border border-blue-200 shadow-md overflow-hidden flex flex-col ${className}`}>
      {/* Top Telemetry Header - Clean Blue & White Theme */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-xs border border-white/30">
            <Truck className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-100">
                {t.liveRouteDispatch}
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <span className="text-[10px] font-bold text-blue-100">{t.realMapGps}</span>
            </div>
            <h4 className="text-sm font-extrabold text-white">
              {t.routeSubtitle}
            </h4>
          </div>
        </div>

        {/* Telemetry Stats */}
        <div className="flex items-center gap-2">
          <div className="bg-white/15 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-white/25 text-right">
            <div className="text-[9px] font-semibold text-blue-100 uppercase">{t.distance}</div>
            <div className="text-xs sm:text-sm font-black text-white">{distanceKm} km</div>
          </div>
          <div className="bg-white text-blue-800 px-2.5 py-1 rounded-xl shadow-xs text-right">
            <div className="text-[9px] font-bold text-blue-600 uppercase">{t.eta}</div>
            <div className="text-xs sm:text-sm font-black text-blue-950">{etaMinutes} {t.mins}</div>
          </div>
        </div>
      </div>

      {/* Real Map Viewport Container (Light theme) */}
      <div className="relative w-full h-72 sm:h-84 bg-blue-50/30 overflow-hidden isolate">
        {/* Leaflet DOM Node */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Map Style & Zoom Floating Controls (Light Theme) */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-blue-200 shadow-md p-1 flex flex-col gap-1">
            <button
              type="button"
              onClick={handleZoomIn}
              className="w-8 h-8 rounded-lg text-blue-900 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition cursor-pointer"
              title="Zoom In"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="h-px bg-blue-100 w-full" />
            <button
              type="button"
              onClick={handleZoomOut}
              className="w-8 h-8 rounded-lg text-blue-900 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleRecenter}
            className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-xl border border-blue-200 shadow-md text-blue-900 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition cursor-pointer"
            title="Fit Entire Route"
            aria-label="Fit entire route"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setTileStyle((prev) => (prev === 'streets' ? 'voyager' : 'streets'))}
            className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-xl border border-blue-200 shadow-md text-blue-900 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition cursor-pointer"
            title="Toggle Map Tile Style"
            aria-label="Toggle map style"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Route Navigation Badge (Top Left Floating) */}
        <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-blue-200 shadow-md flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-extrabold text-blue-950">
            {t.openStreetMapCarto}
          </span>
          <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
            {distanceKm} {t.kmAway}
          </span>
        </div>

        {/* Driver Tracking Overlay Card (Bottom Floating) */}
        <div className="absolute bottom-3 left-3 right-3 z-10 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-blue-200 shadow-lg flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-blue-950 truncate">
                  {driverName}
                </span>
                <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200">
                  {vehiclePlate}
                </span>
              </div>
              <div className="text-[11px] text-blue-700/80 truncate flex items-center gap-1 mt-0.5">
                <span className="text-blue-600 font-bold">{t.enRouteTo}</span>
                <span className="truncate">{destination.name}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${driverPhone.replace(/\s+/g, '')}`}
              onClick={(e) => {
                if (onCallDriver) {
                  e.preventDefault();
                  onCallDriver();
                }
              }}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer shadow-xs active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t.callDriver}</span>
            </a>
            <button
              type="button"
              onClick={handleCopyPhone}
              className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-medium transition cursor-pointer border border-blue-200"
              title="Copy Phone Number"
            >
              {copiedPhone ? t.copied : driverPhone.slice(-4)}
            </button>
          </div>
        </div>
      </div>

      {/* Cash on Delivery & Inspection Handover Guarantee Banner */}
      <div className="bg-blue-50 px-4 py-3 border-t border-blue-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
            <IndianRupee className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-blue-950">
              {t.codAmountLabel} <span className="text-blue-600">₹{codAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="text-[11px] text-blue-800 font-medium">
              {t.codScaleNotice}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-800 bg-white px-2.5 py-1 rounded-lg border border-blue-200">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>{t.zeroDeductionGuarantee}</span>
        </div>
      </div>
    </div>
  );
};
