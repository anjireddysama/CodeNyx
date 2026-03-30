import { useState, useEffect } from "react";
import { Users, BookOpen, AlertCircle, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getStudents, getVolunteers, getSessions } from "../services/dataService";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import { Loader } from "../components/Loader";

export default function NGODashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    students: 0,
    volunteers: 0,
    sessions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (user?.ngoId || user?.uid) {
        const ngoId = user.ngoId || "ngo-123";
        try {
          const [s, v, sess] = await Promise.all([
            getStudents(ngoId),
            getVolunteers(ngoId),
            getSessions(ngoId)
          ]);
          setStats({
            students: s.length,
            volunteers: v.length,
            sessions: sess.length
          });
        } catch (error) {
          console.error("Failed to fetch dashboard stats:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">NGO Operations Center</h1>
          <p className="text-slate-500">Monitor your programs, volunteers, and overall student progress.</p>
        </div>
        <button className="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-brand-700 transition">
          Generate Quick Report
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Total Active Students</CardTitle>
            <Users className="h-5 w-5 text-brand-600 bg-brand-50 p-1 rounded" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.students}</div>
            <p className="text-xs text-slate-500 font-medium tracking-tight mt-1">Live from database</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Total Volunteers</CardTitle>
            <Building2 className="h-5 w-5 text-brand-600 bg-brand-50 p-1 rounded" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.volunteers}</div>
            <p className="text-xs text-slate-500 font-medium tracking-tight mt-1">Active associates</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Total System Sessions</CardTitle>
            <BookOpen className="h-5 w-5 text-brand-600 bg-brand-50 p-1 rounded" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.sessions}</div>
            <p className="text-xs text-slate-500 mt-2">Historical & Upcoming</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
           <CardHeader>
             <CardTitle>Recent Activity Stream</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-4">
               {stats.sessions > 0 ? (
                 <div className="flex gap-4">
                   <div className="w-2 h-2 mt-2 rounded-full bg-brand-500 shrink-0" />
                   <div>
                     <p className="text-sm text-slate-900 font-medium">Database records live. {stats.sessions} sessions found.</p>
                     <p className="text-xs text-slate-500">Synchronized with Firestore</p>
                   </div>
                 </div>
               ) : (
                 <p className="text-sm text-slate-500 italic">No recent activity found.</p>
               )}
             </div>
           </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              Attention Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
               <div className="bg-white p-3 rounded-lg border border-amber-100 shadow-sm">
                 <p className="text-sm font-medium text-slate-900">Database monitoring active</p>
                 <Link to="/ngo/students" className="text-xs font-semibold text-amber-600 hover:text-amber-800">Check for updates</Link>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
