import { useState } from "react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import SectionHeader from "../components/common/SectionHeader";

export default function SettingsPage() {
  const [profile, setProfile] = useState({ full_name: "", email: "", preferred_currency: "KES", budget_cycle: "monthly" });
  const [password, setPassword] = useState({ current_password: "", new_password: "" });

  return (
    <div className="space-y-6">
      <SectionHeader title="Settings" subtitle="Manage profile, app preferences, and account settings" />
      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Profile" subtitle="Basic user settings">
          <div className="space-y-4">
            <Input label="Full Name" value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} placeholder="Your full name" />
            <Input label="Email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="you@example.com" />
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Preferred Currency</label>
              <select value={profile.preferred_currency} onChange={(e) => setProfile({ ...profile, preferred_currency: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white">
                <option value="KES">KES</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Budget Cycle</label>
              <select value={profile.budget_cycle} onChange={(e) => setProfile({ ...profile, budget_cycle: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white">
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <Button>Save Profile</Button>
          </div>
        </Card>

        <Card title="Password" subtitle="Update your login credentials">
          <div className="space-y-4">
            <Input label="Current Password" type="password" value={password.current_password} onChange={(e) => setPassword({ ...password, current_password: e.target.value })} />
            <Input label="New Password" type="password" value={password.new_password} onChange={(e) => setPassword({ ...password, new_password: e.target.value })} />
            <Button>Update Password</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
