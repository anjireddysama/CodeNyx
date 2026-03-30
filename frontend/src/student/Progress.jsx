import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import { LineChart, BarChart } from "../components/Chart";

const performanceData = [
  { month: "Jan", score: 65, attendance: 80 },
  { month: "Feb", score: 72, attendance: 85 },
  { month: "Mar", score: 85, attendance: 95 },
  { month: "Apr", score: 88, attendance: 90 },
];

export default function Progress() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Learning Progress</h1>
        <p className="text-slate-500">Review your test scores and attendance metrics.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={performanceData} xAxisKey="month" barKey="attendance" color="#3b82f6" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assessment Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={performanceData} xAxisKey="month" lineKey="score" color="#8b5cf6" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
