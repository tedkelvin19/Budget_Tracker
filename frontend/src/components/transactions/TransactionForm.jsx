import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const transactionSchema = z.object({
  title: z.string().min(2, "Title is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  type: z.enum(["expense", "income", "saving", "loan_given"]),
  category_id: z.string().min(1, "Select a category"),
  date: z.string().min(1, "Date is required"),
  note: z.string().optional(),
  payment_method: z.string().optional(),
  tags: z.string().optional(),
});

export default function TransactionForm({ categories = [], initialValues, onSubmit, submitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),
    values: initialValues || {
      title: "",
      amount: "",
      type: "expense",
      category_id: "",
      date: new Date().toISOString().split("T")[0],
      note: "",
      payment_method: "",
      tags: "",
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-300">Title</label>
        <input {...register("title")} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white" />
        {errors.title && <p className="mt-1 text-sm text-rose-400">{errors.title.message}</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">Amount</label>
          <input type="number" step="0.01" {...register("amount")} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white" />
          {errors.amount && <p className="mt-1 text-sm text-rose-400">{errors.amount.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">Type</label>
          <select {...register("type")} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="saving">Saving</option>
            <option value="loan_given">Loan Given</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">Category</label>
          <select {...register("category_id")} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white">
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          {errors.category_id && <p className="mt-1 text-sm text-rose-400">{errors.category_id.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">Date</label>
          <input type="date" {...register("date")} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-300">Note</label>
        <textarea {...register("note")} rows="3" className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">Payment Method</label>
          <input {...register("payment_method")} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white" placeholder="Cash, M-Pesa, Bank, Card" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">Tags</label>
          <input {...register("tags")} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white" placeholder="comma,separated,tags" />
        </div>
      </div>
      <button type="submit" disabled={submitting} className="w-full rounded-xl bg-emerald-400 px-4 py-3 font-bold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
        {submitting ? "Saving..." : "Save Transaction"}
      </button>
    </form>
  );
}