import Card from "../common/Card";

export default function InsightsCard({ insights = [], onRefresh, loading }) {
  return (
    <Card title="AI Insights" subtitle="Practical financial guidance based on your account activity">
      <div className="space-y-3">
        {insights.length === 0 ? (
          <p className="text-sm text-slate-400">No insights available yet.</p>
        ) : (
          insights.map((insight, index) => (
            <div key={index} className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-slate-200">
              {insight}
            </div>
          ))
        )}
      </div>
      <button onClick={onRefresh} disabled={loading} className="mt-4 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? "Refreshing..." : "Refresh Insights"}
      </button>
    </Card>
  );
}
