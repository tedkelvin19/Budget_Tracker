import Card from "../common/Card";
import { formatCurrency } from "../../lib/format";

function SummaryItem({ label, value, accent }) {
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-x-0 top-0 h-1 ${accent}`} />
      <div className="text-xs uppercase tracking-[0.15em] text-slate-400">{label}</div>
      <div className="mt-3 text-2xl font-bold">{value}</div>
    </Card>
  );
}

export default function SummaryCards({ summary, currency = "KES" }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <SummaryItem label="Income" value={formatCurrency(summary.total_income, currency)} accent="bg-emerald-400" />
      <SummaryItem label="Expenses" value={formatCurrency(summary.total_expenses, currency)} accent="bg-rose-400" />
      <SummaryItem label="Savings" value={formatCurrency(summary.total_savings, currency)} accent="bg-amber-400" />
      <SummaryItem label="Outstanding Loans" value={formatCurrency(summary.outstanding_loans, currency)} accent="bg-sky-400" />
    </div>
  );
}
