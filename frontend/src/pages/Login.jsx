import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, GraduationCap, HeartHandshake, Building2, ChevronRight } from "lucide-react";
import { loginMock } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import { Footer } from "../components/Footer";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loadingRole, setLoadingRole] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (role) => {
    setLoadingRole(role);
    setError(null);
    try {
      const { user } = await loginMock(role, "password"); // mock bypasses pwd check
      login(user);
      // Route appropriately
      switch(user.role) {
        case 'student': navigate('/student/dashboard'); break;
        case 'volunteer': navigate('/volunteer/dashboard'); break;
        case 'ngo': navigate('/ngo/dashboard'); break;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingRole(null);
    }
  };

  const loginOptions = [
    {
      role: "student",
      title: "Student",
      description: "Access your personalized learning path, take diagnostics, and track your progress.",
      icon: GraduationCap,
      color: "text-blue-600",
      bgClass: "bg-blue-50 group-hover:bg-blue-100",
      borderClass: "hover:border-blue-300"
    },
    {
      role: "volunteer",
      title: "Volunteer Educator",
      description: "Manage your sessions, track student progress, and log your impact hours.",
      icon: HeartHandshake,
      color: "text-brand-600",
      bgClass: "bg-brand-50 group-hover:bg-brand-100",
      borderClass: "hover:border-brand-300"
    },
    {
      role: "ngo",
      title: "NGO Admin",
      description: "Oversee circles, manage your volunteer network, and generate impact reports.",
      icon: Building2,
      color: "text-purple-600",
      bgClass: "bg-purple-50 group-hover:bg-purple-100",
      borderClass: "hover:border-purple-300"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navbar area */}
      <header className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 shadow-sm">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-brand-900">TraceEd</span>
        </div>
      </header>

      {/* Hero Content */}
      <main className="flex-grow flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">TraceEd</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Empowering NGOs, inspiring volunteers, and guiding students on their lifelong learning journey. Select your role to get started.
          </p>
        </div>

        {error && (
          <div className="mb-8 rounded-lg bg-red-50 p-4 text-sm text-red-700 w-full max-w-lg mx-auto text-center border border-red-100">
            {error}
          </div>
        )}

        {/* Login Cards Grid */}
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {loginOptions.map((option) => {
            const Icon = option.icon;
            const isLoading = loadingRole === option.role;
            
            return (
              <button
                key={option.role}
                onClick={() => handleLogin(option.role)}
                disabled={loadingRole !== null}
                className={`relative group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 transition-all duration-300 text-left w-full
                  ${option.borderClass} hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${option.bgClass} ${option.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center justify-between">
                  {option.title}
                  <ChevronRight className={`w-5 h-5 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300 ${option.color}`} />
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed">
                  {option.description}
                </p>

                {isLoading && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-2xl backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <div className="px-4 pb-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <Footer />
      </div>
    </div>
  );
}
