import { Card, CardContent } from "../components/Card";
import { Users2, ArrowRight } from "lucide-react";

const circles = [
  { id: 1, name: "Alpha Math Cohort", subject: "Mathematics", size: 12, status: "Active" },
  { id: 2, name: "Science Explorers", subject: "Science", size: 8, status: "Forming" },
];

export default function Circles() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Learning Circles</h1>
        <p className="text-slate-500">Group mentoring and cohort management.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {circles.map(circle => (
          <Card key={circle.id} className="flex flex-col hover:border-brand-300 transition-colors cursor-pointer group">
            <CardContent className="pt-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                  <Users2 className="h-6 w-6" />
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${circle.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {circle.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{circle.name}</h3>
              <p className="text-sm text-slate-500 mb-4 flex-1">Focus: {circle.subject}</p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                <span className="text-sm font-medium text-slate-600">{circle.size} Students</span>
                <ArrowRight className="h-4 w-4 text-brand-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
