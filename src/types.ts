export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  mobile: string;
  language: string;
}

export interface Symptom {
  id: string;
  label: string;
  severity?: "mild" | "moderate" | "severe";
  duration?: string;
}

export interface Medication {
  name: string;
  dose: string;
  frequency: string;
}

export interface Investigation {
  name: string;
  value: string;
  unit?: string;
  referenceRange?: string;
  status?: "normal" | "abnormal" | "unknown";
}

export interface AyurvedaAssessment {
  prakriti: string;
  vikriti: string;
  agni: string;
  koshtha: string;
  ahara: string;
  vihara: string;
  dashavidha: string;
}

export interface OCRField {
  value: string;
  confidence: number;
  source?: string;
}

export interface OCRResult {
  documentType: string;
  confidence: number;
  fields: Record<string, OCRField>;
  warnings?: string[];
}

export interface Document {
  id: string;
  filename: string;
  type: string;
  status: "Uploaded" | "Processing" | "Extracted" | "Failed";
  uploadedAt: string;
  extracted?: Record<string, string>;
  ocr?: OCRResult;
}

export interface RedFlag {
  id: string;
  priority: "normal" | "high" | "critical";
  message: string;
  rule?: string;
  source?: string;
  acknowledged?: boolean;
}

export interface AISummary {
  patientOverview: string;
  chiefComplaint: string;
  symptoms: string[];
  medicalHistory: string;
  medications: Medication[];
  investigations: Investigation[];
  ayurveda: AyurvedaAssessment;
  documentInsights: Record<string, string>;
  redFlags: RedFlag[];
  confidence?: number;
  generatedAt?: string;
  status: "Draft" | "Doctor Verified";
}

export interface AIAnalysis {
  summary: AISummary;
  recommendations: string[];
  detectedKeywords: string[];
  confidence: number;
}

export interface Case {
  id: string;
  patient: Patient;
  chiefComplaint: string;
  symptoms: Symptom[];
  medicalHistory: string;
  medications: Medication[];
  investigations: Investigation[];
  ayurveda: AyurvedaAssessment;
  documents: Document[];
  summary: AISummary;
  waitingTime: string;
  priority: "Normal" | "High" | "Critical";
  status: "Waiting" | "Pending Review" | "Completed";
  createdAt?: string;
  lastUpdated?: string;
}