import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  FileCheck2,
} from "lucide-react";

import { PatientNav } from "../components/layout";
import {
  Button,
  Card,
  Input,
  Select,
  Badge,
  AIWarning,
} from "../components/ui";

import {
  IntakeFlow,
  PatientAssessment,
  DocumentUploader,
  AISummaryCard,
} from "../components/patient";

import { useApp } from "../context/AppContext";
import { generateSummary } from "../services/api";


/* =========================================================
   PATIENT REGISTRATION
========================================================= */

export function Register() {
  const { setPatient } = useApp();
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    language: "English",
    consent: false,
  });

  const update = (
    key: string,
    value: string | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.age ||
      !form.gender ||
      !form.consent
    ) {
      return;
    }

    setPatient({
      id: crypto.randomUUID(),
      name: form.name,
      age: Number(form.age),
      gender: form.gender,
      mobile: form.mobile,
      language: form.language,
    });

    nav("/patient/intake");
  };

  return (
    <div className="min-h-screen bg-[#f4f0e6]">
      <PatientNav />

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">

        <div className="mb-6">
          <Badge tone="teal">
            Patient Registration
          </Badge>

          <h1 className="mt-3 text-3xl font-bold text-[#403a2f]">
            Let’s start with the basics.
          </h1>

          <p className="mt-2 text-sm text-[#817968]">
            Tell us a little about yourself before your
            consultation.
          </p>
        </div>

        <Card className="border-[#d7cfbc] bg-[#f8f5ed] p-6 shadow-sm sm:p-8">

          <form
            onSubmit={submit}
            className="space-y-5"
          >

            <label className="block text-sm font-semibold text-[#514832]">
              Full Name

              <Input
                required
                value={form.name}
                onChange={(e) =>
                  update("name", e.target.value)
                }
                className="mt-2"
                placeholder="Enter full name"
              />
            </label>


            <div className="grid gap-5 sm:grid-cols-2">

              <label className="text-sm font-semibold text-[#514832]">
                Age

                <Input
                  required
                  type="number"
                  min="1"
                  max="120"
                  value={form.age}
                  onChange={(e) =>
                    update("age", e.target.value)
                  }
                  className="mt-2"
                  placeholder="Age"
                />
              </label>


              <label className="text-sm font-semibold text-[#514832]">
                Gender

                <Select
                  required
                  value={form.gender}
                  onChange={(e) =>
                    update("gender", e.target.value)
                  }
                  className="mt-2"
                >
                  <option value="">
                    Select
                  </option>

                  <option>
                    Female
                  </option>

                  <option>
                    Male
                  </option>

                  <option>
                    Other
                  </option>

                  <option>
                    Prefer not to say
                  </option>
                </Select>
              </label>

            </div>


            <label className="block text-sm font-semibold text-[#514832]">
              Mobile Number

              <Input
                value={form.mobile}
                onChange={(e) =>
                  update("mobile", e.target.value)
                }
                className="mt-2"
                placeholder="Optional"
              />
            </label>


            <label className="block text-sm font-semibold text-[#514832]">
              Preferred Language

              <Select
                value={form.language}
                onChange={(e) =>
                  update("language", e.target.value)
                }
                className="mt-2"
              >
                <option>
                  English
                </option>

                <option>
                  Hindi
                </option>

                <option>
                  Marathi
                </option>
              </Select>
            </label>


            <div className="rounded-2xl border border-[#d8cfba] bg-[#ebe5d7] p-4">

              <label className="flex cursor-pointer gap-3 text-sm leading-6 text-[#514832]">

                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) =>
                    update(
                      "consent",
                      e.target.checked
                    )
                  }
                  className="mt-1 h-4 w-4 accent-[#756443]"
                />

                <span>
                  I consent to the collection and
                  processing of my information for
                  preparing my clinical case history.
                </span>

              </label>

            </div>


            <AIWarning />


            <Button
              type="submit"
              className="w-full"
            >
              Continue

              <ChevronRight size={17} />
            </Button>

          </form>

        </Card>

      </main>
    </div>
  );
}


/* =========================================================
   PATIENT INTAKE
========================================================= */

export function Intake() {
  const { patient } = useApp();
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-[#f4f0e6]">

      <PatientNav />

      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 pt-6 sm:px-6">

        <div>

          <div className="text-xs font-semibold uppercase tracking-wider text-[#8d7b52]">
            Patient intake
          </div>

          <div className="mt-1 text-sm font-bold text-[#403a2f]">
            {patient?.name ?? "Demo patient"}
          </div>

        </div>


        <Link to="/patient/assessment">
          <Button variant="ghost">
            Skip to assessment
          </Button>
        </Link>

      </div>


      <IntakeFlow />


      <div className="mx-auto max-w-3xl px-4 pb-10 text-right sm:px-6">

        <Button
          variant="secondary"
          onClick={() =>
            nav("/patient/assessment")
          }
        >
          Continue to Ayurveda Assessment

          <ChevronRight size={17} />
        </Button>

      </div>

    </div>
  );
}


/* =========================================================
   AYURVEDA ASSESSMENT
========================================================= */

export function Assessment() {

  return (
    <div className="min-h-screen bg-[#f4f0e6]">

      <PatientNav />

      <PatientAssessment />

      <div className="mx-auto max-w-4xl px-4 pb-10 text-right sm:px-6">

        <Link to="/patient/documents">

          <Button>
            Continue to Documents

            <ChevronRight size={17} />
          </Button>

        </Link>

      </div>

    </div>
  );
}


/* =========================================================
   DOCUMENTS / OCR
========================================================= */

export function Documents() {

  return (
    <div className="min-h-screen bg-[#f4f0e6]">

      <PatientNav />

      <DocumentUploader />

      <div className="mx-auto max-w-4xl px-4 pb-10 text-right sm:px-6">

        <Link to="/patient/summary">

          <Button>
            Generate Case Summary

            <ChevronRight size={17} />
          </Button>

        </Link>

      </div>

    </div>
  );
}


/* =========================================================
   AI CASE SUMMARY
========================================================= */

export function Summary() {

  const {
    patient,
    answers,
    setSummary,
    summary,
  } = useApp();

  const [loading, setLoading] =
    useState(false);

  const nav = useNavigate();


  const makeSummary = async () => {

    if (!patient) {
      return;
    }

    setLoading(true);

    try {

      /*
        The service now performs the complete
        frontend AI-analysis pipeline:

        Patient answers
              ↓
        Symptom extraction
              ↓
        Medication extraction
              ↓
        Investigation extraction
              ↓
        Red-flag detection
              ↓
        Structured clinical summary
      */

      const generatedSummary =
        await generateSummary(
          patient,
          answers
        );


      setSummary(
        generatedSummary
      );

    } catch (error) {

      console.error(
        "AI summary generation failed:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <div className="min-h-screen bg-[#f4f0e6]">

      <PatientNav />


      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

        <div className="mb-6">

          <Badge tone="teal">
            AI Pre-consultation
          </Badge>

          <h1 className="mt-3 text-3xl font-bold text-[#403a2f]">
            Review your case
          </h1>

          <p className="mt-2 text-sm text-[#817968]">
            AyuCare structures the information
            provided during your intake into a
            clinician-ready draft.
          </p>

        </div>


        {loading ? (

          <Card className="border-[#d7cfbc] bg-[#f8f5ed] p-6">

            <LoadingSummary />

          </Card>

        ) : summary ? (

          <AISummaryCard
            summary={summary}
            onSend={() =>
              nav("/doctor")
            }
          />

        ) : (

          <Card className="border-[#d7cfbc] bg-[#f8f5ed] p-8 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ebe5d7] text-[#756443]">

              <FileCheck2 />

            </div>


            <h2 className="mt-4 text-xl font-bold text-[#403a2f]">
              Ready to structure the case
            </h2>


            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#817968]">
              AyuCare will analyse the patient's
              intake responses, identify symptoms,
              detect potential red flags and create
              a structured case summary for the doctor.
            </p>


            <Button
              className="mt-6"
              onClick={makeSummary}
            >
              Analyse & Generate Summary

              <ChevronRight size={17} />
            </Button>

          </Card>

        )}

      </main>

    </div>
  );
}


/* =========================================================
   AI PROCESSING STATE
========================================================= */

function LoadingSummary() {

  return (
    <div className="flex flex-col items-center py-12 text-center">

      <div
        className="
          h-10 w-10
          animate-spin-slow
          rounded-full
          border-4
          border-[#ddd5c2]
          border-t-[#756443]
        "
      />

      <h2 className="mt-5 font-bold text-[#403a2f]">
        Analysing your case...
      </h2>

      <p className="mt-2 max-w-md text-sm text-[#817968]">
        Extracting symptoms, medications,
        investigations and potential clinical
        red flags.
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-2">

        <span className="rounded-full bg-[#ebe5d7] px-3 py-1 text-xs font-semibold text-[#756443]">
          Symptom analysis
        </span>

        <span className="rounded-full bg-[#ebe5d7] px-3 py-1 text-xs font-semibold text-[#756443]">
          Red-flag detection
        </span>

        <span className="rounded-full bg-[#ebe5d7] px-3 py-1 text-xs font-semibold text-[#756443]">
          Case structuring
        </span>

      </div>

    </div>
  );
}