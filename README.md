# Islamische Eheschließungsurkunde - Arresalah Center Berlin e.V.
### وثيقة عقد الزواج الشرعي الإسلامي - مركز الرسالة برلين

Offizielle, zweisprachige Webanwendung zur rechtssicheren Erfassung, Verifikation und Ausstellung von islamischen Eheschließungsurkunden für das **Arresalah Center Berlin e.V.** (Gerichtstraße 38, 13347 Berlin).

---

## 🌟 Hauptfunktionen (Features)

1. **5-Parteien-Fortschrittsradar (Segment Progress Donut / Radar)**:
   - Visuelle Erfassung der 5 obligatorischen Vertragsparteien gemäß islamischer Scharia:
     - 1. Ehemann (الزوج)
     - 2. Ehefrau (الزوجة)
     - 3. Brautvormund (الولي)
     - 4. 1. Trauzeuge (الشاهد الأول)
     - 5. 2. Trauzeuge (الشاهد الثاني)
   - Dynamischer Farbwechsel zu Erfolgsgrün (`#27ae60`) mit aktiven Häkchen und Prozentanzeige bei Fertigstellung jedes Segments.

2. **CTR-Vertragscode-System (Batch Generator)**:
   - Erzeugt eindeutige, verwechslungssichere Vertragscodes (z.B. `CTR-8X2K9P`).
   - Verwaltung mehrerer Verträge mit Batch-Umschaltung und Suchfunktion.

3. **Autarke Datenpersistenz (localStorage & Base64)**:
   - Alle Verträge, Formulardaten und Ausweiskopien (Profilfoto, Ausweis Vorder- & Rückseite) werden in Base64 kodiert und direkt im Browser-Speicher (`localStorage`) gesichert.
   - Kein externer Server oder Cloud-Zwang erforderlich; höchste Vertraulichkeit.

4. **Offizielles DIN-A4 Dokumentenlayout (`@media print`)**:
   - Originalgetreue islamische Schmuckumrandung mit Basmala (بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ), Sure Ar-Rum (30:21), zweisprachigen Tabellen, Mahr-Aufstellung (Sofort & Aufgeschoben) und 6 Unterschriften-Feldern inklusive Dienstsiegel-Bereich des Imams.
   - Bei Klick auf *Drucken* wird das A4-Zertifikat sauber formatiert ohne Menüleisten oder Buttons als PDF ausgegeben.

5. **Dreisprachige Unterstützung (i18n)**:
   - Deutsch (de, Standard, LTR)
   - Arabisch (ar, RTL mit Cairo- & Amiri-Schriftarten)
   - Englisch (en, LTR)

6. **Einklappbare Entwickleransicht & Standalone Single-File HTML5 Export**:
   - Schneller Klick auf 🔽/🔼 Code öffnet den eigenständigen, autarken HTML5-Code (`index.html`) zur direkten Bereitstellung auf GitHub Pages.

---

## 🚀 Bereitstellung auf GitHub Pages (Deployment)

Führen Sie folgende Befehle in Ihrem Terminal / Git Bash aus:

```bash
# 1. Lokales Git-Repository initialisieren
git init
git add .
git commit -m "feat: Initialisiere Islamische Eheschliessungsurkunde Arresalah Berlin"

# 2. Main-Branch erstellen und Remote-URL verknüpfen
git branch -M main
git remote add origin https://github.com/DEIN_BENUTZERNAME/arresalah-urkunde.git
git push -u origin main
```

### GitHub Pages aktivieren:
1. Öffnen Sie Ihr GitHub-Repository und navigieren Sie zu **Settings** > **Pages**.
2. Wählen Sie unter **Branch**: `main` und Ordner `/ (root)`.
3. Klicken Sie auf **Save**. Nach wenigen Augenblicken ist die Urkunde weltweit unter `https://DEIN_BENUTZERNAME.github.io/arresalah-urkunde/` erreichbar!

---

## 🛠️ Lokale Entwicklung mit Vite

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten (Port 3000)
npm run dev

# Produktions-Build erzeugen
npm run build
```

---

## 📄 Lizenz & Urheberrecht
Entwickelt für das **Arresalah Center Berlin e.V.** (Islamische Gemeinde Berlin). Alle Rechte vorbehalten.
