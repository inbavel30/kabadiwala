import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  QrCode as QrIcon,
  Scale,
  ShieldCheck,
  Banknote,
  Receipt,
  Download,
  Share2,
} from 'lucide-react';
import { MaterialLot, HandoverRecord } from '../../types';
import { translations, materialTranslations } from '../../localization/translations';
import { AppLanguage } from '../../types';
import { QrCode } from '../common/QrCode';
import { db } from '../../services/database';

interface DigitalHandoverModalProps {
  lot: MaterialLot;
  language: AppLanguage;
  onClose: () => void;
  onHandoverComplete?: () => void;
}

export const DigitalHandoverModal: React.FC<DigitalHandoverModalProps> = ({
  lot,
  language,
  onClose,
  onHandoverComplete,
}) => {
  const t = translations[language];
  const handoverId = lot.handoverId || db.generateHandoverId(lot.id);

  const [paymentMode, setPaymentMode] = useState<'CASH' | 'UPI'>('CASH');
  const [scaleWeight, setScaleWeight] = useState<number>(lot.finalWeightKg || lot.weightKg);
  const [finalRate, setFinalRate] = useState<number>(lot.finalPricePerKg || lot.estimatedPricePerKg);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(lot.status === 'COMPLETED');

  const finalTotal = Math.round(scaleWeight * finalRate);
  const qrPayload = `KABADI2RECYCLE|${handoverId}|${lot.id}|${scaleWeight}KG|INR${finalTotal}|${paymentMode}`;

  const handleConfirmHandover = () => {
    setIsVerifying(true);
    setTimeout(() => {
      db.completeHandover({
        lotId: lot.id,
        finalWeightKg: scaleWeight,
        finalPricePerKg: finalRate,
        finalTotalAmount: finalTotal,
        paymentMethod: paymentMode,
        handoverLocation: lot.location.areaName,
      });
      setIsVerifying(false);
      setIsCompleted(true);
      if (onHandoverComplete) {
        onHandoverComplete();
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md sm:max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl border border-blue-200 overflow-hidden">
        {/* Header */}
        <div className="bg-white px-5 py-4 border-b border-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-blue-950">{t.digitalHandoverTitle}</h2>
              <span className="font-mono text-xs text-blue-600 font-bold">{handoverId}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-blue-700 hover:text-blue-950 rounded-full cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* QR Code Section */}
          <div className="bg-white p-5 rounded-2xl border border-blue-200 text-center shadow-xs space-y-2">
            <div className="text-xs font-bold text-blue-800/70 uppercase tracking-wider">
              {t.qrCodeScan}
            </div>
            <div className="flex justify-center my-1">
              <QrCode value={qrPayload} size={170} />
            </div>
            <p className="text-xs text-blue-950 font-medium max-w-xs mx-auto">
              {t.showToRecycler}
            </p>
          </div>

          {/* Verification Parameters */}
          <div className="bg-white p-4 rounded-2xl border border-blue-100 space-y-3">
            <div className="text-xs font-bold text-blue-900 uppercase flex items-center justify-between">
              <span>{t.verifyDetails}</span>
              <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full text-[10px] border border-blue-200">
                {t.officialWeighSlip}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-200/60">
                <span className="text-[11px] text-blue-800/70 block">{t.material}:</span>
                <span className="font-bold text-sm text-blue-950">
                  {materialTranslations[language][lot.materialCategory] || lot.materialCategory}
                </span>
              </div>
              <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-200/60">
                <span className="text-[11px] text-blue-800/70 block">{t.handoverId}:</span>
                <span className="font-mono font-bold text-xs text-blue-600">{handoverId}</span>
              </div>
            </div>

            {/* Weighing & Price adjust (if not yet finalized) */}
            {!isCompleted ? (
              <div className="space-y-2 pt-1 border-t border-blue-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-blue-950">
                    {t.finalScaleWeight}:
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={scaleWeight}
                    onChange={(e) => setScaleWeight(parseFloat(e.target.value) || 0)}
                    className="w-24 text-right py-1 px-2 border border-blue-200 rounded-lg font-bold text-sm bg-white text-blue-950 focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-blue-950">
                    {t.finalRatePerKg}:
                  </label>
                  <input
                    type="number"
                    value={finalRate}
                    onChange={(e) => setFinalRate(parseFloat(e.target.value) || 0)}
                    className="w-24 text-right py-1 px-2 border border-blue-200 rounded-lg font-bold text-sm bg-white text-blue-950 focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            ) : (
              <div className="divide-y divide-blue-100 text-xs">
                <div className="py-2 flex justify-between">
                  <span className="text-blue-800/70">{t.finalWeight}:</span>
                  <span className="font-bold text-blue-950">{scaleWeight} {t.kgUnit}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-blue-800/70">{t.agreedRate}:</span>
                  <span className="font-bold text-blue-950">₹{finalRate} / {t.kgUnit}</span>
                </div>
              </div>
            )}

            {/* Total Payable Banner */}
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-blue-950 block">{t.finalAmount}</span>
                <span className="text-xs text-blue-700">{t.paymentOnHandover}</span>
              </div>
              <div className="text-2xl font-black text-blue-600">
                ₹{finalTotal.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Payment Method Selector */}
            {!isCompleted && (
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-blue-900 uppercase">{t.paymentMode}</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('CASH')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMode === 'CASH'
                        ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                        : 'border-blue-200 bg-white text-blue-900 hover:bg-blue-50'
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                    <span>{t.cashPayment}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode('UPI')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMode === 'UPI'
                        ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                        : 'border-blue-200 bg-white text-blue-900 hover:bg-blue-50'
                    }`}
                  >
                    <Receipt className="w-4 h-4" />
                    <span>{t.upiPayment}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Verification Status Badges */}
          <div className="bg-white p-4 rounded-2xl border border-blue-100 space-y-2 text-xs">
            <div className="text-xs font-bold text-blue-900 uppercase">{t.verifications}</div>
            <div className="flex items-center gap-2 text-blue-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>{t.collectedLoaded}</span>
            </div>
            <div className="flex items-center gap-2 text-blue-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>{t.weightVerifiedScale}</span>
            </div>
            <div className="flex items-center gap-2 text-blue-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>{t.priceVerifiedAgreed}</span>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-2 text-blue-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>{t.paymentComplete} ({lot.paymentMethod || paymentMode})</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-blue-100">
          {!isCompleted ? (
            <button
              onClick={handleConfirmHandover}
              disabled={isVerifying}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-md transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{isVerifying ? t.verifying : t.confirmHandover}</span>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-xs cursor-pointer"
              >
                {t.closeReceipt}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
