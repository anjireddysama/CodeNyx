import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";

export default function Students() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Student Database</h1>
        <p className="text-slate-500">Manage your entire student roster visually.</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b">
              <tr>
                <th scope="col" className="px-6 py-4 rounded-tl-lg">Name</th>
                <th scope="col" className="px-6 py-4">Grade</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4 text-right rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b hover:bg-slate-50">
                <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">Alex Student</th>
                 <td className="px-6 py-4">10th Grade</td>
                 <td className="px-6 py-4">
                   <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Active</span>
                 </td>
                 <td className="px-6 py-4 text-right">
                   <button className="text-brand-600 hover:underline">Edit</button>
                 </td>
              </tr>
              <tr className="bg-white border-b hover:bg-slate-50">
                <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">Maria Garcia</th>
                 <td className="px-6 py-4">9th Grade</td>
                 <td className="px-6 py-4">
                   <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Needs Review</span>
                 </td>
                 <td className="px-6 py-4 text-right">
                   <button className="text-brand-600 hover:underline">Edit</button>
                 </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
