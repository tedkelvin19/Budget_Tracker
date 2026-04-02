import { useMemo, useState } from "react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import SectionHeader from "../components/common/SectionHeader";
import StatCard from "../components/common/StatCard";

export default function ReportsPage() {
  const [filters, setFilters] = useState({ from: "", to: "", type: "all", query: "" });

  const mockData = [
    { label: "Food", amount: 8400 },
    { label: "Transport", amount: 5200 },
    { label: "Personal Use", amount: 3100 },
  ];

  const total = useMemo(() => mockData.reduce((sum, item) => sum + item.amount, 0), [mockData]);

  return (
    <div className="space-y-6">
      <SectionHeader title="Reports" subtitle="Filter activity and view summary insights">
        <Button variant="secondary">Export CSV</Button>
      </SectionHeader>

      <Card title="Filters" subtitle="Narrow reports by date, type, and keyword">
        <div className="grid gap-4 md:grid-cols-4">
          <input type="date" value={filters.from} onChange={(e) => setFilters({ ...filters, from: e.target.value })} className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white" />
          <input type="date" value={filters.to} onChange={(e) => setFilters({ ...filters, to: e.target.value })} className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white" />
          <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white">
            <option value="all">All Types</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="saving">Saving</option>
            <option value="loan_given">Loan Given</option>
          </select>
          <input placeholder="Search keyword" value={filters.query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white" />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Records Total" value={`KSh ${total.toLocaleString("en-KE")}`} />
        <StatCard label="Top Category" value="Food" />
        <StatCard label="Period" value="This Month" />
      </div>

      <Card title="Category Summary" subtitle="Current mock view until backend reporting endpoints are ready">
        <div className="space-y-4">
          {mockData.map((item) => {
            const percent = total > 0 ? (item.amount / total) * 100 : 0;
            return (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-300">{item.label}</span>
                  <span className="text-slate-400">KSh {item.amount.toLocaleString("en-KE")}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-800"><div className="h-full bg-emerald-400" style={{ width: `${percent}%` }} /></div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}