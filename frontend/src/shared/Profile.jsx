import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  
  if(!user) return null;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Profile</h1>
        <p className="text-slate-500">Manage your account settings and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
              <div className="h-24 w-24 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-3xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                <p className="text-slate-500 capitalize">{user.role} Account</p>
                <button className="mt-2 text-sm text-brand-600 font-medium hover:text-brand-700">Change Avatar</button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <input type="text" disabled value={user.name} className="mt-1 block w-full rounded-md border-slate-300 py-2 px-3 bg-slate-50 text-slate-600 border sm:text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input type="email" disabled value={user.email} className="mt-1 block w-full rounded-md border-slate-300 py-2 px-3 bg-slate-50 text-slate-600 border sm:text-sm" />
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <button className="px-4 py-2 bg-brand-600 text-white rounded-md text-sm font-medium hover:bg-brand-700">
                Save Changes
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
