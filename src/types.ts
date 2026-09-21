export type Language = 'de' | 'ar' | 'en';

export type PartyRole = 'husband' | 'wife' | 'guardian' | 'witness1' | 'witness2';

export interface DateOfBirth {
  day: string;
  month: string;
  year: string;
}

export interface PartyData {
  role: PartyRole;
  fullName: string;
  fullNameArabic: string;
  dateOfBirth: DateOfBirth;
  placeOfBirth: string;
  nationality: string;
  religion: string;
  maritalStatus?: string; // Single, Divorced, Widowed
  address: string;
  phone: string;
  email: string;
  idType: 'passport' | 'id_card' | 'nationalId';
  idNumber: string;
  idAuthority: string;
  
  // Guardian specific
  relationToWife?: string; // Father, Brother, Uncle, Judge/Sheikh (وكيل شرعي)
  guardianApprovalReason?: string;
  
  // Uploads in Base64
  photoBase64?: string;
  idFrontBase64?: string;
  idBackBase64?: string;
  
  // Signature & submission status
  isCompleted: boolean;
  completedAt?: string;
  signature?: string;
}

export interface DowryInfo {
  promptAmount: string; // Mahr Mu'ajjal (الصداق المعجل)
  promptCurrency: string; // EUR
  promptStatus: 'paid' | 'unpaid' | 'received';
  deferredAmount: string; // Mahr Mu'ajjal (الصداق المؤجل)
  deferredCurrency: string;
  deferredDueCondition: string; // e.g., Upon divorce or death (عند أحد الأجلين)
  specialConditions: string; // شروط خاصة
}

export interface ContractGeneralInfo {
  contractCode: string; // e.g. CTR-8X2K9P
  registryNumber: string; // e.g. BER-2026/048
  gregorianDate: string; // YYYY-MM-DD
  hijriDate: string; // e.g. 10 Rabi' al-Awwal 1448 H
  placeOfSolemnization: string; // Arresalah Center Berlin e.V., Gerichtstr. 38, 13347 Berlin
  officiantName: string; // Sheikh / Imam name
  officiantTitle: string; // Imam & Authorized Solemnizer
  mosqueName: string; // Arresalah Center Berlin / مركز الرسالة برلين
}

export interface MarriageContract {
  id: string;
  general: ContractGeneralInfo;
  dowry: DowryInfo;
  parties: {
    husband: PartyData;
    wife: PartyData;
    guardian: PartyData;
    witness1: PartyData;
    witness2: PartyData;
  };
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'in_progress' | 'completed' | 'solemnized';
}
