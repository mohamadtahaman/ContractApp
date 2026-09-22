import React, { useState, useEffect, useMemo } from 'react';
import { contractI18n, Language } from './i18n/contractTranslations';
import {
  MarriageContract,
  PartyData,
  PartyRole,
} from './types';
import {
  getSavedContracts,
  saveContractToStorage,
  getActiveContractCode,
  setActiveContractCode,
  getBatchCodesFromStorage,
  saveBatchCodesToStorage,
  createNewContract,
  getSampleDemoContract,
  generateBatchCodes,
  createEmptyParty,
} from './utils/storage';

export default function App() {
  const [lang, setLang] = useState<Language>('de');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminPasswordError, setAdminPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<'form-view' | 'contract-view'>('form-view');

  // Contract Code & Verification
  const [contractCodeInput, setContractCodeInput] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [alertMsg, setAlertMsg] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

  // Active Contract & Batches
  const [batchCodes, setBatchCodes] = useState<string[]>([]);
  const [contract, setContract] = useState<MarriageContract>(() => getSampleDemoContract());

  // Form State for Active Selected Role
  const [selectedRole, setSelectedRole] = useState<PartyRole | ''>('');
  const [inputNameDe, setInputNameDe] = useState('');
  const [inputNameAr, setInputNameAr] = useState('');
  const [birthDay, setBirthDay] = useState('15');
  const [birthMonth, setBirthMonth] = useState('06');
  const [birthYear, setBirthYear] = useState('1998');
  const [inputBirthPlace, setInputBirthPlace] = useState('');
  const [inputMother, setInputMother] = useState('');
  const [inputId, setInputId] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputMahr, setInputMahr] = useState('');
  const [profilePicBase64, setProfilePicBase64] = useState<string | undefined>(undefined);
  const [idFrontBase64, setIdFrontBase64] = useState<string | undefined>(undefined);
  const [idBackBase64, setIdBackBase64] = useState<string | undefined>(undefined);

  const t = contractI18n[lang];

  // Sync HTML language & direction
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Initial load
  useEffect(() => {
    let batches = getBatchCodesFromStorage();
    if (!batches || batches.length === 0) {
      batches = generateBatchCodes(10);
      saveBatchCodesToStorage(batches);
    }
    setBatchCodes(batches);

    const savedAll = getSavedContracts();
    const activeCode = getActiveContractCode();

    if (activeCode && savedAll[activeCode]) {
      setContract(savedAll[activeCode]);
      setContractCodeInput(activeCode);
      setIsCodeVerified(false); // Locked by default on initial entry
    } else {
      const demo = getSampleDemoContract();
      setContract(demo);
      saveContractToStorage(demo);
      setIsCodeVerified(false); // Locked by default
      if (!batches.includes(demo.general.contractCode)) {
        const updated = [demo.general.contractCode, ...batches.slice(0, 9)];
        setBatchCodes(updated);
        saveBatchCodesToStorage(updated);
      }
    }
  }, []);

  // When selected role changes, load its data into form
  useEffect(() => {
    if (!selectedRole) return;
    const party = contract.parties[selectedRole] || createEmptyParty(selectedRole);
    setInputNameDe(party.fullName || '');
    setInputNameAr(party.fullNameArabic || '');
    setBirthDay(party.dateOfBirth?.day || '15');
    setBirthMonth(party.dateOfBirth?.month || '06');
    setBirthYear(party.dateOfBirth?.year || '1998');
    setInputBirthPlace(party.placeOfBirth || '');
    setInputMother(party.motherName || '');
    setInputId(party.idNumber || '');
    setInputAddress(party.address || '');
    setProfilePicBase64(party.photoBase64);
    setIdFrontBase64(party.idFrontBase64);
    setIdBackBase64(party.idBackBase64);

    if (selectedRole === 'husband' || selectedRole === 'wife' || selectedRole === 'guardian') {
      setInputMahr(contract.dowry.promptAmount ? `${contract.dowry.promptAmount} ${contract.dowry.promptCurrency}` : '');
    }
  }, [selectedRole]);

  // File Upload to Base64 with compression
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'profile' | 'front' | 'back'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (!result) return;

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = target === 'profile' ? 320 : 900;
        const scale = Math.min(1, MAX_WIDTH / (img.width || 1));
        canvas.width = (img.width || 1) * scale;
        canvas.height = (img.height || 1) * scale;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          
          if (target === 'profile') setProfilePicBase64(dataUrl);
          if (target === 'front') setIdFrontBase64(dataUrl);
          if (target === 'back') setIdBackBase64(dataUrl);

          setAlertMsg({
            text: `✓ Bild erfolgreich geladen / تم رفع الصورة بنجاح`,
            type: 'success',
          });
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  // Handle Admin Login with Password
  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = adminPasswordInput.trim();
    // Default admin passwords
    if (trimmed === 'admin123' || trimmed === 'Arresalah2026' || trimmed === '123456') {
      setIsAdminLoggedIn(true);
      setIsAdminModalOpen(false);
      setAdminPasswordInput('');
      setAdminPasswordError('');
      setAlertMsg({ text: '✓ Willkommen in der Administration / تم الدخول إلى لوحة الإدارة بنجاح', type: 'success' });
    } else {
      setAdminPasswordError('كلمة المرور غير صحيحة! (Falsches Passwort)');
    }
  };

  // Admin Logout
  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAlertMsg({ text: 'تم تسجيل الخروج من لوحة الإدارة', type: 'success' });
  };

  // Verify Contract Code
  const verifyContractCode = () => {
    const code = contractCodeInput.trim().toUpperCase();
    if (!code) {
      setAlertMsg({ text: 'Bitte geben Sie einen gültigen Vertragscode ein! / يرجى إدخال رمز عقد صحيح!', type: 'error' });
      return;
    }

    const savedAll = getSavedContracts();
    if (savedAll[code]) {
      setContract(savedAll[code]);
      setActiveContractCode(code);
      setIsCodeVerified(true);
      setAlertMsg({ text: `✓ Vertrag ${code} erfolgreich geladen / تم تحميل بيانات العقد بنجاح`, type: 'success' });
    } else {
      const newContractObj = createNewContract(code);
      setContract(newContractObj);
      saveContractToStorage(newContractObj);
      setActiveContractCode(code);
      setIsCodeVerified(true);

      if (!batchCodes.includes(code)) {
        const updated = [code, ...batchCodes];
        setBatchCodes(updated);
        saveBatchCodesToStorage(updated);
      }
      setAlertMsg({ text: `✓ Neuer Vertrag ${code} wurde angelegt / تم إنشاء سجل جديد للعقد`, type: 'success' });
    }
  };

  // Save Form Data
  const saveData = () => {
    if (!selectedRole) {
      setAlertMsg({ text: 'يرجى اختيار أحد الأطراف من الدائرة الخماسية أولاً', type: 'error' });
      return;
    }

    if (!inputNameDe.trim() && !inputNameAr.trim()) {
      setAlertMsg({ text: 'يرجى إدخال اسم الطرف على الأقل لحفظ البيانات / Bitte Namen eingeben', type: 'error' });
      return;
    }

    const currentParty = contract.parties[selectedRole] || createEmptyParty(selectedRole);

    const isComplete = Boolean(
      (inputNameDe.trim() || inputNameAr.trim()) &&
      inputBirthPlace.trim() &&
      inputId.trim()
    );

    const updatedParty: PartyData = {
      ...currentParty,
      role: selectedRole,
      fullName: inputNameDe.trim(),
      fullNameArabic: inputNameAr.trim(),
      dateOfBirth: {
        day: birthDay,
        month: birthMonth,
        year: birthYear,
      },
      placeOfBirth: inputBirthPlace.trim(),
      motherName: inputMother.trim(),
      idNumber: inputId.trim(),
      address: inputAddress.trim(),
      photoBase64: profilePicBase64 || currentParty.photoBase64,
      idFrontBase64: idFrontBase64 || currentParty.idFrontBase64,
      idBackBase64: idBackBase64 || currentParty.idBackBase64,
      isCompleted: isComplete,
      completedAt: new Date().toISOString(),
    };

    const updatedDowry = { ...contract.dowry };
    if (inputMahr.trim()) {
      const parts = inputMahr.trim().split(' ');
      updatedDowry.promptAmount = parts[0] || inputMahr.trim();
      if (parts[1]) updatedDowry.promptCurrency = parts[1];
    }

    const updatedContract: MarriageContract = {
      ...contract,
      dowry: updatedDowry,
      parties: {
        ...contract.parties,
        [selectedRole]: updatedParty,
      },
    };

    setContract(updatedContract);
    saveContractToStorage(updatedContract);

    const roleNameAr = 
      selectedRole === 'husband' ? 'الزوج' : 
      selectedRole === 'wife' ? 'الزوجة' : 
      selectedRole === 'guardian' ? 'الولي' : 
      selectedRole === 'witness1' ? 'الشاهد الأول' : 'الشاهد الثاني';

    setAlertMsg({ 
      text: `✓ تم حفظ بيانات (${roleNameAr}) والصور المرفقة وتحديث العقد بنجاح!`, 
      type: 'success' 
    });

    // Auto switch to next uncompleted role
    const rolesOrder: PartyRole[] = ['husband', 'wife', 'guardian', 'witness1', 'witness2'];
    const nextUncompleted = rolesOrder.find(
      (r) => r !== selectedRole && !updatedContract.parties[r]?.isCompleted
    );
    if (nextUncompleted) {
      setSelectedRole(nextUncompleted);
    }
  };

  // Generate 10 new codes
  const generateNewBatch = () => {
    const newCodes = generateBatchCodes(10);
    setBatchCodes(newCodes);
    saveBatchCodesToStorage(newCodes);
    setAlertMsg({ text: '🎲 10 neue Vertragscodes generiert / تم توليد 10 رموز عقود جديدة بنجاح', type: 'success' });
  };

  // Switch contract from badge click
  const selectBadgeCode = (code: string) => {
    setContractCodeInput(code);
    const savedAll = getSavedContracts();
    if (savedAll[code]) {
      setContract(savedAll[code]);
      setActiveContractCode(code);
    } else {
      const newCtr = createNewContract(code);
      setContract(newCtr);
      saveContractToStorage(newCtr);
      setActiveContractCode(code);
    }
    setIsCodeVerified(true);
    setAlertMsg({ text: `Vertrag ${code} aktiv / تم تفعيل العقد`, type: 'success' });
  };

  // Check if contract has all parties completed
  const isContractFullyCompleted = (ctr: MarriageContract) => {
    return (
      ctr.parties.husband?.isCompleted &&
      ctr.parties.wife?.isCompleted &&
      ctr.parties.guardian?.isCompleted &&
      ctr.parties.witness1?.isCompleted &&
      ctr.parties.witness2?.isCompleted
    );
  };

  // Helper arrays for date selects
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')), []);
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')), []);
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 80 }, (_, i) => String(currentYear - 16 - i));
  }, []);

  const parties = contract.parties;

  return (
    <div className="min-h-screen bg-[#f1f5f3]">
      {/* الترويسة العلوية الرسمية لمركز الرسالة برلين */}
      <header className="app-header no-print">
        <div className="app-header-content">
          <div className="header-brand">
            <div className="header-logo-icon">
              🕌
            </div>
            <div className="header-titles">
              <h1>ARRESALAH CENTER BERLIN e.V.</h1>
              <p>{t.headerSubtitle}</p>
            </div>
          </div>

          <div className="header-controls">
            {/* أزرار التبديل والمعاينة والطباعة تتاح فقط للإدارة حصرياً */}
            {isAdminLoggedIn && (
              <>
                <button
                  type="button"
                  className={`nav-pill-btn ${activeTab === 'form-view' ? 'active' : ''}`}
                  onClick={() => setActiveTab('form-view')}
                >
                  <span>✏️</span>
                  <span>{t.tabForm}</span>
                </button>

                <button
                  type="button"
                  className={`nav-pill-btn ${activeTab === 'contract-view' ? 'active' : ''}`}
                  onClick={() => setActiveTab('contract-view')}
                >
                  <span>📄</span>
                  <span>{t.tabContract}</span>
                </button>
              </>
            )}

            {/* مفتاح تبديل اللغة */}
            <div className="lang-switch">
              <button
                type="button"
                className={`lang-btn ${lang === 'de' ? 'active' : ''}`}
                onClick={() => setLang('de')}
              >
                DE
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === 'ar' ? 'active' : ''}`}
                onClick={() => setLang('ar')}
              >
                عربي
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>

            {/* أيقونة دخول الإدارة الهادئة والسرية في الهيدر */}
            <button
              type="button"
              onClick={() => {
                if (isAdminLoggedIn) {
                  handleAdminLogout();
                } else {
                  setAdminPasswordError('');
                  setAdminPasswordInput('');
                  setIsAdminModalOpen(true);
                }
              }}
              title={isAdminLoggedIn ? "تسجيل خروج الإدارة" : "دخول إدارة المركز"}
              style={{
                background: isAdminLoggedIn ? '#166534' : 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                padding: '5px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.2s',
              }}
            >
              <span>🔒</span>
              {isAdminLoggedIn ? (
                <span style={{ fontSize: '11px', fontWeight: 'bold' }}>خروج الإدارة</span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      {/* شريط الإدارة Admin Bar (مكان الأكواد الحصري) */}
      {isAdminLoggedIn && (
        <div id="admin-bar" className="admin-bar no-print">
          <div className="admin-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🔒 <strong>{t.adminTitle}</strong></span>
              <span
                style={{
                  fontFamily: 'monospace',
                  background: '#22c55e',
                  color: '#10331e',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 800,
                }}
              >
                الكود الحالي: {contract.general.contractCode}
              </span>
            </div>
            <div className="tabs">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'form-view' ? 'active' : ''}`}
                onClick={() => {
                  setIsCodeVerified(true);
                  setActiveTab('form-view');
                }}
              >
                {t.tabForm}
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'contract-view' ? 'active' : ''}`}
                onClick={() => {
                  setIsCodeVerified(true);
                  setActiveTab('contract-view');
                }}
              >
                {t.tabContract}
              </button>
            </div>
          </div>

          <div className="contract-mgmt-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{t.activeCodesTitle}</span>
              <button type="button" className="generate-btn" onClick={generateNewBatch}>
                {t.generateCodes}
              </button>
            </div>
            <div id="codesContainer" className="codes-list">
              {batchCodes.map((code) => {
                const savedAll = getSavedContracts();
                const ctr = savedAll[code];
                const isComplete = ctr && isContractFullyCompleted(ctr);
                const isActive = contract.general.contractCode === code;

                return (
                  <span
                    key={code}
                    onClick={() => {
                      selectBadgeCode(code);
                      setIsCodeVerified(true);
                    }}
                    className={`code-badge ${isActive ? 'active-code' : isComplete ? 'used-code' : 'active-code'}`}
                    style={isActive ? { outline: '2px solid #2ecc71', outlineOffset: '2px' } : undefined}
                    title="Klicken zum Laden / اضغط للتحميل"
                  >
                    <span>{code}</span>
                    <small>{isComplete ? '✓ مكتمل' : 'متاح'}</small>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* شاشة الحجب والدخول بكود العقد */}
      {!isCodeVerified ? (
        <div className="max-w-[500px] mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-[#1a4d2e] text-center">
            <div className="w-16 h-16 bg-[#f1f6f3] border-2 border-[#1a4d2e] text-[#1a4d2e] rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 shadow-sm">
              📜
            </div>
            <h2 className="text-xl font-extrabold text-[#1a4d2e] mb-2">
              {t.gatekeeperTitle}
            </h2>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              {t.gatekeeperDesc}
            </p>

            {alertMsg && (
              <div
                className={`alert-msg ${alertMsg.type === 'success' ? 'alert-msg-success' : 'alert-msg-error'} mb-4`}
              >
                {alertMsg.text}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                verifyContractCode();
              }}
              className="space-y-4"
            >
              <div>
                <input
                  type="text"
                  id="gatekeeperCodeInput"
                  value={contractCodeInput}
                  onChange={(e) => setContractCodeInput(e.target.value.toUpperCase())}
                  placeholder={t.gatekeeperPlaceholder}
                  className="w-full text-center text-lg font-mono font-bold tracking-widest py-3 px-4 rounded-xl border-2 border-slate-300 focus:border-[#1a4d2e] focus:outline-none uppercase bg-slate-50 focus:bg-white transition-all shadow-inner"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1a4d2e] hover:bg-[#25663f] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>✓</span>
                <span>{t.gatekeeperBtn}</span>
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
              <span>{t.footerText}</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* 1. واجهة تعبئة البيانات Form View */}
          <div id="form-view" className={`view-container ${activeTab === 'form-view' ? 'block' : 'hidden'}`}>
            <div className="form-card">
              <div style={{ marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                <h2 style={{ color: 'var(--primary-color)', margin: 0, fontSize: '20px', fontWeight: 800 }} id="txt_form_title">
                  {t.formTitle}
                </h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                  {t.formInstruction}
                </p>
              </div>

              {alertMsg && (
                <div
                  id="alertBox"
                  className={`alert-msg ${alertMsg.type === 'success' ? 'alert-msg-success' : 'alert-msg-error'}`}
                >
                  {alertMsg.text}
                </div>
              )}

              {/* النموذج الرئيسي بعد تأكيد الكود */}
              <div id="mainFormBody">
              {/* الدائرة الخماسية التفاعلية مرئية للجميع */}
              <div className="progress-circle-wrapper">
                <h4 id="lbl_circle_title">{t.circleTitle}</h4>
                <svg className="circle-chart" viewBox="0 0 100 100">
                  {/* 5 أجزاء متساوية (كل جزء = 18.8% مع الفواصل) */}
                  <circle
                    className={`circle-segment ${parties.husband?.isCompleted ? 'active-segment' : ''}`}
                    id="seg_husband"
                    cx="50"
                    cy="50"
                    r="38"
                    strokeDasharray="18.8 1.2"
                    strokeDashoffset="0"
                    onClick={() => setSelectedRole('husband')}
                  />
                  <circle
                    className={`circle-segment ${parties.wife?.isCompleted ? 'active-segment' : ''}`}
                    id="seg_wife"
                    cx="50"
                    cy="50"
                    r="38"
                    strokeDasharray="18.8 1.2"
                    strokeDashoffset="-20"
                    onClick={() => setSelectedRole('wife')}
                  />
                  <circle
                    className={`circle-segment ${parties.guardian?.isCompleted ? 'active-segment' : ''}`}
                    id="seg_waliy"
                    cx="50"
                    cy="50"
                    r="38"
                    strokeDasharray="18.8 1.2"
                    strokeDashoffset="-40"
                    onClick={() => setSelectedRole('guardian')}
                  />
                  <circle
                    className={`circle-segment ${parties.witness1?.isCompleted ? 'active-segment' : ''}`}
                    id="seg_witness1"
                    cx="50"
                    cy="50"
                    r="38"
                    strokeDasharray="18.8 1.2"
                    strokeDashoffset="-60"
                    onClick={() => setSelectedRole('witness1')}
                  />
                  <circle
                    className={`circle-segment ${parties.witness2?.isCompleted ? 'active-segment' : ''}`}
                    id="seg_witness2"
                    cx="50"
                    cy="50"
                    r="38"
                    strokeDasharray="18.8 1.2"
                    strokeDashoffset="-80"
                    onClick={() => setSelectedRole('witness2')}
                  />
                </svg>

                <div className="circle-legend">
                  <div className="legend-item" onClick={() => setSelectedRole('husband')}>
                    <span className={`legend-dot ${parties.husband?.isCompleted ? 'active-dot' : ''}`} id="dot_husband" />
                    <span id="lbl_leg_husband">{parties.husband?.isCompleted ? `✓ ${t.husband}` : t.husband}</span>
                  </div>
                  <div className="legend-item" onClick={() => setSelectedRole('wife')}>
                    <span className={`legend-dot ${parties.wife?.isCompleted ? 'active-dot' : ''}`} id="dot_wife" />
                    <span id="lbl_leg_wife">{parties.wife?.isCompleted ? `✓ ${t.wife}` : t.wife}</span>
                  </div>
                  <div className="legend-item" onClick={() => setSelectedRole('guardian')}>
                    <span className={`legend-dot ${parties.guardian?.isCompleted ? 'active-dot' : ''}`} id="dot_waliy" />
                    <span id="lbl_leg_waliy">{parties.guardian?.isCompleted ? `✓ ${t.waliy}` : t.waliy}</span>
                  </div>
                  <div className="legend-item" onClick={() => setSelectedRole('witness1')}>
                    <span className={`legend-dot ${parties.witness1?.isCompleted ? 'active-dot' : ''}`} id="dot_witness1" />
                    <span id="lbl_leg_w1">{parties.witness1?.isCompleted ? `✓ ${t.witness1}` : t.witness1}</span>
                  </div>
                  <div className="legend-item" onClick={() => setSelectedRole('witness2')}>
                    <span className={`legend-dot ${parties.witness2?.isCompleted ? 'active-dot' : ''}`} id="dot_witness2" />
                    <span id="lbl_leg_w2">{parties.witness2?.isCompleted ? `✓ ${t.witness2}` : t.witness2}</span>
                  </div>
                </div>
              </div>

              {/* اختيار الدور */}
              <div className="form-group">
                <label id="lbl_select_role">
                  {t.roleLabel} <span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  id="roleSelect"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as PartyRole)}
                >
                  <option value="" id="opt_select_role">{t.selectRoleDefault}</option>
                  <option value="husband" id="opt_husband">{t.husband} {parties.husband?.isCompleted ? '✓' : ''}</option>
                  <option value="wife" id="opt_wife">{t.wife} {parties.wife?.isCompleted ? '✓' : ''}</option>
                  <option value="guardian" id="opt_waliy">{t.waliy} {parties.guardian?.isCompleted ? '✓' : ''}</option>
                  <option value="witness1" id="opt_witness1">{t.witness1} {parties.witness1?.isCompleted ? '✓' : ''}</option>
                  <option value="witness2" id="opt_witness2">{t.witness2} {parties.witness2?.isCompleted ? '✓' : ''}</option>
                </select>
              </div>

              {/* النموذج الديناميكي */}
              {selectedRole && (
                <div id="dynamicForm" className="role-fields" style={{ display: 'block' }}>
                  <h4 id="formTitle" style={{ color: 'var(--primary-color)', margin: '0 0 15px 0', fontSize: '16px' }}>
                    {selectedRole === 'husband' && t.husband}
                    {selectedRole === 'wife' && t.wife}
                    {selectedRole === 'guardian' && t.waliy}
                    {selectedRole === 'witness1' && t.witness1}
                    {selectedRole === 'witness2' && t.witness2}
                  </h4>

                  {/* صورة شخصية للزوج والزوجة */}
                  {(selectedRole === 'husband' || selectedRole === 'wife') && (
                    <div className="form-group" id="profilePicGroup" style={{ display: 'block' }}>
                      <label id="lbl_profile_pic">
                        {t.profilePic} <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        type="file"
                        id="inputProfilePic"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'profile')}
                      />
                      {profilePicBase64 && (
                        <div style={{ marginTop: '8px' }}>
                          <img
                            src={profilePicBase64}
                            alt="Profile Preview"
                            style={{ width: '60px', height: '75px', objectFit: 'cover', border: '1px solid #ccc', borderRadius: '4px' }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="form-group">
                    <label id="lbl_name_de">
                      {t.nameDe} <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="inputNameDe"
                      value={inputNameDe}
                      onChange={(e) => setInputNameDe(e.target.value)}
                      placeholder="ADEL YOUSSEF MOHAMED"
                    />
                  </div>

                  <div className="form-group">
                    <label id="lbl_name_ar">{t.nameAr}</label>
                    <input
                      type="text"
                      id="inputNameAr"
                      dir="rtl"
                      value={inputNameAr}
                      onChange={(e) => setInputNameAr(e.target.value)}
                      placeholder="عادل يوسف محمد"
                    />
                  </div>

                  <div className="form-group">
                    <label id="lbl_birth_date">
                      {t.birthDate} <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div className="date-picker-wheels">
                      <div className="wheel-column">
                        <label id="lbl_day">{t.day}</label>
                        <select
                          id="birthDay"
                          value={birthDay}
                          onChange={(e) => setBirthDay(e.target.value)}
                        >
                          {days.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                      <div className="wheel-column">
                        <label id="lbl_month">{t.month}</label>
                        <select
                          id="birthMonth"
                          value={birthMonth}
                          onChange={(e) => setBirthMonth(e.target.value)}
                        >
                          {months.map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>
                      <div className="wheel-column">
                        <label id="lbl_year">{t.year}</label>
                        <select
                          id="birthYear"
                          value={birthYear}
                          onChange={(e) => setBirthYear(e.target.value)}
                        >
                          {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label id="lbl_birth_place">
                      {t.birthPlace} <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="inputBirthPlace"
                      value={inputBirthPlace}
                      onChange={(e) => setInputBirthPlace(e.target.value)}
                      placeholder="Berlin, Deutschland"
                    />
                  </div>

                  {/* اسم الأم للزوج والزوجة */}
                  {(selectedRole === 'husband' || selectedRole === 'wife') && (
                    <div className="form-group" id="motherGroup" style={{ display: 'block' }}>
                      <label id="lbl_mother_name">
                        {t.motherName} <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="inputMother"
                        value={inputMother}
                        onChange={(e) => setInputMother(e.target.value)}
                        placeholder="Zinab Mokhtar"
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label id="lbl_id_card">
                      {t.idCard} <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="inputId"
                      value={inputId}
                      onChange={(e) => setInputId(e.target.value)}
                      placeholder="A36253766 Pass"
                    />
                  </div>

                  <div className="form-group">
                    <label id="lbl_address">
                      {t.address} <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="inputAddress"
                      value={inputAddress}
                      onChange={(e) => setInputAddress(e.target.value)}
                      placeholder="Musterstraße 12, Berlin"
                    />
                  </div>

                  {/* المهر */}
                  {(selectedRole === 'husband' || selectedRole === 'wife' || selectedRole === 'guardian') && (
                    <div className="form-group" id="mahrGroup" style={{ display: 'block' }}>
                      <label id="lbl_mahr">
                        {t.mahr} <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="inputMahr"
                        value={inputMahr}
                        onChange={(e) => setInputMahr(e.target.value)}
                        placeholder="2000 EUR"
                      />
                    </div>
                  )}

                  {/* الصورة الشخصية للزوج والزوجة */}
                  {(selectedRole === 'husband' || selectedRole === 'wife') && (
                    <div className="form-group">
                      <label id="lbl_profile_pic">
                        صورة شخصية (Passfoto - اختیاري):
                      </label>
                      <input
                        type="file"
                        id="inputProfilePic"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'profile')}
                      />
                      {profilePicBase64 && (
                        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={profilePicBase64}
                            alt="Profile"
                            style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #1a4d2e' }}
                          />
                          <button
                            type="button"
                            onClick={() => setProfilePicBase64(undefined)}
                            style={{ background: '#fee2e2', color: '#b91c1c', border: '1px solid #f87171', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', cursor: 'pointer' }}
                          >
                            حذف الصورة ✕
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="form-group">
                    <label id="lbl_id_front">
                      {t.idFront} <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="file"
                      id="inputIdFront"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'front')}
                    />
                    {idFrontBase64 && (
                      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '6px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                        <img
                          src={idFrontBase64}
                          alt="ID Front Preview"
                          style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 'bold' }}>
                            {t.frontUploaded}
                          </div>
                          <button
                            type="button"
                            onClick={() => setIdFrontBase64(undefined)}
                            style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '11px', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                          >
                            {t.deletePhoto}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label id="lbl_id_back">
                      {t.idBack} <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="file"
                      id="inputIdBack"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'back')}
                    />
                    {idBackBase64 && (
                      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '6px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                        <img
                          src={idBackBase64}
                          alt="ID Back Preview"
                          style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 'bold' }}>
                            {t.backUploaded}
                          </div>
                          <button
                            type="button"
                            onClick={() => setIdBackBase64(undefined)}
                            style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '11px', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                          >
                            {t.deletePhoto}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    className="submit-btn"
                    id="btn_save"
                    onClick={saveData}
                  >
                    {t.saveBtn}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* تذييل الصفحة الرسمي النظيف */}
        <footer style={{ textAlign: 'center', marginTop: '35px', padding: '16px 0', borderTop: '1px solid #e2e8f0', color: '#94a3b8', fontSize: '11px' }}>
          <div>{t.footerText}</div>
        </footer>

        {/* نافذة تسجيل دخول الإدارة بكلمة المرور Admin Password Modal */}
        {isAdminModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '16px',
            }}
            onClick={() => setIsAdminModalOpen(false)}
          >
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '24px',
                maxWidth: '420px',
                width: '100%',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
                borderTop: '4px solid #1a4d2e',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '32px', marginBottom: '6px' }}>🔐</div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 800, color: '#1a4d2e' }}>
                  تسجيل دخول الإدارة
                </h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                  Arresalah Center Berlin • Administration
                </p>
              </div>

              {adminPasswordError && (
                <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', marginBottom: '14px', textAlign: 'center' }}>
                  {adminPasswordError}
                </div>
              )}

              <form onSubmit={handleAdminLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    كلمة مرور الإدارة (Passwort):
                  </label>
                  <input
                    type="password"
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                    autoFocus
                    required
                  />
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>
                    كلمة المرور الافتراضية: admin123 أو Arresalah2026
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      background: '#1a4d2e',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    دخول (Anmelden)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAdminModalOpen(false)}
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      {/* 2. واجهة المعاينة والطباعة Contract View (حصرياً للإدارة بعد تسجيل الدخول) */}
      {isAdminLoggedIn && (
        <div id="contract-view" className={`view-container ${activeTab === 'contract-view' ? 'block' : 'hidden'}`}>
          <div className="print-actions no-print">
            <button
              type="button"
              className="print-btn"
              id="btn_print"
              onClick={() => window.print()}
            >
              <span>🖨️</span>
              <span>{t.printBtn}</span>
            </button>
          </div>

        <div className="a4-page">
          <div className="contract-header">
            <div className="bismillah-text">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            <div className="contract-title">{t.contractTitle}</div>
            <div className="contract-subtitle">{t.contractSubtitle}</div>
            <div style={{ fontSize: '12px', color: '#1a4d2e', fontWeight: 700, marginTop: '4px' }}>
              ARRESALAH CENTER BERLIN e.V. • مركز الرسالة الإسلامي برلين
            </div>
          </div>

          <div className="top-meta">
            <div>
              <strong>{t.dateLabel}</strong> <span id="doc_date">{contract.general.gregorianDate} ({contract.general.hijriDate})</span>
            </div>
            <div>
              <strong>{t.codeLabel}</strong> <span id="doc_contract_code" style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{contract.general.contractCode}</span>
            </div>
            <div>
              <strong>Ort / المكان:</strong> Arresalah e.V. Berlin
            </div>
          </div>

          {/* الزوج والزوجة */}
          <div className="grid-2">
            <div className="section-box">
              {(parties.husband?.photoBase64 || parties.husband?.idFrontBase64) ? (
                <img
                  id="husband_photo"
                  className="profile-photo-box"
                  src={parties.husband.photoBase64 || parties.husband.idFrontBase64}
                  alt="Husband"
                />
              ) : (
                <div className="profile-photo-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#888' }}>
                  Kein Bild
                </div>
              )}
              <div className="box-title">Ehemann / الزوج</div>
              <div className="field-row">
                <strong id="husband_name_de">{parties.husband?.fullName || '--'}</strong>
              </div>
              <div className="field-row" style={{ color: '#555' }} id="husband_name_ar">
                {parties.husband?.fullNameArabic || '--'}
              </div>
              <div className="field-row">
                <span className="field-label">Geburtsdatum, Ort:</span>{' '}
                <span id="husband_birth">
                  {parties.husband?.dateOfBirth ? `${parties.husband.dateOfBirth.day}.${parties.husband.dateOfBirth.month}.${parties.husband.dateOfBirth.year}` : '--'}, {parties.husband?.placeOfBirth || '--'}
                </span>
              </div>
              <div className="field-row">
                <span className="field-label">Mutter:</span>{' '}
                <span id="husband_mother">{parties.husband?.motherName || '--'}</span>
              </div>
              <div className="field-row">
                <span className="field-label">Ausweis-Nr:</span>{' '}
                <span id="husband_id">{parties.husband?.idNumber || '--'}</span>
              </div>
              <div className="field-row">
                <span className="field-label">Anschrift:</span>{' '}
                <span id="husband_address">{parties.husband?.address || '--'}</span>
              </div>
            </div>

            <div className="section-box">
              {(parties.wife?.photoBase64 || parties.wife?.idFrontBase64) ? (
                <img
                  id="wife_photo"
                  className="profile-photo-box"
                  src={parties.wife.photoBase64 || parties.wife.idFrontBase64}
                  alt="Wife"
                />
              ) : (
                <div className="profile-photo-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#888' }}>
                  Kein Bild
                </div>
              )}
              <div className="box-title">Ehefrau / الزوجة</div>
              <div className="field-row">
                <strong id="wife_name_de">{parties.wife?.fullName || '--'}</strong>
              </div>
              <div className="field-row" style={{ color: '#555' }} id="wife_name_ar">
                {parties.wife?.fullNameArabic || '--'}
              </div>
              <div className="field-row">
                <span className="field-label">Geburtsdatum, Ort:</span>{' '}
                <span id="wife_birth">
                  {parties.wife?.dateOfBirth ? `${parties.wife.dateOfBirth.day}.${parties.wife.dateOfBirth.month}.${parties.wife.dateOfBirth.year}` : '--'}, {parties.wife?.placeOfBirth || '--'}
                </span>
              </div>
              <div className="field-row">
                <span className="field-label">Mutter:</span>{' '}
                <span id="wife_mother">{parties.wife?.motherName || '--'}</span>
              </div>
              <div className="field-row">
                <span className="field-label">Ausweis-Nr:</span>{' '}
                <span id="wife_id">{parties.wife?.idNumber || '--'}</span>
              </div>
              <div className="field-row">
                <span className="field-label">Anschrift:</span>{' '}
                <span id="wife_address">{parties.wife?.address || '--'}</span>
              </div>
            </div>
          </div>

          {/* المهر والولي */}
          <div className="grid-2">
            <div className="section-box">
              <div className="box-title">Brautgabe (Mahr) / الصداق المسمى</div>
              <div className="field-row" style={{ fontSize: '13px', paddingTop: '8px' }} id="doc_mahr">
                <strong>Sofort (المعجل):</strong> {contract.dowry.promptAmount} {contract.dowry.promptCurrency} (empfangen / مقبوض)
                <br />
                <span style={{ fontSize: '11px', color: '#555' }}>
                  <strong>Aufgeschoben (المؤجل):</strong> {contract.dowry.deferredAmount} {contract.dowry.deferredCurrency} ({contract.dowry.deferredDueCondition})
                </span>
              </div>
            </div>

            <div className="section-box">
              <div className="box-title">Vertreter der Braut (Waliy) / الولي الشرعي</div>
              <div className="field-row">
                <strong id="waliy_name_de">{parties.guardian?.fullName || '--'}</strong> (
                <span id="waliy_name_ar">{parties.guardian?.fullNameArabic || '--'}</span>)
              </div>
              <div className="field-row">
                <span className="field-label">Geburtsdatum, Ort:</span>{' '}
                <span id="waliy_birth">
                  {parties.guardian?.dateOfBirth ? `${parties.guardian.dateOfBirth.day}.${parties.guardian.dateOfBirth.month}.${parties.guardian.dateOfBirth.year}` : '--'}, {parties.guardian?.placeOfBirth || '--'}
                </span>
              </div>
              <div className="field-row">
                <span className="field-label">Ausweis-Nr:</span>{' '}
                <span id="waliy_id">{parties.guardian?.idNumber || '--'}</span>
              </div>
              <div className="field-row">
                <span className="field-label">Anschrift:</span>{' '}
                <span id="waliy_address">{parties.guardian?.address || '--'}</span>
              </div>
            </div>
          </div>

          {/* الشاهدان */}
          <div className="grid-2">
            <div className="section-box">
              <div className="box-title">Zeuge 1 / الشاهد الأول</div>
              <div className="field-row">
                <strong id="w1_name_de">{parties.witness1?.fullName || '--'}</strong> (
                <span id="w1_name_ar">{parties.witness1?.fullNameArabic || '--'}</span>)
              </div>
              <div className="field-row">
                <span className="field-label">Geburtsdatum, Ort:</span>{' '}
                <span id="w1_birth">
                  {parties.witness1?.dateOfBirth ? `${parties.witness1.dateOfBirth.day}.${parties.witness1.dateOfBirth.month}.${parties.witness1.dateOfBirth.year}` : '--'}, {parties.witness1?.placeOfBirth || '--'}
                </span>
              </div>
              <div className="field-row">
                <span className="field-label">Ausweis-Nr:</span>{' '}
                <span id="w1_id">{parties.witness1?.idNumber || '--'}</span>
              </div>
              <div className="field-row">
                <span className="field-label">Anschrift:</span>{' '}
                <span id="w1_address">{parties.witness1?.address || '--'}</span>
              </div>
            </div>

            <div className="section-box">
              <div className="box-title">Zeuge 2 / الشاهد الثاني</div>
              <div className="field-row">
                <strong id="w2_name_de">{parties.witness2?.fullName || '--'}</strong> (
                <span id="w2_name_ar">{parties.witness2?.fullNameArabic || '--'}</span>)
              </div>
              <div className="field-row">
                <span className="field-label">Geburtsdatum, Ort:</span>{' '}
                <span id="w2_birth">
                  {parties.witness2?.dateOfBirth ? `${parties.witness2.dateOfBirth.day}.${parties.witness2.dateOfBirth.month}.${parties.witness2.dateOfBirth.year}` : '--'}, {parties.witness2?.placeOfBirth || '--'}
                </span>
              </div>
              <div className="field-row">
                <span className="field-label">Ausweis-Nr:</span>{' '}
                <span id="w2_id">{parties.witness2?.idNumber || '--'}</span>
              </div>
              <div className="field-row">
                <span className="field-label">Anschrift:</span>{' '}
                <span id="w2_address">{parties.witness2?.address || '--'}</span>
              </div>
            </div>
          </div>

          {/* الإقرار الشرعي */}
          <div className="declaration-text">
            {t.declaration}
          </div>

          {/* التواقيع والختم */}
          <div className="signatures-row">
            <div className="sig-box">
              <div>Unterschrift Ehemann</div>
              <div style={{ fontWeight: 'bold' }}>توقيع الزوج</div>
            </div>
            <div className="sig-box">
              <div>Unterschrift Ehefrau</div>
              <div style={{ fontWeight: 'bold' }}>توقيع الزوجة</div>
            </div>
            <div className="sig-box">
              <div>Unterschrift Vormund (Waliy)</div>
              <div style={{ fontWeight: 'bold' }}>توقيع الولي</div>
            </div>
            <div className="sig-box" style={{ marginTop: '15px' }}>
              <div>Unterschrift Zeuge 1</div>
              <div style={{ fontWeight: 'bold' }}>توقيع الشاهد الأول</div>
            </div>
            <div className="sig-box" style={{ marginTop: '15px' }}>
              <div>Unterschrift Zeuge 2</div>
              <div style={{ fontWeight: 'bold' }}>توقيع الشاهد الثاني</div>
            </div>
            <div className="sig-box" style={{ marginTop: '15px' }}>
              <div style={{ border: '2px dashed #1a4d2e', width: '55px', height: '55px', borderRadius: '50%', margin: '0 auto 4px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: '#1a4d2e', fontWeight: 'bold' }}>
                SIEGEL
              </div>
              <div style={{ fontWeight: 'bold', color: '#1a4d2e' }}>Imam & Siegel (الختم الرسمي)</div>
            </div>
          </div>

          {/* معاينة صور الهويات المرفوعة */}
          {(parties.husband?.idFrontBase64 || parties.wife?.idFrontBase64 || parties.husband?.idBackBase64 || parties.wife?.idBackBase64) && (
            <div className="id-cards-preview no-print">
              <h5 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 'bold', color: '#1a4d2e' }}>
                Ausweiskopien / صور بطاقات الهوية المرفوعة:
              </h5>
              <div className="id-cards-grid">
                {parties.husband?.idFrontBase64 && (
                  <div className="id-card-item">
                    <img src={parties.husband.idFrontBase64} alt="Husband ID Front" />
                    <div className="upload-status">Ehemann: Vorderseite (الزوج - الوجه الأمامي)</div>
                  </div>
                )}
                {parties.husband?.idBackBase64 && (
                  <div className="id-card-item">
                    <img src={parties.husband.idBackBase64} alt="Husband ID Back" />
                    <div className="upload-status">Ehemann: Rückseite (الزوج - الوجه الخلفي)</div>
                  </div>
                )}
                {parties.wife?.idFrontBase64 && (
                  <div className="id-card-item">
                    <img src={parties.wife.idFrontBase64} alt="Wife ID Front" />
                    <div className="upload-status">Ehefrau: Vorderseite (الزوجة - الوجه الأمامي)</div>
                  </div>
                )}
                {parties.wife?.idBackBase64 && (
                  <div className="id-card-item">
                    <img src={parties.wife.idBackBase64} alt="Wife ID Back" />
                    <div className="upload-status">Ehefrau: Rückseite (الزوجة - الوجه الخلفي)</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      )}
      </>
      )}
    </div>
  );
}
