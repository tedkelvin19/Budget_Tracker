import { useMemo, useState } from "react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Input from "../components/common/Input";
import SectionHeader from "../components/common/SectionHeader";
import StatCard from "../components/common/StatCard";

export default function LoansPage() {
  const [loans, setLoans] = useState([
    { id: 1, borrower_name: "Brian", amount_given: 5000, amount_repaid: 2000, due_date: "2026-04-15", notes: "Emergency help", status: "partial" },
  ]);
  const [form, setForm] = useState({ borrower_name: "", amount_given: "", amount_repaid: "0", due_date: "", notes: "" });

  const stats = useMemo(() => {
    const totalGiven = loans.reduce((sum, item) => sum + item.amount_given, 0);
    const totalRepaid = loans.reduce((sum, item) => sum + item.amount_repaid, 0);
    return { totalGiven, totalRepaid, outstanding: totalGiven - totalRepaid };
  }, [loans]);

  function submitLoan(e) {
    e.preventDefault();
    if (!form.borrower_name || !form.amount_given) return;
    const given = Number(form.amount_given);
    const repaid = Number(form.amount_repaid || 0);
    const status = repaid === 0 ? "pending" : repaid >= given ? "paid" : "partial";
    setLoans((prev) => [
      ...prev,
      { id: Date.now(), borrower_name: form.borrower_name, amount_given: given, amount_repaid: repaid, due_date: form.due_date, notes: form.notes, status },
    ]);
    setForm({ borrower_name: "", amount_given: "", amount_repaid: "0", due_date: "", notes: "" });
  }

  function deleteLoan(id) {
    setLoans((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Loans Given" subtitle="Track money lent out and repayment progress" />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Given" value={`KSh ${stats.totalGiven.toLocaleString("en-KE")}`} />
        <StatCard label="Repaid" value={`KSh ${stats.totalRepaid.toLocaleString("en-KE")}`} />
        <StatCard label="Outstanding" value={`KSh ${stats.outstanding.toLocaleString("en-KE")}`} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Card title="Add Loan Record" subtitle="Save details of money given out to someone">
          <form className="space-y-4" onSubmit={submitLoan}>
            <Input label="Borrower Name" value={form.borrower_name} onChange={(e) => setForm({ ...form, borrower_name: e.target.value })} />
            <Input label="Amount Given" type="number" value={form.amount_given} onChange={(e) => setForm({ ...form, amount_given: e.target.value })} />
            <Input label="Amount Repaid" type="number" value={form.amount_repaid} onChange={(e) => setForm({ ...form, amount_repaid: e.target.value })} />
            <Input label="Due Date" type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} />
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Notes</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows="3" className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white" />
            </div>
            <Button type="submit" className="w-full">Save Loan</Button>
          </form>
        </Card>
        <div>
          {loans.length === 0 ? (
            <EmptyState title="No loans recorded" description="Add a loan record to track repayments and cash still outstanding." />
          ) : (
            <div className="space-y-4">
              {loans.map((loan) => {
                const outstanding = loan.amount_given - loan.amount_repaid;
                const percent = loan.amount_given > 0 ? Math.min((loan.amount_repaid / loan.amount_given) * 100, 100) : 0;
                return (
                  <Card key={loan.id}>
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-lg font-bold text-white">{loan.borrower_name}</h3>
                          <span className="rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-[0.15em] text-slate-300">{loan.status}</span>
                        </div>
                        <div className="mt-2 text-sm text-slate-400">Due: {loan.due_date || "Not set"}</div>
                        <div className="mt-3 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3"><div className="text-xs text-slate-400">Given</div><div className="mt-1 font-bold text-white">KSh {loan.amount_given.toLocaleString("en-KE")}</div></div>
                          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3"><div className="text-xs text-slate-400">Repaid</div><div className="mt-1 font-bold text-white">KSh {loan.amount_repaid.toLocaleString("en-KE")}</div></div>
                          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3"><div className="text-xs text-slate-400">Outstanding</div><div className="mt-1 font-bold text-white">KSh {outstanding.toLocaleString("en-KE")}</div></div>
                        </div>
                        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800"><div className="h-full bg-sky-400" style={{ width: `${percent}%` }} /></div>
                        {loan.notes && <p className="mt-3 text-sm text-slate-400">{loan.notes}</p>}
                      </div>
                      <Button variant="danger" onClick={() => deleteLoan(loan.id)}>Delete</Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}