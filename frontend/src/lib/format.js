export function formatCurrency(amount, currency = "KES") {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));
}

export function formatDate(dateValue) {
  if (!dateValue) return "";
  return new Date(dateValue).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}