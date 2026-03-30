import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">Smart personal finance for real life</div>
        <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">Track expenses, savings, salary, and loans with clarity.</h1>
        <p className="mt-6 max-w-2xl text-base text-slate-400 md:text-lg">pesaAI helps you manage daily spending, budgets, loans given out, savings goals, and AI-powered financial insights in one secure app.</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link to="/register" className="rounded-2xl bg-emerald-400 px-6 py-3 font-bold text-slate-950">Get Started</Link>
          <Link to="/login" className="rounded-2xl border border-slate-700 px-6 py-3 font-bold text-white">Sign In</Link>
        </div>
      </section>
    </div>
  );
}
