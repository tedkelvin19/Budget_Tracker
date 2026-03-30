import { NavLink } from "react-router-dom";
import { LayoutDashboard, Receipt, Bot, Wallet } from "lucide-react";

const items = [
  { to: "/app/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/app/transactions", label: "Tx", icon: Receipt },
  { to: "/app/budgets", label: "Budget", icon: Wallet },
  { to: "/app/ai", label: "AI", icon: Bot },
];

export default function MobileNav() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-800 bg-slate-950/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-4">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `flex flex-col items-center justify-center gap-1 py-3 text-xs font-medium ${isActive ? "text-emerald-400" : "text-slate-400"}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
