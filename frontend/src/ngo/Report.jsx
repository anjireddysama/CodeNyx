import { BarChart, LineChart } from "../components/Chart";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import { Download } from "lucide-react";

const engagementData = [
  { month: "Jan", sessions: 120, volunteers: 45 },
  { month: "Feb", sessions: 145, volunteers: 50 },
  { month: "Mar", sessions: 160, volunteers: 55 },
  { month: "Apr", sessions: 186, volunteers: 60 },
];

export default function Report() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Analytics & Reports</h1>
          <p className="text-slate-500">Program performance tracking.</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-800 transition shadow">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Session Trajectory</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={engagementData} xAxisKey="month" barKey="sessions" color="#3b82f6" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Active Volunteer Base</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={engagementData} xAxisKey="month" lineKey="volunteers" color="#10b981" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
