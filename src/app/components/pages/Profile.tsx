import { useState } from "react";
import { User, Mail, Book, Save, CheckCircle2 } from "lucide-react";

export function Profile() {
  const [formData, setFormData] = useState({
    firstName: "Abdullah",
    lastName: "Alzahrani",
    email: "student@swecompass.edu",
    major: "Software Engineering",
    bio: "Passionate about building scalable web applications and learning new technologies.",
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="relative space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header Profile Section */}
      <div className="relative overflow-hidden rounded-[16px] bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4] p-5 text-white shadow-lg sm:p-8">
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-bold text-[#1E3A8A] shadow-lg ring-4 ring-white/20">
            {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="mb-1 text-2xl font-bold sm:text-3xl">
              {formData.firstName} {formData.lastName}
            </h1>
            <p className="text-blue-100">{formData.major}</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 hidden h-64 w-64 rounded-full bg-white/10 -mr-32 -mt-32 sm:block"></div>
        <div className="absolute bottom-0 right-20 hidden h-48 w-48 rounded-full bg-white/5 -mb-24 sm:block"></div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Details Form */}
        <div className="lg:col-span-2 relative rounded-[16px] border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-8">
          <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <User className="h-5 w-5 text-[#06B6D4]" />
            Personal Information
          </h2>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 pl-10 pr-4 text-gray-900 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#06B6D4] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 pl-10 pr-4 text-gray-900 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#06B6D4] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 pl-10 pr-4 text-gray-900 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#06B6D4] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Academic Major
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Book className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 pl-10 pr-4 text-gray-900 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#06B6D4] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Biography
              </label>
              <textarea
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                className="block w-full rounded-xl border border-gray-200 bg-[#F8FAFC] p-4 text-gray-900 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#06B6D4] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 leading-relaxed resize-none"
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-xl bg-[#06B6D4] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#0891B2] focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSaving ? "Saving..." : "Save Changes"}
              </button>

              {showSuccess && (
                <div className="flex items-center gap-2 text-sm font-medium text-[#10B981] animate-in fade-in slide-in-from-left-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Successfully updated!
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Account Settings sidebar equivalent */}
        <div className="relative rounded-[16px] border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-8 h-fit">
          <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Email Notifications</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Receive weekly updates</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" defaultChecked />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#06B6D4] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#06B6D4] dark:border-gray-600 dark:bg-gray-700"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Public Profile</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Allow others to see your progress</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#06B6D4] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#06B6D4] dark:border-gray-600 dark:bg-gray-700"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
