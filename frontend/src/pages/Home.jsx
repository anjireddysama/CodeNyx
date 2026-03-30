import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useAuth } from "../hooks/useAuth";

export default function Home({ getDashboardPath }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(getDashboardPath(), { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate, getDashboardPath]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Loader />
    </div>
  );
}
