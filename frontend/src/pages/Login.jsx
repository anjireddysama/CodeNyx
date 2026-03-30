import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { loginMock } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { user } = await loginMock(role, "password"); // mock bypasses pwd check
      login(user);
      switch(user.role) {
        case 'student': navigate('/student/dashboard'); break;
        case 'volunteer': navigate('/volunteer/dashboard'); break;
        case 'ngo': navigate('/ngo/dashboard'); break;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-slate-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600">
          <BookOpen className="h-8 w-8 text-white" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome to TraceEd
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to access your customized dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="px-4 py-8 sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-slate-700">
                Select Mock Role
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm shadow-sm border bg-white text-slate-900"
                >
                  <option value="student">Student</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="ngo">NGO Admin</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md border border-transparent bg-brand-600 py-2.5 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
