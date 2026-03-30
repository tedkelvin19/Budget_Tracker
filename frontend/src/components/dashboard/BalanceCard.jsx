import Card from "../common/Card";
import { formatCurrency } from "../../lib/format";

export default function BalanceCard({ balance, currency = "KES" }) {
  const positive = Number(balance) >= 0;
  return (
    <Card className="overflow-hidden border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Net Balance</div>
      <div className={`mt-3 text-3xl font-extrabold ${positive ? "text-emerald-400" : "text-rose-400"}`}>
        {formatCurrency(balance, currency)}
      </div>
      <p className="mt-2 text-sm text-slate-400">
        {positive ? "You are above water this period." : "You have spent more than you earned this period."}
      </p>
    </Card>
  );
}
