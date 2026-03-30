import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { useAuth } from "./hooks/useAuth";

// Layout wrapper for authenticated dashboards
export const DashboardLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
