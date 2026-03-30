import { Medal, Star, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";

const badges = [
  { id: 1, name: "First Timer", description: "Completed your first session", icon: Star, color: "text-amber-500 bg-amber-50 border-amber-200" },
  { id: 2, name: "Dedicated Tutor", description: "Reached 10 hours", icon: Clock, color: "text-blue-500 bg-blue-50 border-blue-200" },
  { id: 3, name: "Math Whiz", description: "Completed 5 math modules", icon: Medal, color: "text-purple-500 bg-purple-50 border-purple-200" },
];

export default function Passport() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Volunteer Passport</h1>
        <p className="text-slate-500">Track your impact, earned badges, and volunteer hours.</p>
      </div>

      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-2 lg:col-span-1 border-t-4 border-t-brand-500">
          <CardContent className="pt-6">
            <h3 className="text-slate-500 font-medium text-sm mb-1">Total Impact</h3>
            <p className="text-4xl font-extrabold text-slate-900">24 <span className="text-lg font-medium text-slate-500">hrs</span></p>
          </CardContent>
        </Card>
        
        <Card className="col-span-2 lg:col-span-1 border-t-4 border-t-emerald-500">
          <CardContent className="pt-6">
            <h3 className="text-slate-500 font-medium text-sm mb-1">Sessions Completed</h3>
            <p className="text-4xl font-extrabold text-slate-900">8</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Achievements Showcase</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map(badge => (
              <div key={badge.id} className={`flex flex-col items-center text-center p-6 border rounded-xl transition-all hover:scale-[1.02] cursor-default ${badge.color}`}>
                <div className="bg-white p-3 rounded-full mb-4 shadow-sm">
                  <badge.icon className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">{badge.name}</h4>
                <p className="text-xs opacity-80">{badge.description}</p>
              </div>
            ))}
            
            {/* Locked badge placeholder */}
            <div className="flex flex-col items-center text-center p-6 border border-dashed border-slate-200 rounded-xl bg-slate-50 opacity-60">
                <div className="bg-slate-200 p-3 rounded-full mb-4">
                  <Star className="h-8 w-8 text-slate-400" />
                </div>
                <h4 className="font-bold text-slate-500 mb-1">Coming Soon</h4>
                <p className="text-xs text-slate-400">Reach 50 hours of tutoring</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
