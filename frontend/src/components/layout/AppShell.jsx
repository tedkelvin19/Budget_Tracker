import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileNav from "./MobileNav";

export default function AppShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar />
          <main className="flex-1 p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
            <Outlet />
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
