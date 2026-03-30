export default function Card({ title, subtitle, children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-base font-bold text-white">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
