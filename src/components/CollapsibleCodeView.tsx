import React, { useState, useMemo } from 'react';
import {
  Code2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Download,
  Github,
  FileCode,
  Terminal,
  Database,
  Upload,
} from 'lucide-react';
import { MarriageContract, Language } from '../types';
import { translations } from '../i18n/translations';
import { generateStandaloneSingleFileHtml } from '../utils/singleFileHtml';

interface CollapsibleCodeViewProps {
  contract: MarriageContract;
  isOpen: boolean;
  onToggle: () => void;
  lang: Language;
  onImportContract: (imported: MarriageContract) => void;
}

export const CollapsibleCodeView: React.FC<CollapsibleCodeViewProps> = ({
  contract,
  isOpen,
  onToggle,
  lang,
  onImportContract,
}) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'html' | 'github' | 'json'>('html');
  const [copied, setCopied] = useState<string | null>(null);

  const standaloneHtml = useMemo(() => {
    return generateStandaloneSingleFileHtml(contract);
  }, [contract]);

  const contractJson = useMemo(() => {
    return JSON.stringify(contract, null, 2);
  }, [contract]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `islamische-eheschliessungsurkunde-${contract.general.contractCode.toLowerCase()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([contractJson], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `contract-${contract.general.contractCode}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.general && parsed.parties) {
          onImportContract(parsed);
          alert('✓ Vertrag erfolgreich importiert!');
        } else {
          alert('Ungültiges Vertragsformat!');
        }
      } catch (err) {
        alert('Fehler beim Lesen der JSON-Datei: ' + err);
      }
    };
    reader.readAsText(file);
  };

  const gitBashScript = `# 1. Git Repository initialisieren
git init
git add .
git commit -m "feat: Islamische Eheschliessungsurkunde für Arresalah Center Berlin"

# 2. Remote GitHub Repository hinzufügen (Ersetzen Sie USER/REPO)
git branch -M main
git remote add origin https://github.com/DEIN_BENUTZERNAME/arresalah-urkunde.git
git push -u origin main

# 3. GitHub Pages aktivieren:
# Gehen Sie auf GitHub -> Repository Settings -> Pages
# Unter "Build and deployment" Source auf "GitHub Actions" oder "Deploy from a branch (main / root)" setzen.`;

  return (
    <div id="code-view-container" className="no-print bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden transition-all">
      {/* Top Toggle Bar */}
      <button
        type="button"
        id="toggle-code-view-btn"
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between bg-stone-900 text-white hover:bg-stone-800 transition-colors text-start"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#27ae60]/20 text-[#27ae60] flex items-center justify-center">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-wide">
                {t.codeViewTitle}
              </span>
              <span className="text-[10px] font-mono font-bold bg-[#1a4d2e] px-2 py-0.5 rounded text-white border border-[#27ae60]/40">
                Single-File HTML5
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5 hidden sm:block">
              {t.codeViewSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-stone-300">
          <span className="text-xs font-semibold">
            {isOpen ? '🔼 Einklappen' : '🔽 Ausklappen'}
          </span>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <div className="p-5 border-t border-stone-800 bg-stone-950 text-stone-200">
          {/* Sub-tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-3 mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('html')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'html'
                    ? 'bg-[#1a4d2e] text-white shadow-xs'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>index.html (Single-File)</span>
              </button>

              <button
                onClick={() => setActiveTab('github')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'github'
                    ? 'bg-[#1a4d2e] text-white shadow-xs'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Pages Anleitung</span>
              </button>

              <button
                onClick={() => setActiveTab('json')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'json'
                    ? 'bg-[#1a4d2e] text-white shadow-xs'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>JSON Daten-Backup</span>
              </button>
            </div>

            {/* Quick action buttons depending on tab */}
            <div className="flex items-center gap-2">
              {activeTab === 'html' && (
                <>
                  <button
                    onClick={() => handleCopy(standaloneHtml, 'html')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg transition-colors"
                  >
                    {copied === 'html' ? <Check className="w-3.5 h-3.5 text-[#27ae60]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied === 'html' ? t.copiedSuccess : t.copyHtml}</span>
                  </button>

                  <button
                    onClick={handleDownloadHtml}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#27ae60] hover:bg-[#219653] text-white rounded-lg transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.downloadHtml}</span>
                  </button>
                </>
              )}

              {activeTab === 'json' && (
                <>
                  <button
                    onClick={() => handleCopy(contractJson, 'json')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg transition-colors"
                  >
                    {copied === 'json' ? <Check className="w-3.5 h-3.5 text-[#27ae60]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>JSON Kopieren</span>
                  </button>

                  <button
                    onClick={handleDownloadJson}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#1a4d2e] hover:bg-[#25663f] text-white rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export JSON</span>
                  </button>

                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJsonFile}
                      className="hidden"
                    />
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Tab 1: HTML5 Viewer */}
          {activeTab === 'html' && (
            <div>
              <div className="bg-stone-900/90 rounded-xl p-3 border border-stone-800 text-xs font-mono text-emerald-400 overflow-x-auto max-h-96 scrollbar-thin">
                <pre>{standaloneHtml}</pre>
              </div>
              <p className="text-[11px] text-stone-400 mt-2">
                * Diese Datei ist vollständig autonom: Sie enthält das eingebettete CSS3, das Scharia-Dokumentlayout, JavaScript für die 5-Parteien-Fortschrittsaktualisierung sowie die automatische @media print Konfiguration für DIN-A4.
              </p>
            </div>
          )}

          {/* Tab 2: GitHub Guide */}
          {activeTab === 'github' && (
            <div className="space-y-4 text-xs text-stone-300">
              <div className="bg-stone-900 rounded-xl p-4 border border-stone-800 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#27ae60]" />
                  Git Bash Bereitstellungsbefehle (Deployment to GitHub Pages)
                </h4>
                <div className="bg-black/60 p-3 rounded-lg font-mono text-xs text-emerald-400 overflow-x-auto">
                  <pre>{gitBashScript}</pre>
                </div>
                <button
                  onClick={() => handleCopy(gitBashScript, 'git')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg"
                >
                  {copied === 'git' ? <Check className="w-3.5 h-3.5 text-[#27ae60]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Befehle kopieren</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800">
                  <h5 className="font-bold text-white mb-1">GitHub Pages Einrichtung</h5>
                  <p className="text-stone-400 leading-relaxed">
                    1. Laden Sie die Datei <code>index.html</code> herunter.<br />
                    2. Erstellen Sie ein neues GitHub Repository namens <code>arresalah-urkunde</code>.<br />
                    3. Laden Sie die Datei ins Root-Verzeichnis hoch.<br />
                    4. Aktivieren Sie Pages unter Settings &gt; Pages (Branch: main).
                  </p>
                </div>

                <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800">
                  <h5 className="font-bold text-white mb-1">Datensicherheit & Offline-Betrieb</h5>
                  <p className="text-stone-400 leading-relaxed">
                    Alle hochgeladenen Ausweise, Fotos und Verträge werden in Base64 konvertiert und verbleiben ausschließlich im lokalen Speicher (localStorage) des Administrators oder Benutzers. Keine Weiterleitung an fremde Server.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: JSON Viewer */}
          {activeTab === 'json' && (
            <div>
              <div className="bg-stone-900/90 rounded-xl p-3 border border-stone-800 text-xs font-mono text-amber-300 overflow-x-auto max-h-96 scrollbar-thin">
                <pre>{contractJson}</pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
