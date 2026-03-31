import { useState } from "react";
import { updateUser } from "../services/dataService";
import { useAuth } from "../hooks/useAuth";

const SUBJECTS = ["Mathematics", "Science", "English", "History", "Computer Science"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export function StudentOnboardingModal({ onClose }) {
  const { user, login } = useAuth();
  const [knowledge, setKnowledge] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLevelChange = (subject, level) => {
    setKnowledge(prev => ({
      ...prev,
      [subject]: level
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(knowledge).length === 0) {
      setError("Please select at least one subject to proceed.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updates = {
        onboardingCompleted: true,
        knowledgeData: knowledge
      };
      
      // Update in Firestore
      await updateUser(user.uid, updates);
      
      // Update local user state
      login({ ...user, ...updates });
      
      // Close modal
      onClose();
    } catch (err) {
      console.error("Onboarding failed", err);
      setError("Failed to save your progress. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 md:p-8 border-b border-slate-100 bg-brand-50">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Welcome to TraceEd, {user?.displayName || 'Student'}!</h2>
          <p className="mt-2 text-brand-700 font-medium">
            To help us push you toward the right learning path, please let us know your current knowledge levels in these subjects.
          </p>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-100 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              {error}
            </div>
          )}

          <form id="onboarding-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {SUBJECTS.map((subject) => (
                <div key={subject} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50 gap-4">
                  <span className="font-semibold text-slate-800">{subject}</span>
                  <div className="flex gap-2">
                    {LEVELS.map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => handleLevelChange(subject, level)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          knowledge[subject] === level
                            ? "bg-brand-600 text-white shadow-md"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            form="onboarding-form"
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-200 hover:bg-brand-500 hover:shadow-brand-300 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-70"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              "Complete Setup"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
