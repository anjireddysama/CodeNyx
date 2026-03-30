import { Clock, Calendar, Video, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";

const assignedStudents = [
  { id: 1, name: "Alex Student", grade: "10th Grade", subject: "Math" },
  { id: 2, name: "Maria Garcia", grade: "9th Grade", subject: "Science" },
];

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
      </div>
    </div>
  );
}
