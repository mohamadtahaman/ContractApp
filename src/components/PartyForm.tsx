import React, { useState } from 'react';
import {
  User,
  Heart,
  ShieldCheck,
  Eye,
  CheckCircle2,
  AlertCircle,
  Upload,
  Trash2,
  FileCheck,
  Save,
  Phone,
  Mail,
  MapPin,
  Globe,
  CreditCard,
} from 'lucide-react';
import { PartyData, PartyRole, Language } from '../types';
import { translations } from '../i18n/translations';
import { DatePickerWheel } from './DatePickerWheel';
import { fileToBase64 } from '../utils/storage';

interface PartyFormProps {
  party: PartyData;
  activeRole: PartyRole;
  onSelectRole: (role: PartyRole) => void;
  onChangeParty: (updated: PartyData) => void;
  onSaveParty: () => void;
  lang: Language;
}

export const PartyForm: React.FC<PartyFormProps> = ({
  party,
  activeRole,
  onSelectRole,
  onChangeParty,
  onSaveParty,
  lang,
}) => {
  const t = translations[lang];
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadLoading, setUploadLoading] = useState<string | null>(null);

  // Validate required fields on submit
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!party.fullName.trim()) {
      newErrors.fullName = t.fieldRequired;
    }
    if (!party.fullNameArabic.trim()) {
      newErrors.fullNameArabic = t.fieldRequired;
    }
    if (!party.placeOfBirth.trim()) {
      newErrors.placeOfBirth = t.fieldRequired;
    }
    if (!party.nationality.trim()) {
      newErrors.nationality = t.fieldRequired;
    }
    if (!party.idNumber.trim()) {
      newErrors.idNumber = t.fieldRequired;
    }

    if (activeRole === 'guardian') {
      if (!party.relationToWife) {
        newErrors.relationToWife = t.fieldRequired;
      }
      if (!party.guardianApprovalReason?.trim()) {
        newErrors.guardianApprovalReason = t.fieldRequired;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field: keyof PartyData, value: any) => {
    onChangeParty({
      ...party,
      [field]: value,
    });
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFileUpload = async (
    field: 'photoBase64' | 'idFrontBase64' | 'idBackBase64',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadLoading(field);
      const base64 = await fileToBase64(file);
      handleFieldChange(field, base64);
    } catch (err) {
      console.error('File conversion error:', err);
    } finally {
      setUploadLoading(null);
    }
  };

  const handleRemoveImage = (field: 'photoBase64' | 'idFrontBase64' | 'idBackBase64') => {
    handleFieldChange(field, undefined);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSaveParty();
    }
  };

  const getRoleIcon = (role: PartyRole) => {
    switch (role) {
      case 'husband':
        return <User className="w-4 h-4" />;
      case 'wife':
        return <Heart className="w-4 h-4 text-rose-500" />;
      case 'guardian':
        return <ShieldCheck className="w-4 h-4 text-amber-600" />;
      case 'witness1':
      case 'witness2':
        return <Eye className="w-4 h-4 text-teal-600" />;
    }
  };

  return (
    <div id="party-form-editor" className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
      {/* Top Tabs for all 5 parties */}
      <div className="border-b border-stone-200 bg-stone-50/60 p-2 sm:p-3 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
        {(['husband', 'wife', 'guardian', 'witness1', 'witness2'] as PartyRole[]).map((r) => {
          const isActive = activeRole === r;
          const label = t[r];
          return (
            <button
              key={r}
              id={`tab-${r}`}
              onClick={() => onSelectRole(r)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-[#1a4d2e] shadow-sm border border-stone-200/80 ring-2 ring-[#1a4d2e]/20'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <span className="p-1 rounded-md bg-stone-100">{getRoleIcon(r)}</span>
              <span>{label}</span>
              {party.role === r && party.isCompleted && (
                <span className="w-2 h-2 rounded-full bg-[#27ae60]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Form content */}
      <form onSubmit={handleSubmit} className="p-6">
        {/* Header with status badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-stone-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#1a4d2e]/10 text-[#1a4d2e] flex items-center justify-center font-bold text-lg">
              {getRoleIcon(activeRole)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <span>{t[activeRole]}</span>
                {party.isCompleted ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#27ae60]/10 text-[#27ae60] border border-[#27ae60]/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {t.partyCompleted}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                    <AlertCircle className="w-3 h-3" />
                    Offen / Noch nicht bestätigt
                  </span>
                )}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {t[`${activeRole}Desc` as keyof typeof t] || ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1a4d2e] hover:bg-[#25663f] shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/40"
            >
              <Save className="w-4 h-4" />
              <span>{t.submitPartyData}</span>
            </button>
          </div>
        </div>

        {/* Section 1: Names and Demographics */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-[#1a4d2e] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {t.personalInfo}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name Latin */}
              <div>
                <label
                  htmlFor={`name-latin-${activeRole}`}
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  {t.fullNameLatin} <span className="text-red-500">*</span>
                </label>
                <input
                  id={`name-latin-${activeRole}`}
                  type="text"
                  placeholder="z.B. Tariq Mansoor"
                  value={party.fullName}
                  onChange={(e) => handleFieldChange('fullName', e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] ${
                    errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Full Name Arabic */}
              <div>
                <label
                  htmlFor={`name-arabic-${activeRole}`}
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  {t.fullNameArabic} <span className="text-red-500">*</span>
                </label>
                <input
                  id={`name-arabic-${activeRole}`}
                  type="text"
                  dir="rtl"
                  placeholder="مثال: طارق منصور"
                  value={party.fullNameArabic}
                  onChange={(e) => handleFieldChange('fullNameArabic', e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-semibold text-stone-900 placeholder:text-stone-400 font-cairo transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] ${
                    errors.fullNameArabic ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                  }`}
                />
                {errors.fullNameArabic && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullNameArabic}
                  </p>
                )}
              </div>

              {/* Date of Birth Wheel Dropdown */}
              <div className="md:col-span-2 bg-stone-50/80 p-3.5 rounded-xl border border-stone-200/70">
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  {t.dateOfBirth} <span className="text-red-500">*</span>
                </label>
                <DatePickerWheel
                  idPrefix={`dob-${activeRole}`}
                  day={party.dateOfBirth?.day || '15'}
                  month={party.dateOfBirth?.month || '06'}
                  year={party.dateOfBirth?.year || '1995'}
                  onChange={(d) => handleFieldChange('dateOfBirth', d)}
                  lang={lang}
                  minYear={1940}
                  maxYear={2015}
                />
              </div>

              {/* Place of Birth & Nationality */}
              <div>
                <label
                  htmlFor={`pob-${activeRole}`}
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  {t.placeOfBirth} <span className="text-red-500">*</span>
                </label>
                <input
                  id={`pob-${activeRole}`}
                  type="text"
                  placeholder="z.B. Berlin, Deutschland oder Damaskus, Syrien"
                  value={party.placeOfBirth}
                  onChange={(e) => handleFieldChange('placeOfBirth', e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] ${
                    errors.placeOfBirth ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                  }`}
                />
                {errors.placeOfBirth && (
                  <p className="text-xs text-red-600 mt-1">{errors.placeOfBirth}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`nat-${activeRole}`}
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  {t.nationality} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id={`nat-${activeRole}`}
                    type="text"
                    placeholder="z.B. Deutsch, Syrisch, Marokkanisch..."
                    value={party.nationality}
                    onChange={(e) => handleFieldChange('nationality', e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] ${
                      errors.nationality ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    }`}
                  />
                  <Globe className="w-4 h-4 text-stone-400 absolute right-3 ltr:right-3 rtl:left-3 top-3" />
                </div>
                {errors.nationality && (
                  <p className="text-xs text-red-600 mt-1">{errors.nationality}</p>
                )}
              </div>

              {/* Religion & Marital status */}
              <div>
                <label
                  htmlFor={`rel-${activeRole}`}
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  {t.religion}
                </label>
                <input
                  id={`rel-${activeRole}`}
                  type="text"
                  value={party.religion || 'Islam'}
                  onChange={(e) => handleFieldChange('religion', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                />
              </div>

              <div>
                <label
                  htmlFor={`status-${activeRole}`}
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  {t.maritalStatus}
                </label>
                <select
                  id={`status-${activeRole}`}
                  value={party.maritalStatus || 'Ledig'}
                  onChange={(e) => handleFieldChange('maritalStatus', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white wheel-select focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                >
                  <option value="Ledig">{t.single}</option>
                  <option value="Geschieden">{t.divorced}</option>
                  <option value="Verwitwet">{t.widowed}</option>
                </select>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label
                  htmlFor={`addr-${activeRole}`}
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  {t.contactAddress}
                </label>
                <div className="relative">
                  <input
                    id={`addr-${activeRole}`}
                    type="text"
                    placeholder="Straße, Hausnummer, Postleitzahl & Ort (z.B. Müllerstraße 45, 13353 Berlin)"
                    value={party.address}
                    onChange={(e) => handleFieldChange('address', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                  />
                  <MapPin className="w-4 h-4 text-stone-400 absolute right-3 ltr:right-3 rtl:left-3 top-3" />
                </div>
              </div>

              {/* Contact (Phone & Email) */}
              <div>
                <label
                  htmlFor={`phone-${activeRole}`}
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  {t.phone}
                </label>
                <div className="relative">
                  <input
                    id={`phone-${activeRole}`}
                    type="tel"
                    placeholder="+49 176 ..."
                    value={party.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                  />
                  <Phone className="w-4 h-4 text-stone-400 absolute right-3 ltr:right-3 rtl:left-3 top-3" />
                </div>
              </div>

              <div>
                <label
                  htmlFor={`email-${activeRole}`}
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  {t.email}
                </label>
                <div className="relative">
                  <input
                    id={`email-${activeRole}`}
                    type="email"
                    placeholder="beispiel@domain.de"
                    value={party.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute right-3 ltr:right-3 rtl:left-3 top-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Guardian Specific Details if role is 'guardian' */}
          {activeRole === 'guardian' && (
            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/80">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                {t.guardianRelation} & {t.guardianApprovalReason}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="guardian-rel"
                    className="block text-xs font-semibold text-stone-700 mb-1"
                  >
                    {t.guardianRelation} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="guardian-rel"
                    value={party.relationToWife || 'father'}
                    onChange={(e) => handleFieldChange('relationToWife', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white text-stone-900 wheel-select focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                  >
                    <option value="father">{t.father}</option>
                    <option value="brother">{t.brother}</option>
                    <option value="uncle">{t.uncle}</option>
                    <option value="representative">{t.legalRepresentative}</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="guardian-basis"
                    className="block text-xs font-semibold text-stone-700 mb-1"
                  >
                    {t.guardianApprovalReason} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="guardian-basis"
                    type="text"
                    value={party.guardianApprovalReason || ''}
                    placeholder="z.B. Leiblicher Vater der Braut, erteilt ausdrückliche Zustimmung"
                    onChange={(e) => handleFieldChange('guardianApprovalReason', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                  />
                  <p className="text-[11px] text-amber-800 mt-1">{t.guardianApprovalHint}</p>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Identification Document Number */}
          <div>
            <h4 className="text-xs font-bold text-[#1a4d2e] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4" />
              {t.idDocuments}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor={`idtype-${activeRole}`}
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  {t.idType}
                </label>
                <select
                  id={`idtype-${activeRole}`}
                  value={party.idType || 'passport'}
                  onChange={(e) => handleFieldChange('idType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white text-stone-900 wheel-select focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                >
                  <option value="passport">{t.passport}</option>
                  <option value="nationalId">{t.nationalId}</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor={`idnum-${activeRole}`}
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  {t.idNumber} <span className="text-red-500">*</span>
                </label>
                <input
                  id={`idnum-${activeRole}`}
                  type="text"
                  placeholder="z.B. C82710492P oder L381920481"
                  value={party.idNumber}
                  onChange={(e) => handleFieldChange('idNumber', e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-stone-900 placeholder:text-stone-400 font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] ${
                    errors.idNumber ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                  }`}
                />
                {errors.idNumber && (
                  <p className="text-xs text-red-600 mt-1">{errors.idNumber}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`idauth-${activeRole}`}
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  {t.issuingAuthority}
                </label>
                <input
                  id={`idauth-${activeRole}`}
                  type="text"
                  placeholder="z.B. Bürgeramt Wedding Berlin"
                  value={party.idAuthority}
                  onChange={(e) => handleFieldChange('idAuthority', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Base64 Image Uploads (Photo, ID Front, ID Back) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-[#1a4d2e] uppercase tracking-wider flex items-center gap-1.5">
                <Upload className="w-4 h-4" />
                Base64-Verifikation (Foto & Ausweiskopien)
              </h4>
              <span className="text-[11px] text-stone-500 font-normal">
                {t.uploadHint}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Profile Photo */}
              <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-stone-700 mb-2">{t.photoUpload}</span>
                {party.photoBase64 ? (
                  <div className="relative w-28 h-32 rounded-lg overflow-hidden border border-stone-300 shadow-xs mb-2 group">
                    <img
                      src={party.photoBase64}
                      alt="Profilfoto"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage('photoBase64')}
                      className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                ) : (
                  <label className="w-full h-28 border-2 border-dashed border-stone-300 hover:border-[#1a4d2e] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors p-2 text-stone-500 hover:text-[#1a4d2e]">
                    <Upload className="w-6 h-6 mb-1 text-stone-400" />
                    <span className="text-[11px] font-medium leading-tight">
                      {uploadLoading === 'photoBase64' ? 'Wird kodiert...' : t.dragDropOrClick}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload('photoBase64', e)}
                    />
                  </label>
                )}
                {party.photoBase64 && (
                  <span className="text-[11px] text-[#27ae60] font-medium flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" /> Gespeichert (Base64)
                  </span>
                )}
              </div>

              {/* ID Front */}
              <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-stone-700 mb-2">{t.idFrontUpload}</span>
                {party.idFrontBase64 ? (
                  <div className="relative w-36 h-24 rounded-lg overflow-hidden border border-stone-300 shadow-xs mb-2 group">
                    <img
                      src={party.idFrontBase64}
                      alt="Ausweis Vorderseite"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage('idFrontBase64')}
                      className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                ) : (
                  <label className="w-full h-28 border-2 border-dashed border-stone-300 hover:border-[#1a4d2e] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors p-2 text-stone-500 hover:text-[#1a4d2e]">
                    <CreditCard className="w-6 h-6 mb-1 text-stone-400" />
                    <span className="text-[11px] font-medium leading-tight">
                      {uploadLoading === 'idFrontBase64' ? 'Wird kodiert...' : t.dragDropOrClick}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload('idFrontBase64', e)}
                    />
                  </label>
                )}
                {party.idFrontBase64 && (
                  <span className="text-[11px] text-[#27ae60] font-medium flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" /> Ausweis Vorne (Base64)
                  </span>
                )}
              </div>

              {/* ID Back */}
              <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-stone-700 mb-2">{t.idBackUpload}</span>
                {party.idBackBase64 ? (
                  <div className="relative w-36 h-24 rounded-lg overflow-hidden border border-stone-300 shadow-xs mb-2 group">
                    <img
                      src={party.idBackBase64}
                      alt="Ausweis Rückseite"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage('idBackBase64')}
                      className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                ) : (
                  <label className="w-full h-28 border-2 border-dashed border-stone-300 hover:border-[#1a4d2e] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors p-2 text-stone-500 hover:text-[#1a4d2e]">
                    <CreditCard className="w-6 h-6 mb-1 text-stone-400" />
                    <span className="text-[11px] font-medium leading-tight">
                      {uploadLoading === 'idBackBase64' ? 'Wird kodiert...' : t.dragDropOrClick}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload('idBackBase64', e)}
                    />
                  </label>
                )}
                {party.idBackBase64 && (
                  <span className="text-[11px] text-[#27ae60] font-medium flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" /> Ausweis Hinten (Base64)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 pt-5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-stone-500">
            {Object.keys(errors).length > 0 && (
              <span className="text-red-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {t.validationError}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1a4d2e] hover:bg-[#25663f] shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
            >
              <Save className="w-4 h-4" />
              <span>{t.submitPartyData}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
