import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookOpen, GraduationCap, HeartHandshake, Building2, ChevronRight, ArrowLeft } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { signUp } from "../services/firebaseAuth";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const { user } = await signUp(
        formData.email, 
        formData.password, 
        selectedRole, 
        formData.fullName
      );
      
      login(user);
      
      switch(selectedRole) {
        case 'student': navigate('/student/dashboard'); break;
        case 'volunteer': navigate('/volunteer/dashboard'); break;
        case 'ngo': navigate('/ngo/dashboard'); break;
        default: navigate('/');
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const signupOptions = [
    {
      role: "student",
      title: "Student",
      description: "Start your learning journey with personalized paths and guidance.",
      icon: GraduationCap,
      color: "text-blue-600",
      bgClass: "bg-blue-50 group-hover:bg-blue-100",
      borderClass: "hover:border-blue-300"
    },
    {
      role: "volunteer",
      title: "Volunteer Educator",
      description: "Share your knowledge and make a direct impact on students' lives.",
      icon: HeartHandshake,
      color: "text-brand-600",
      bgClass: "bg-brand-50 group-hover:bg-brand-100",
      borderClass: "hover:border-brand-300"
    },
    {
      role: "ngo",
      title: "NGO Admin",
      description: "Coordinate educational programs and manage your volunteer network.",
      icon: Building2,
      color: "text-purple-600",
      bgClass: "bg-purple-50 group-hover:bg-purple-100",
      borderClass: "hover:border-purple-300"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand-200 selection:text-brand-900">
      {/* Navbar - Using the same dark theme */}
      <nav className="bg-slate-900 sticky top-0 z-50 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-sm">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">TraceEd</span>
            </div>
            <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          {selectedRole ? (
            <>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4 capitalize">
                Join as a {selectedRole}
              </h1>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                Create your account to start making an impact in education.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
                Create Your account
              </h1>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                Join our community. Select how you want to use TraceEd to get started.
              </p>
            </>
          )}
        </div>

        {error && (
          <div className="mb-8 rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-600 w-full max-w-md mx-auto text-center flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            {error}
          </div>
        )}

        {/* Step 1: Role Selection */}
        {!selectedRole ? (
          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {signupOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.role}
                  onClick={() => handleRoleSelect(option.role)}
                  className={`relative group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 transition-all duration-300 text-left w-full
                    ${option.borderClass} hover:shadow-lg hover:translate-y-[-2px]`}
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
        ) : (
          /* Step 2: Registration Form */
          <div className="w-full max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200">
            <form onSubmit={handleSignupSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all placeholder:text-slate-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all placeholder:text-slate-400"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">Password</label>
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">Confirm</label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="flex items-center justify-center gap-2 w-1/3 py-3.5 rounded-xl bg-slate-50 text-slate-600 font-bold hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-2/3 py-3.5 rounded-xl bg-brand-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-brand-500 shadow-lg shadow-brand-200 transform hover:translate-y-[-1px] transition-all disabled:opacity-70 active:translate-y-[1px]"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
              <p className="text-center text-xs text-slate-400 mt-6 leading-relaxed">
                By signing up, you agree to our <a href="#" className="font-medium text-brand-600 hover:underline">Terms of Service</a> and <a href="#" className="font-medium text-brand-600 hover:underline">Privacy Policy</a>.
              </p>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
