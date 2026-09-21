import React from 'react';
import { Coins, FileText, CheckCircle2 } from 'lucide-react';
import { MarriageContract, Language } from '../types';
import { translations } from '../i18n/translations';

interface DowryAndGeneralFormProps {
  contract: MarriageContract;
  onChangeContract: (updated: MarriageContract) => void;
  lang: Language;
}

export const DowryAndGeneralForm: React.FC<DowryAndGeneralFormProps> = ({
  contract,
  onChangeContract,
  lang,
}) => {
  const t = translations[lang];

  const handleGeneralChange = (field: string, val: string) => {
    onChangeContract({
      ...contract,
      general: {
        ...contract.general,
        [field]: val,
      },
    });
  };

  const handleDowryChange = (field: string, val: string) => {
    onChangeContract({
      ...contract,
      dowry: {
        ...contract.dowry,
        [field]: val,
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 space-y-6">
      {/* Dowry (Mahr) Section */}
      <div>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-stone-100">
          <div className="w-8 h-8 rounded-lg bg-[#b8860b]/10 text-[#b8860b] flex items-center justify-center">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900">{t.dowryAndConditions}</h3>
            <p className="text-xs text-stone-500">Mahr Mu'ajjal & Mahr Mu'ajjal (الصداق المعجل والمؤجل)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Prompt Mahr */}
          <div className="p-4 rounded-xl bg-stone-50/70 border border-stone-200">
            <label className="block text-xs font-bold text-stone-800 mb-2">
              {t.promptMahr}
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                value={contract.dowry.promptAmount}
                onChange={(e) => handleDowryChange('promptAmount', e.target.value)}
                className="w-2/3 px-3 py-2 text-sm font-semibold rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                placeholder="3000"
              />
              <input
                type="text"
                value={contract.dowry.promptCurrency}
                onChange={(e) => handleDowryChange('promptCurrency', e.target.value)}
                className="w-1/3 px-3 py-2 text-sm font-semibold text-center rounded-lg border border-stone-300 bg-stone-100"
              />
            </div>

            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
              {t.promptStatus}
            </label>
            <select
              value={contract.dowry.promptStatus}
              onChange={(e) => handleDowryChange('promptStatus', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white wheel-select"
            >
              <option value="received">{t.receivedByBride}</option>
              <option value="paid">{t.paidInFull}</option>
              <option value="unpaid">{t.dueUponRequest}</option>
            </select>
          </div>

          {/* Deferred Mahr */}
          <div className="p-4 rounded-xl bg-stone-50/70 border border-stone-200">
            <label className="block text-xs font-bold text-stone-800 mb-2">
              {t.deferredMahr}
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                value={contract.dowry.deferredAmount}
                onChange={(e) => handleDowryChange('deferredAmount', e.target.value)}
                className="w-2/3 px-3 py-2 text-sm font-semibold rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                placeholder="5000"
              />
              <input
                type="text"
                value={contract.dowry.deferredCurrency}
                onChange={(e) => handleDowryChange('deferredCurrency', e.target.value)}
                className="w-1/3 px-3 py-2 text-sm font-semibold text-center rounded-lg border border-stone-300 bg-stone-100"
              />
            </div>

            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
              {t.deferredCondition}
            </label>
            <input
              type="text"
              value={contract.dowry.deferredDueCondition}
              onChange={(e) => handleDowryChange('deferredDueCondition', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
              placeholder={t.deferredDefaultCondition}
            />
          </div>

          {/* Special Stipulations */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-stone-800 mb-1">
              {t.specialStipulations}
            </label>
            <textarea
              rows={2}
              value={contract.dowry.specialConditions}
              onChange={(e) => handleDowryChange('specialConditions', e.target.value)}
              placeholder={t.specialStipulationsPlaceholder}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
            />
          </div>
        </div>
      </div>

      {/* General Registration Details */}
      <div>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-stone-100">
          <div className="w-8 h-8 rounded-lg bg-[#1a4d2e]/10 text-[#1a4d2e] flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900">{t.generalContractDetails}</h3>
            <p className="text-xs text-stone-500">Arresalah Center Berlin Registrierungsdaten</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {t.gregorianDateLabel}
            </label>
            <input
              type="date"
              value={contract.general.gregorianDate}
              onChange={(e) => handleGeneralChange('gregorianDate', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {t.hijriDateLabel}
            </label>
            <input
              type="text"
              value={contract.general.hijriDate}
              onChange={(e) => handleGeneralChange('hijriDate', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
              placeholder="10 Rabīʿ al-Awwal 1448 H"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {t.registryNumberLabel}
            </label>
            <input
              type="text"
              value={contract.general.registryNumber}
              onChange={(e) => handleGeneralChange('registryNumber', e.target.value)}
              className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Trauungsort (Moschee / Zentrum)
            </label>
            <input
              type="text"
              value={contract.general.placeOfSolemnization}
              onChange={(e) => handleGeneralChange('placeOfSolemnization', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {t.officiantNameLabel}
            </label>
            <input
              type="text"
              value={contract.general.officiantName}
              onChange={(e) => handleGeneralChange('officiantName', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
