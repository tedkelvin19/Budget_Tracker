import { formatCurrency, formatDate } from "../../lib/format";

export default function TransactionList({ items = [], onEdit, onDelete }) {
  if (!items.length) {
    return <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-slate-400">No transactions found.</div>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-base font-semibold text-white">{item.title}</div>
              <div className="mt-1 text-sm text-slate-400">{item.category_name} • {item.type} • {formatDate(item.date)}</div>
              {item.note && <div className="mt-2 text-sm text-slate-300">{item.note}</div>}
            </div>
            <div className="flex items-center gap-3">
              <div className={`text-sm font-bold ${item.type === "income" ? "text-emerald-400" : "text-rose-400"}`}>{formatCurrency(item.amount)}</div>
              <button onClick={() => onEdit(item)} className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800">Edit</button>
              <button onClick={() => onDelete(item.id)} className="rounded-lg border border-rose-800 px-3 py-2 text-sm text-rose-300 hover:bg-rose-950/40">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
