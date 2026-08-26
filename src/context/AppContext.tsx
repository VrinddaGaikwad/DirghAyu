import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import type {
  Case,
  Patient,
  Document,
  AISummary
} from "../types";

import { mockCases } from "../data/mockData";

/* ---------------------------------------------------------
   Types
--------------------------------------------------------- */

interface AppContextValue {
  patient: Patient | null;
  setPatient: (patient: Patient | null) => void;

  answers: Record<string, string>;
  setAnswer: (id: string, value: string) => void;

  documents: Document[];
  setDocuments: (documents: Document[]) => void;
  addDocument: (document: Document) => void;

  cases: Case[];
  updateCase: (id: string, patch: Partial<Case>) => void;
  getCase: (id: string) => Case | undefined;
  addCase: (newCase: Case) => void;

  summary: AISummary | null;
  setSummary: (summary: AISummary | null) => void;

  /* AI / processing state */
  isGeneratingAI: boolean;
  setIsGeneratingAI: (value: boolean) => void;

  /* Voice state */
  isListening: boolean;
  setIsListening: (value: boolean) => void;

  /* Red flags */
  redFlags: string[];
  setRedFlags: (flags: string[]) => void;

  /* Doctor verification */
  doctorVerified: boolean;
  setDoctorVerified: (value: boolean) => void;

  resetPatientFlow: () => void;
}

/* ---------------------------------------------------------
   Context
--------------------------------------------------------- */

const AppContext = createContext<AppContextValue | null>(null);

/* ---------------------------------------------------------
   Safe localStorage helper
--------------------------------------------------------- */

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return fallback;
    }

    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/* ---------------------------------------------------------
   Provider
--------------------------------------------------------- */

export function AppProvider({
  children
}: {
  children: React.ReactNode;
}) {

  /* Patient */

  const [patient, setPatientState] = useState<Patient | null>(() =>
    readStorage<Patient | null>("ayucare-patient", null)
  );


  /* Intake answers */

  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    readStorage<Record<string, string>>(
      "ayucare-answers",
      {}
    )
  );


  /* Uploaded documents */

  const [documents, setDocuments] = useState<Document[]>(() =>
    readStorage<Document[]>(
      "ayucare-documents",
      []
    )
  );


  /* Doctor cases */

  const [cases, setCases] = useState<Case[]>(() =>
    readStorage<Case[]>(
      "ayucare-cases",
      mockCases
    )
  );


  /* AI generated summary */

  const [summary, setSummary] =
    useState<AISummary | null>(() =>
      readStorage<AISummary | null>(
        "ayucare-summary",
        null
      )
    );


  /* AI processing indicator */

  const [isGeneratingAI, setIsGeneratingAI] =
    useState(false);


  /* Voice input */

  const [isListening, setIsListening] =
    useState(false);


  /* Red flag engine */

  const [redFlags, setRedFlags] =
    useState<string[]>(() =>
      readStorage<string[]>(
        "ayucare-red-flags",
        []
      )
    );


  /* Doctor verification */

  const [doctorVerified, setDoctorVerified] =
    useState(() =>
      readStorage<boolean>(
        "ayucare-doctor-verified",
        false
      )
    );


  /* -------------------------------------------------------
     Persistence
  ------------------------------------------------------- */

  useEffect(() => {
    if (patient) {
      localStorage.setItem(
        "ayucare-patient",
        JSON.stringify(patient)
      );
    } else {
      localStorage.removeItem("ayucare-patient");
    }
  }, [patient]);


  useEffect(() => {
    localStorage.setItem(
      "ayucare-answers",
      JSON.stringify(answers)
    );
  }, [answers]);


  useEffect(() => {
    localStorage.setItem(
      "ayucare-documents",
      JSON.stringify(documents)
    );
  }, [documents]);


  useEffect(() => {
    localStorage.setItem(
      "ayucare-cases",
      JSON.stringify(cases)
    );
  }, [cases]);


  useEffect(() => {
    if (summary) {
      localStorage.setItem(
        "ayucare-summary",
        JSON.stringify(summary)
      );
    } else {
      localStorage.removeItem("ayucare-summary");
    }
  }, [summary]);


  useEffect(() => {
    localStorage.setItem(
      "ayucare-red-flags",
      JSON.stringify(redFlags)
    );
  }, [redFlags]);


  useEffect(() => {
    localStorage.setItem(
      "ayucare-doctor-verified",
      JSON.stringify(doctorVerified)
    );
  }, [doctorVerified]);


  /* -------------------------------------------------------
     Context value
  ------------------------------------------------------- */

  const value = useMemo<AppContextValue>(() => ({

    /* Patient */

    patient,

    setPatient: (p: Patient | null) => {
      setPatientState(p);
    },


    /* Intake */

    answers,

    setAnswer: (
      id: string,
      value: string
    ) => {
      setAnswers(prev => ({
        ...prev,
        [id]: value
      }));
    },


    /* Documents */

    documents,

    setDocuments,

    addDocument: (document: Document) => {
      setDocuments(prev => [
        ...prev,
        document
      ]);
    },


    /* Cases */

    cases,

    updateCase: (
      id: string,
      patch: Partial<Case>
    ) => {
      setCases(prev =>
        prev.map(caseItem =>
          caseItem.id === id
            ? {
                ...caseItem,
                ...patch
              }
            : caseItem
        )
      );
    },

    getCase: (id: string) => {
      return cases.find(
        caseItem => caseItem.id === id
      );
    },

    addCase: (newCase: Case) => {
      setCases(prev => [
        newCase,
        ...prev
      ]);
    },


    /* AI */

    summary,

    setSummary,


    /* AI processing */

    isGeneratingAI,

    setIsGeneratingAI,


    /* Voice */

    isListening,

    setIsListening,


    /* Red flags */

    redFlags,

    setRedFlags,


    /* Doctor verification */

    doctorVerified,

    setDoctorVerified,


    /* Reset */

    resetPatientFlow: () => {

      setPatientState(null);

      setAnswers({});

      setDocuments([]);

      setSummary(null);

      setRedFlags([]);

      setDoctorVerified(false);

      setIsListening(false);

      setIsGeneratingAI(false);

      localStorage.removeItem(
        "ayucare-patient"
      );

      localStorage.removeItem(
        "ayucare-answers"
      );

      localStorage.removeItem(
        "ayucare-documents"
      );

      localStorage.removeItem(
        "ayucare-summary"
      );

      localStorage.removeItem(
        "ayucare-red-flags"
      );

      localStorage.removeItem(
        "ayucare-doctor-verified"
      );
    }

  }), [
    patient,
    answers,
    documents,
    cases,
    summary,
    isGeneratingAI,
    isListening,
    redFlags,
    doctorVerified
  ]);


  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}


/* ---------------------------------------------------------
   Hook
--------------------------------------------------------- */

export function useApp() {

  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error(
      "useApp must be used inside AppProvider"
    );
  }

  return ctx;
}