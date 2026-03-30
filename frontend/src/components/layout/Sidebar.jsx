import { NavLink } from "react-router-dom";
import { Bot, ChartColumn, CircleDollarSign, HandCoins, LayoutDashboard, PiggyBank, Receipt, Settings, Tags, Wallet } from "lucide-react";

const links = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/transactions", label: "Transactions", icon: Receipt },
  { to: "/app/categories", label: "Categories", icon: Tags },
  { to: "/app/budgets", label: "Budgets", icon: Wallet },
  { to: "/app/loans", label: "Loans", icon: HandCoins },
  { to: "/app/savings", label: "Savings", icon: PiggyBank },
  { to: "/app/reports", label: "Reports", icon: ChartColumn },
  { to: "/app/ai", label: "AI Insights", icon: Bot },
  { to: "/app/calculators", label: "Calculators", icon: CircleDollarSign },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-72 border-r border-slate-800 bg-slate-900/70 p-6 md:block">
      <div className="mb-8 text-2xl font-extrabold tracking-tight">pesa<span className="text-emerald-400">AI</span></div>
      <nav className="space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-emerald-500 text-slate-950" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
