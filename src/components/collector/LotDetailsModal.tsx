import React from 'react';
import {
  X,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Truck,
  ArrowRight,
  ShieldCheck,
  Scale,
  CreditCard,
  QrCode as QrIcon,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { MaterialLot, TraceabilityEvent } from '../../types';
import { translations, materialTranslations } from '../../localization/translations';
import { AppLanguage } from '../../types';
import { db } from '../../services/database';
import { RouteMap } from '../common/RouteMap';

interface LotDetailsModalProps {
  lot: MaterialLot;
  language: AppLanguage;
  onClose: () => void;
  onOpenHandover?: (lot: MaterialLot) => void;
  onAcceptOffer?: (offerId: string, lotId: string) => void;
}

export const LotDetailsModal: React.FC<LotDetailsModalProps> = ({
  lot,
  language,
  onClose,
  onOpenHandover,
  onAcceptOffer,
}) => {
  const t = translations[language];
  const offers = db.getOffersForLot(lot.id);
  const activeOffer = offers.find((o) => o.id === lot.activeOfferId) || offers[0];

  const getStatusBadge = (status: MaterialLot['status']) => {
    switch (status) {
      case 'DRAFT':
        return <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-bold">{t.statusDraft}</span>;
      case 'READY':
        return <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-bold">{t.statusReady}</span>;
      case 'QUOTED':
        return <span className="bg-blue-100 text-blue-900 border border-blue-300 px-2.5 py-1 rounded-full text-xs font-bold">{t.statusQuoted}</span>;
      case 'PICKUP_REQUESTED':
        return <span className="bg-blue-100 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-bold">{t.pickupRequests}</span>;
      case 'PICKUP_SCHEDULED':
        return <span className="bg-blue-600 text-white px-2.5 py-1 rounded-full text-xs font-bold">{t.scheduledAndInTransit}</span>;
      case 'COLLECTED':
        return <span className="bg-blue-700 text-white px-2.5 py-1 rounded-full text-xs font-bold">{t.driverInTransit}</span>;
      case 'HANDOVER_PENDING':
        return <span className="bg-blue-100 text-blue-900 border border-blue-300 px-2.5 py-1 rounded-full text-xs font-bold">{t.statusHandoverPending}</span>;
      case 'COMPLETED':
        return <span className="bg-blue-50 text-blue-700 border border-blue-300 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> {t.statusCompleted}</span>;
      default:
        return <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-xs">
      <div className="bg-blue-50/40 w-full max-w-md sm:max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl border border-blue-200 overflow-hidden">
        {/* Header */}
        <div className="bg-white px-5 py-4 border-b border-blue-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-blue-600">{lot.id}</span>
              {getStatusBadge(lot.status)}
            </div>
            <h2 className="text-lg font-bold text-blue-950 mt-0.5">
              {materialTranslations[language][lot.materialCategory] || lot.materialCategory}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-blue-900/60 hover:text-blue-950 hover:bg-blue-50 rounded-full transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* Photo & Basic Details */}
          <div className="bg-white rounded-2xl overflow-hidden border border-blue-200 shadow-xs">
            <div className="relative aspect-16/9 w-full bg-slate-900">
              <img
                src={lot.photoUrl}
                alt="Lot photo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 bg-blue-950/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-lg">
                {t.declaredWeight}: <strong>{lot.weightKg} {t.kgUnit}</strong>
              </div>
              <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2.5 py-1 rounded-lg font-bold">
                {t.estValue}: ₹{lot.estimatedTotalValue.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-4 space-y-2 text-xs text-blue-900/70">
              <div className="flex items-center justify-between">
                <span>{t.createdDate}:</span>
                <span className="font-bold text-blue-950">
                  {new Date(lot.createdAt).toLocaleDateString()} {new Date(lot.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t.location}:</span>
                <span className="font-medium text-blue-950">{lot.location.areaName}</span>
              </div>
              {lot.selectedRecyclerName && (
                <div className="flex items-center justify-between">
                  <span>{t.selectedRecycler}:</span>
                  <span className="font-bold text-blue-600">{lot.selectedRecyclerName}</span>
                </div>
              )}
              {lot.pickupDate && (
                <div className="flex items-center justify-between">
                  <span>{t.pickupSlotLabel}:</span>
                  <span className="font-bold text-blue-700">{lot.pickupDate} ({lot.pickupSlot || 'Morning'})</span>
                </div>
              )}
            </div>
          </div>

          {/* LIVE RECYCLER-TO-DEVICE ROUTE MAP (If Accepted or Scheduled) */}
          {(lot.status === 'ACCEPTED' || lot.status === 'PICKUP_SCHEDULED' || lot.paymentMethod === 'CASH') && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-950 uppercase tracking-wide flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-blue-600" />
                  {t.liveRecyclerRoute}
                </span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  {t.codTitle}
                </span>
              </div>
              <RouteMap
                origin={{
                  latitude: 19.1136,
                  longitude: 72.8697,
                  name: lot.selectedRecyclerName || 'EcoTech Green Refiners Ltd',
                  subtext: 'MIDC Industrial Area, Mumbai',
                }}
                destination={{
                  latitude: lot.location.latitude,
                  longitude: lot.location.longitude,
                  name: lot.location.areaName,
                  subtext: `${lot.location.city}, ${lot.location.state}`,
                }}
                distanceKm={4.8}
                etaMinutes={22}
                codAmount={lot.estimatedTotalValue}
                vehiclePlate="MH-02-EW-9821"
                driverName="Ashok Sharma (Verified MPCB Transporter)"
                driverPhone="+91 98201 55210"
                language={language}
              />
            </div>
          )}

          {/* Action Callout if Offer is Received */}
          {lot.status === 'QUOTED' && activeOffer && (
            <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-950 uppercase">{t.recyclerOfferAvailable}</span>
                <span className="text-xs font-bold bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full">
                  {t.pendingDecision}
                </span>
              </div>
              <div>
                <div className="text-sm font-bold text-blue-950">{activeOffer.recyclerName}</div>
                <div className="text-2xl font-black text-blue-600 mt-0.5">
                  ₹{activeOffer.pricePerKg} <span className="text-xs font-bold text-blue-900/60">/ {t.kgUnit}</span>
                  <span className="text-base font-bold ml-2 text-blue-950">({t.totalPayout}: ₹{activeOffer.offeredTotal})</span>
                </div>
                {activeOffer.notes && (
                  <p className="text-xs text-blue-900/70 mt-1 italic">"{activeOffer.notes}"</p>
                )}
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => onAcceptOffer && onAcceptOffer(activeOffer.id, lot.id)}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {t.acceptOffer}
                </button>
              </div>
            </div>
          )}

          {/* Handover CTA button if Handover Pending or Collected */}
          {(lot.status === 'HANDOVER_PENDING' || lot.status === 'COLLECTED' || lot.status === 'COMPLETED') && (
            <div className="bg-white p-4 rounded-2xl border border-blue-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-blue-900/70 uppercase">{t.digitalHandoverRecord}</div>
                <div className="text-sm font-mono font-bold text-blue-600">
                  {lot.handoverId || `HO-${lot.id}`}
                </div>
              </div>
              <button
                onClick={() => onOpenHandover && onOpenHandover(lot)}
                className="py-2 px-3.5 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-blue-700 cursor-pointer"
              >
                <QrIcon className="w-4 h-4" />
                <span>{t.viewQrSlip}</span>
              </button>
            </div>
          )}

          {/* TRACEABILITY TIMELINE */}
          <div className="bg-white p-4 rounded-2xl border border-blue-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-blue-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                {t.traceabilityTimeline}
              </h3>
              <span className="text-[11px] text-blue-900/70">{t.auditedSourcing}</span>
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
              {lot.traceability.map((event, index) => (
                <div key={event.id || index} className="relative group">
                  {/* Dot */}
                  <span
                    className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white shadow-xs flex items-center justify-center text-[9px] ${
                      index === lot.traceability.length - 1
                        ? 'bg-blue-700 text-white'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    ✓
                  </span>
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-bold text-blue-950">
                        {event.eventType.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] text-blue-900/60">
                        {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="text-[11px] text-blue-900/70 flex items-center gap-1">
                      <span>By: {event.actorName} ({event.actorRole})</span>
                    </div>
                    {event.notes && (
                      <div className="text-xs text-blue-950 mt-0.5 bg-blue-50/60 p-2 rounded-lg border border-blue-200/80">
                        {event.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
