import StandardCalculator from "../components/calculators/StandardCalculator";
import SavingsGoalCalculator from "../components/calculators/SavingsGoalCalculator";
import BudgetCalculator from "../components/calculators/BudgetCalculator";
import LoanCalculator from "../components/calculators/LoanCalculator";
import SectionHeader from "../components/common/SectionHeader";

export default function CalculatorsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Calculators" subtitle="Quick tools for everyday financial planning" />
      <div className="grid gap-6 xl:grid-cols-2">
        <StandardCalculator />
        <SavingsGoalCalculator />
        <BudgetCalculator />
        <LoanCalculator />
      </div>
    </div>
  );
}