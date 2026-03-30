import Card from "./Card";

export default function StatCard({ label, value, helper }) {
  return (
    <Card>
      <div className="text-xs uppercase tracking-[0.15em] text-slate-400">{label}</div>
      <div className="mt-2 text-2xl font-extrabold text-white">{value}</div>
      {helper && <p className="mt-2 text-sm text-slate-400">{helper}</p>}
    </Card>
  );
}