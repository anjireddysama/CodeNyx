import { useState, useEffect } from "react";
import { Clock, Calendar, Video, Users, PieChart as PieChartIcon, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "../hooks/useAuth";
import { subscribeToOnlineUsers } from "../services/dataService";

const assignedStudents = [
  { 
    id: 1, 
    name: "Alex Student", 
    grade: "10th Grade", 
    subject: "Math",
    progress: [
      { name: "Completed", value: 65, color: "#10b981" },
      { name: "In Progress", value: 20, color: "#3b82f6" },
      { name: "Needs Attention", value: 15, color: "#f43f5e" }
    ]
  },
  { 
    id: 2, 
    name: "Maria Garcia", 
    grade: "9th Grade", 
    subject: "Science",
    progress: [
      { name: "Completed", value: 85, color: "#10b981" },
      { name: "In Progress", value: 10, color: "#3b82f6" },
      { name: "Needs Attention", value: 5, color: "#f43f5e" }
    ]
  },
];

export default function VolunteerDashboard() {
  const { user } = useAuth();
  const mentorName = user?.displayName || "Volunteer";
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    const unsub = subscribeToOnlineUsers("student", (count, _total) => {
      setOnlineCount(count);
    });

    return () => {
      if (unsub) unsub();
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Volunteer Dashboard</h1>
        <p className="text-slate-500">Manage your active mentoring sessions and view student progress.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Mentor Profile / Expertise Card */}
        <Card className="border-indigo-100 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-900">
              <Award className="h-5 w-5 text-indigo-600" />
              Mentor Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase font-bold text-slate-400 mb-2 tracking-wider">Strong In Subject</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">Mathematics</span>
                  <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">Physics</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase font-bold text-slate-400 mb-1 tracking-wider">Teaching Experience</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-800">5+</span>
                    <span className="text-sm font-medium text-slate-500">Years</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xs uppercase font-bold text-slate-400 mb-1 tracking-wider">Platform Status</p>
                  <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-sm font-medium border border-green-100">
                    <span className="relative flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    {onlineCount} Online Students
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Session Card */}
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

        {/* Assigned Students List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-slate-500" />
              Students Assigned to: <span className="text-brand-700">{mentorName}</span>
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
      </div>

      {/* Per-Student Progress Pie Charts */}
      <h2 className="text-lg font-bold tracking-tight text-slate-900 pt-4">Individual Student Progress</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assignedStudents.map((student) => {
          // Calculate overall status for the center of the pie
          const completedRate = student.progress.find(p => p.name === "Completed")?.value || 0;
          
          return (
            <Card key={`chart-${student.id}`}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold text-slate-800">{student.name}</CardTitle>
                  <p className="text-xs text-slate-500">{student.subject}</p>
                </div>
                <PieChartIcon className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="relative h-[200px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={student.progress}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {student.progress.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-slate-800">{completedRate}%</span>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Done</span>
                  </div>
                </div>
                <div className="flex justify-center gap-3 mt-4 flex-wrap">
                  {student.progress.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
                      {entry.name}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
