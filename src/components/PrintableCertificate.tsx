import React from 'react';
import { Printer, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { MarriageContract, Language } from '../types';
import { translations } from '../i18n/translations';

interface PrintableCertificateProps {
  contract: MarriageContract;
  lang: Language;
}

export const PrintableCertificate: React.FC<PrintableCertificateProps> = ({ contract, lang }) => {
  const t = translations[lang];
  const { general, dowry, parties } = contract;

  const handlePrint = () => {
    window.print();
  };

  const isAllCompleted = Object.values(parties).every((p) => p.isCompleted);

  return (
    <div className="space-y-4">
      {/* Top Banner with Print Button & Verification Status */}
      <div className="no-print bg-stone-900 text-white rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#27ae60]/20 text-[#27ae60] flex items-center justify-center font-bold">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>{t.certificatePreview}</span>
              {isAllCompleted ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#27ae60] text-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Bereit zum Drucken (5/5)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500 text-stone-900">
                  Entwurf / Angaben unvollständig
                </span>
              )}
            </h3>
            <p className="text-xs text-stone-300">
              Offizielles DIN-A4 Dokument mit Siegelbereich, zweisprachigen Tabellen und Scharia-Klausel.
            </p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1a4d2e] hover:bg-[#25663f] border border-emerald-600/40 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <Printer className="w-4 h-4" />
          <span>{t.printCertificate}</span>
        </button>
      </div>

      {/* The Printable A4 Certificate Document */}
      <div
        id="printable-certificate"
        className="bg-white rounded-2xl border-2 border-[#1a4d2e] p-6 sm:p-10 shadow-lg text-stone-900 font-sans relative overflow-hidden"
        style={{
          boxShadow: '0 4px 20px -2px rgba(26, 77, 46, 0.12)',
        }}
      >
        {/* Ornate Islamic Border Frame */}
        <div className="border border-[#b8860b]/60 p-4 sm:p-6 rounded-xl relative bg-[#fcfcf9]">
          {/* Header section with Arresalah branding */}
          <div className="text-center pb-5 border-b border-[#1a4d2e]/30 relative">
            {/* Basmala Calligraphy */}
            <div className="font-amiri text-2xl sm:text-3xl font-bold text-[#1a4d2e] tracking-wide mb-2 select-none">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
              {/* Left German Header */}
              <div className="text-start sm:w-1/3">
                <p className="text-[11px] font-bold tracking-wider text-[#1a4d2e] uppercase">
                  Arresalah Center Berlin e.V.
                </p>
                <p className="text-[10px] text-stone-600">
                  Gerichtstraße 38, 13347 Berlin
                </p>
                <p className="text-[10px] text-stone-500">
                  Amtsgericht Charlottenburg (Berlin)
                </p>
              </div>

              {/* Center Emblem / Title */}
              <div className="text-center sm:w-1/3">
                <div className="inline-block px-3 py-1 rounded-full bg-[#1a4d2e] text-white text-[11px] font-bold tracking-widest uppercase mb-1">
                  Urkunde • وثيقة رسمية
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#1a4d2e] tracking-tight">
                  ISLAMISCHE EHESCHLIESSUNGSURKUNDE
                </h1>
                <p className="text-base font-bold text-[#b8860b] font-cairo">
                  عقد زواج إسلامي شرعي
                </p>
              </div>

              {/* Right Arabic Header */}
              <div className="text-end sm:w-1/3 font-cairo" dir="rtl">
                <p className="text-[11px] font-bold text-[#1a4d2e]">
                  مركز الرسالة الإسلامي برلين
                </p>
                <p className="text-[10px] text-stone-600">
                  شارع جيريشت 38، 13347 برلين
                </p>
                <p className="text-[10px] text-stone-500 font-mono">
                  السجل الرسمي لتوثيق الأنكحة
                </p>
              </div>
            </div>

            {/* Contract Registry Codes & Dates Row */}
            <div className="mt-4 pt-3 border-t border-stone-200/80 flex flex-wrap items-center justify-between text-xs text-stone-700 bg-stone-100/70 p-2.5 rounded-lg">
              <div>
                <span className="font-semibold text-stone-500">Vertragscode (CTR): </span>
                <span className="font-mono font-bold text-[#1a4d2e] bg-white px-2 py-0.5 rounded border border-stone-200">
                  {general.contractCode}
                </span>
              </div>

              <div>
                <span className="font-semibold text-stone-500">Reg.-Nr.: </span>
                <span className="font-mono font-semibold">{general.registryNumber}</span>
              </div>

              <div>
                <span className="font-semibold text-stone-500">Datum (Greg.): </span>
                <span className="font-semibold">{general.gregorianDate}</span>
              </div>

              <div dir="rtl" className="font-cairo">
                <span className="font-semibold text-stone-500">التاريخ الهجري: </span>
                <span className="font-semibold text-[#1a4d2e]">{general.hijriDate}</span>
              </div>
            </div>

            {/* Quranic Ayah */}
            <div className="mt-3 py-2 px-4 bg-[#fcf8e3]/60 border border-[#b8860b]/30 rounded-lg text-center">
              <p className="font-amiri text-sm sm:text-base font-bold text-[#1a4d2e] leading-relaxed" dir="rtl">
                ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ ﴾
              </p>
              <p className="text-[11px] text-stone-600 italic mt-0.5">
                „Und unter Seinen Zeichen ist dies, dass Er Gattinnen für euch aus euch selber schuf, auf dass ihr Frieden bei ihnen findet; und Er hat Zuneigung und Barmherzigkeit zwischen euch gesetzt.“ (Sure Ar-Rum 30:21)
              </p>
            </div>
          </div>

          {/* Section: Husband & Wife 2-Column Grid */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Husband (الزوج) */}
            <div className="border border-[#1a4d2e]/30 bg-white rounded-xl p-3.5 relative">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-200">
                <span className="text-xs font-extrabold text-[#1a4d2e] tracking-wider uppercase">
                  1. DER EHEMANN (الزوج)
                </span>
                <span className="text-xs font-bold text-stone-800 font-cairo">
                  {parties.husband.fullNameArabic || '—'}
                </span>
              </div>

              <div className="flex gap-3">
                {/* Photo box */}
                <div className="w-20 h-24 rounded border border-stone-300 bg-stone-100 flex items-center justify-center shrink-0 overflow-hidden text-center">
                  {parties.husband.photoBase64 ? (
                    <img
                      src={parties.husband.photoBase64}
                      alt="Foto Ehemann"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[9px] text-stone-400 p-1">Passfoto Lichtbild</span>
                  )}
                </div>

                {/* Details list */}
                <div className="flex-1 text-xs space-y-1">
                  <div>
                    <span className="text-stone-500 font-medium">Vollständiger Name: </span>
                    <span className="font-bold text-stone-900">{parties.husband.fullName || '—'}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Geburtsdatum: </span>
                    <span className="font-semibold">
                      {parties.husband.dateOfBirth
                        ? `${parties.husband.dateOfBirth.day}.${parties.husband.dateOfBirth.month}.${parties.husband.dateOfBirth.year}`
                        : '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Geburtsort: </span>
                    <span>{parties.husband.placeOfBirth || '—'}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Staatsangehörigkeit: </span>
                    <span>{parties.husband.nationality || '—'}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Ausweis- / Pass-Nr.: </span>
                    <span className="font-mono font-semibold">{parties.husband.idNumber || '—'}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Wohnort: </span>
                    <span className="text-[11px]">{parties.husband.address || '—'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Wife (الزوجة) */}
            <div className="border border-[#1a4d2e]/30 bg-white rounded-xl p-3.5 relative">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-200">
                <span className="text-xs font-extrabold text-[#1a4d2e] tracking-wider uppercase">
                  2. DIE EHEFRAU (الزوجة)
                </span>
                <span className="text-xs font-bold text-stone-800 font-cairo">
                  {parties.wife.fullNameArabic || '—'}
                </span>
              </div>

              <div className="flex gap-3">
                {/* Photo box */}
                <div className="w-20 h-24 rounded border border-stone-300 bg-stone-100 flex items-center justify-center shrink-0 overflow-hidden text-center">
                  {parties.wife.photoBase64 ? (
                    <img
                      src={parties.wife.photoBase64}
                      alt="Foto Ehefrau"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[9px] text-stone-400 p-1">Passfoto Lichtbild</span>
                  )}
                </div>

                {/* Details list */}
                <div className="flex-1 text-xs space-y-1">
                  <div>
                    <span className="text-stone-500 font-medium">Vollständiger Name: </span>
                    <span className="font-bold text-stone-900">{parties.wife.fullName || '—'}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Geburtsdatum: </span>
                    <span className="font-semibold">
                      {parties.wife.dateOfBirth
                        ? `${parties.wife.dateOfBirth.day}.${parties.wife.dateOfBirth.month}.${parties.wife.dateOfBirth.year}`
                        : '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Geburtsort: </span>
                    <span>{parties.wife.placeOfBirth || '—'}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Staatsangehörigkeit: </span>
                    <span>{parties.wife.nationality || '—'}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Ausweis- / Pass-Nr.: </span>
                    <span className="font-mono font-semibold">{parties.wife.idNumber || '—'}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Wohnort: </span>
                    <span className="text-[11px]">{parties.wife.address || '—'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Guardian (Brautvormund / الولي) */}
          <div className="mt-4 border border-stone-300 bg-white rounded-xl p-3 text-xs">
            <div className="flex items-center justify-between pb-1 mb-2 border-b border-stone-200">
              <span className="font-bold text-[#1a4d2e] uppercase">
                3. DER BRAUTVORMUND (ولي أمر الزوجة)
              </span>
              <span className="font-cairo font-semibold text-stone-700">
                {parties.guardian.fullNameArabic || ''}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-stone-800">
              <div>
                <span className="text-stone-500">Name: </span>
                <span className="font-semibold">{parties.guardian.fullName || '—'}</span>
              </div>
              <div>
                <span className="text-stone-500">Verwandtschaft: </span>
                <span className="font-semibold">{parties.guardian.relationToWife || 'Leiblicher Vater'}</span>
              </div>
              <div>
                <span className="text-stone-500">Ausweis-Nr.: </span>
                <span className="font-mono">{parties.guardian.idNumber || '—'}</span>
              </div>
              <div>
                <span className="text-stone-500">Zustimmungsgrundlage: </span>
                <span className="text-[11px]">{parties.guardian.guardianApprovalReason || 'Gesetzlicher Vormund'}</span>
              </div>
            </div>
          </div>

          {/* Section: Dowry (Mahr / الصداق) */}
          <div className="mt-4 border border-[#b8860b]/40 bg-[#fcfbf7] rounded-xl p-3.5 text-xs">
            <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#b8860b]/20">
              <span className="font-bold text-[#b8860b] uppercase tracking-wide">
                4. BRAUTGABE (MAHR / الصداق الشرعي) & VEREINBARUNGEN
              </span>
              <span className="font-cairo font-bold text-[#1a4d2e]">المهر والشروط</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-stone-600 font-medium">Sofortige Brautgabe (المعجل): </span>
                <span className="font-bold text-[#1a4d2e]">
                  {dowry.promptAmount} {dowry.promptCurrency}
                </span>
                <span className="text-[11px] text-stone-500 block">
                  Status: {dowry.promptStatus === 'received' ? 'In der Sitzung durch die Braut entgegengenommen (مقبوض)' : 'Vollständig bezahlt'}
                </span>
              </div>

              <div>
                <span className="text-stone-600 font-medium">Aufgeschobene Brautgabe (المؤجل): </span>
                <span className="font-bold text-[#1a4d2e]">
                  {dowry.deferredAmount} {dowry.deferredCurrency}
                </span>
                <span className="text-[11px] text-stone-500 block">
                  Fälligkeit: {dowry.deferredDueCondition || 'Bei Scheidung oder Tod eines der Ehepartner (عند أحد الأجلين)'}
                </span>
              </div>

              {dowry.specialConditions && (
                <div className="sm:col-span-2 pt-1 border-t border-stone-200/60">
                  <span className="text-stone-600 font-medium">Besondere Bedingungen (الشروط الخاصة): </span>
                  <span className="italic text-stone-800">{dowry.specialConditions}</span>
                </div>
              )}
            </div>
          </div>

          {/* Section: Witnesses (الشهود) */}
          <div className="mt-4 border border-stone-300 bg-white rounded-xl p-3 text-xs">
            <div className="flex items-center justify-between pb-1 mb-2 border-b border-stone-200">
              <span className="font-bold text-[#1a4d2e] uppercase">
                5. DIE TRAUZEUGEN (الشاهدان العدلان)
              </span>
              <span className="font-cairo font-semibold text-stone-700">شهود العقد</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <p className="font-bold text-stone-900">
                  1. Zeuge: {parties.witness1.fullName || '—'}{' '}
                  <span className="font-cairo text-stone-600">({parties.witness1.fullNameArabic || ''})</span>
                </p>
                <p className="text-stone-600 text-[11px]">
                  Geb.: {parties.witness1.dateOfBirth ? `${parties.witness1.dateOfBirth.day}.${parties.witness1.dateOfBirth.month}.${parties.witness1.dateOfBirth.year}` : '—'} • Ausweis: {parties.witness1.idNumber || '—'}
                </p>
                <p className="text-stone-500 text-[11px]">Wohnort: {parties.witness1.address || '—'}</p>
              </div>

              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <p className="font-bold text-stone-900">
                  2. Zeuge: {parties.witness2.fullName || '—'}{' '}
                  <span className="font-cairo text-stone-600">({parties.witness2.fullNameArabic || ''})</span>
                </p>
                <p className="text-stone-600 text-[11px]">
                  Geb.: {parties.witness2.dateOfBirth ? `${parties.witness2.dateOfBirth.day}.${parties.witness2.dateOfBirth.month}.${parties.witness2.dateOfBirth.year}` : '—'} • Ausweis: {parties.witness2.idNumber || '—'}
                </p>
                <p className="text-stone-500 text-[11px]">Wohnort: {parties.witness2.address || '—'}</p>
              </div>
            </div>
          </div>

          {/* Solemnization Affirmation Statement */}
          <div className="mt-4 p-3 bg-stone-100/80 rounded-lg text-center text-xs leading-relaxed text-stone-800 border border-stone-200">
            <p className="font-semibold">
              Die Eheschließung wurde vor dem bevollmächtigten Imam des Arresalah Centers Berlin durch rechtsgültiges Angebot (Ijab) und Annahme (Qabul), in Gegenwart des Brautvormunds und zweier ehrbarer Zeugen vollzogen.
            </p>
            <p className="font-cairo text-[11px] text-stone-600 mt-1" dir="rtl">
              تم هذا العقد الشرعي بالإيجاب والقبول ورضا الطرفين وإذن الولي وحضور الشاهدين وفق كتاب الله وسنة رسوله صلى الله عليه وسلم.
            </p>
          </div>

          {/* Signatures & Official Stamp Grid (6 blocks) */}
          <div className="mt-6 pt-4 border-t-2 border-[#1a4d2e] grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4 text-center">
            {/* Signature 1: Husband */}
            <div>
              <div className="h-14 border-b border-dashed border-stone-400 flex items-end justify-center pb-1">
                <span className="font-amiri text-base text-[#1a4d2e]">
                  {parties.husband.fullNameArabic || parties.husband.fullName}
                </span>
              </div>
              <p className="text-[11px] font-bold text-stone-800 mt-1">Unterschrift des Ehemanns</p>
              <p className="text-[10px] font-cairo text-stone-500">توقيع الزوج</p>
            </div>

            {/* Signature 2: Wife */}
            <div>
              <div className="h-14 border-b border-dashed border-stone-400 flex items-end justify-center pb-1">
                <span className="font-amiri text-base text-[#1a4d2e]">
                  {parties.wife.fullNameArabic || parties.wife.fullName}
                </span>
              </div>
              <p className="text-[11px] font-bold text-stone-800 mt-1">Unterschrift der Ehefrau</p>
              <p className="text-[10px] font-cairo text-stone-500">توقيع الزوجة</p>
            </div>

            {/* Signature 3: Guardian */}
            <div>
              <div className="h-14 border-b border-dashed border-stone-400 flex items-end justify-center pb-1">
                <span className="font-amiri text-base text-[#1a4d2e]">
                  {parties.guardian.fullNameArabic || parties.guardian.fullName}
                </span>
              </div>
              <p className="text-[11px] font-bold text-stone-800 mt-1">Unterschrift des Vormunds</p>
              <p className="text-[10px] font-cairo text-stone-500">توقيع الولي الشرعي</p>
            </div>

            {/* Signature 4: Witness 1 */}
            <div>
              <div className="h-14 border-b border-dashed border-stone-400 flex items-end justify-center pb-1">
                <span className="font-amiri text-sm text-stone-700">
                  {parties.witness1.fullNameArabic || parties.witness1.fullName}
                </span>
              </div>
              <p className="text-[11px] font-bold text-stone-800 mt-1">Unterschrift 1. Zeuge</p>
              <p className="text-[10px] font-cairo text-stone-500">توقيع الشاهد الأول</p>
            </div>

            {/* Signature 5: Witness 2 */}
            <div>
              <div className="h-14 border-b border-dashed border-stone-400 flex items-end justify-center pb-1">
                <span className="font-amiri text-sm text-stone-700">
                  {parties.witness2.fullNameArabic || parties.witness2.fullName}
                </span>
              </div>
              <p className="text-[11px] font-bold text-stone-800 mt-1">Unterschrift 2. Zeuge</p>
              <p className="text-[10px] font-cairo text-stone-500">توقيع الشاهد الثاني</p>
            </div>

            {/* Official Stamp & Imam Signature */}
            <div className="relative">
              {/* Circular Stamp Emulation */}
              <div className="mx-auto w-20 h-20 rounded-full border-2 border-dashed border-[#1a4d2e] p-1 flex flex-col items-center justify-center text-center bg-[#1a4d2e]/5 -mt-3">
                <span className="text-[7px] uppercase font-bold text-[#1a4d2e]">Arresalah Center</span>
                <span className="text-[9px] font-amiri font-bold text-[#b8860b]">برلين</span>
                <span className="text-[7px] text-stone-600 font-mono">SEAL • ختم</span>
              </div>
              <p className="text-[11px] font-bold text-[#1a4d2e] mt-1">
                {general.officiantName}
              </p>
              <p className="text-[10px] text-stone-600 font-cairo">
                إمام وخطيب المركز المأذون
              </p>
            </div>
          </div>

          {/* Footer certification note */}
          <div className="mt-6 pt-3 border-t border-stone-200 text-center text-[10px] text-stone-500">
            Arresalah Center Berlin e.V. • Gerichtstr. 38, 13347 Berlin • Registriert unter CTR: {general.contractCode} • Dieses Dokument dient der religiösen Dokumentation nach islamischem Recht.
          </div>
        </div>
      </div>
    </div>
  );
};
