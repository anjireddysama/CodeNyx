import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookOpen, Menu, X, ArrowRight } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function Home({ getDashboardPath }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(getDashboardPath(), { replace: true });
    }
  }, [isAuthenticated, navigate, getDashboardPath]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand-200 selection:text-brand-900">
      {/* Navbar */}
      <nav className="bg-slate-900 sticky top-0 z-50 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-sm">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">TraceEd</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-brand-400">Home</Link>
              <a href="#about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About Us</a>
              <a href="#contact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Contact Us</a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <button 
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 hover:shadow transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                Sign In
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-white focus:outline-none p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-4 shadow-lg absolute w-full">
            <Link to="/" className="block text-base font-medium text-brand-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <a href="#about" className="block text-base font-medium text-slate-600" onClick={() => setIsMenuOpen(false)}>About Us</a>
            <a href="#contact" className="block text-base font-medium text-slate-600" onClick={() => setIsMenuOpen(false)}>Contact Us</a>
            <div className="pt-4 border-t border-slate-100">
              <button 
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 transition-all"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand-100/40 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
            Empowering the future of education
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8 max-w-4xl mx-auto">
            Bridge the gap in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">Learning</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10">
            TraceEd is the ultimate platform connecting NGOs, dedicated volunteers, and students to build a brighter tomorrow through structured, impactful education.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate("/login")}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-200 hover:bg-brand-500 hover:shadow-brand-300 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              Get Started
              <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </main>

      {/* Landing Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 shadow-sm">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">TraceEd</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Empowering NGOs, inspiring volunteers, and guiding students on a lifelong journey of structured education.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
              <a href="#about" className="hover:text-white transition-colors">About Us</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal & Contact</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="mailto:hello@traceed.org" className="hover:text-white transition-colors">hello@traceed.org</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>© 2026 TraceEd EdTech Private Limited. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
