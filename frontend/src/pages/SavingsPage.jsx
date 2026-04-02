import { useMemo, useState } from "react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Input from "../components/common/Input";
import SectionHeader from "../components/common/SectionHeader";
import StatCard from "../components/common/StatCard";

export default function SavingsPage() {
  const [goals, setGoals] = useState([
    { id: 1, name: "Emergency Fund", target: 50000, saved: 18000 },
    { id: 2, name: "Laptop Upgrade", target: 80000, saved: 25000 },
  ]);
  const [form, setForm] = useState({ name: "", target: "", saved: "" });

  const totals = useMemo(() => {
    const target = goals.reduce((sum, item) => sum + item.target, 0);
    const saved = goals.reduce((sum, item) => sum + item.saved, 0);
    return { target, saved, remaining: target - saved };
  }, [goals]);

  function addGoal(e) {
    e.preventDefault();
    if (!form.name || !form.target) return;
    setGoals((prev) => [
      ...prev,
      { id: Date.now(), name: form.name, target: Number(form.target), saved: Number(form.saved || 0) },
    ]);
    setForm({ name: "", target: "", saved: "" });
  }

  function removeGoal(id) {
    setGoals((prev) => prev.filter((item) => item.id !== id));
  }

    return (
    <div className="space-y-6">
      <SectionHeader title="Savings Goals" subtitle="Track progress toward savings targets" />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Target" value={`KSh ${totals.target.toLocaleString("en-KE")}`} />
        <StatCard label="Saved" value={`KSh ${totals.saved.toLocaleString("en-KE")}`} />
        <StatCard label="Remaining" value={`KSh ${totals.remaining.toLocaleString("en-KE")}`} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Card title="Add Savings Goal" subtitle="Create a target and monitor progress over time">
          <form className="space-y-4" onSubmit={addGoal}>
            <Input label="Goal Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input label="Target Amount" type="number" value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} />
            <Input label="Already Saved" type="number" value={form.saved} onChange={(e) => setForm({ ...form, saved: e.target.value })} />
            <Button type="submit" className="w-full">Save Goal</Button>
          </form>
        </Card>
        <div>
          {goals.length === 0 ? (
            <EmptyState title="No savings goals yet" description="Create a goal so you can measure progress clearly." />
          ) : (
            <div className="space-y-4">
              {goals.map((goal) => {
                const percent = goal.target > 0 ? Math.min((goal.saved / goal.target) * 100, 100) : 0;
                return (
                  <Card key={goal.id}>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white">{goal.name}</h3>
                        <p className="mt-2 text-sm text-slate-400">Saved KSh {goal.saved.toLocaleString("en-KE")} of KSh {goal.target.toLocaleString("en-KE")}</p>
                        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800"><div className="h-full bg-amber-400" style={{ width: `${percent}%` }} /></div>
                      </div>
                      <Button variant="danger" onClick={() => removeGoal(goal.id)}>Delete</Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}