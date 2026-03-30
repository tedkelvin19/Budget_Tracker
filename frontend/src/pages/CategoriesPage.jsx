import { useEffect, useState } from "react";
import { categoriesApi } from "../api/categories.api";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Input from "../components/common/Input";
import SectionHeader from "../components/common/SectionHeader";

const initialForm = { name: "", type: "expense", icon: "", color: "#22c55e" };

export default function CategoriesPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    setLoading(true);
    try {
      const { data } = await categoriesApi.list();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await categoriesApi.update(editingId, form);
        toast.success("Category updated");
      } else {
        await categoriesApi.create(form);
        toast.success("Category created");
      }
      setForm(initialForm);
      setEditingId(null);
      await loadCategories();
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Failed to save category");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id, isDefault) {
    if (isDefault) {
      toast.error("Default categories cannot be deleted");
      return;
    }
    try {
      await categoriesApi.remove(id);
      toast.success("Category deleted");
      await loadCategories();
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Failed to delete category");
    }
  }
  function startEdit(item) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      type: item.type,
      icon: item.icon || "",
      color: item.color || "#22c55e",
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <Card title={editingId ? "Edit Category" : "Create Category"} subtitle="Manage custom spending and income categories">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
              <option value="saving">Saving</option>
              <option value="loan_given">Loan Given</option>
            </select>
          </div>
          <Input label="Icon" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="utensils, bus, coins" />
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Color</label>
            <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900 p-2" />
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={saving} className="flex-1">{saving ? "Saving..." : editingId ? "Update Category" : "Create Category"}</Button>
            {editingId && (
              <Button variant="secondary" onClick={() => { setEditingId(null); setForm(initialForm); }}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>
      <div>
        <SectionHeader title="Categories" subtitle="Default and custom categories for your account" />
        {loading ? (
          <Card><div className="text-slate-300">Loading categories...</div></Card>
        ) : items.length === 0 ? (
          <EmptyState title="No categories yet" description="Create your first category to organize transactions." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <Card key={item.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color || "#22c55e" }} />
                      <h3 className="text-lg font-bold text-white">{item.name}</h3>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{item.type} {item.is_default ? "• default" : "• custom"}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" className="px-3 py-2" onClick={() => startEdit(item)}>Edit</Button>
                    <Button variant="danger" className="px-3 py-2" onClick={() => handleDelete(item.id, item.is_default)}>Delete</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
