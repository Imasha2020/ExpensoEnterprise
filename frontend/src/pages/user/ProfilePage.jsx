import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { User, Mail } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white p-8 sm:p-10 rounded-2xl shadow-lg">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          Your Profile
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mb-6">
          Update your personal information to keep your account secure.
        </p>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Username
            </label>
            <Input
              placeholder="Enter your username"
              icon={<User size={20} className="text-slate-400" />}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <Input
              placeholder="Enter your email"
              icon={<Mail size={20} className="text-slate-400" />}
            />
          </div>

          <div className="pt-2">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200">
              Update Profile
            </Button>
          </div>
        </form>

        {/* Optional: Password Change / Extra Actions */}
        <div className="mt-6 border-t border-slate-200 pt-4">
          <button className="text-sm text-indigo-600 hover:underline font-medium">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
