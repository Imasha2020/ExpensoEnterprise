import { ShieldCheck, ArrowRight, Github, Chrome } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../api/authApi";   // 🔹 Backend register API

export default function RegisterPage() {

  // ---------------------------
  // State handling (form data)
  // ---------------------------
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Navigation
  const navigate = useNavigate();

  /**
   * Register form submit handler
   * 1️⃣ Send user details to backend
   * 2️⃣ Backend creates USER account
   * 3️⃣ Redirect to login page
   */
  const handleSubmit = async (e) => {
    e.preventDefault();   // Page refresh stop
    setError("");
    setLoading(true);

    try {
      // 🔹 Call backend register API
      await registerUser({
        username,
        email,
        password,
        role: "USER"   // Default role = USER
      });

      // 🔹 Registration success → redirect to login
      navigate("/", { replace: true });

    } catch (err) {
      // 🔴 Registration failure
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white text-slate-900 overflow-hidden font-sans">

      {/* ======================================================
          LEFT SIDE – Branding / Info (Desktop only)
         ====================================================== */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 p-12 flex-col justify-between relative">

        {/* Background glow */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#4f46e5_0%,transparent_50%)]" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-indigo-500 p-1.5 rounded-lg">
              <ShieldCheck size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Expenso Enterprise
            </span>
          </div>
        </div>

        {/* Marketing text */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Start managing your <br />
            <span className="text-indigo-400">expenses smarter</span> today.
          </h2>
          <p className="mt-4 text-slate-400 max-w-md text-lg">
            Create your account and take control of your finances.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex gap-8">
          <div>
            <p className="text-white font-bold text-2xl">10K+</p>
            <p className="text-slate-500 text-sm">Active users</p>
          </div>
          <div>
            <p className="text-white font-bold text-2xl">Secure</p>
            <p className="text-slate-500 text-sm">JWT Authentication</p>
          </div>
        </div>
      </div>

      {/* ======================================================
          RIGHT SIDE – Register Form
         ====================================================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50/50">
        <div className="w-full max-w-md space-y-8">

          {/* Title */}
          <div>
            <h1 className="text-3xl font-extrabold">Create account</h1>
            <p className="text-slate-500">
              Register to start using Expenso Enterprise
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          {/* Social register (UI only) */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-2.5 border rounded-lg bg-white text-sm font-semibold">
              <Chrome size={18} /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border rounded-lg bg-white text-sm font-semibold">
              <Github size={18} /> GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-50 px-2 text-slate-400">
                or email
              </span>
            </div>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Username */}
            <div>
              <label className="text-xs font-bold uppercase text-slate-500">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your name"
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-bold uppercase text-slate-500">
                Work Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold uppercase text-slate-500">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg flex items-center justify-center gap-2"
            >
              {loading ? "Creating account..." : "Create Account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <span
              className="font-bold text-slate-900 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
