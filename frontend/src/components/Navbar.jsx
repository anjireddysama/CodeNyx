import { Link } from "react-router-dom";
import { Bell, Search, UserCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full hidden md:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="search"
            placeholder="Search resources, students..."
            className="block w-full rounded-full border-0 py-1.5 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6 bg-slate-50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 border-l border-slate-200 pl-4 ml-4">
        <button className="relative text-slate-400 hover:text-slate-500 transition-colors">
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-medium text-white ring-2 ring-white">
            3
          </span>
          <Bell className="h-5 w-5" />
        </button>
        
        <Link to="/profile" className="flex items-center gap-2">
          <span className="hidden text-sm font-medium text-slate-700 sm:block">
            {user?.name || "Guest"}
          </span>
          <UserCircle className="h-8 w-8 text-slate-300" />
        </Link>
      </div>
    </header>
  );
};
