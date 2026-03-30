import { useEffect, useState } from "react";
import BalanceCard from "../components/dashboard/BalanceCard";
import InsightsCard from "../components/dashboard/InsightsCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import SpendingChart from "../components/dashboard/SpendingChart";
import SummaryCards from "../components/dashboard/SummaryCards";

const fallbackSummary = {
  total_income: 0,
  total_expenses: 0,
  total_savings: 0,
  outstanding_loans: 0,
  balance: 0,
  recent_transactions: [],
  monthly_chart: [],
};

export default function DashboardPage() {
  const [summary, setSummary] = useState(fallbackSummary);
  const [insights, setInsights] = useState([]);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    loadDashboard();
    loadInsights();
  }, []);

  async function loadDashboard() {
    try {
      const { data } = await dashboardApi.summary();
      setSummary(data);
    } catch (error) {
      console.error("Failed to load dashboard", error);
    }
  }

  async function loadInsights() {
    setLoadingInsights(true);
    try {
      const { data } = await dashboardApi.insights();
      setInsights(data.insights || []);
    } catch (error) {
      console.error("Failed to load insights", error);
      setInsights(["Add more transaction data to unlock clearer insights."]);
    } finally {
      setLoadingInsights(false);
    }
  }

  return (
    <div className="space-y-6">
      <BalanceCard balance={summary.balance} />
      <SummaryCards summary={summary} />
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <SpendingChart data={summary.monthly_chart || []} />
        <InsightsCard insights={insights} onRefresh={loadInsights} loading={loadingInsights} />
      </div>
      <RecentTransactions items={summary.recent_transactions || []} />
    </div>
  );
}