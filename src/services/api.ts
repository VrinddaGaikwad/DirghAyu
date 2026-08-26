import { mockCases } from "../data/mockData";
import type {
  Case,
  Document,
  Patient,
  AISummary,
  RedFlag,
  Medication,
  Investigation,
} from "../types";

/* =========================================================
   AYUCARE FRONTEND SERVICE LAYER

   Frontend-only demo service layer.

   Simulates:
   - AI case summarization
   - OCR / document extraction
   - Red-flag detection
   - Patient responses
   - Doctor verification

   A real backend/API can replace these functions later.
========================================================= */


/* ---------------------------------------------------------
   UTILITY
--------------------------------------------------------- */

const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}


/* =========================================================
   CASES
========================================================= */

export async function getPatients(): Promise<Case[]> {
  await wait(400);

  const local = localStorage.getItem("ayucare-cases");

  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      return JSON.parse(JSON.stringify(mockCases));
    }
  }

  return JSON.parse(JSON.stringify(mockCases));
}


export async function getPatientCase(
  id: string
): Promise<Case | undefined> {

  await wait(250);

  const local = localStorage.getItem("ayucare-cases");

  let cases: Case[] = mockCases;

  if (local) {
    try {
      cases = JSON.parse(local);
    } catch {
      cases = mockCases;
    }
  }

  return cases.find((c) => c.id === id);
}


/* =========================================================
   PATIENT RESPONSES
========================================================= */

export async function submitPatientResponse(
  sessionId: string,
  questionId: string,
  answer: string
) {
  await wait(180);

  return {
    ok: true,
    sessionId,
    questionId,
    answer,
    timestamp: new Date().toISOString(),
  };
}


/* =========================================================
   RED FLAG DETECTION
========================================================= */

/*
  Conservative frontend rule engine.

  This does NOT diagnose a medical condition.

  It detects phrases that should trigger
  clinician review.
*/

const redFlagRules = [
  {
    keywords: [
      "difficulty breathing",
      "can't breathe",
      "cannot breathe",
      "breathing problem",
      "shortness of breath",
    ],
    message:
      "Breathing difficulty reported — prompt clinician review recommended.",
    rule: "R-01",
  },

  {
    keywords: [
      "chest pain",
      "chest pressure",
      "pressure in chest",
    ],
    message:
      "Chest discomfort reported — prompt clinician review recommended.",
    rule: "R-02",
  },

  {
    keywords: [
      "fainted",
      "fainting",
      "unconscious",
      "loss of consciousness",
    ],
    message:
      "Loss of consciousness reported — urgent clinical assessment recommended.",
    rule: "R-03",
  },

  {
    keywords: [
      "severe pain",
      "extreme pain",
      "unbearable pain",
      "worst pain",
    ],
    message:
      "Severe pain reported — prompt clinician review recommended.",
    rule: "R-04",
  },

  {
    keywords: [
      "blood in vomit",
      "vomiting blood",
      "blood vomit",
    ],
    message:
      "Blood reported in vomit — urgent clinician review recommended.",
    rule: "R-05",
  },

  {
    keywords: [
      "blood in stool",
      "blood in stools",
      "black stool",
      "bloody stool",
    ],
    message:
      "Abnormal bleeding symptom reported — prompt clinician review recommended.",
    rule: "R-06",
  },

  {
    keywords: [
      "high fever",
      "very high fever",
      "fever 103",
      "fever 104",
    ],
    message:
      "High fever reported — clinician review recommended.",
    rule: "R-07",
  },

  {
    keywords: [
      "suicidal",
      "suicide",
      "self harm",
      "self-harm",
    ],
    message:
      "Safety concern detected — immediate professional assessment is required.",
    rule: "R-08",
  },
];


export function detectRedFlags(
  answers: Record<string, string>
): RedFlag[] {

  const combinedText = Object.values(answers)
    .join(" ")
    .toLowerCase();

  const detected: RedFlag[] = [];

  for (const rule of redFlagRules) {

    const matched = rule.keywords.some((keyword) =>
      combinedText.includes(keyword)
    );

    if (matched) {

      detected.push({
        id: createId("redflag"),
        priority: "high",
        message: rule.message,
        rule: rule.rule,
        acknowledged: false,
      });

    }
  }

  if (detected.length === 0) {

    detected.push({
      id: createId("normal"),
      priority: "normal",
      message:
        "No urgent red-flag phrases detected in the provided responses.",
      acknowledged: false,
    });

  }

  return detected;
}


/* =========================================================
   OCR / DOCUMENT EXTRACTION
========================================================= */

function extractDocumentInformation(
  filename: string,
  type: string
): Record<string, string> {

  const lowerName = filename.toLowerCase();


  /* -------------------------------------------------------
     BLOOD REPORT
  ------------------------------------------------------- */

  if (
    type === "Blood Report" ||
    lowerName.includes("blood") ||
    lowerName.includes("cbc")
  ) {

    return {
      "Report Type": "Blood Report",
      Hb: "11.2 g/dL",
      WBC: "7,800 /µL",
      Platelets: "2.45 lakh /µL",
      "Extraction Status": "High confidence",
    };

  }


  /* -------------------------------------------------------
     PRESCRIPTION
  ------------------------------------------------------- */

  if (
    type === "Prescription" ||
    lowerName.includes("prescription") ||
    lowerName.includes("medicine")
  ) {

    return {
      Medicine: "Pantoprazole",
      Dosage: "40 mg",
      Frequency: "Once daily",
      Route: "Oral",
      "Extraction Status": "High confidence",
    };

  }


  /* -------------------------------------------------------
     DISCHARGE SUMMARY
  ------------------------------------------------------- */

  if (
    type === "Discharge Summary" ||
    lowerName.includes("discharge")
  ) {

    return {
      "Document Type": "Discharge Summary",
      Diagnosis: "Gastritis",
      Medication: "Pantoprazole 40 mg",
      FollowUp: "As advised by clinician",
      "Extraction Status": "Medium confidence",
    };

  }


  /* -------------------------------------------------------
     GENERIC DOCUMENT
  ------------------------------------------------------- */

  return {
    "Document Type": type,
    "Detected Content":
      "Document uploaded successfully. Key medical fields require clinician verification.",
    "Extraction Status": "Review required",
  };
}


/* =========================================================
   UPLOAD + OCR
========================================================= */

export async function uploadDocument(
  file: File,
  type: string
): Promise<Document> {

  /*
    Simulated pipeline:

    File upload
         ↓
    OCR processing
         ↓
    Information extraction
         ↓
    Structured medical fields
  */

  await wait(700);

  await wait(500);

  const extracted = extractDocumentInformation(
    file.name,
    type
  );

  return {
    id: crypto.randomUUID(),

    filename: file.name,

    type,

    status: "Extracted",

    uploadedAt: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),

    extracted,
  };
}


/* =========================================================
   AI SUMMARY HELPERS
========================================================= */

function getAnswer(
  answers: Record<string, string>,
  id: string
): string {

  return answers[id]?.trim() || "";
}


/* ---------------------------------------------------------
   SYMPTOM EXTRACTION
--------------------------------------------------------- */

function buildSymptoms(
  answers: Record<string, string>
): string[] {

  const text = Object.values(answers)
    .join(" ")
    .toLowerCase();

  const symptomMap: [string, string][] = [

    ["stomach pain", "Abdominal pain"],

    ["abdominal pain", "Abdominal pain"],

    ["bloating", "Bloating"],

    ["indigestion", "Indigestion"],

    ["headache", "Headache"],

    ["fatigue", "Fatigue"],

    ["poor sleep", "Sleep disturbance"],

    ["irregular appetite", "Irregular appetite"],

    ["difficulty breathing", "Difficulty breathing"],

    ["shortness of breath", "Shortness of breath"],

    ["chest pain", "Chest pain"],

    ["fever", "Fever"],
  ];


  const found: string[] = [];


  for (const [keyword, label] of symptomMap) {

    if (
      text.includes(keyword) &&
      !found.includes(label)
    ) {

      found.push(label);

    }

  }


  return found.length
    ? found
    : ["Symptoms require clinician review"];
}


/* ---------------------------------------------------------
   MEDICATION EXTRACTION
--------------------------------------------------------- */

function buildMedications(
  answers: Record<string, string>
): Medication[] {

  const text = Object.values(answers)
    .join(" ")
    .toLowerCase();

  const medications: Medication[] = [];


  if (text.includes("pantoprazole")) {

    medications.push({
      name: "Pantoprazole",

      dose: text.includes("40 mg")
        ? "40 mg"
        : "Dose not specified",

      frequency: text.includes("once daily")
        ? "Once daily"
        : "Frequency not specified",
    });

  }


  if (text.includes("paracetamol")) {

    medications.push({
      name: "Paracetamol",
      dose: "Dose not specified",
      frequency: "Frequency not specified",
    });

  }


  return medications;
}


/* ---------------------------------------------------------
   INVESTIGATION EXTRACTION
--------------------------------------------------------- */

function buildInvestigations(
  answers: Record<string, string>
): Investigation[] {

  const text = Object.values(answers)
    .join(" ")
    .toLowerCase();

  const investigations: Investigation[] = [];


  if (text.includes("hb")) {

    investigations.push({
      name: "Hemoglobin",
      value: "11.2",
      unit: "g/dL",
    });

  }


  return investigations;
}


/* ---------------------------------------------------------
   MEDICAL HISTORY
--------------------------------------------------------- */

function buildMedicalHistory(
  answers: Record<string, string>
): string {

  const history = getAnswer(
    answers,
    "q5"
  );


  if (!history) {

    return "No medical history provided during intake.";

  }


  return history;
}


/* =========================================================
   AI SUMMARY GENERATOR
========================================================= */

export async function generateSummary(
  patient: Patient,
  answers: Record<string, string>
): Promise<AISummary> {

  /*
    Simulated AI processing.

    In a production system this function could call
    an actual backend AI service.
  */

  await wait(1000);


  const complaint =
    getAnswer(answers, "q1") ||
    "No chief complaint provided.";


  const duration =
    getAnswer(answers, "q2");


  const symptoms =
    buildSymptoms(answers);


  const medications =
    buildMedications(answers);


  const investigations =
    buildInvestigations(answers);


  const redFlags =
    detectRedFlags(answers);


  const durationText =
    duration
      ? ` Symptoms have been reported for ${duration.toLowerCase()}.`
      : "";


  const patientOverview =
    `${patient.name}, ${patient.age}-year-old ${patient.gender}, completed a structured pre-consultation intake.${durationText}`;


  /* -------------------------------------------------------
     DOCUMENT INSIGHTS
  ------------------------------------------------------- */

  const documentInsights: Record<string, string> = {};

  const storedDocuments =
    localStorage.getItem("ayucare-documents");


  if (storedDocuments) {

    try {

      const docs: Document[] =
        JSON.parse(storedDocuments);


      docs.forEach((doc) => {

        if (doc.extracted) {

          Object.entries(doc.extracted)
            .forEach(([key, value]) => {

              documentInsights[key] = value;

            });

        }

      });

    } catch {
      /* Ignore invalid local storage */
    }

  }


  /* -------------------------------------------------------
     RETURN STRUCTURED AI SUMMARY
  ------------------------------------------------------- */

  return {

    patientOverview,

    chiefComplaint: complaint,

    symptoms,

    medicalHistory:
      buildMedicalHistory(answers),

    medications,

    investigations,

    ayurveda: {
      prakriti: "Pitta-Kapha",

      vikriti:
        "Requires practitioner verification",

      agni: "Vishama",

      koshtha: "Madhyama",

      ahara:
        "Irregular meal timing reported",

      vihara:
        "Lifestyle assessment pending",

      dashavidha:
        "Assessment generated from patient intake and requires doctor verification",
    },

    documentInsights,

    redFlags,

    confidence: 0.87,

    generatedAt:
      new Date().toISOString(),

    status: "Draft",
  };
}


/* =========================================================
   DOCTOR APPROVAL
========================================================= */

export async function approveCase(
  id: string
) {

  await wait(450);

  return {
    id,
    status: "Doctor Verified" as const,
  };

}