import { useMemo, useState } from "react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Input from "../components/common/Input";
import SectionHeader from "../components/common/SectionHeader";
import StatCard from "../components/common/StatCard";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState([
    { id: 1, category: "Food", limit: 12000, spent: 8400, period: "Monthly" },
    { id: 2, category: "Transport", limit: 6000, spent: 5200, period: "Monthly" },
  ]);
  const [form, setForm] = useState({ category: "Food", limit: "", period: "Monthly" });

  const totals = useMemo(() => {
    const totalLimit = budgets.reduce((sum, item) => sum + item.limit, 0);
    const totalSpent = budgets.reduce((sum, item) => sum + item.spent, 0);
    return { totalLimit, totalSpent, remaining: totalLimit - totalSpent };
  }, [budgets]);

  function addBudget(e) {
    e.preventDefault();
    if (!form.limit) return;
    setBudgets((prev) => [
      ...prev,
      { id: Date.now(), category: form.category, limit: Number(form.limit), spent: 0, period: form.period },
    ]);
    setForm({ category: "Food", limit: "", period: "Monthly" });
  }

  function removeBudget(id) {
    setBudgets((prev) => prev.filter((item) => item.id !== id));
  }
  return (
    <div className="space-y-6">
      <SectionHeader title="Budgets" subtitle="Plan spending caps and track remaining balance" />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Budgeted" value={`KSh ${totals.totalLimit.toLocaleString("en-KE")}`} />
        <StatCard label="Spent" value={`KSh ${totals.totalSpent.toLocaleString("en-KE")}`} />
        <StatCard label="Remaining" value={`KSh ${totals.remaining.toLocaleString("en-KE")}`} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Card title="Add Budget" subtitle="Create a monthly or custom budget target">
          <form className="space-y-4" onSubmit={addBudget}>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white">
                <option>Food</option>
                <option>Transport</option>
                <option>Personal Use</option>
                <option>Savings</option>
              </select>
            </div>
            <Input label="Budget Limit" type="number" value={form.limit} onChange={(e) => setForm({ ...form, limit: e.target.value })} />
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Period</label>
              <select value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Custom</option>
              </select>
            </div>
            <Button type="submit" className="w-full">Save Budget</Button>
          </form>
        </Card>

        <div>
          {budgets.length === 0 ? (
            <EmptyState title="No budgets yet" description="Create budget targets to control your spending." />
          ) : (
            <div className="space-y-4">
              {budgets.map((item) => {
                const percent = item.limit > 0 ? Math.min((item.spent / item.limit) * 100, 100) : 0;
                const tone = percent >= 100 ? "bg-rose-400" : percent >= 80 ? "bg-amber-400" : "bg-emerald-400";
                return (
                  <Card key={item.id}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-white">{item.category}</h3>
                          <span className="text-sm text-slate-400">{item.period}</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-400">Spent KSh {item.spent.toLocaleString("en-KE")} of KSh {item.limit.toLocaleString("en-KE")}</p>
                        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
                          <div className={`h-full ${tone}`} style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                      <Button variant="danger" onClick={() => removeBudget(item.id)}>Delete</Button>
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
