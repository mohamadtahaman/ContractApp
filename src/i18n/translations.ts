import { Language } from '../types';

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  centerName: string;
  centerAddress: string;
  centerDescription: string;
  contractCode: string;
  generateBatch: string;
  batchCodes: string;
  newContract: string;
  saveContract: string;
  switchContract: string;
  contractStatus: string;
  printCertificate: string;
  toggleCodeView: string;
  codeViewTitle: string;
  codeViewSubtitle: string;
  copyHtml: string;
  downloadHtml: string;
  copiedSuccess: string;
  
  // Progress Circle
  progressTitle: string;
  progressSubtitle: string;
  completionRate: string;
  partiesCount: string;
  readyToSolemnize: string;
  pendingParties: string;
  
  // Parties
  husband: string;
  wife: string;
  guardian: string;
  witness1: string;
  witness2: string;
  
  husbandDesc: string;
  wifeDesc: string;
  guardianDesc: string;
  witness1Desc: string;
  witness2Desc: string;
  
  // Form fields
  personalInfo: string;
  fullNameLatin: string;
  fullNameArabic: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  religion: string;
  maritalStatus: string;
  single: string;
  divorced: string;
  widowed: string;
  contactAddress: string;
  residentialAddress: string;
  phone: string;
  email: string;
  
  // Identification
  idDocuments: string;
  idType: string;
  passport: string;
  nationalId: string;
  idNumber: string;
  issuingAuthority: string;
  
  // Uploads
  photoUpload: string;
  idFrontUpload: string;
  idBackUpload: string;
  dragDropOrClick: string;
  removeImage: string;
  uploadHint: string;
  
  // Guardian specific
  guardianRelation: string;
  father: string;
  brother: string;
  uncle: string;
  legalRepresentative: string;
  guardianApprovalReason: string;
  guardianApprovalHint: string;
  
  // Dowry & Conditions
  dowryAndConditions: string;
  promptMahr: string;
  deferredMahr: string;
  amount: string;
  currency: string;
  promptStatus: string;
  paidInFull: string;
  receivedByBride: string;
  dueUponRequest: string;
  deferredCondition: string;
  deferredDefaultCondition: string;
  specialStipulations: string;
  specialStipulationsPlaceholder: string;
  
  // General Info
  generalContractDetails: string;
  gregorianDateLabel: string;
  hijriDateLabel: string;
  officiantNameLabel: string;
  registryNumberLabel: string;
  
  // Buttons & Actions
  submitPartyData: string;
  partyCompleted: string;
  editPartyData: string;
  resetAll: string;
  loadSampleData: string;
  demoLoaded: string;
  savedSuccessfully: string;
  validationError: string;
  fieldRequired: string;
  
  // Certificate view
  certificatePreview: string;
  certificateOfficialTitle: string;
  basmala: string;
  quranAyah: string;
  quranSurah: string;
  certificatePreamble: string;
  solemnizedUnderIslam: string;
  signatureHusband: string;
  signatureWife: string;
  signatureGuardian: string;
  signatureWitness1: string;
  signatureWitness2: string;
  signatureImam: string;
  officialStamp: string;
  
  // Custom Date Picker
  day: string;
  month: string;
  year: string;
  selectDay: string;
  selectMonth: string;
  selectYear: string;
}

export const translations: Record<Language, Translations> = {
  de: {
    appTitle: 'Islamische Eheschließungsurkunde',
    appSubtitle: 'Offizielles Registrierungssystem für islamische Eheverträge',
    centerName: 'Arresalah Center Berlin e.V.',
    centerAddress: 'Gerichtstraße 38, 13347 Berlin, Deutschland',
    centerDescription: 'Islamische Gemeinde & Kulturzentrum Berlin',
    contractCode: 'Vertragscode',
    generateBatch: 'CTR-Codes generieren',
    batchCodes: 'Verfügbare Vertragscodes (Stapel)',
    newContract: 'Neuer Vertrag',
    saveContract: 'Vertrag speichern',
    switchContract: 'Vertrag wechseln',
    contractStatus: 'Vertragsstatus',
    printCertificate: 'A4-Urkunde drucken / PDF',
    toggleCodeView: 'HTML5-Code & Entwickleransicht',
    codeViewTitle: 'Eigenständige HTML5-Einzeldatei & Code-Export',
    codeViewSubtitle: 'Kompiliertes, autarkes Dokument mit integriertem CSS & JS zur Veröffentlichung auf GitHub Pages.',
    copyHtml: 'Vollständigen HTML5-Code kopieren',
    downloadHtml: 'Standalone-HTML5 herunterladen (.html)',
    copiedSuccess: 'In die Zwischenablage kopiert!',
    
    progressTitle: '5-Parteien-Fortschrittsradar',
    progressSubtitle: 'Erfassung aller 5 obligatorischen Vertragsparteien gemäß islamischem Scharia-Recht',
    completionRate: 'Fertigstellungsgrad',
    partiesCount: 'Parteien erfasst',
    readyToSolemnize: 'Bereit zur feierlichen Eheschließung & Unterzeichnung',
    pendingParties: 'Ausstehende Parteien zur Vervollständigung',
    
    husband: 'Ehemann (الزوج)',
    wife: 'Ehefrau (الزوجة)',
    guardian: 'Brautvormund (الولي)',
    witness1: '1. Trauzeuge (الشاهد الأول)',
    witness2: '2. Trauzeuge (الشاهد الثاني)',
    
    husbandDesc: 'Bräutigam & Hauptvertragspartei',
    wifeDesc: 'Braut & Hauptvertragspartei',
    guardianDesc: 'Wali der Braut (Vater, Bruder oder Bevollmächtigter)',
    witness1Desc: 'Erster volljähriger männlicher Zeuge',
    witness2Desc: 'Zweiter volljähriger männlicher Zeuge',
    
    personalInfo: 'Persönliche Angaben',
    fullNameLatin: 'Vollständiger Name (Lateinische Schrift laut Ausweis)',
    fullNameArabic: 'Vollständiger Name (Arabische Schrift)',
    dateOfBirth: 'Geburtsdatum',
    placeOfBirth: 'Geburtsort & Land',
    nationality: 'Staatsangehörigkeit',
    religion: 'Religionszugehörigkeit',
    maritalStatus: 'Familienstand vor der Ehe',
    single: 'Ledig',
    divorced: 'Geschieden',
    widowed: 'Verwitwet',
    contactAddress: 'Wohnadresse in Deutschland',
    residentialAddress: 'Straße, Hausnummer, PLZ & Stadt',
    phone: 'Telefonnummer',
    email: 'E-Mail-Adresse',
    
    idDocuments: 'Ausweisdokumente & Verifikation',
    idType: 'Dokumentenart',
    passport: 'Reisepass',
    nationalId: 'Personalausweis / Aufenthaltstitel',
    idNumber: 'Dokumenten- / Passnummer',
    issuingAuthority: 'Ausstellungsbehörde & Gültigkeit',
    
    photoUpload: 'Passfoto (Profil)',
    idFrontUpload: 'Ausweis Vorderseite',
    idBackUpload: 'Ausweis Rückseite',
    dragDropOrClick: 'Klicken oder Datei hierher ziehen (Base64)',
    removeImage: 'Bild entfernen',
    uploadHint: 'Wird lokal im Browser verschlüsselt gespeichert (keine Cloud-Übertragung erforderlich)',
    
    guardianRelation: 'Verwandtschaftsgrad zur Braut',
    father: 'Leiblicher Vater (الأب)',
    brother: 'Bruder (الأخ)',
    uncle: 'Onkel väterlicherseits (العم)',
    legalRepresentative: 'Islamischer Notar / Bevollmächtigter (وكيل شرعي)',
    guardianApprovalReason: 'Vollmachtsgrundlage / Genehmigungsvermerk',
    guardianApprovalHint: 'Erforderlich für die kanonische Gültigkeit der Heirat nach islamischem Recht.',
    
    dowryAndConditions: 'Mahr (Brautgabe / الصداق) & Vereinbarungen',
    promptMahr: 'Sofortige Brautgabe (Mahr Mu\'ajjal / الصداق المعجل)',
    deferredMahr: 'Aufgeschobene Brautgabe (Mahr Mu\'ajjal / الصداق المؤجل)',
    amount: 'Betrag',
    currency: 'Währung',
    promptStatus: 'Zahlungsstatus des Sofortmahrs',
    paidInFull: 'Bereits vor Vertragsschluss vollständig übergeben',
    receivedByBride: 'In der Sitzung durch die Braut entgegengenommen',
    dueUponRequest: 'Fällig bei Vollzug',
    deferredCondition: 'Fälligkeitsbedingung der aufgeschobenen Brautgabe',
    deferredDefaultCondition: 'Fällig bei Scheidung oder Tod eines der Ehegatten (عند أحد الأجلين)',
    specialStipulations: 'Besondere vertragliche Vereinbarungen & Bedingungen',
    specialStipulationsPlaceholder: 'z.B. Fortführung des Studiums, Gütertrennung, Ausübung der Erwerbstätigkeit...',
    
    generalContractDetails: 'Allgemeine Vertrags- & Registrierungsdaten',
    gregorianDateLabel: 'Datum der Trauung (Gregorianisch)',
    hijriDateLabel: 'Islamisches Datum (Hidschra)',
    officiantNameLabel: 'Zuständiger Imam / Traupriester',
    registryNumberLabel: 'Offizielle Registrierungsnummer',
    
    submitPartyData: 'Daten speichern & Partei bestätigen',
    partyCompleted: 'Partei vollständig verifiziert',
    editPartyData: 'Angaben bearbeiten',
    resetAll: 'Formular zurücksetzen',
    loadSampleData: 'Musterdaten laden (Demo)',
    demoLoaded: 'Musterdaten für alle 5 Parteien wurden erfolgreich geladen!',
    savedSuccessfully: 'Eingaben wurden im Browser gespeichert.',
    validationError: 'Bitte korrigieren Sie die rot markierten Pflichtfelder.',
    fieldRequired: 'Dieses Feld ist erforderlich',
    
    certificatePreview: 'Vorschau der Eheschließungsurkunde (A4)',
    certificateOfficialTitle: 'Islamische Eheschließungsurkunde',
    basmala: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    quranAyah: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    quranSurah: '(Sure Ar-Rum, Vers 21)',
    certificatePreamble: 'Nach den Bestimmungen des edlen islamischen Scharia-Rechts und der Sunna des Propheten Muhammad (Friede und Segen seien auf ihm) wurde vor der autorisierten religiösen Vertretung des Arresalah Centers Berlin die rechtsgültige Eheschließung vollzogen zwischen:',
    solemnizedUnderIslam: 'Die Ehe wurde mit gegenseitigem Einverständnis, rechtsgültigem Angebot und Annahme (Ijab & Qabul), im Beisein des Brautvormunds und zweier ehrbarer muslimischer Zeugen vollzogen.',
    signatureHusband: 'Unterschrift des Ehemanns',
    signatureWife: 'Unterschrift der Ehefrau',
    signatureGuardian: 'Unterschrift des Vormunds',
    signatureWitness1: 'Unterschrift des 1. Zeugen',
    signatureWitness2: 'Unterschrift des 2. Zeugen',
    signatureImam: 'Unterschrift & Siegel des Imams',
    officialStamp: 'Dienstsiegel der Gemeinde',
    
    day: 'Tag',
    month: 'Monat',
    year: 'Jahr',
    selectDay: 'Tag wählen',
    selectMonth: 'Monat wählen',
    selectYear: 'Jahr wählen',
  },
  ar: {
    appTitle: 'وثيقة عقد الزواج الشرعي الإسلامي',
    appSubtitle: 'نظام توثيق وتسجيل عقود الزواج - مركز الرسالة برلين',
    centerName: 'مركز الرسالة الإسلامي برلين (Arresalah Center Berlin e.V.)',
    centerAddress: 'Gerichtstraße 38, 13347 Berlin, Deutschland',
    centerDescription: 'الجمعية والمركز الإسلامي والثقافي - برلين',
    contractCode: 'رمز العقد (CTR)',
    generateBatch: 'توليد حزمة رموز CTR',
    batchCodes: 'حزمة رموز العقود المعتمدة',
    newContract: 'عقد جديد',
    saveContract: 'حفظ العقد',
    switchContract: 'تبديل العقد',
    contractStatus: 'حالة العقد',
    printCertificate: 'طباعة الوثيقة الرسمية A4 / حفظ PDF',
    toggleCodeView: 'عرض الكود وتصدير ملف HTML5 الأحادي',
    codeViewTitle: 'ملف HTML5 الموحد والمستقل للنشر على GitHub Pages',
    codeViewSubtitle: 'كود كامل ومستقل يحتوي على CSS و JavaScript مدمجة ومجهزة بالكامل للعمل فوراً دون خادم.',
    copyHtml: 'نسخ كود HTML5 بالكامل',
    downloadHtml: 'تحميل ملف standalone-urkunde.html',
    copiedSuccess: 'تم النسخ إلى الحافظة بنجاح!',
    
    progressTitle: 'مؤشر أطراف العقد الخمسة (Segment Progress)',
    progressSubtitle: 'متابعة استيفاء أركان العقد الشرعي الخمسة وفق الشريعة الإسلامية',
    completionRate: 'نسبة الاكتمال',
    partiesCount: 'الأطراف المكتملة',
    readyToSolemnize: 'اكتملت جميع الأطراف - العقد جاهز للإبرام والطباعة',
    pendingParties: 'أطراف بانتظار استكمال البيانات والوثائق',
    
    husband: 'الزوج (Ehemann)',
    wife: 'الزوجة (Ehefrau)',
    guardian: 'الولي الشرعي (Brautvormund)',
    witness1: 'الشاهد الأول (1. Zeuge)',
    witness2: 'الشاهد الثاني (2. Zeuge)',
    
    husbandDesc: 'الطرف الأول في عقد النكاح الشرعي',
    wifeDesc: 'الطرف الثاني في عقد النكاح الشرعي',
    guardianDesc: 'ولي أمر الزوجة (الأب أو الأخ أو الوكيل الشرعي)',
    witness1Desc: 'الشاهد العدل الأول المكلف',
    witness2Desc: 'الشاهد العدل الثاني المكلف',
    
    personalInfo: 'البيانات الشخصية والتعريفية',
    fullNameLatin: 'الاسم الكامل بالحروف اللاتينية (وفق جواز السفر/الهوية)',
    fullNameArabic: 'الاسم الكامل باللغة العربية',
    dateOfBirth: 'تاريخ الميلاد',
    placeOfBirth: 'مكان الميلاد والدولة',
    nationality: 'الجنسية',
    religion: 'الديانة',
    maritalStatus: 'الحالة الاجتماعية قبل العقد',
    single: 'أعزب / عزباء',
    divorced: 'مطلق / مطلقة',
    widowed: 'أرمل / أرملة',
    contactAddress: 'عنوان الإقامة في برلين / ألمانيا',
    residentialAddress: 'الشارع، رقم البناء، الرمز البريدي والمدينة',
    phone: 'رقم الهاتف للتواصل',
    email: 'البريد الإلكتروني',
    
    idDocuments: 'الوثائق الثبوتية والتحقق',
    idType: 'نوع الوثيقة',
    passport: 'جواز سفر',
    nationalId: 'بطاقة هوية شخصية / إقامة رسمية',
    idNumber: 'رقم الوثيقة / الجواز',
    issuingAuthority: 'جهة الإصدار وتاريخ الصلاحية',
    
    photoUpload: 'الصورة الشخصية (Passfoto)',
    idFrontUpload: 'صورة الوثيقة (الوجه الأمامي)',
    idBackUpload: 'صورة الوثيقة (الوجه الخلفي)',
    dragDropOrClick: 'انقر أو اسحب الصورة هنا (Base64 آمن)',
    removeImage: 'حذف الصورة',
    uploadHint: 'تُحفظ الصور مباشرة في التخزين المحلي الآمن بالمتصفح دون رفعها لخوادم خارجية.',
    
    guardianRelation: 'صلة قرابة الولي بالزوجة',
    father: 'الأب الشرعي',
    brother: 'الأخ',
    uncle: 'العم الشقيق',
    legalRepresentative: 'وكيل شرعي معتمد / المأذون',
    guardianApprovalReason: 'صفة وسند الولاية الشرعية',
    guardianApprovalHint: 'شرط لصحة العقد وفق أحكام الفقه الإسلامي.',
    
    dowryAndConditions: 'المهر (الصداق) والشروط والاتفاقات',
    promptMahr: 'المهر المعجل (Mahr Mu\'ajjal)',
    deferredMahr: 'المهر المؤجل (Mahr Mu\'ajjal)',
    amount: 'المبلغ المالي',
    currency: 'العملة (EUR)',
    promptStatus: 'حالة تسليم المهر المعجل',
    paidInFull: 'مقبوض ومسلم بالكامل قبل كتابة العقد',
    receivedByBride: 'تم قبضه في مجلس العقد بيد الزوجة',
    dueUponRequest: 'مستحق عند الطلب',
    deferredCondition: 'شرط استحقاق المهر المؤجل',
    deferredDefaultCondition: 'يُستحق عند أقرب الأجلين (الوفاة أو الطلاق البائن)',
    specialStipulations: 'الشروط الخاصة المتفق عليها بين الزوجين',
    specialStipulationsPlaceholder: 'مثال: إتمام الدراسة والتعليم، شروط السكن، الاحتفاظ بالعمل...',
    
    generalContractDetails: 'بيانات العقد والتوثيق الرسمية',
    gregorianDateLabel: 'تاريخ العقد الميلادي',
    hijriDateLabel: 'تاريخ العقد الهجري المبارك',
    officiantNameLabel: 'اسم الشيخ / المأذون الشرعي',
    registryNumberLabel: 'رقم القيد والسجل الرسمي',
    
    submitPartyData: 'حفظ واعتماد بيانات الطرف',
    partyCompleted: 'تم اعتماد بيانات الطرف بنجاح',
    editPartyData: 'تعديل البيانات',
    resetAll: 'إعادة ضبط البيانات',
    loadSampleData: 'تحميل بيانات تجريبية جاهزة (Demo)',
    demoLoaded: 'تم استيراد بيانات نموذجية لكافة الأطراف الخمسة بنجاح!',
    savedSuccessfully: 'تم حفظ كافة التعديلات في الذاكرة المحلية للمتصفح.',
    validationError: 'يرجى مراجعة الحقول المطلوبة والمحددة باللون الأحمر.',
    fieldRequired: 'هذا الحقل مطلوب',
    
    certificatePreview: 'معاينة الوثيقة الرسمية للطباعة (A4)',
    certificateOfficialTitle: 'عقد زواج إسلامي شرعي',
    basmala: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    quranAyah: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    quranSurah: '﴿ سورة الروم - الآية 21 ﴾',
    certificatePreamble: 'الحمد لله الذي أحل النكاح وحرم السفاح، والصلاة والسلام على رسول الله؛ تم بحمد الله وتوفيقه في مركز الرسالة الإسلامي ببرلين إبرام عقد الزواج الشرعي بين كل من:',
    solemnizedUnderIslam: 'وقد تم هذا العقد المبارك بالإيجاب والقبول الشرعيين، ورضا الطرفين، وبإذن وحضور الولي الشرعي، وشهادة الشاهدين العدلين المذكورين أعلاه.',
    signatureHusband: 'توقيع الزوج',
    signatureWife: 'توقيع الزوجة',
    signatureGuardian: 'توقيع الولي الشرعي',
    signatureWitness1: 'توقيع الشاهد الأول',
    signatureWitness2: 'توقيع الشاهد الثاني',
    signatureImam: 'توقيع وختم المأذون الشرعي',
    officialStamp: 'الختم الرسمي للمركز',
    
    day: 'اليوم',
    month: 'الشهر',
    year: 'السنة',
    selectDay: 'اختر اليوم',
    selectMonth: 'اختر الشهر',
    selectYear: 'اختر السنة',
  },
  en: {
    appTitle: 'Islamic Marriage Contract Certificate',
    appSubtitle: 'Official Registry & Certification System - Arresalah Center Berlin',
    centerName: 'Arresalah Center Berlin e.V.',
    centerAddress: 'Gerichtstraße 38, 13347 Berlin, Germany',
    centerDescription: 'Islamic Community & Cultural Center Berlin',
    contractCode: 'Contract Code (CTR)',
    generateBatch: 'Generate CTR Codes',
    batchCodes: 'Approved Contract Codes Batch',
    newContract: 'New Contract',
    saveContract: 'Save Contract',
    switchContract: 'Switch Contract',
    contractStatus: 'Contract Status',
    printCertificate: 'Print Official A4 Certificate / PDF',
    toggleCodeView: 'HTML5 Code & Developer View',
    codeViewTitle: 'Single-File Standalone HTML5 & Code Export',
    codeViewSubtitle: 'Self-contained file with embedded CSS & JS, ready for instant GitHub Pages hosting.',
    copyHtml: 'Copy Entire HTML5 Code',
    downloadHtml: 'Download Standalone HTML (.html)',
    copiedSuccess: 'Copied to clipboard successfully!',
    
    progressTitle: '5-Party Segment Radar',
    progressSubtitle: 'Verification of all 5 mandatory contract parties under Islamic jurisprudence',
    completionRate: 'Completion Rate',
    partiesCount: 'Parties Verified',
    readyToSolemnize: 'All parties completed - Ready for solemnization & printing',
    pendingParties: 'Pending parties awaiting completion',
    
    husband: 'Husband (الزوج)',
    wife: 'Wife (الزوجة)',
    guardian: 'Guardian / Wali (الولي)',
    witness1: 'Witness 1 (الشاهد الأول)',
    witness2: 'Witness 2 (الشاهد الثاني)',
    
    husbandDesc: 'Groom & Primary Contracting Party',
    wifeDesc: 'Bride & Primary Contracting Party',
    guardianDesc: 'Bride\'s Guardian (Father, Brother, or Legal Representative)',
    witness1Desc: 'First Adult Male Witness',
    witness2Desc: 'Second Adult Male Witness',
    
    personalInfo: 'Personal Information',
    fullNameLatin: 'Full Name in Latin Characters (As in Passport/ID)',
    fullNameArabic: 'Full Name in Arabic Script',
    dateOfBirth: 'Date of Birth',
    placeOfBirth: 'Place & Country of Birth',
    nationality: 'Nationality',
    religion: 'Religion',
    maritalStatus: 'Marital Status prior to marriage',
    single: 'Single',
    divorced: 'Divorced',
    widowed: 'Widowed',
    contactAddress: 'Address in Germany',
    residentialAddress: 'Street, Number, Postal Code & City',
    phone: 'Phone Number',
    email: 'Email Address',
    
    idDocuments: 'Identification Documents',
    idType: 'Document Type',
    passport: 'Passport',
    nationalId: 'National ID / Residence Permit',
    idNumber: 'Document / Passport Number',
    issuingAuthority: 'Issuing Authority & Validity',
    
    photoUpload: 'Profile Photo (Passport size)',
    idFrontUpload: 'ID Document Front Side',
    idBackUpload: 'ID Document Back Side',
    dragDropOrClick: 'Click or drag file here (Base64)',
    removeImage: 'Remove image',
    uploadHint: 'Stored locally in browser storage (no external cloud upload required)',
    
    guardianRelation: 'Relation to the Bride',
    father: 'Biological Father',
    brother: 'Brother',
    uncle: 'Paternal Uncle',
    legalRepresentative: 'Authorized Islamic Representative',
    guardianApprovalReason: 'Basis of Guardianship Authority',
    guardianApprovalHint: 'Mandatory for canonical validity in Islamic law.',
    
    dowryAndConditions: 'Mahr (Dowry) & Stipulations',
    promptMahr: 'Prompt Dowry (Mahr Mu\'ajjal)',
    deferredMahr: 'Deferred Dowry (Mahr Mu\'ajjal)',
    amount: 'Amount',
    currency: 'Currency (EUR)',
    promptStatus: 'Prompt Dowry Payment Status',
    paidInFull: 'Paid in full prior to contract signing',
    receivedByBride: 'Received by bride during the marriage session',
    dueUponRequest: 'Due upon consummation / demand',
    deferredCondition: 'Deferred Dowry Maturity Condition',
    deferredDefaultCondition: 'Due upon divorce or death of either spouse',
    specialStipulations: 'Special Mutual Conditions & Agreements',
    specialStipulationsPlaceholder: 'e.g., Continuing higher education, residence terms, professional career...',
    
    generalContractDetails: 'Official Registration Details',
    gregorianDateLabel: 'Solemnization Date (Gregorian)',
    hijriDateLabel: 'Islamic Date (Hijri)',
    officiantNameLabel: 'Presiding Sheikh / Officiant',
    registryNumberLabel: 'Official Registration Number',
    
    submitPartyData: 'Save & Confirm Party Data',
    partyCompleted: 'Party verified successfully',
    editPartyData: 'Edit Information',
    resetAll: 'Reset All Data',
    loadSampleData: 'Load Demo Sample Data',
    demoLoaded: 'Sample contract data loaded for all 5 parties!',
    savedSuccessfully: 'All changes saved to browser local storage.',
    validationError: 'Please check the highlighted required fields.',
    fieldRequired: 'This field is required',
    
    certificatePreview: 'Official Marriage Certificate (A4 Preview)',
    certificateOfficialTitle: 'Islamic Marriage Contract Certificate',
    basmala: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    quranAyah: 'And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.',
    quranSurah: '(Surah Ar-Rum, Verse 21)',
    certificatePreamble: 'In accordance with Islamic Sharia law and the tradition of the Prophet Muhammad (Peace Be Upon Him), the marriage was solemnly concluded at Arresalah Center Berlin between:',
    solemnizedUnderIslam: 'Concluded with mutual consent, offer and acceptance (Ijab & Qabul), under the authority of the lawful guardian and in the presence of two upright Muslim witnesses.',
    signatureHusband: 'Husband\'s Signature',
    signatureWife: 'Wife\'s Signature',
    signatureGuardian: 'Guardian\'s Signature',
    signatureWitness1: 'Witness 1 Signature',
    signatureWitness2: 'Witness 2 Signature',
    signatureImam: 'Imam\'s Signature & Seal',
    officialStamp: 'Official Seal of the Center',
    
    day: 'Day',
    month: 'Month',
    year: 'Year',
    selectDay: 'Select day',
    selectMonth: 'Select month',
    selectYear: 'Select year',
  }
};
