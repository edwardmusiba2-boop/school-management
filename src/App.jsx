// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import StudentPortal from "./pages/StudentPortal";
import Teachers from "./pages/Teachers";
import TeacherDetail from "./pages/TeacherDetail";
import TeacherPortal from "./pages/TeacherPortal";
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
        <Route path="/student-portal" element={<PortalLayout><StudentPortal /></PortalLayout>} />
        <Route path="/teacher-portal" element={<PortalLayout><TeacherPortal /></PortalLayout>} />
        <Route path="/students" element={<DashboardLayout><Students /></DashboardLayout>} />
        <Route path="/students/:id" element={<DashboardLayout><StudentDetail /></DashboardLayout>} />
        <Route path="/teachers" element={<DashboardLayout><Teachers /></DashboardLayout>} />
        <Route path="/teachers/:id" element={<DashboardLayout><TeacherDetail /></DashboardLayout>} />
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

function PortalLayout({ children }) {
  return (
    <div className="app-shell portal-shell">
      <main className="main-content portal-content">{children}</main>
    </div>
  );
}

export default App;