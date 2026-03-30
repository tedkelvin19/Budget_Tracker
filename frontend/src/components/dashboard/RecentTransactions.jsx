import Card from "../common/Card";
import { formatCurrency, formatDate } from "../../lib/format";

export default function RecentTransactions({ items = [], currency = "KES" }) {
  return (
    <Card title="Recent Transactions" subtitle="Latest activity across your account">
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-400">No transactions yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-4">
              <div>
                <div className="font-semibold text-white">{item.title}</div>
                <div className="mt-1 text-sm text-slate-400">{item.category_name} • {formatDate(item.date)}</div>
              </div>
              <div className={`text-sm font-bold ${item.type === "income" ? "text-emerald-400" : "text-rose-400"}`}>
                {item.type === "income" ? "+" : "-"}
                {formatCurrency(item.amount, currency)}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}