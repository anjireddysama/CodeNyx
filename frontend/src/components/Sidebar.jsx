import { Link, useLocation } from "react-router-dom";
import { 
  Building2, 
  Users, 
  BookOpen, 
  CalendarDays, 
  LayoutDashboard, 
  Medal, 
  LogOut,
  Target,
  BarChart2
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const ROLE_LINKS = {
  student: [
    { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "Diagnostic", href: "/student/diagnostic", icon: Target },
    { name: "Progress", href: "/student/progress", icon: BarChart2 },
    { name: "Resources", href: "/resources", icon: BookOpen },
  ],
  volunteer: [
    { name: "Dashboard", href: "/volunteer/dashboard", icon: LayoutDashboard },
    { name: "Passport", href: "/volunteer/passport", icon: Medal },
    { name: "Resources", href: "/resources", icon: BookOpen },
  ],
  ngo: [
    { name: "Dashboard", href: "/ngo/dashboard", icon: LayoutDashboard },
    { name: "Students", href: "/ngo/students", icon: Users },
    { name: "Volunteers", href: "/ngo/volunteers", icon: Building2 }, // Substitute icon for volunteers
    { name: "Circles", href: "/ngo/circles", icon: Target },
    { name: "Reports", href: "/ngo/report", icon: BarChart2 },
  ],
};

export const Sidebar = () => {
  const { role, logout } = useAuth();
  const location = useLocation();

  const links = ROLE_LINKS[role || "student"] || [];

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">TraceEd</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="flex flex-col gap-1 px-3">
          {links.map((link) => {
            const isActive = location.pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <link.icon className={`h-4 w-4 ${isActive ? "text-brand-600" : "text-slate-400"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-100 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-4 w-4 text-slate-400 group-hover:text-red-600" />
          Sign out
        </button>
      </div>
    </div>
  );
};
