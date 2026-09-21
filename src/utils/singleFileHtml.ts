import { MarriageContract } from '../types';

export function generateStandaloneSingleFileHtml(contract: MarriageContract): string {
  const contractJson = JSON.stringify(contract, null, 2);

  return `<!DOCTYPE html>
<html lang="de" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Islamische Eheschließungsurkunde - Arresalah Center Berlin</title>
  <meta name="description" content="Offizielle zweisprachige Islamische Eheschließungsurkunde für das Arresalah Center Berlin">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary-color: #1a4d2e;
      --primary-dark: #113620;
      --success-color: #27ae60;
      --gold-color: #b8860b;
      --gold-bg: #fcf8e3;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      background: #f8fafc;
      color: #1e293b;
      line-height: 1.5;
    }
    [dir="rtl"] { font-family: 'Cairo', 'Amiri', system-ui, sans-serif; }
    .font-amiri { font-family: 'Amiri', serif; }
    .font-cairo { font-family: 'Cairo', sans-serif; }

    header {
      background: var(--primary-color);
      color: white;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      border-radius: 0.5rem;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
    }
    .btn-success { background: var(--success-color); color: white; }
    .btn-gold { background: var(--gold-color); color: white; }
    .btn-light { background: rgba(255,255,255,0.15); color: white; }

    .container { max-width: 1000px; margin: 1.5rem auto; padding: 0 1rem; }
    .card { background: white; border-radius: 1rem; border: 1px solid #e2e8f0; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }

    /* SVG Radar Donut */
    .radar-box { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem; }
    .radar-segments { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem; }
    .party-pill {
      padding: 0.35rem 0.75rem;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      background: #f1f5f9;
      cursor: pointer;
      border: 1px solid #cbd5e1;
    }
    .party-pill.completed { background: #dcfce7; color: var(--success-color); border-color: #86efac; }
    .party-pill.active { background: var(--primary-color); color: white; border-color: var(--primary-color); }

    /* Form */
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 1rem; }
    .form-group label { display: block; font-size: 0.75rem; font-weight: 600; margin-bottom: 0.25rem; color: #475569; }
    .form-control { width: 100%; padding: 0.6rem 0.8rem; border-radius: 0.5rem; border: 1px solid #cbd5e1; font-size: 0.875rem; }
    .form-control:focus { outline: 2px solid var(--primary-color); border-color: transparent; }

    /* Certificate A4 Sheet */
    #certificate-sheet {
      background: white;
      border: 2px solid var(--primary-color);
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    }
    .cert-frame { border: 1px solid rgba(184, 134, 11, 0.6); padding: 1.5rem; border-radius: 0.75rem; background: #fdfdfa; }
    .cert-title { text-align: center; margin-bottom: 1.5rem; }
    .ayah-box { background: var(--gold-bg); border: 1px solid rgba(184, 134, 11, 0.3); padding: 0.75rem; border-radius: 0.5rem; text-align: center; margin: 1rem 0; }
    .parties-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
    .party-box { border: 1px solid rgba(26, 77, 46, 0.3); padding: 1rem; border-radius: 0.5rem; background: white; }
    .sig-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 2rem; text-align: center; }
    .sig-line { border-bottom: 1px dashed #94a3b8; height: 3rem; margin-bottom: 0.5rem; }

    @media print {
      body { background: white; }
      header, .no-print, .radar-box, #form-container { display: none !important; }
      #certificate-sheet { border: none; padding: 0; box-shadow: none; width: 100%; }
      @page { size: A4 portrait; margin: 10mm; }
    }
  </style>
</head>
<body>

  <!-- Top App Navigation -->
  <header>
    <div>
      <h1 style="font-size: 1.25rem; font-weight: 700;">Arresalah Center Berlin</h1>
      <p style="font-size: 0.75rem; opacity: 0.85;">Islamische Eheschließungsurkunde • مركز الرسالة برلين</p>
    </div>
    <div style="display: flex; gap: 0.5rem; align-items: center;">
      <span style="font-family: monospace; font-weight: 700; background: rgba(255,255,255,0.2); padding: 0.25rem 0.5rem; border-radius: 0.25rem;" id="active-ctr-display">${contract.general.contractCode}</span>
      <button class="btn btn-success" onclick="window.print()">🖨️ A4 Drucken</button>
      <button class="btn btn-light" onclick="toggleLang()" id="lang-btn">Deutsch / العربية</button>
    </div>
  </header>

  <div class="container">
    <!-- 5-Segment Radar / Progress -->
    <div class="card no-print">
      <div class="radar-box">
        <div>
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--primary-color); text-transform: uppercase;">5-Parteien-Fortschrittsradar</span>
          <h2 style="font-size: 1.25rem; font-weight: 700;">Status der 5 obligatorischen Vertragsparteien</h2>
          <p style="font-size: 0.85rem; color: #64748b;">Ehemann, Ehefrau, Brautvormund und 2 Trauzeugen gemäß Scharia</p>
          <div class="radar-segments" id="party-tabs">
            <!-- Tabs generated by JS -->
          </div>
        </div>
        <div style="text-align: center; min-width: 140px;">
          <div style="font-size: 2.25rem; font-weight: 800; color: var(--primary-color);" id="progress-percent">0%</div>
          <div style="font-size: 0.75rem; color: #64748b; font-weight: 600;" id="progress-text">0 / 5 Parteien</div>
        </div>
      </div>
    </div>

    <!-- Active Party Form -->
    <div class="card no-print" id="form-container">
      <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--primary-color); margin-bottom: 0.5rem;" id="current-party-title">Partei bearbeiten</h3>
      <form id="party-form" onsubmit="event.preventDefault(); saveActiveParty();">
        <div class="form-grid">
          <div class="form-group">
            <label>Vollständiger Name (Latein)</label>
            <input type="text" id="input-fullname" class="form-control" required placeholder="z.B. Tariq Mansoor">
          </div>
          <div class="form-group">
            <label>الاسم الكامل بالعربية</label>
            <input type="text" id="input-fullname-ar" dir="rtl" class="form-control" required placeholder="مثال: طارق منصور">
          </div>
          <div class="form-group">
            <label>Geburtsdatum (TT.MM.JJJJ)</label>
            <input type="text" id="input-dob" class="form-control" required placeholder="14.04.1995">
          </div>
          <div class="form-group">
            <label>Geburtsort & Land</label>
            <input type="text" id="input-pob" class="form-control" required placeholder="Berlin / Damaskus">
          </div>
          <div class="form-group">
            <label>Staatsangehörigkeit</label>
            <input type="text" id="input-nationality" class="form-control" required placeholder="Deutsch / Syrisch">
          </div>
          <div class="form-group">
            <label>Ausweis- / Passnummer</label>
            <input type="text" id="input-idnumber" class="form-control" required placeholder="C82710492P">
          </div>
          <div class="form-group" style="grid-column: 1 / -1;">
            <label>Wohnanschrift (Straße, PLZ, Ort)</label>
            <input type="text" id="input-address" class="form-control" required placeholder="Müllerstraße 45, 13349 Berlin">
          </div>
        </div>
        <div style="margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
          <button type="submit" class="btn btn-success">✓ Daten speichern & bestätigen</button>
        </div>
      </form>
    </div>

    <!-- Official Printable A4 Document Sheet -->
    <div id="certificate-sheet">
      <div class="cert-frame">
        <div class="cert-title">
          <div class="font-amiri" style="font-size: 1.75rem; font-weight: 700; color: var(--primary-color);">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--primary-color); margin-top: 0.25rem;">ARRESALAH CENTER BERLIN e.V.</h2>
          <p class="font-cairo" style="font-size: 1.1rem; font-weight: 700; color: var(--gold-color);">عقد زواج إسلامي شرعي • Islamische Eheschließungsurkunde</p>
          <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.25rem;">
            CTR-Code: <b id="cert-ctr">${contract.general.contractCode}</b> | Reg.-Nr: <b id="cert-reg">${contract.general.registryNumber}</b> | Datum: <b id="cert-date">${contract.general.gregorianDate}</b> (${contract.general.hijriDate})
          </p>
        </div>

        <div class="ayah-box">
          <p class="font-amiri" style="font-size: 1.1rem; color: var(--primary-color);">﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾</p>
        </div>

        <!-- 2 Parties: Husband & Wife -->
        <div class="parties-grid">
          <div class="party-box">
            <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--primary-color); border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem;">1. DER EHEMANN (الزوج)</h4>
            <p style="font-size: 0.85rem; margin-top: 0.5rem;"><b>Name:</b> <span id="cert-husband-name">${contract.parties.husband.fullName || '—'}</span> (<span id="cert-husband-ar">${contract.parties.husband.fullNameArabic || '—'}</span>)</p>
            <p style="font-size: 0.8rem; color: #475569;"><b>Geburtsdatum:</b> <span id="cert-husband-dob">${contract.parties.husband.dateOfBirth?.day}.${contract.parties.husband.dateOfBirth?.month}.${contract.parties.husband.dateOfBirth?.year}</span></p>
            <p style="font-size: 0.8rem; color: #475569;"><b>Staatsangehörigkeit:</b> <span id="cert-husband-nat">${contract.parties.husband.nationality || '—'}</span></p>
            <p style="font-size: 0.8rem; color: #475569;"><b>Ausweis-Nr.:</b> <span id="cert-husband-id">${contract.parties.husband.idNumber || '—'}</span></p>
            <p style="font-size: 0.8rem; color: #475569;"><b>Wohnort:</b> <span id="cert-husband-addr">${contract.parties.husband.address || '—'}</span></p>
          </div>

          <div class="party-box">
            <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--primary-color); border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem;">2. DIE EHEFRAU (الزوجة)</h4>
            <p style="font-size: 0.85rem; margin-top: 0.5rem;"><b>Name:</b> <span id="cert-wife-name">${contract.parties.wife.fullName || '—'}</span> (<span id="cert-wife-ar">${contract.parties.wife.fullNameArabic || '—'}</span>)</p>
            <p style="font-size: 0.8rem; color: #475569;"><b>Geburtsdatum:</b> <span id="cert-wife-dob">${contract.parties.wife.dateOfBirth?.day}.${contract.parties.wife.dateOfBirth?.month}.${contract.parties.wife.dateOfBirth?.year}</span></p>
            <p style="font-size: 0.8rem; color: #475569;"><b>Staatsangehörigkeit:</b> <span id="cert-wife-nat">${contract.parties.wife.nationality || '—'}</span></p>
            <p style="font-size: 0.8rem; color: #475569;"><b>Ausweis-Nr.:</b> <span id="cert-wife-id">${contract.parties.wife.idNumber || '—'}</span></p>
            <p style="font-size: 0.8rem; color: #475569;"><b>Wohnort:</b> <span id="cert-wife-addr">${contract.parties.wife.address || '—'}</span></p>
          </div>
        </div>

        <!-- Guardian & Mahr -->
        <div style="margin-top: 1rem; border: 1px solid #e2e8f0; padding: 0.75rem; border-radius: 0.5rem; background: white; font-size: 0.8rem;">
          <p><b>3. Brautvormund (الولي):</b> <span id="cert-guardian-name">${contract.parties.guardian.fullName}</span> (<span id="cert-guardian-rel">${contract.parties.guardian.relationToWife || 'Vater'}</span>) • Ausweis: <span id="cert-guardian-id">${contract.parties.guardian.idNumber}</span></p>
          <p style="margin-top: 0.35rem;"><b>4. Brautgabe (Mahr / الصداق):</b> Sofort fällig: <b>${contract.dowry.promptAmount} ${contract.dowry.promptCurrency}</b> (makkbood / empfangen) | Aufgeschoben: <b>${contract.dowry.deferredAmount} ${contract.dowry.deferredCurrency}</b> (${contract.dowry.deferredDueCondition})</p>
          <p style="margin-top: 0.35rem;"><b>5. Trauzeugen (الشهود):</b> 1. <span id="cert-w1-name">${contract.parties.witness1.fullName}</span> (Ausw. ${contract.parties.witness1.idNumber}) | 2. <span id="cert-w2-name">${contract.parties.witness2.fullName}</span> (Ausw. ${contract.parties.witness2.idNumber})</p>
        </div>

        <!-- Canonical Solemnization Statement -->
        <p style="text-align: center; font-size: 0.75rem; color: #475569; margin-top: 1rem; padding: 0.5rem; background: #f8fafc; border-radius: 0.25rem;">
          Die Ehe wurde durch Ijab und Qabul im Beisein des Vormunds und zweier Zeugen vor dem Imam des Arresalah Centers Berlin geschlossen.
        </p>

        <!-- Signatures Grid -->
        <div class="sig-grid">
          <div><div class="sig-line"></div><p style="font-size: 0.75rem; font-weight: 700;">Ehemann (الزوج)</p></div>
          <div><div class="sig-line"></div><p style="font-size: 0.75rem; font-weight: 700;">Ehefrau (الزوجة)</p></div>
          <div><div class="sig-line"></div><p style="font-size: 0.75rem; font-weight: 700;">Brautvormund (الولي)</p></div>
          <div><div class="sig-line"></div><p style="font-size: 0.75rem; font-weight: 700;">1. Trauzeuge (الشاهد 1)</p></div>
          <div><div class="sig-line"></div><p style="font-size: 0.75rem; font-weight: 700;">2. Trauzeuge (الشاهد 2)</p></div>
          <div>
            <div style="border: 2px dashed var(--primary-color); border-radius: 50%; width: 50px; height: 50px; margin: 0 auto; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; color: var(--primary-color); font-weight: 700;">SIEGEL</div>
            <p style="font-size: 0.75rem; font-weight: 700; color: var(--primary-color); margin-top: 0.25rem;">Imam & Siegel</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // State management in localStorage
    const STORAGE_KEY = 'arresalah_single_html_contract_v1';
    let contract = ${contractJson};
    let activeRole = 'husband';

    const roles = [
      { id: 'husband', title: '1. Ehemann (الزوج)' },
      { id: 'wife', title: '2. Ehefrau (الزوجة)' },
      { id: 'guardian', title: '3. Brautvormund (الولي)' },
      { id: 'witness1', title: '4. 1. Trauzeuge (الشاهد 1)' },
      { id: 'witness2', title: '5. 2. Trauzeuge (الشاهد 2)' }
    ];

    // Load from storage if present
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { contract = JSON.parse(saved); } catch(e){}
    }

    function renderTabs() {
      const tabsEl = document.getElementById('party-tabs');
      tabsEl.innerHTML = '';
      let completedCount = 0;

      roles.forEach(r => {
        const isComp = contract.parties[r.id]?.isCompleted;
        if (isComp) completedCount++;
        const btn = document.createElement('button');
        btn.className = 'party-pill ' + (r.id === activeRole ? 'active ' : '') + (isComp ? 'completed' : '');
        btn.textContent = r.title + (isComp ? ' ✓' : '');
        btn.onclick = () => selectRole(r.id);
        tabsEl.appendChild(btn);
      });

      const percent = Math.round((completedCount / 5) * 100);
      document.getElementById('progress-percent').textContent = percent + '%';
      document.getElementById('progress-text').textContent = completedCount + ' / 5 Parteien erfasst';
    }

    function selectRole(role) {
      activeRole = role;
      const party = contract.parties[role] || {};
      const roleObj = roles.find(r => r.id === role);
      document.getElementById('current-party-title').textContent = roleObj.title;
      document.getElementById('input-fullname').value = party.fullName || '';
      document.getElementById('input-fullname-ar').value = party.fullNameArabic || '';
      document.getElementById('input-dob').value = party.dateOfBirth ? (party.dateOfBirth.day + '.' + party.dateOfBirth.month + '.' + party.dateOfBirth.year) : '';
      document.getElementById('input-pob').value = party.placeOfBirth || '';
      document.getElementById('input-nationality').value = party.nationality || '';
      document.getElementById('input-idnumber').value = party.idNumber || '';
      document.getElementById('input-address').value = party.address || '';
      renderTabs();
    }

    function saveActiveParty() {
      const p = contract.parties[activeRole] || {};
      p.fullName = document.getElementById('input-fullname').value;
      p.fullNameArabic = document.getElementById('input-fullname-ar').value;
      const dobVal = document.getElementById('input-dob').value.split('.');
      p.dateOfBirth = { day: dobVal[0] || '01', month: dobVal[1] || '01', year: dobVal[2] || '1995' };
      p.placeOfBirth = document.getElementById('input-pob').value;
      p.nationality = document.getElementById('input-nationality').value;
      p.idNumber = document.getElementById('input-idnumber').value;
      p.address = document.getElementById('input-address').value;
      p.isCompleted = true;
      contract.parties[activeRole] = p;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(contract));
      renderTabs();
      updateCertificateView();
      alert('✓ Daten erfolgreich gespeichert!');
    }

    function updateCertificateView() {
      const h = contract.parties.husband || {};
      const w = contract.parties.wife || {};
      const g = contract.parties.guardian || {};
      const w1 = contract.parties.witness1 || {};
      const w2 = contract.parties.witness2 || {};

      document.getElementById('cert-husband-name').textContent = h.fullName || '—';
      document.getElementById('cert-husband-ar').textContent = h.fullNameArabic || '—';
      document.getElementById('cert-husband-nat').textContent = h.nationality || '—';
      document.getElementById('cert-husband-id').textContent = h.idNumber || '—';
      document.getElementById('cert-husband-addr').textContent = h.address || '—';

      document.getElementById('cert-wife-name').textContent = w.fullName || '—';
      document.getElementById('cert-wife-ar').textContent = w.fullNameArabic || '—';
      document.getElementById('cert-wife-nat').textContent = w.nationality || '—';
      document.getElementById('cert-wife-id').textContent = w.idNumber || '—';
      document.getElementById('cert-wife-addr').textContent = w.address || '—';

      document.getElementById('cert-guardian-name').textContent = g.fullName || '—';
      document.getElementById('cert-w1-name').textContent = w1.fullName || '—';
      document.getElementById('cert-w2-name').textContent = w2.fullName || '—';
    }

    function toggleLang() {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      document.documentElement.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
      document.documentElement.setAttribute('lang', isRtl ? 'de' : 'ar');
    }

    // Init
    selectRole('husband');
    renderTabs();
    updateCertificateView();
  </script>
</body>
</html>`;
}
