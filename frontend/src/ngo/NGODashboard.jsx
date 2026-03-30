import { Users, BookOpen, AlertCircle, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";

export default function NGODashboard() {
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
            <div className="text-3xl font-bold text-slate-900">2,450</div>
            <p className="text-xs text-emerald-600 font-medium tracking-tight mt-1">↑ 12% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Total Volunteers</CardTitle>
            <Building2 className="h-5 w-5 text-brand-600 bg-brand-50 p-1 rounded" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">314</div>
            <p className="text-xs text-emerald-600 font-medium tracking-tight mt-1">↑ 4 new waitlisted</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Sessions This Week</CardTitle>
            <BookOpen className="h-5 w-5 text-brand-600 bg-brand-50 p-1 rounded" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">186</div>
            <div className="w-full bg-slate-100 h-1.5 mt-3 rounded-full overflow-hidden">
               <div className="bg-brand-500 h-full w-[70%]" />
            </div>
            <p className="text-xs text-slate-500 mt-2">70% target reached</p>
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
               {[1,2,3].map(i => (
                 <div key={i} className="flex gap-4">
                   <div className="w-2 h-2 mt-2 rounded-full bg-brand-500 shrink-0" />
                   <div>
                     <p className="text-sm text-slate-900 font-medium">New match suggested: Alex S. & Sarah V.</p>
                     <p className="text-xs text-slate-500">2 hours ago via Auto-matching</p>
                   </div>
                 </div>
               ))}
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
                 <p className="text-sm font-medium text-slate-900">3 students missed sessions</p>
                 <Link to="/ngo/students" className="text-xs font-semibold text-amber-600 hover:text-amber-800">Review attendance</Link>
               </div>
               <div className="bg-white p-3 rounded-lg border border-amber-100 shadow-sm">
                 <p className="text-sm font-medium text-slate-900">Volunteer onboarding pending</p>
                 <Link to="/ngo/volunteers" className="text-xs font-semibold text-amber-600 hover:text-amber-800">Review 4 applications</Link>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
