import { useMemo, useState } from "react";
import Card from "../common/Card";
import Input from "../common/Input";

export default function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");
  const [interest, setInterest] = useState("0");

  const result = useMemo(() => {
    const principal = Number(amount || 0);
    const term = Number(months || 0);
    const rate = Number(interest || 0) / 100;
    if (!principal || !term) return { total: 0, monthly: 0 };
    const total = principal + principal * rate;
    return { total, monthly: total / term };
  }, [amount, months, interest]);

  return (
    <Card title="Loan Repayment Calculator" subtitle="Estimate total and monthly repayment">
      <div className="grid gap-4 md:grid-cols-3">
        <Input label="Loan Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Input label="Months" type="number" value={months} onChange={(e) => setMonths(e.target.value)} />
        <Input label="Interest %" type="number" value={interest} onChange={(e) => setInterest(e.target.value)} />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
          <div className="text-sm text-slate-400">Total Repayment</div>
          <div className="mt-2 text-xl font-bold text-white">KSh {result.total.toLocaleString("en-KE", { maximumFractionDigits: 0 })}</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
          <div className="text-sm text-slate-400">Monthly Payment</div>
          <div className="mt-2 text-xl font-bold text-white">KSh {result.monthly.toLocaleString("en-KE", { maximumFractionDigits: 0 })}</div>
        </div>
      </div>
    </Card>
  );
}
