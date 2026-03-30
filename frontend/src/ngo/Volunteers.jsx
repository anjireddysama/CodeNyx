import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { getVolunteers } from "../services/dataService";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import { Loader } from "../components/Loader";

export default function Volunteers() {
  const { user } = useAuth();
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.ngoId || user?.uid) {
      const ngoId = user.ngoId || "ngo-123"; 
      getVolunteers(ngoId)
        .then(setVolunteers)
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Volunteer Roster</h1>
          <p className="text-slate-500">Track and onboard new teaching associates.</p>
        </div>
        <button className="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-brand-700 transition">
          Add New Volunteer
        </button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b">
              <tr>
                <th scope="col" className="px-6 py-4 rounded-tl-lg">Name</th>
                <th scope="col" className="px-6 py-4">Subject Focus</th>
                <th scope="col" className="px-6 py-4">Hours Logged</th>
                <th scope="col" className="px-6 py-4 text-right rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-slate-400">
                    No volunteers found. Onboard your first associate to get started.
                  </td>
                </tr>
              ) : (
                volunteers.map((volunteer) => (
                  <tr key={volunteer.id} className="bg-white border-b hover:bg-slate-50">
                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                      {volunteer.name}
                    </th>
                    <td className="px-6 py-4">{volunteer.subjectFocus}</td>
                    <td className="px-6 py-4 font-mono">{volunteer.hoursLogged}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        volunteer.status === 'Matched' ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {volunteer.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
