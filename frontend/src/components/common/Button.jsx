export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-emerald-400 text-slate-950 hover:opacity-90",
    secondary: "border border-slate-700 text-slate-200 hover:bg-slate-800",
    danger: "border border-rose-800 text-rose-300 hover:bg-rose-950/40",
  };

  return (
    <button
      type={type}
      className={`rounded-xl px-4 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}