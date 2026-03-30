import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/useAuthStore";

export default function RegisterPage() {
  const navigate = useNavigate();
  const registerUser = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.loading);
  const [form, setForm] = useState({ full_name: "", email: "", password: "", preferred_currency: "KES" });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser(form);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Registration failed");
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 px-4 py-8">
      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-white">Create your account</h1>
          <p className="mt-2 text-sm text-slate-400">Start tracking income, expenses, savings, and loans</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm text-slate-300">Full name</label>
            <input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300">Password</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300">Preferred currency</label>
            <select value={form.preferred_currency} onChange={(e) => setForm({ ...form, preferred_currency: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white">
              <option value="KES">KES</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-emerald-400 px-4 py-3 font-bold text-slate-950 disabled:opacity-60">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">Already have an account? <Link to="/login" className="text-emerald-400 hover:underline">Sign in</Link></p>
      </div>
    </div>
  );
}
