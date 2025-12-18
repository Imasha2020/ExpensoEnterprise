import { ShieldCheck, ArrowRight, Github, Chrome } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-white text-slate-900 overflow-hidden font-sans">
      {/* Left Side: Branding & Social Proof (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 p-12 flex-col justify-between relative">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#4f46e5_0%,transparent_50%)]" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-indigo-500 p-1.5 rounded-lg">
              <ShieldCheck size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">Expenso Enterprise</span>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Take control of your <br />
            <span className="text-indigo-400">financial future</span> today.
          </h2>
          <p className="mt-4 text-slate-400 max-w-md text-lg">
            Join over 10,000+ teams managing their daily expenses with real-time insights and enterprise-grade security.
          </p>
        </div>

        <div className="relative z-10 flex gap-8">
          <div>
            <p className="text-white font-bold text-2xl">99.9%</p>
            <p className="text-slate-500 text-sm">Uptime track record</p>
          </div>
          <div>
            <p className="text-white font-bold text-2xl">256-bit</p>
            <p className="text-slate-500 text-sm">AES Encryption</p>
          </div>
        </div>
      </div>

      {/* Right Side: Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50/50">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Create an Account</h1>
            <p className="text-slate-500 font-medium">
              Fill in your details to register and get started.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors font-semibold text-sm text-slate-700">
              <Chrome size={18} /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors font-semibold text-sm text-slate-700">
              <Github size={18} /> GitHub
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#fcfcfd] px-2 text-slate-400 font-bold tracking-widest">or email</span>
            </div>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Username</label>
              <input 
                id="username"
                type="text" 
                placeholder="Your username" 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email</label>
              <input 
                id="email"
                type="email" 
                placeholder="name@company.com" 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-sm"
              />
            </div>

            <button type="submit" className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-slate-200">
              Register
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Already have an account? <a href="/login" className="font-bold text-slate-900 hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
