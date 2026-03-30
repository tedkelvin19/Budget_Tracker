import { useEffect, useState } from "react";
import { toast } from "sonner";
import { categoriesApi } from "../api/categories.api";
import { transactionsApi } from "../api/transactions.api";
import Card from "../components/common/Card";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionList from "../components/transactions/TransactionList";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    try {
      const [txRes, catRes] = await Promise.all([transactionsApi.list(), categoriesApi.list()]);
      setTransactions(Array.isArray(txRes.data) ? txRes.data : txRes.data.items || []);
      setCategories(Array.isArray(catRes.data) ? catRes.data : catRes.data.items || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }
  async function handleSubmit(values) {
    setSubmitting(true);
    try {
      const payload = {
        ...values,
        tags: values.tags ? values.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
      };

      if (editing) {
        await transactionsApi.update(editing.id, payload);
        toast.success("Transaction updated");
      } else {
        await transactionsApi.create(payload);
        toast.success("Transaction created");
      }

      setEditing(null);
      await loadAll();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.detail || "Failed to save transaction");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    try {
      await transactionsApi.remove(id);
      toast.success("Transaction deleted");
      await loadAll();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.detail || "Failed to delete transaction");
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <Card title={editing ? "Edit Transaction" : "Add Transaction"} subtitle="Track expenses, income, savings, and loans given">
        <TransactionForm
          categories={categories}
          initialValues={editing ? { ...editing, tags: (editing.tags || []).join(",") } : undefined}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </Card>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">All Transactions</h2>
          {editing && (
            <button onClick={() => setEditing(null)} className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800">Cancel Edit</button>
          )}
        </div>
        {loading ? <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">Loading transactions...</div> : <TransactionList items={transactions} onEdit={setEditing} onDelete={handleDelete} />}
      </div>
    </div>
  );
}

