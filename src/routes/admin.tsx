import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutDashboard, Plus, LogOut, Pencil, Trash2, Package } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useMenu } from "@/context/MenuContext";
import { CATEGORIES, type MenuItem } from "@/data/menuData";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — FoodieHub" },
      { name: "description", content: "Manage FoodieHub menu items." },
    ],
  }),
  component: AdminPage,
});

type FormState = {
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
};

const empty: FormState = {
  name: "",
  price: "",
  category: CATEGORIES[0],
  image: "",
  description: "",
};

function AdminPage() {
  const { isAdmin, menu, addItem, updateItem, deleteItem, logout } = useMenu();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(empty);
  const [editingId, setEditingId] = useState<number | null>(null);

  if (!isAdmin) return <Navigate to="/login" />;

  const onChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    const payload = {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      image:
        form.image ||
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop",
      description: form.description || "Delicious dish from our kitchen.",
    };
    if (editingId !== null) {
      updateItem(editingId, payload);
      toast.success("Item updated");
    } else {
      addItem(payload);
      toast.success("Item added");
    }
    setForm(empty);
    setEditingId(null);
  };

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      price: String(item.price),
      category: item.category,
      image: item.image,
      description: item.description,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="grid lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-border bg-card p-6 lg:block">
          <div className="mb-8 flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <span className="font-bold">Dashboard</span>
          </div>
          <nav className="space-y-1 text-sm">
            <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 font-medium">
              <Package className="h-4 w-4" /> Manage Menu
            </div>
          </nav>
          <button
            onClick={() => {
              logout();
              toast.success("Logged out");
              navigate({ to: "/" });
            }}
            className="mt-8 flex w-full items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-smooth hover:text-destructive"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </aside>

        <main className="container mx-auto px-4 py-10">
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Stat label="Total Items" value={menu.length} />
            <Stat label="Categories" value={new Set(menu.map((m) => m.category)).size} />
            <Stat
              label="Avg. Price"
              value={`₹${Math.round(menu.reduce((s, m) => s + m.price, 0) / Math.max(menu.length, 1))}`}
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <div className="flex items-center justify-between border-b border-border p-5">
                <h2 className="text-lg font-bold">Menu Items</h2>
                <span className="text-sm text-muted-foreground">{menu.length} total</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Item</th>
                      <th className="px-5 py-3">Category</th>
                      <th className="px-5 py-3">Price</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menu.map((item) => (
                      <tr key={item.id} className="border-t border-border">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-10 w-10 rounded-lg object-cover"
                              loading="lazy"
                            />
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-muted-foreground">{item.category}</td>
                        <td className="px-5 py-3 font-semibold text-primary">₹{item.price}</td>
                        <td className="px-5 py-3">
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() => startEdit(item)}
                              className="rounded-md p-2 text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground"
                              aria-label="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                deleteItem(item.id);
                                toast.success("Item deleted");
                              }}
                              className="rounded-md p-2 text-muted-foreground transition-smooth hover:bg-destructive/10 hover:text-destructive"
                              aria-label="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <form
              onSubmit={submit}
              className="h-fit space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">
                  {editingId !== null ? "Edit Item" : "Add New Item"}
                </h2>
              </div>

              <Field label="Name">
                <input
                  value={form.name}
                  onChange={onChange("name")}
                  className="input"
                  placeholder="e.g. Margherita Pizza"
                />
              </Field>
              <Field label="Price (₹)">
                <input
                  type="number"
                  value={form.price}
                  onChange={onChange("price")}
                  className="input"
                  placeholder="299"
                />
              </Field>
              <Field label="Category">
                <select value={form.category} onChange={onChange("category")} className="input">
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Image URL">
                <input
                  value={form.image}
                  onChange={onChange("image")}
                  className="input"
                  placeholder="https://..."
                />
              </Field>
              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={onChange("description")}
                  rows={3}
                  className="input resize-none"
                  placeholder="Short description..."
                />
              </Field>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-gradient-primary py-2.5 font-semibold text-primary-foreground shadow-glow transition-smooth hover:scale-[1.02]"
                >
                  {editingId !== null ? "Update" : "Add Item"}
                </button>
                {editingId !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setForm(empty);
                    }}
                    className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-secondary"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </main>
      </div>

      <style>{`
        .input {
          width: 100%;
          height: 2.5rem;
          padding: 0 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          outline: none;
          transition: all .2s;
        }
        textarea.input { height: auto; padding: .5rem .75rem; }
        .input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 20%, transparent); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-3xl font-bold text-primary">{value}</p>
    </div>
  );
}
