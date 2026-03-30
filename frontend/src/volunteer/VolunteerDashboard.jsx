import { Clock, Calendar, Video, Users, PieChart as PieChartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const assignedStudents = [
  { id: 1, name: "Alex Student", grade: "10th Grade", subject: "Math" },
  { id: 2, name: "Maria Garcia", grade: "9th Grade", subject: "Science" },
];

const progressData = [
  { name: "Excellent", value: 45 },
  { name: "Good", value: 30 },
  { name: "Needs Attention", value: 25 },
];

const COLORS = ["#10b981", "#3b82f6", "#f43f5e"];

export default function VolunteerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Volunteer Dashboard</h1>
        <p className="text-slate-500">Manage your active mentoring sessions and students.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-brand-200 bg-brand-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brand-900">
              <Calendar className="h-5 w-5 text-brand-600" />
              Today's Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-lg border border-brand-100 p-5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Algebra Help</h3>
                  <p className="text-sm text-slate-500">With Alex S.</p>
                </div>
                <div className="flex items-center gap-1.5 text-brand-600 bg-brand-50 px-3 py-1 rounded-full text-sm font-medium">
                  <Clock className="h-4 w-4" />
                  10:00 AM
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-6">
                Reviewing linear equations and graphing basics before next week's test.
              </p>
              <Link
                to="/volunteer/session/101"
                className="inline-flex w-full justify-center items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors shadow-sm"
              >
                <Video className="h-4 w-4" />
                Join Virtual Class
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-slate-500" />
              Assigned Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-100 mt-2">
              {assignedStudents.map(student => (
                <div key={student.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs uppercase">
                      {student.name.substring(0,2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{student.name}</p>
                      <p className="text-xs text-slate-500">{student.grade} • {student.subject}</p>
                    </div>
                  </div>
                  <button className="text-brand-600 text-sm font-medium hover:text-brand-800 transition-colors">
                    View
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-slate-500" />
              Student Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={progressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {progressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
