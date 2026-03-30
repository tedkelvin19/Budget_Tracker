export default function Input({ label, error, className = "", ...props }) {
  return (
    <div>
      {label && <label className="mb-1 block text-sm font-medium text-slate-300">{label}</label>}
      <input
        className={`w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-400 ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-rose-400">{error}</p>}
    </div>
  );
}

