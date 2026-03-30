import { useParams } from "react-router-dom";
import { Video, FileText, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";

export default function SessionPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Happening Now
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Algebra Foundation Session</h1>
          <p className="text-slate-500 mt-1">Session ID: {id}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm transition-colors">
            <CheckCircle2 className="h-4 w-4" />
            Mark Complete
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm transition-colors">
            <Video className="h-4 w-4" />
            Launch Meeting
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Session Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
                <li>Start with a 5-minute recap of last week's materials.</li>
                <li>Ensure the student's camera is on when discussing difficult topics.</li>
                <li>Go through Worksheet B and review errors.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attached Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <FileText className="h-8 w-8 text-brand-500 p-1.5 bg-brand-100 rounded" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Worksheet B.pdf</p>
                  <p className="text-xs text-slate-500">1.2 MB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
