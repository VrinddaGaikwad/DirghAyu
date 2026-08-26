import type { Case, Patient } from "../types";

export const defaultAyurveda = {
  prakriti: "Pitta-Kapha",
  vikriti: "Pitta aggravation — pending verification",
  agni: "Vishama",
  koshtha: "Madhyama",
  ahara: "Irregular meal timing reported",
  vihara: "Sedentary routine reported",
  dashavidha: "Demo assessment — doctor verification required"
};

const normalRedFlag = (id: string) => ({
  id,
  priority: "normal" as const,
  message: "No urgent red flags detected in the provided responses.",
  rule: "SCREEN-01"
});

export const mockCases: Case[] = [
  {
    id: "case-001",
    patient: {
      id: "p-001",
      name: "Aarav Kulkarni",
      age: 34,
      gender: "Male",
      mobile: "98XXXXXX21",
      language: "Marathi"
    },
    chiefComplaint:
      "Abdominal discomfort and bloating for approximately 3 months.",
    symptoms: [
      {
        id: "s1",
        label: "Abdominal pain",
        severity: "moderate",
        duration: "3 months"
      },
      {
        id: "s2",
        label: "Bloating",
        severity: "mild",
        duration: "3 months"
      },
      {
        id: "s3",
        label: "Indigestion",
        severity: "moderate",
        duration: "2 months"
      }
    ],
    medicalHistory:
      "No known chronic condition reported. Previous history of gastritis mentioned in uploaded report.",
    medications: [
      {
        name: "Pantoprazole",
        dose: "40 mg",
        frequency: "Once daily"
      }
    ],
    investigations: [
      {
        name: "Hb",
        value: "11.2",
        unit: "g/dL",
        referenceRange: "13.0–17.0",
        status: "abnormal"
      }
    ],
    ayurveda: {
      ...defaultAyurveda
    },
    documents: [
      {
        id: "doc-1",
        filename: "aarav_blood_report.pdf",
        type: "Blood Report",
        status: "Extracted",
        uploadedAt: "Today, 10:18 AM",
        extracted: {
          Medicine: "Pantoprazole 40 mg",
          Frequency: "Once daily",
          "Previous diagnosis": "Gastritis",
          Hb: "11.2 g/dL"
        },
        ocr: {
          documentType: "Blood Report",
          confidence: 94,
          fields: {
            Medicine: {
              value: "Pantoprazole 40 mg",
              confidence: 96
            },
            Frequency: {
              value: "Once daily",
              confidence: 95
            },
            "Previous diagnosis": {
              value: "Gastritis",
              confidence: 91
            },
            Hb: {
              value: "11.2 g/dL",
              confidence: 98
            }
          }
        }
      }
    ],
    summary: {
      patientOverview:
        "34-year-old patient presenting with recurring abdominal discomfort, bloating and indigestion.",
      chiefComplaint:
        "Abdominal discomfort and bloating for approximately 3 months.",
      symptoms: ["Abdominal pain", "Bloating", "Indigestion"],
      medicalHistory:
        "No known chronic condition. Previous gastritis noted in uploaded documentation.",
      medications: [
        {
          name: "Pantoprazole",
          dose: "40 mg",
          frequency: "Once daily"
        }
      ],
      investigations: [
        {
          name: "Hb",
          value: "11.2",
          unit: "g/dL",
          referenceRange: "13.0–17.0",
          status: "abnormal"
        }
      ],
      ayurveda: {
        ...defaultAyurveda
      },
      documentInsights: {
        Medicine: "Pantoprazole 40 mg",
        Frequency: "Once daily",
        "Previous diagnosis": "Gastritis",
        Hb: "11.2 g/dL"
      },
      redFlags: [normalRedFlag("rf-normal-001")],
      confidence: 91,
      generatedAt: "Today, 10:22 AM",
      status: "Draft"
    },
    waitingTime: "08 min",
    priority: "Normal",
    status: "Pending Review",
    createdAt: "Today, 10:14 AM",
    lastUpdated: "Today, 10:22 AM"
  },

  {
    id: "case-002",
    patient: {
      id: "p-002",
      name: "Meera Joshi",
      age: 47,
      gender: "Female",
      mobile: "97XXXXXX43",
      language: "Hindi"
    },
    chiefComplaint:
      "Severe discomfort accompanied by difficulty breathing.",
    symptoms: [
      {
        id: "s4",
        label: "Severe discomfort",
        severity: "severe",
        duration: "30 minutes"
      },
      {
        id: "s5",
        label: "Difficulty breathing",
        severity: "severe",
        duration: "20 minutes"
      }
    ],
    medicalHistory:
      "Demo case. Patient reports sudden onset of severe symptoms during intake.",
    medications: [],
    investigations: [],
    ayurveda: {
      ...defaultAyurveda
    },
    documents: [],
    summary: {
      patientOverview:
        "47-year-old patient reporting severe symptoms requiring immediate clinician attention.",
      chiefComplaint:
        "Severe discomfort accompanied by difficulty breathing.",
      symptoms: ["Severe discomfort", "Difficulty breathing"],
      medicalHistory:
        "Sudden onset of severe symptoms reported during intake.",
      medications: [],
      investigations: [],
      ayurveda: {
        ...defaultAyurveda
      },
      documentInsights: {},
      redFlags: [
        {
          id: "rf-critical-001",
          priority: "critical",
          message:
            "Difficulty breathing with severe discomfort detected during intake.",
          rule: "R-04",
          source: "Patient questionnaire",
          acknowledged: false
        },
        {
          id: "rf-high-002",
          priority: "high",
          message:
            "Severe symptom severity reported. Immediate clinician review recommended.",
          rule: "R-02",
          source: "Patient questionnaire",
          acknowledged: false
        }
      ],
      confidence: 96,
      generatedAt: "Today, 10:25 AM",
      status: "Draft"
    },
    waitingTime: "03 min",
    priority: "Critical",
    status: "Waiting",
    createdAt: "Today, 10:23 AM",
    lastUpdated: "Today, 10:25 AM"
  },

  {
    id: "case-003",
    patient: {
      id: "p-003",
      name: "Rohan Patil",
      age: 29,
      gender: "Male",
      mobile: "99XXXXXX14",
      language: "English"
    },
    chiefComplaint:
      "Recurring headache and fatigue for approximately 2 weeks.",
    symptoms: [
      {
        id: "s6",
        label: "Headache",
        severity: "moderate",
        duration: "2 weeks"
      },
      {
        id: "s7",
        label: "Fatigue",
        severity: "mild",
        duration: "2 weeks"
      }
    ],
    medicalHistory:
      "No previous surgery reported. No known chronic condition in demo intake.",
    medications: [],
    investigations: [
      {
        name: "Hb",
        value: "13.4",
        unit: "g/dL",
        referenceRange: "13.0–17.0",
        status: "normal"
      }
    ],
    ayurveda: {
      ...defaultAyurveda,
      prakriti: "Vata-Pitta",
      agni: "Tikshna"
    },
    documents: [],
    summary: {
      patientOverview:
        "29-year-old patient reporting recurring headache and fatigue.",
      chiefComplaint:
        "Recurring headache and fatigue for approximately 2 weeks.",
      symptoms: ["Headache", "Fatigue"],
      medicalHistory:
        "No previous surgery reported. No known chronic condition reported.",
      medications: [],
      investigations: [
        {
          name: "Hb",
          value: "13.4",
          unit: "g/dL",
          referenceRange: "13.0–17.0",
          status: "normal"
        }
      ],
      ayurveda: {
        ...defaultAyurveda,
        prakriti: "Vata-Pitta",
        agni: "Tikshna"
      },
      documentInsights: {},
      redFlags: [normalRedFlag("rf-normal-002")],
      confidence: 89,
      generatedAt: "Today, 10:31 AM",
      status: "Draft"
    },
    waitingTime: "14 min",
    priority: "Normal",
    status: "Waiting",
    createdAt: "Today, 10:17 AM",
    lastUpdated: "Today, 10:31 AM"
  },

  {
    id: "case-004",
    patient: {
      id: "p-004",
      name: "Ananya Shah",
      age: 41,
      gender: "Female",
      mobile: "96XXXXXX72",
      language: "Marathi"
    },
    chiefComplaint:
      "Sleep disturbance and irregular appetite affecting daily routine.",
    symptoms: [
      {
        id: "s8",
        label: "Poor sleep",
        severity: "moderate",
        duration: "1 month"
      },
      {
        id: "s9",
        label: "Irregular appetite",
        severity: "mild",
        duration: "3 weeks"
      }
    ],
    medicalHistory:
      "Demo-only history. No major chronic condition reported.",
    medications: [],
    investigations: [],
    ayurveda: {
      ...defaultAyurveda,
      prakriti: "Vata",
      agni: "Vishama",
      vihara: "Sedentary"
    },
    documents: [],
    summary: {
      patientOverview:
        "41-year-old patient reporting sleep and appetite irregularities.",
      chiefComplaint:
        "Sleep disturbance and irregular appetite affecting daily routine.",
      symptoms: ["Poor sleep", "Irregular appetite"],
      medicalHistory:
        "No major chronic condition reported in the demo intake.",
      medications: [],
      investigations: [],
      ayurveda: {
        ...defaultAyurveda,
        prakriti: "Vata",
        agni: "Vishama",
        vihara: "Sedentary"
      },
      documentInsights: {},
      redFlags: [normalRedFlag("rf-normal-003")],
      confidence: 87,
      generatedAt: "Today, 09:45 AM",
      status: "Draft"
    },
    waitingTime: "21 min",
    priority: "Normal",
    status: "Completed",
    createdAt: "Today, 09:24 AM",
    lastUpdated: "Today, 09:45 AM"
  },

  {
    id: "case-005",
    patient: {
      id: "p-005",
      name: "Siddharth Deshmukh",
      age: 56,
      gender: "Male",
      mobile: "95XXXXXX38",
      language: "Hindi"
    },
    chiefComplaint:
      "Chest discomfort with sweating and weakness reported during intake.",
    symptoms: [
      {
        id: "s10",
        label: "Chest discomfort",
        severity: "severe",
        duration: "15 minutes"
      },
      {
        id: "s11",
        label: "Sweating",
        severity: "moderate",
        duration: "15 minutes"
      },
      {
        id: "s12",
        label: "Weakness",
        severity: "moderate",
        duration: "20 minutes"
      }
    ],
    medicalHistory:
      "Demo case. Patient reports previous episodes of elevated blood pressure.",
    medications: [
      {
        name: "Amlodipine",
        dose: "5 mg",
        frequency: "Once daily"
      }
    ],
    investigations: [],
    ayurveda: {
      ...defaultAyurveda,
      prakriti: "Pitta",
      vikriti: "Pitta aggravation"
    },
    documents: [],
    summary: {
      patientOverview:
        "56-year-old patient reporting chest discomfort with sweating and weakness.",
      chiefComplaint:
        "Chest discomfort with sweating and weakness reported during intake.",
      symptoms: ["Chest discomfort", "Sweating", "Weakness"],
      medicalHistory:
        "Previous episodes of elevated blood pressure reported.",
      medications: [
        {
          name: "Amlodipine",
          dose: "5 mg",
          frequency: "Once daily"
        }
      ],
      investigations: [],
      ayurveda: {
        ...defaultAyurveda,
        prakriti: "Pitta",
        vikriti: "Pitta aggravation"
      },
      documentInsights: {},
      redFlags: [
        {
          id: "rf-critical-005",
          priority: "critical",
          message:
            "Chest discomfort accompanied by sweating detected in patient responses.",
          rule: "R-01",
          source: "Patient questionnaire",
          acknowledged: false
        }
      ],
      confidence: 97,
      generatedAt: "Today, 10:34 AM",
      status: "Draft"
    },
    waitingTime: "01 min",
    priority: "Critical",
    status: "Waiting",
    createdAt: "Today, 10:33 AM",
    lastUpdated: "Today, 10:34 AM"
  }
];

export const demoQuestions = [
  {
    id: "q1",
    section: "Chief Complaint",
    text: "Tell us what brings you to the clinic today.",
    mock:
      "I have been having stomach pain and bloating for around three months."
  },
  {
    id: "q2",
    section: "Symptoms",
    text: "How long have you experienced this?",
    mock: "Around three months."
  },
  {
    id: "q3",
    section: "Symptoms",
    text: "How severe are your symptoms?",
    mock:
      "The pain is moderate and becomes worse after spicy or heavy meals."
  },
  {
    id: "q4",
    section: "Symptoms",
    text: "Do you experience bloating or indigestion?",
    mock:
      "Yes, I occasionally experience bloating and indigestion after meals."
  },
  {
    id: "q5",
    section: "Medical History",
    text: "Are you currently taking any medicines?",
    mock: "Pantoprazole 40 mg once daily."
  },
  {
    id: "q6",
    section: "Lifestyle",
    text: "How would you describe your usual meal routine?",
    mock:
      "Meals are sometimes irregular because of work and I sometimes eat late."
  },
  {
    id: "q7",
    section: "Ayurveda Assessment",
    text: "How would you describe your appetite?",
    mock: "My appetite varies from day to day."
  },
  {
    id: "q8",
    section: "Previous Reports",
    text: "Do you have any previous medical reports to share?",
    mock: "Yes, I have a blood report and previous prescription."
  },
  {
    id: "q9",
    section: "Safety Screening",
    text: "Are you experiencing any severe or sudden symptoms?",
    mock:
      "No severe or sudden symptoms. I mainly have recurring stomach discomfort."
  },
  {
    id: "q10",
    section: "Safety Screening",
    text: "Are you experiencing difficulty breathing, chest discomfort, fainting, or severe bleeding?",
    mock: "No."
  }
];

export const demoPatient: Patient = {
  id: "p-demo",
  name: "Demo Patient",
  age: 34,
  gender: "Male",
  mobile: "98XXXXXX21",
  language: "English"
};