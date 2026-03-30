import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="mt-12 rounded-xl border border-slate-200 bg-white px-8 py-10 pb-6 shadow-sm">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="text-xl font-bold tracking-tight text-brand-900 mb-4">
            TraceEd Learning
          </div>
          <p className="text-slate-500 max-w-sm mb-6 leading-relaxed">
            Help build essential skills with our practice-based scholastic programs. Engaging the world with fluent education and technology.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold tracking-wider text-slate-900 uppercase mb-4">Products</h4>
          <ul className="space-y-3">
            <li>
              <Link to="#" className="text-slate-500 hover:text-brand-600 transition-colors">Learning Programs</Link>
            </li>
            <li>
              <Link to="#" className="text-slate-500 hover:text-brand-600 transition-colors">School Platform</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold tracking-wider text-slate-900 uppercase mb-4">Company</h4>
          <ul className="space-y-3">
            <li>
              <Link to="#" className="text-slate-500 hover:text-brand-600 transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="#" className="text-slate-500 hover:text-brand-600 transition-colors">Contact Us</Link>
            </li>
            <li>
              <Link to="#" className="text-slate-500 hover:text-brand-600 transition-colors">Careers</Link>
            </li>
            <li>
              <Link to="#" className="text-slate-500 hover:text-brand-600 transition-colors">Partner With Us</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-100 pt-6 sm:flex-row text-sm text-slate-500">
        <p>© 2026 TraceEd EdTech Private Limited. All rights reserved.</p>
        <div className="mt-4 flex gap-6 sm:mt-0">
          <Link to="#" className="hover:text-brand-600 transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-brand-600 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
