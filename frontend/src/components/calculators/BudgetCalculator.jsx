import { useMemo, useState } from "react";
import Card from "../common/Card";
import Input from "../common/Input";

export default function BudgetCalculator() {
  const [income, setIncome] = useState("");
  const [needs, setNeeds] = useState("50");
  const [wants, setWants] = useState("30");
  const [savings, setSavings] = useState("20");

  const result = useMemo(() => {
    const total = Number(income || 0);
    return {
      needs: (total * Number(needs || 0)) / 100,
      wants: (total * Number(wants || 0)) / 100,
      savings: (total * Number(savings || 0)) / 100,
    };
  }, [income, needs, wants, savings]);

  return (
    <Card title="Budget Split Calculator" subtitle="Estimate category allocations from income">
      <div className="grid gap-4 md:grid-cols-4">
        <Input label="Income" type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
        <Input label="Needs %" type="number" value={needs} onChange={(e) => setNeeds(e.target.value)} />
        <Input label="Wants %" type="number" value={wants} onChange={(e) => setWants(e.target.value)} />
        <Input label="Savings %" type="number" value={savings} onChange={(e) => setSavings(e.target.value)} />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
          <div className="text-sm text-slate-400">Needs</div>
          <div className="mt-2 text-xl font-bold text-white">KSh {result.needs.toLocaleString("en-KE", { maximumFractionDigits: 0 })}</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
          <div className="text-sm text-slate-400">Wants</div>
          <div className="mt-2 text-xl font-bold text-white">KSh {result.wants.toLocaleString("en-KE", { maximumFractionDigits: 0 })}</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
          <div className="text-sm text-slate-400">Savings</div>
          <div className="mt-2 text-xl font-bold text-white">KSh {result.savings.toLocaleString("en-KE", { maximumFractionDigits: 0 })}</div>
        </div>
      </div>
    </Card>
  );
}
