import { useAuthStore } from "../../features/auth/useAuthStore";

export default function Topbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <div>
          <h1 className="text-lg font-bold">Welcome back{user?.full_name ? `, ${user.full_name}` : ""}</h1>
          <p className="text-sm text-slate-400">Track smarter. Spend intentionally.</p>
        </div>
        <button onClick={logout} className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          Logout
        </button>
      </div>
    </header>
  );
}