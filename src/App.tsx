import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Landing from "./pages/Landing";
import {
  Register,
  Intake,
  Assessment,
  Documents,
  Summary
} from "./pages/PatientPages";

import {
  DoctorDashboard,
  DoctorCase
} from "./pages/Doctor";

export default function App() {
  return (
    <AppProvider>
      <Routes>

        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Patient Journey */}
        <Route path="/patient/register" element={<Register />} />
        <Route path="/patient/intake" element={<Intake />} />
        <Route path="/patient/assessment" element={<Assessment />} />
        <Route path="/patient/documents" element={<Documents />} />
        <Route path="/patient/summary" element={<Summary />} />

        {/* Doctor Portal */}
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/doctor/patient/:id" element={<DoctorCase />} />

        {/* Unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </AppProvider>
  );
}