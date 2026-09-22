// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Classes from "./pages/Classes";
import Grades from "./pages/Grades";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/students" element={<DashboardLayout><Students /></DashboardLayout>} />
        <Route path="/teachers" element={<DashboardLayout><Teachers /></DashboardLayout>} />
        <Route path="/classes" element={<DashboardLayout><Classes /></DashboardLayout>} />
        <Route path="/grades" element={<DashboardLayout><Grades /></DashboardLayout>} />
        <Route path="/attendance" element={<DashboardLayout><Attendance /></DashboardLayout>} />
        <Route path="/reports" element={<DashboardLayout><Reports /></DashboardLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

function DashboardLayout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">{children || <Dashboard />}</main>
    </div>
  );
}

export default App;