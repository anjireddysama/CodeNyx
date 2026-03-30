import { BookOpen, Calendar, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import { calculateRiskLevel } from "../utils/riskCalculator";

export default function StudentDashboard() {
  const riskColor = {
    Green: "bg-emerald-500",
    Yellow: "bg-amber-400",
    Red: "bg-red-500",
  }[calculateRiskLevel(85, 90)];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back, Alex!</h1>
        <p className="text-slate-500">Here's your latest learning progress.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Attendance Priority</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className={`mt-2 h-4 w-full rounded-full ${riskColor}`} />
            <p className="text-xs text-slate-500 mt-2">Currently tracking at "Green" status</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Recent Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-slate-500">Sessions this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed Topics</CardTitle>
            <BookOpen className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-slate-500">Across 3 subjects</p>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-lg font-semibold tracking-tight text-slate-900 mt-8 mb-4">Upcoming Schedule</h2>
      <Card>
        <div className="divide-y divide-slate-100">
          {[1,2,3].map((i) => (
             <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
               <div className="flex flex-col">
                 <span className="font-medium text-slate-900">Mathematics Mentoring</span>
                 <span className="text-sm text-slate-500">With Sarah V. • Tuesday 10:00 AM</span>
               </div>
               <button className="px-4 py-2 bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-lg text-sm font-medium transition-colors">
                 Join Call
               </button>
             </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
