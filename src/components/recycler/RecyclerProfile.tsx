import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  MapPin,
  Phone,
  Clock,
  Truck,
  Award,
  Calendar,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { RecyclerEntity } from '../../types';
import { translations } from '../../localization/translations';
import { AppLanguage } from '../../types';

interface RecyclerProfileProps {
  language: AppLanguage;
  recycler: RecyclerEntity;
}

export const RecyclerProfile: React.FC<RecyclerProfileProps> = ({ language, recycler }) => {
  const t = translations[language];

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto space-y-4 pb-20">
      {/* Profile Card */}
      <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl border border-blue-200">
            <Building className="w-7 h-7" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              {t.authorizedBadge}
            </div>
            <h1 className="text-lg font-extrabold text-blue-950 mt-0.5">{recycler.name}</h1>
            <p className="text-xs text-blue-900/70">{recycler.companyName}</p>
          </div>
        </div>

        {/* Official Statutory Accreditation Box */}
        <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200 space-y-2">
          <div className="text-xs font-bold text-blue-950 uppercase tracking-wider">
            {t.statutoryEwasteAuth}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-blue-900/70 block">{t.licenseNumber}:</span>
              <span className="font-mono font-bold text-blue-600">{recycler.authorizationNumber}</span>
            </div>
            <div>
              <span className="text-blue-900/70 block">{t.regulatingBoard}:</span>
              <span className="font-bold text-blue-950">{recycler.authorizingBody}</span>
            </div>
            <div>
              <span className="text-blue-900/70 block">{t.validity}:</span>
              <span className="font-semibold text-blue-700">{recycler.authorizationExpiry}</span>
            </div>
            <div>
              <span className="text-blue-900/70 block">{t.verificationStatus}:</span>
              <span className="font-bold text-blue-700">{t.activeAudited}</span>
            </div>
          </div>
        </div>

        {/* Facility Info */}
        <div className="space-y-2.5 text-xs text-blue-950">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-blue-900/70 block text-[11px]">{t.facilityAddress}:</span>
              <span>{recycler.facilityLocation}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-blue-900/70 block text-[11px]">{t.contactOfficer}:</span>
              <span>{recycler.contactPerson} ({recycler.phone})</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Truck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-blue-900/70 block text-[11px]">{t.logistics}:</span>
              <span>
                {recycler.pickupAvailable
                  ? `${t.doorstepPickup} in ${recycler.serviceArea} (${t.minPickupWeight}: ${recycler.minPickupWeightKg} ${t.kgUnit})`
                  : t.dropOffOnly}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-blue-900/70 block text-[11px]">{t.workingHours}:</span>
              <span>{recycler.workingHours}</span>
            </div>
          </div>
        </div>

        {/* Compliance Badges */}
        <div>
          <div className="text-xs font-bold text-blue-950 uppercase mb-2">{t.verifiedCertifications}</div>
          <div className="flex flex-wrap gap-2">
            {recycler.verifiedBadges.map((b, i) => (
              <span
                key={i}
                className="bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
