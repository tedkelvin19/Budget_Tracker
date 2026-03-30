import { useMemo, useState } from "react";
import Card from "../common/Card";
import Input from "../common/Input";

export default function SavingsGoalCalculator() {
  const [goal, setGoal] = useState("");
  const [months, setMonths] = useState("");

  const monthly = useMemo(() => {
    const g = Number(goal || 0);
    const m = Number(months || 0);
    if (!g || !m) return 0;
    return g / m;
  }, [goal, months]);

  return (
    <Card title="Savings Goal Calculator" subtitle="See how much to save each month">
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Target Amount" type="number" value={goal} onChange={(e) => setGoal(e.target.value)} />
        <Input label="Months" type="number" value={months} onChange={(e) => setMonths(e.target.value)} />
      </div>
      <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
        <div className="text-sm text-slate-400">Required monthly saving</div>
        <div className="mt-2 text-2xl font-extrabold text-white">KSh {monthly.toLocaleString("en-KE", { maximumFractionDigits: 0 })}</div>
      </div>
    </Card>
  );
}