import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "../features/auth/useAuthStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(form);
      toast.success("Welcome back");
      navigate("/app/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Login failed");
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-white">Sign in</h1>
          <p className="mt-2 text-sm text-slate-400">Access your finance dashboard securely</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm text-slate-300">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300">Password</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" required />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-emerald-400 px-4 py-3 font-bold text-slate-950 disabled:opacity-60">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between text-sm">
          <Link to="/forgot-password" className="text-emerald-400 hover:underline">Forgot password?</Link>
          <Link to="/register" className="text-slate-300 hover:underline">Create account</Link>
        </div>
      </div>
    </div>
  );
}
