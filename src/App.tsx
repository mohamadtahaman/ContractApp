import React, { useState, useEffect } from 'react';
import {
  Language,
  MarriageContract,
  PartyRole,
  PartyData,
} from './types';
import { translations } from './i18n/translations';
import {
  getSavedContracts,
  saveContractToStorage,
  getActiveContractCode,
  setActiveContractCode,
  getBatchCodesFromStorage,
  saveBatchCodesToStorage,
  createNewContract,
  getSampleDemoContract,
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { ContractCodeManager } from './components/ContractCodeManager';
import { SegmentProgressRadar } from './components/SegmentProgressRadar';
import { PartyForm } from './components/PartyForm';
import { DowryAndGeneralForm } from './components/DowryAndGeneralForm';
import { PrintableCertificate } from './components/PrintableCertificate';
import { CollapsibleCodeView } from './components/CollapsibleCodeView';
import { CheckCircle2, ChevronDown, ChevronUp, FileText, Sparkles } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('de');
  const [activeRole, setActiveRole] = useState<PartyRole>('husband');
  const [isCodeViewOpen, setIsCodeViewOpen] = useState(false);
  const [showDowrySection, setShowDowrySection] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Contracts and active code from localStorage
  const [batchCodes, setBatchCodes] = useState<string[]>([]);
  const [contract, setContract] = useState<MarriageContract>(() => {
    return getSampleDemoContract(); // start with rich demo so user immediately sees live data
  });

  // Sync HTML dir attribute when language changes
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Initial load from localStorage
  useEffect(() => {
    const batches = getBatchCodesFromStorage();
    setBatchCodes(batches);

    const savedAll = getSavedContracts();
    const activeCode = getActiveContractCode();

    if (activeCode && savedAll[activeCode]) {
      setContract(savedAll[activeCode]);
    } else if (Object.keys(savedAll).length > 0) {
      const firstCode = Object.keys(savedAll)[0];
      setContract(savedAll[firstCode]);
      setActiveContractCode(firstCode);
    } else {
      // Initialize with sample demo contract
      const demo = getSampleDemoContract();
      setContract(demo);
      saveContractToStorage(demo);
      setActiveContractCode(demo.general.contractCode);
      if (!batches.includes(demo.general.contractCode)) {
        const updatedBatches = [demo.general.contractCode, ...batches.slice(0, 7)];
        setBatchCodes(updatedBatches);
        saveBatchCodesToStorage(updatedBatches);
      }
    }
  }, []);

  // Show auto-dismiss notification
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Switch contract from batch or search
  const handleSelectCode = (code: string) => {
    const savedAll = getSavedContracts();
    if (savedAll[code]) {
      setContract(savedAll[code]);
      setActiveContractCode(code);
      showNotification(`Vertrag ${code} geladen.`);
    } else {
      const newContractObj = createNewContract(code);
      setContract(newContractObj);
      saveContractToStorage(newContractObj);
      setActiveContractCode(code);
      showNotification(`Neuer Vertrag ${code} angelegt.`);
    }
  };

  // Create brand new contract
  const handleNewContract = () => {
    const newContractObj = createNewContract();
    const code = newContractObj.general.contractCode;
    const newBatch = [code, ...batchCodes.filter((c) => c !== code)];
    setBatchCodes(newBatch);
    saveBatchCodesToStorage(newBatch);
    setContract(newContractObj);
    saveContractToStorage(newContractObj);
    setActiveContractCode(code);
    setActiveRole('husband');
    showNotification(`Neuer Vertrag mit Code ${code} erstellt!`);
  };

  // Party updates
  const handleUpdateParty = (updatedParty: PartyData) => {
    setContract((prev) => {
      const updated = {
        ...prev,
        parties: {
          ...prev.parties,
          [updatedParty.role]: updatedParty,
        },
      };
      saveContractToStorage(updated);
      return updated;
    });
  };

  // Confirm party data
  const handleSaveParty = () => {
    setContract((prev) => {
      const current = prev.parties[activeRole];
      const updatedParty: PartyData = {
        ...current,
        isCompleted: true,
        completedAt: new Date().toISOString(),
      };

      const updatedContract: MarriageContract = {
        ...prev,
        parties: {
          ...prev.parties,
          [activeRole]: updatedParty,
        },
      };

      // Determine next uncompleted role
      const roles: PartyRole[] = ['husband', 'wife', 'guardian', 'witness1', 'witness2'];
      const nextRole = roles.find((r) => r !== activeRole && !updatedContract.parties[r].isCompleted);
      if (nextRole) {
        setActiveRole(nextRole);
      }

      saveContractToStorage(updatedContract);
      return updatedContract;
    });

    const partyName = translations[lang][activeRole];
    showNotification(`✓ Angaben für ${partyName} wurden erfolgreich gespeichert!`);
  };

  // Update general info & dowry
  const handleChangeContract = (updatedContract: MarriageContract) => {
    setContract(updatedContract);
    saveContractToStorage(updatedContract);
  };

  // Load sample demo contract
  const handleLoadDemo = () => {
    const demo = getSampleDemoContract();
    setContract(demo);
    saveContractToStorage(demo);
    setActiveContractCode(demo.general.contractCode);
    showNotification(translations[lang].demoLoaded);
  };

  // Reset form
  const handleReset = () => {
    if (window.confirm('Möchten Sie wirklich alle Eingaben für den aktuellen Vertrag zurücksetzen?')) {
      const cleared = createNewContract(contract.general.contractCode);
      setContract(cleared);
      saveContractToStorage(cleared);
      showNotification('Vertragsdaten wurden zurückgesetzt.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col selection:bg-[#1a4d2e] selection:text-white">
      {/* Top Notification Toast */}
      {notification && (
        <div className="no-print fixed bottom-5 right-5 ltr:right-5 rtl:left-5 z-50 bg-[#1a4d2e] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-fade-in border border-emerald-600/40">
          <CheckCircle2 className="w-4 h-4 text-[#27ae60]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        lang={lang}
        onSelectLang={setLang}
        onPrint={handlePrint}
        isCodeViewOpen={isCodeViewOpen}
        onToggleCodeView={() => setIsCodeViewOpen(!isCodeViewOpen)}
        onLoadDemo={handleLoadDemo}
        onReset={handleReset}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Collapsible Raw Code / Developer View */}
        <CollapsibleCodeView
          contract={contract}
          isOpen={isCodeViewOpen}
          onToggle={() => setIsCodeViewOpen(!isCodeViewOpen)}
          lang={lang}
          onImportContract={(imported) => {
            setContract(imported);
            saveContractToStorage(imported);
            setActiveContractCode(imported.general.contractCode);
            showNotification('Vertrag erfolgreich importiert!');
          }}
        />

        {/* Contract Code System Bar */}
        <div className="no-print">
          <ContractCodeManager
            currentCode={contract.general.contractCode}
            contract={contract}
            batchCodes={batchCodes}
            onSelectCode={handleSelectCode}
            onUpdateBatch={setBatchCodes}
            onNewContract={handleNewContract}
            lang={lang}
          />
        </div>

        {/* 5-Segment Progress Circle Radar */}
        <div className="no-print">
          <SegmentProgressRadar
            contract={contract}
            activeRole={activeRole}
            onSelectRole={setActiveRole}
            lang={lang}
          />
        </div>

        {/* Two-Column Editor Layout on Desktop (Form on left/main, General Details / Preview) */}
        <div className="no-print space-y-6">
          {/* Party Data Form */}
          <PartyForm
            party={contract.parties[activeRole]}
            activeRole={activeRole}
            onSelectRole={setActiveRole}
            onChangeParty={handleUpdateParty}
            onSaveParty={handleSaveParty}
            lang={lang}
          />

          {/* Toggleable Dowry & General Details Section */}
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setShowDowrySection(!showDowrySection)}
              className="w-full px-6 py-4 flex items-center justify-between text-start hover:bg-stone-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#b8860b]/10 text-[#b8860b] flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    {t.dowryAndConditions} & {t.generalContractDetails}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Mahr-Beträge (Sofort & Aufgeschoben), Zeugendaten, Imam & Datum anpassen
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1a4d2e]">
                <span>{showDowrySection ? 'Einklappen' : 'Bearbeiten'}</span>
                {showDowrySection ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showDowrySection && (
              <div className="p-6 pt-0 border-t border-stone-100">
                <DowryAndGeneralForm
                  contract={contract}
                  onChangeContract={handleChangeContract}
                  lang={lang}
                />
              </div>
            )}
          </div>
        </div>

        {/* Printable A4 Certificate Preview Section */}
        <section id="certificate-preview-section" className="pt-2">
          <PrintableCertificate contract={contract} lang={lang} />
        </section>
      </main>

      {/* Footer */}
      <footer className="no-print bg-white border-t border-stone-200 py-6 mt-12 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-stone-700">
            Arresalah Center Berlin e.V. • Gerichtstraße 38, 13347 Berlin
          </p>
          <p>
            Offizielles Erfassungssystem für islamische Eheverträge gemäß den Bestimmungen des edlen islamischen Scharia-Rechts.
          </p>
          <p className="text-[11px] text-stone-400">
            Alle Daten und Bilddateien (Base64) verbleiben ausschließlich im lokalen Speicher (localStorage) Ihres Browsers.
          </p>
        </div>
      </footer>
    </div>
  );
}
