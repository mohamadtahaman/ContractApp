import { MarriageContract, PartyData, PartyRole } from '../types';

const STORAGE_KEY_CONTRACTS = 'arresalah_marriage_contracts_v1';
const STORAGE_KEY_ACTIVE_CODE = 'arresalah_active_contract_code_v1';
const STORAGE_KEY_BATCH_CODES = 'arresalah_batch_ctr_codes_v1';

// Generate safe CTR-style code (e.g. CTR-8X2K9P)
export function generateContractCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CTR-${result}`;
}

export function generateBatchCodes(count: number = 10): string[] {
  const codes: string[] = [];
  while (codes.length < count) {
    const code = generateContractCode();
    if (!codes.includes(code)) {
      codes.push(code);
    }
  }
  return codes;
}

export function createEmptyParty(role: PartyRole): PartyData {
  return {
    role,
    fullName: '',
    fullNameArabic: '',
    dateOfBirth: { day: '15', month: '06', year: '1998' },
    placeOfBirth: '',
    nationality: '',
    religion: 'Islam',
    maritalStatus: 'Ledig',
    address: 'Berlin, Deutschland',
    phone: '',
    email: '',
    idType: 'passport',
    idNumber: '',
    idAuthority: 'Berlin',
    relationToWife: role === 'guardian' ? 'father' : undefined,
    guardianApprovalReason: role === 'guardian' ? 'Leiblicher Vater und gesetzlicher Vormund nach islamischem Recht' : undefined,
    isCompleted: false,
  };
}

export function createNewContract(contractCode?: string): MarriageContract {
  const code = contractCode || generateContractCode();
  const now = new Date();
  const gregorianStr = now.toISOString().split('T')[0];
  
  return {
    id: `contract_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    general: {
      contractCode: code,
      registryNumber: `BER-${now.getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
      gregorianDate: gregorianStr,
      hijriDate: '15 Rabiʿ al-Awwal 1448 H',
      placeOfSolemnization: 'Arresalah Center Berlin e.V., Gerichtstraße 38, 13347 Berlin',
      officiantName: 'Sheikh Dr. Ahmad Al-Husseini',
      officiantTitle: 'Imam & Autorisierter Eheschließungsbeauftragter',
      mosqueName: 'Arresalah Center Berlin e.V.',
    },
    dowry: {
      promptAmount: '3000',
      promptCurrency: 'EUR',
      promptStatus: 'received',
      deferredAmount: '5000',
      deferredCurrency: 'EUR',
      deferredDueCondition: 'Bei Scheidung oder Ableben eines der Ehepartner (عند أحد الأجلين)',
      specialConditions: 'Beiderseitiges Einverständnis zur Fortführung des Hochschulstudiums der Ehefrau und eigenständiges Verfügungsrecht über ihr Vermögen.',
    },
    parties: {
      husband: createEmptyParty('husband'),
      wife: createEmptyParty('wife'),
      guardian: createEmptyParty('guardian'),
      witness1: createEmptyParty('witness1'),
      witness2: createEmptyParty('witness2'),
    },
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    status: 'draft',
  };
}

// Convert uploaded image file to Base64 data URL
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // If image is larger than 1.5MB, scale down using canvas to prevent exceeding localStorage quota
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (file.type.startsWith('image/')) {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 800; // ample for A4 print and avatar
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', 0.82);
            resolve(compressed);
            return;
          }
          resolve(result);
        };
        img.onerror = () => resolve(result);
        img.src = result;
      } else {
        resolve(result);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

// Storage Operations
export function getSavedContracts(): Record<string, MarriageContract> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONTRACTS);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse contracts from localStorage:', e);
    return {};
  }
}

export function saveContractToStorage(contract: MarriageContract): void {
  try {
    const all = getSavedContracts();
    all[contract.general.contractCode] = {
      ...contract,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY_CONTRACTS, JSON.stringify(all));
  } catch (e) {
    console.error('Failed to save contract to localStorage:', e);
  }
}

export function getActiveContractCode(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY_ACTIVE_CODE);
  } catch {
    return null;
  }
}

export function setActiveContractCode(code: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_ACTIVE_CODE, code);
  } catch (e) {
    console.error(e);
  }
}

export function getBatchCodesFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BATCH_CODES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error(e);
  }
  const defaultBatch = generateBatchCodes(8);
  saveBatchCodesToStorage(defaultBatch);
  return defaultBatch;
}

export function saveBatchCodesToStorage(codes: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_BATCH_CODES, JSON.stringify(codes));
  } catch (e) {
    console.error(e);
  }
}

// Load high quality sample demo contract with all 5 parties completed
export function getSampleDemoContract(): MarriageContract {
  return {
    id: 'demo_contract_berlin_01',
    general: {
      contractCode: 'CTR-8X2K9P',
      registryNumber: 'BER-2026/048',
      gregorianDate: '2026-09-21',
      hijriDate: '10 Rabīʿ al-Awwal 1448 H',
      placeOfSolemnization: 'Arresalah Center Berlin e.V., Gerichtstraße 38, 13347 Berlin',
      officiantName: 'Sheikh Dr. Ahmad Al-Husseini',
      officiantTitle: 'Autorisierter Imam & Eheschließungsbeauftragter',
      mosqueName: 'Arresalah Center Berlin e.V. (مركز الرسالة برلين)',
    },
    dowry: {
      promptAmount: '3500',
      promptCurrency: 'EUR',
      promptStatus: 'received',
      deferredAmount: '5000',
      deferredCurrency: 'EUR',
      deferredDueCondition: 'Fällig bei Scheidung oder Tod eines der Ehepartner (عند أحد الأجلين)',
      specialConditions: 'Die Eheleute vereinbaren beiderseitigen Respekt, freie Ausübung des Berufs der Ehefrau und Wohnsitz im Großraum Berlin.',
    },
    parties: {
      husband: {
        role: 'husband',
        fullName: 'Tariq Mansoor',
        fullNameArabic: 'طارق منصور',
        dateOfBirth: { day: '14', month: '04', year: '1995' },
        placeOfBirth: 'Damaskus, Syrien',
        nationality: 'Deutsch / Syrisch',
        religion: 'Islam',
        maritalStatus: 'Ledig',
        address: 'Sonnenallee 142, 12059 Berlin',
        phone: '+49 176 88291024',
        email: 'tariq.mansoor@example.com',
        idType: 'passport',
        idNumber: 'C82710492P',
        idAuthority: 'Berlin Landesamt für Bürgerangelegenheiten',
        isCompleted: true,
        completedAt: '2026-09-21T10:15:00Z',
      },
      wife: {
        role: 'wife',
        fullName: 'Yasmin Al-Sabah',
        fullNameArabic: 'ياسمين الصباح',
        dateOfBirth: { day: '22', month: '09', year: '1998' },
        placeOfBirth: 'Berlin, Deutschland',
        nationality: 'Deutsch',
        religion: 'Islam',
        maritalStatus: 'Ledig',
        address: 'Müllerstraße 84, 13349 Berlin',
        phone: '+49 152 44910283',
        email: 'yasmin.alsabah@example.com',
        idType: 'nationalId',
        idNumber: 'T220849182',
        idAuthority: 'Bürgeramt Wedding Berlin',
        isCompleted: true,
        completedAt: '2026-09-21T10:20:00Z',
      },
      guardian: {
        role: 'guardian',
        fullName: 'Omar Al-Sabah',
        fullNameArabic: 'عمر الصباح',
        dateOfBirth: { day: '05', month: '01', year: '1968' },
        placeOfBirth: 'Aleppo, Syrien',
        nationality: 'Deutsch',
        religion: 'Islam',
        maritalStatus: 'Verheiratet',
        address: 'Müllerstraße 84, 13349 Berlin',
        phone: '+49 171 55928172',
        email: 'omar.alsabah@example.com',
        idType: 'passport',
        idNumber: 'D99281720B',
        idAuthority: 'Berlin Ausländerbehörde / Bürgeramt',
        relationToWife: 'father',
        guardianApprovalReason: 'Leiblicher Vater der Braut, erteilt ausdrücklich seine Zustimmung und seinen Segen',
        isCompleted: true,
        completedAt: '2026-09-21T10:25:00Z',
      },
      witness1: {
        role: 'witness1',
        fullName: 'Bilal Farouk',
        fullNameArabic: 'بلال فاروق',
        dateOfBirth: { day: '18', month: '07', year: '1992' },
        placeOfBirth: 'Kairo, Ägypten',
        nationality: 'Ägyptisch',
        religion: 'Islam',
        maritalStatus: 'Verheiratet',
        address: 'Badstraße 22, 13357 Berlin',
        phone: '+49 174 99281734',
        email: 'bilal.farouk@example.com',
        idType: 'passport',
        idNumber: 'A19482710K',
        idAuthority: 'Ägyptisches Generalkonsulat Berlin',
        isCompleted: true,
        completedAt: '2026-09-21T10:30:00Z',
      },
      witness2: {
        role: 'witness2',
        fullName: 'Karim Haddad',
        fullNameArabic: 'كريم حداد',
        dateOfBirth: { day: '30', month: '11', year: '1994' },
        placeOfBirth: 'Beirut, Libanon',
        nationality: 'Deutsch',
        religion: 'Islam',
        maritalStatus: 'Ledig',
        address: 'Turmstraße 55, 10551 Berlin',
        phone: '+49 160 33819284',
        email: 'karim.haddad@example.com',
        idType: 'nationalId',
        idNumber: 'L381920481',
        idAuthority: 'Bürgeramt Mitte Berlin',
        isCompleted: true,
        completedAt: '2026-09-21T10:35:00Z',
      },
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'completed',
  };
}
