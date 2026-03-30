import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./Layout";
import { useAuth } from "./hooks/useAuth";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";

// Student
import StudentDashboard from "./student/StudentDashboard";
import Diagnostic from "./student/Diagnostic";
import Progress from "./student/Progress";

// Volunteer
import VolunteerDashboard from "./volunteer/VolunteerDashboard";
import SessionPage from "./volunteer/SessionPage";
import Passport from "./volunteer/Passport";

// NGO
import NGODashboard from "./ngo/NGODashboard";
import Students from "./ngo/Students";
import Volunteers from "./ngo/Volunteers";
import Report from "./ngo/Report";
import Circles from "./ngo/Circles";

// Shared
import Resources from "./shared/Resources";
import Profile from "./shared/Profile";

function App() {
  const { role } = useAuth();
  
  // Custom role-based redirect for root
  const getDashboardPath = () => {
    switch(role) {
      case 'student': return '/student/dashboard';
      case 'volunteer': return '/volunteer/dashboard';
      case 'ngo': return '/ngo/dashboard';
      default: return '/login';
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home getDashboardPath={getDashboardPath} />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Layout Routes */}
      <Route element={<DashboardLayout />}>
        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/diagnostic" element={<Diagnostic />} />
        <Route path="/student/progress" element={<Progress />} />

        {/* Volunteer Routes */}
        <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
        <Route path="/volunteer/session/:id" element={<SessionPage />} />
        <Route path="/volunteer/passport" element={<Passport />} />

        {/* NGO Routes */}
        <Route path="/ngo/dashboard" element={<NGODashboard />} />
        <Route path="/ngo/students" element={<Students />} />
        <Route path="/ngo/volunteers" element={<Volunteers />} />
        <Route path="/ngo/report" element={<Report />} />
        <Route path="/ngo/circles" element={<Circles />} />

        {/* Shared Routes */}
        <Route path="/resources" element={<Resources />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
