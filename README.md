# AyuCare — SIH26047 Frontend Prototype

Frontend-only React + TypeScript + Vite + Tailwind CSS prototype for the Smart India Hackathon "Patient Case-Taking Software" concept.

## Run

Requirements:
- Node.js 18+ (20+ recommended)
- VS Code is optional but recommended

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally:

http://localhost:5173

For a production build:

```bash
npm run build
npm run preview
```

## Demo flow

Landing
→ Patient Registration
→ Consent + Language
→ Patient Intake
→ Simulated Voice/Text
→ Ayurveda Assessment
→ Document Upload
→ Mock OCR
→ AI Summary
→ Doctor Dashboard
→ Patient Case
→ Red Flags
→ Edit
→ Approve
→ Doctor Verified

## Folder structure

```text
src/
├── components/
│   ├── layout.tsx
│   ├── patient.tsx
│   └── ui.tsx
├── context/
│   └── AppContext.tsx
├── data/
│   └── mockData.ts
├── pages/
│   ├── Landing.tsx
│   ├── PatientPages.tsx
│   └── Doctor.tsx
├── services/
│   └── api.ts
├── types.ts
├── App.tsx
├── index.css
└── main.tsx
```

## Mock integrations

- Voice: `VoiceButton` simulates a 1.5-second recording and inserts a predefined response.
- OCR: `uploadDocument()` waits briefly and returns demo extracted medical fields.
- AI summary: `generateSummary()` waits briefly and the summary page creates a structured mock draft.
- Database/API: all state is local React state + localStorage.
- Doctor approval: `approveCase()` simulates a request and the UI changes to `Doctor Verified`.

## Backend replacement points

Replace the functions in `src/services/api.ts` with `fetch()`/Axios calls later.

Suggested future endpoints:
- `getPatients()` → `GET /doctor/patients`
- `getPatientCase(id)` → `GET /doctor/patient/{id}`
- `submitPatientResponse()` → `POST /answers`
- `uploadDocument()` → `POST /documents/upload`
- `generateSummary()` → `POST /summary/generate`
- `approveCase()` → `POST /summary/{id}/approve`

The UI intentionally does not implement real diagnosis, real medical decision-making, real authentication, a real database, or real AI.
