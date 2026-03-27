import { useState } from "react";
import { useNavigate } from "react-router";
import { UserPlus, Mail, Lock, Eye, EyeOff, User, AlertCircle, Loader2 } from "lucide-react";

export function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.includes("@kfupm.edu.sa")) {
      newErrors.email = "Must use KFUPM email (@kfupm.edu.sa)";
    }

    if (!/^\d{9}$/.test(formData.studentId)) {
      newErrors.studentId = "Student ID must be 9 digits";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call for interactive state management
      setTimeout(() => {
        setIsSubmitting(false);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userName", formData.fullName);
        localStorage.setItem("userRole", "student"); // Default role
        navigate("/app/dashboard");
      }, 1500);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#1E3A8A] to-[#06B6D4] px-4 py-8 sm:p-8">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mt-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#06B6D4]/10 rounded-full -mr-48 -mb-48"></div>
      <div className="absolute top-1/2 left-1/4 hidden h-64 w-64 rounded-full bg-white/5 md:block"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[16px] bg-gradient-to-br from-[#06B6D4] to-[#1E3A8A] mb-4 shadow-xl">
            <span className="text-3xl font-bold text-white">SC</span>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">Create Account</h1>
          <p className="text-blue-100">Join SWE Compass and start your journey</p>
        </div>

        {/* Sign Up Card */}
        <div className="rounded-[16px] bg-white p-5 shadow-2xl dark:bg-gray-900 sm:p-8">
          {/* Description */}
          <div className="mb-6 bg-[#06B6D4]/10 dark:bg-[#06B6D4]/20 rounded-[12px] p-4 border border-[#06B6D4]/20">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Sign Up Logic:</strong> Students must use KFUPM email addresses. Password must be at least 8 characters. 
              New accounts are assigned "Student" role by default. Moderator and Admin roles are assigned manually by administrators.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Abdullah Alzahrani"
                  disabled={isSubmitting}
                  className={`w-full pl-12 pr-4 py-3 bg-[#F8FAFC] dark:bg-gray-800 border ${
                    errors.fullName ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all disabled:opacity-50`}
                />
              </div>
              {errors.fullName && (
                <div className="flex items-center gap-1 mt-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  {errors.fullName}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                KFUPM Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="s202100000@kfupm.edu.sa"
                  disabled={isSubmitting}
                  className={`w-full pl-12 pr-4 py-3 bg-[#F8FAFC] dark:bg-gray-800 border ${
                    errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all disabled:opacity-50`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1 mt-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Student ID */}
            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Student ID
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="studentId"
                  type="text"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  placeholder="202100000"
                  maxLength={9}
                  disabled={isSubmitting}
                  className={`w-full pl-12 pr-4 py-3 bg-[#F8FAFC] dark:bg-gray-800 border ${
                    errors.studentId ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all disabled:opacity-50`}
                />
              </div>
              {errors.studentId && (
                <div className="flex items-center gap-1 mt-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  {errors.studentId}
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Minimum 8 characters"
                  disabled={isSubmitting}
                  className={`w-full pl-12 pr-12 py-3 bg-[#F8FAFC] dark:bg-gray-800 border ${
                    errors.password ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all disabled:opacity-50`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-1 mt-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Re-enter your password"
                  disabled={isSubmitting}
                  className={`w-full pl-12 pr-12 py-3 bg-[#F8FAFC] dark:bg-gray-800 border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all disabled:opacity-50`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSubmitting}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center gap-1 mt-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4] hover:from-[#1E3A8A]/90 hover:to-[#06B6D4]/90 text-white py-3 px-6 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => navigate("/login")}
                className="text-[#06B6D4] hover:text-[#1E3A8A] dark:hover:text-[#06B6D4] font-medium transition-colors disabled:opacity-50"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-blue-100">
          <p>King Fahd University of Petroleum & Minerals</p>
          <p className="mt-1">College of Computer Sciences & Engineering</p>
        </div>
      </div>
    </div>
  );
}
