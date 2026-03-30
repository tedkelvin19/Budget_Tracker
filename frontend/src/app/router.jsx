import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import DashboardPage from "../pages/DashboardPage";
import TransactionsPage from "../pages/TransactionsPage";
import CategoriesPage from "../pages/CategoriesPage";
import BudgetsPage from "../pages/BudgetsPage";
import LoansPage from "../pages/LoansPage";
import SavingsPage from "../pages/SavingsPage";
import ReportsPage from "../pages/ReportsPage";
import AIInsightsPage from "../pages/AIInsightsPage";
import CalculatorsPage from "../pages/CalculatorsPage";
import SettingsPage from "../pages/SettingsPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="budgets" element={<BudgetsPage />} />
        <Route path="loans" element={<LoansPage />} />
        <Route path="savings" element={<SavingsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="ai" element={<AIInsightsPage />} />
        <Route path="calculators" element={<CalculatorsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}