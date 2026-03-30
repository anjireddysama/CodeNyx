import { Card } from "../components/Card";

export default function Volunteers() {
  // Similar layout to students, but tailored for volunteers
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Volunteer Roster</h1>
        <p className="text-slate-500">Track and onboard new teaching associates.</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b">
              <tr>
                <th scope="col" className="px-6 py-4">Name</th>
                <th scope="col" className="px-6 py-4">Subject Focus</th>
                <th scope="col" className="px-6 py-4">Hours Logged</th>
                <th scope="col" className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">Sarah Volunteer</td>
                <td className="px-6 py-4">Mathematics</td>
                <td className="px-6 py-4">24</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-brand-100 text-brand-700 rounded-full text-xs font-medium">Matched</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
