import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookOpen, GraduationCap, HeartHandshake, Building2, ChevronRight } from "lucide-react";
import { signIn } from "../services/firebaseAuth";
import { useAuth } from "../hooks/useAuth";
import { Footer } from "../components/Footer";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loadingRole, setLoadingRole] = useState(null);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setError(null);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoadingRole(selectedRole);
    setError(null);
    try {
      const { user } = await signIn(email, password);
      
      // Safety check: ensure user role matches the selected role
      if (user.role !== selectedRole) {
        throw new Error(`This account is registered as a ${user.role}. Please sign in as the correct role.`);
      }

      login(user);
      
      // Route appropriately
      switch(user.role) {
        case 'student': navigate('/student/dashboard'); break;
        case 'volunteer': navigate('/volunteer/dashboard'); break;
        case 'ngo': navigate('/ngo/dashboard'); break;
      }
    } catch (err) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
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
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/")}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 shadow-sm">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-brand-900">TraceEd</span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          Back to Home
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          {selectedRole ? (
            <>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4 capitalize">
                {selectedRole} Sign In
              </h1>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                Enter your credentials to access your dashboard.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
                Sign In to TraceEd
              </h1>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                Select your role below to access your dashboard.
              </p>
            </>
          )}
        </div>

        {error && (
          <div className="mb-8 rounded-lg bg-red-50 p-4 text-sm text-red-700 w-full max-w-lg mx-auto text-center border border-red-100">
            {error}
          </div>
        )}

        {/* Content Area */}
        {selectedRole ? (
          <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex gap-4 pt-2">
                <button 
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="w-1/3 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={loadingRole !== null}
                  className="w-2/3 py-3 rounded-xl bg-brand-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-brand-500 focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all disabled:opacity-70"
                >
                  {loadingRole !== null ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Don't have an account? <Link to="/signup" className="text-brand-600 font-semibold hover:text-brand-500">Sign Up</Link>
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {loginOptions.map((option) => {
                const Icon = option.icon;
                
                return (
                  <button
                    key={option.role}
                    onClick={() => handleRoleSelect(option.role)}
                    className={`relative group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 transition-all duration-300 text-left w-full
                      ${option.borderClass} hover:shadow-md`}
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
                  </button>
                );
              })}
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500">
                Don't have an account? <Link to="/signup" className="text-brand-600 font-semibold hover:text-brand-500">Sign Up</Link>
              </p>
            </div>
          </>
        )}
      </main>


    </div>
  );
}
