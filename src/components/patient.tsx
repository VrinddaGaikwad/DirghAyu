import { useState } from "react";
import { Mic, Square, Upload, FileText, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { Button, Card, Badge, ProgressBar, SectionTitle, Input, Select, AIWarning, Loading } from "./ui";
import { useApp } from "../context/AppContext";
import { uploadDocument } from "../services/api";
import { demoQuestions } from "../data/mockData";

export function VoiceButton({ onResult }: { onResult: (text: string) => void }) {
  const [listening, setListening] = useState(false);
  const start = () => {
    setListening(true);
    setTimeout(() => {
      setListening(false);
      onResult("I have been experiencing this for around three months.");
    }, 1500);
  };
  return <Button type="button" variant={listening ? "danger" : "secondary"} onClick={start} className={listening ? "animate-pulse-soft" : ""}>{listening ? <Square size={16} /> : <Mic size={16} />}{listening ? "Listening..." : "Speak"}</Button>;
}

export function IntakeFlow() {
  const { answers, setAnswer } = useApp();
  const [index, setIndex] = useState(0);
  const q = demoQuestions[index];
  const [text, setText] = useState(answers[q.id] ?? "");
  const saveAndNext = (value = text) => {
    setAnswer(q.id, value);
    if (index < demoQuestions.length - 1) {
      const next = demoQuestions[index + 1];
      setIndex(index + 1);
      setText(answers[next.id] ?? "");
    }
  };
  const progress = Math.round(((index + 1) / demoQuestions.length) * 100);
  return <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
    <div className="mb-7"><div className="mb-2 flex justify-between text-xs font-semibold text-slate-500"><span>{q.section}</span><span>{index + 1} of {demoQuestions.length}</span></div><ProgressBar value={progress} /></div>
    <Card className="overflow-hidden">
      <div className="border-b border-slate-100 bg-gradient-to-r from-teal-50 to-white p-6 sm:p-8"><Badge tone="teal">Question {index + 1}</Badge><h1 className="mt-4 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">{q.text}</h1><p className="mt-2 text-sm text-slate-500">You can type your answer or use the simulated voice option.</p></div>
      <div className="p-6 sm:p-8"><textarea value={text} onChange={e => setText(e.target.value)} rows={5} placeholder="Type your answer..." className="w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-50" />
        <div className="mt-4 flex flex-wrap gap-2"><VoiceButton onResult={value => setText(value)} /><Button variant="ghost" onClick={() => setText(q.mock)}>Use demo answer</Button></div>
        <div className="mt-8 flex justify-end"><Button onClick={() => saveAndNext()} disabled={!text.trim()}>{index === demoQuestions.length - 1 ? "Finish Intake" : "Save & Continue"}<ChevronRight size={17} /></Button></div>
      </div>
    </Card>
  </div>;
}

export function PatientAssessment() {
  const { patient } = useApp();
  const [values, setValues] = useState({ prakriti: "Pitta-Kapha", vikriti: "Pitta aggravation", agni: "Vishama", koshtha: "Madhyama", ahara: "Irregular", vihara: "Sedentary", dashavidha: "Demo assessment" });
  const update = (key: string, value: string) => setValues(v => ({ ...v, [key]: value }));
  const fields = [["prakriti", "Prakriti", ["Vata", "Pitta", "Kapha", "Vata-Pitta", "Pitta-Kapha"]], ["vikriti", "Vikriti", ["No obvious imbalance", "Vata aggravation", "Pitta aggravation", "Kapha aggravation"]], ["agni", "Agni", ["Sama", "Vishama", "Tikshna", "Manda"]], ["koshtha", "Koshtha", ["Mridu", "Madhyama", "Krura"]], ["ahara", "Ahara", ["Regular", "Irregular", "Heavy", "Light"]], ["vihara", "Vihara", ["Active", "Moderately active", "Sedentary"]]];
  return <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6"><div className="mb-6"><Badge tone="teal">Patient Assessment</Badge><h1 className="mt-2 text-3xl font-bold text-slate-900">Ayurveda Assessment</h1><p className="mt-1 text-sm text-slate-500">{patient?.name ?? "Patient"} · demo assessment</p></div><AIWarning /><Card className="mt-6 p-6"><div className="grid gap-5 sm:grid-cols-2">{fields.map(([key, label, options]) => <label key={key} className="text-sm font-semibold text-slate-700">{label}<Select className="mt-2" value={values[key as keyof typeof values]} onChange={e => update(key, e.target.value)}>{(options as string[]).map(o => <option key={o}>{o}</option>)}</Select></label>)}</div><div className="mt-5"><label className="text-sm font-semibold text-slate-700">Dashavidha Pariksha<textarea value={values.dashavidha} onChange={e => update("dashavidha", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-teal-500" rows={3} /></label></div><div className="mt-6 flex justify-end"><Button onClick={() => localStorage.setItem("ayucare-ayurveda", JSON.stringify(values))}>Save Assessment</Button></div></Card></div>;
}

export function DocumentUploader() {
  const { documents, setDocuments } = useApp();
  const [type, setType] = useState("Prescription");
  const [processing, setProcessing] = useState(false);
  const handle = async (file: File) => {
    setProcessing(true);
    const doc = await uploadDocument(file, type);
    setDocuments([...documents, doc]);
    setProcessing(false);
  };
  return <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6"><SectionTitle title="Previous Reports" subtitle="Upload documents for the demo extraction flow." /><Card className="p-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-end"><label className="flex-1 text-sm font-semibold text-slate-700">Document type<Select value={type} onChange={e => setType(e.target.value)} className="mt-2"><option>Prescription</option><option>Blood Report</option><option>Discharge Summary</option><option>Other</option></Select></label><label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800"><Upload size={17} /> Choose file<input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" onChange={e => e.target.files?.[0] && handle(e.target.files[0])} /></label></div>{processing && <Loading text="Uploading… Extracting information…" />}</Card>{documents.map(doc => <Card key={doc.id} className="mt-4 p-5"><div className="flex items-start gap-4"><div className="rounded-xl bg-teal-50 p-3 text-teal-700"><FileText /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold text-slate-900">{doc.filename}</h3><Badge tone="green"><CheckCircle2 size={13} />Demo OCR Result</Badge></div><p className="mt-1 text-xs text-slate-500">{doc.type} · {doc.uploadedAt}</p>{doc.extracted && <div className="mt-4 grid gap-2 sm:grid-cols-2">{Object.entries(doc.extracted).map(([k,v]) => <div key={k} className="rounded-xl bg-slate-50 p-3 text-sm"><span className="text-slate-500">{k}</span><div className="font-semibold text-slate-800">{v}</div></div>)}</div>}</div></div></Card>)}</div>;
}

export function AISummaryCard({ summary, onSend }: { summary: any; onSend?: () => void }) {
  return <Card className="p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><div className="flex items-center gap-2"><Sparkles size={18} className="text-teal-700" /><h2 className="text-xl font-bold text-slate-900">Case Summary</h2></div><p className="mt-1 text-sm text-slate-500">Structured pre-consultation draft</p></div><Badge tone="amber">AI DRAFT</Badge></div><div className="mt-5"><AIWarning /></div><div className="mt-6 grid gap-6 md:grid-cols-2"><SummaryBlock title="Patient Information"><p>{summary.patientOverview}</p></SummaryBlock><SummaryBlock title="Chief Complaint"><p>{summary.chiefComplaint}</p></SummaryBlock><SummaryBlock title="Symptoms"><ul className="list-disc space-y-1 pl-5">{summary.symptoms.map((x: string) => <li key={x}>{x}</li>)}</ul></SummaryBlock><SummaryBlock title="Medical History"><p>{summary.medicalHistory}</p></SummaryBlock><SummaryBlock title="Current Medications"><p>{summary.medications.length ? summary.medications.map((m:any) => `${m.name} ${m.dose} · ${m.frequency}`).join(", ") : "None reported"}</p></SummaryBlock><SummaryBlock title="Document Insights"><div className="space-y-1">{Object.entries(summary.documentInsights).map(([k,v]) => <p key={k}><span className="text-slate-500">{k}: </span>{String(v)}</p>)}</div></SummaryBlock></div><div className="mt-6"><SummaryBlock title="Ayurveda Assessment"><div className="grid gap-2 sm:grid-cols-2">{Object.entries(summary.ayurveda).map(([k,v]) => <div key={k} className="rounded-lg bg-slate-50 p-3"><div className="text-xs uppercase tracking-wide text-slate-400">{k}</div><div className="mt-1 font-semibold">{String(v)}</div><div className="mt-1 text-[11px] text-amber-700">Pending doctor verification</div></div>)}</div></SummaryBlock></div><div className="mt-6"><SummaryBlock title="Red Flags"><div className="rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800">No urgent red flags detected in the provided responses.</div></SummaryBlock></div>{onSend && <div className="mt-6 flex justify-end"><Button onClick={onSend}>Send to Doctor <ChevronRight size={17} /></Button></div>}</Card>;
}

function SummaryBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">{title}</h3><div className="text-sm leading-6 text-slate-700">{children}</div></section>;
}