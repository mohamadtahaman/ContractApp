import React from 'react';
import {
  Globe,
  Printer,
  Code2,
  Sparkles,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface NavbarProps {
  lang: Language;
  onSelectLang: (lang: Language) => void;
  onPrint: () => void;
  isCodeViewOpen: boolean;
  onToggleCodeView: () => void;
  onLoadDemo: () => void;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onSelectLang,
  onPrint,
  isCodeViewOpen,
  onToggleCodeView,
  onLoadDemo,
  onReset,
}) => {
  const t = translations[lang];

  return (
    <nav className="no-print bg-[#1a4d2e] text-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Mosque Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-xs">
              <BookOpen className="w-6 h-6 text-[#d4af37]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                  ARRESALAH CENTER BERLIN
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d4af37] text-stone-950 uppercase tracking-widest">
                  e.V.
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 font-cairo">
                مركز الرسالة الإسلامي برلين • Eheschließungsurkunde
              </p>
            </div>
          </div>

          {/* Action controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Demo Data Loader */}
            <button
              onClick={onLoadDemo}
              title={t.loadSampleData}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-emerald-100 border border-white/15 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{t.loadSampleData}</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-black/20 rounded-lg p-0.5 border border-white/15 text-xs font-semibold">
              <button
                onClick={() => onSelectLang('de')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  lang === 'de' ? 'bg-white text-[#1a4d2e] shadow-xs' : 'text-emerald-100 hover:text-white'
                }`}
              >
                DE
              </button>
              <button
                onClick={() => onSelectLang('ar')}
                className={`px-2.5 py-1 rounded-md transition-colors font-cairo ${
                  lang === 'ar' ? 'bg-white text-[#1a4d2e] shadow-xs' : 'text-emerald-100 hover:text-white'
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => onSelectLang('en')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  lang === 'en' ? 'bg-white text-[#1a4d2e] shadow-xs' : 'text-emerald-100 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Print Button */}
            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#27ae60] hover:bg-[#219653] text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">{t.printCertificate}</span>
            </button>

            {/* Code / Developer View Toggle */}
            <button
              onClick={onToggleCodeView}
              title={t.toggleCodeView}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                isCodeViewOpen
                  ? 'bg-stone-900 text-white border-stone-700'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              <Code2 className="w-4 h-4 text-[#d4af37]" />
              <span className="hidden md:inline">{isCodeViewOpen ? '🔼 Code' : '🔽 Code'}</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={onReset}
              title={t.resetAll}
              className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
