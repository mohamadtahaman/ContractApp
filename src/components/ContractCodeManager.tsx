import React, { useState } from 'react';
import { KeyRound, RefreshCw, Copy, Check, ChevronDown, PlusCircle, Shield } from 'lucide-react';
import { Language, MarriageContract } from '../types';
import { translations } from '../i18n/translations';
import { generateBatchCodes, saveBatchCodesToStorage } from '../utils/storage';

interface ContractCodeManagerProps {
  currentCode: string;
  contract: MarriageContract;
  batchCodes: string[];
  onSelectCode: (code: string) => void;
  onUpdateBatch: (codes: string[]) => void;
  onNewContract: () => void;
  lang: Language;
}

export const ContractCodeManager: React.FC<ContractCodeManagerProps> = ({
  currentCode,
  contract,
  batchCodes,
  onSelectCode,
  onUpdateBatch,
  onNewContract,
  lang,
}) => {
  const t = translations[lang];
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateNewBatch = () => {
    const newBatch = generateBatchCodes(8);
    // keep currentCode in batch if not present
    if (!newBatch.includes(currentCode)) {
      newBatch[0] = currentCode;
    }
    onUpdateBatch(newBatch);
    saveBatchCodesToStorage(newBatch);
  };

  // Determine contract status badge
  const completedParties = Object.values(contract.parties).filter((p) => p.isCompleted).length;
  const isFullyCompleted = completedParties === 5;

  return (
    <div
      id="contract-code-bar"
      className="bg-white rounded-xl p-3.5 border border-stone-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4"
    >
      {/* Current Code display & status */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#1a4d2e]/10 text-[#1a4d2e] flex items-center justify-center shrink-0">
          <KeyRound className="w-5 h-5 text-[#1a4d2e]" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              {t.contractCode}
            </span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                isFullyCompleted
                  ? 'bg-[#27ae60]/10 text-[#27ae60] border border-[#27ae60]/20'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {isFullyCompleted ? 'Vollständig (5/5)' : `${completedParties}/5 Parteien`}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono text-lg font-bold text-stone-900 tracking-wider">
              {currentCode}
            </span>
            <button
              onClick={handleCopy}
              title={t.copyHtml}
              className="p-1 rounded text-stone-400 hover:text-[#1a4d2e] hover:bg-stone-100 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-[#27ae60]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Batch selector dropdown & Actions */}
      <div className="flex items-center flex-wrap gap-2">
        {/* Batch Dropdown button */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-[#1a4d2e]" />
            <span>{t.batchCodes} ({batchCodes.length})</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 ltr:right-0 rtl:left-0 mt-1.5 w-64 bg-white rounded-xl shadow-lg border border-stone-200 py-2 z-30">
              <div className="px-3 py-1.5 border-b border-stone-100 flex items-center justify-between text-xs font-bold text-stone-700">
                <span>{t.batchCodes}</span>
                <button
                  onClick={handleGenerateNewBatch}
                  className="inline-flex items-center gap-1 text-[#1a4d2e] hover:underline text-[11px]"
                >
                  <RefreshCw className="w-3 h-3" />
                  {t.generateBatch}
                </button>
              </div>

              <div className="max-h-56 overflow-y-auto py-1">
                {batchCodes.map((code) => {
                  const isCurrent = code === currentCode;
                  return (
                    <button
                      key={code}
                      onClick={() => {
                        onSelectCode(code);
                        setIsOpen(false);
                      }}
                      className={`w-full text-start px-3 py-1.5 text-xs font-mono flex items-center justify-between hover:bg-stone-50 transition-colors ${
                        isCurrent ? 'bg-[#1a4d2e]/10 text-[#1a4d2e] font-bold' : 'text-stone-700'
                      }`}
                    >
                      <span>{code}</span>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-[#1a4d2e]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Generate batch quick action */}
        <button
          onClick={handleGenerateNewBatch}
          title={t.generateBatch}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1a4d2e] bg-[#1a4d2e]/10 hover:bg-[#1a4d2e]/20 rounded-lg transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t.generateBatch}</span>
        </button>

        {/* New Contract button */}
        <button
          onClick={onNewContract}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#1a4d2e] hover:bg-[#25663f] rounded-lg shadow-sm transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>{t.newContract}</span>
        </button>
      </div>
    </div>
  );
};
