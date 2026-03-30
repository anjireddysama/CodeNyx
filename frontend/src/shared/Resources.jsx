import { Card, CardContent } from "../components/Card";
import { Book, Video, FileText, Download } from "lucide-react";

const resources = [
  { id: 1, title: "Algebra Foundations", type: "document", icon: FileText, color: "text-blue-500 bg-blue-50" },
  { id: 2, title: "Geometry Visualized", type: "video", icon: Video, color: "text-purple-500 bg-purple-50" },
  { id: 3, title: "Practice Workbooks", type: "book", icon: Book, color: "text-emerald-500 bg-emerald-50" },
];

export default function Resources() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Resource Library</h1>
          <p className="text-slate-500">Access and download learning materials.</p>
        </div>
      </div>

      <div className="flex gap-2 pb-4 overflow-x-auto">
        <button className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-sm font-medium whitespace-nowrap">All Resources</button>
        <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50 whitespace-nowrap">Mathematics</button>
        <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50 whitespace-nowrap">Science</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map(res => (
          <Card key={res.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex items-start gap-4">
              <div className={`p-3 rounded-xl ${res.color}`}>
                <res.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{res.title}</h3>
                <p className="text-xs text-slate-500 mt-1 capitalize">{res.type}</p>
              </div>
              <button className="text-slate-400 hover:text-brand-600 transition-colors">
                <Download className="h-5 w-5" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
