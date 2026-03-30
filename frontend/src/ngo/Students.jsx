import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { getStudents } from "../services/dataService";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import { Loader } from "../components/Loader";

export default function Students() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.ngoId || user?.uid) {
      // For now, if no ngoId is on the user, use their uid as a fallback/ngoId
      const ngoId = user.ngoId || "ngo-123"; 
      getStudents(ngoId)
        .then(setStudents)
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
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Student Database</h1>
          <p className="text-slate-500">Manage your entire student roster visually.</p>
        </div>
        <button className="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-brand-700 transition">
          Add New Student
        </button>
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
              {students.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-slate-400">
                    No students found. Add your first student to get started.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="bg-white border-b hover:bg-slate-50">
                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                      {student.name}
                    </th>
                    <td className="px-6 py-4">{student.grade}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-brand-600 hover:underline">Edit</button>
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
