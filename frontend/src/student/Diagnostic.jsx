import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";

export default function Diagnostic() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Diagnostic Assessment</h1>
        <p className="text-slate-500">Evaluate your current foundations to help us pair you better.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mathematics Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-8 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-center">
            <h3 className="text-lg text-slate-900 font-medium mb-2">No active tests</h3>
            <p className="text-slate-500 text-sm max-w-sm mb-4">
              You are all caught up! When a new assessment is assigned by your NGO coordinator, it will appear here.
            </p>
            <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 tracking-tight shadow-sm transition-all focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
              Browse Past Results
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
