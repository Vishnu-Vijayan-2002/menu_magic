import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Plus,
  LogOut,
  Pencil,
  Trash2,
  Package,
  X,
  Check,
  ImageIcon,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useMenu } from "@/context/MenuContext";
import { CATEGORIES, type MenuItem } from "@/data/menuData";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
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
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  if (!isAdmin) return <Navigate to="/login" />;

  const onChange =
    (k: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category,
      image:
        form.image.trim() ||
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop",
      description: form.description.trim() || "Delicious dish from our kitchen.",
    };
    if (editingId !== null) {
      updateItem(editingId, payload);
      toast.success(`"${payload.name}" updated!`);
      setEditingId(null);
    } else {
      addItem(payload);
      toast.success(`"${payload.name}" added to menu!`);
      setShowAddForm(false);
    }
    setForm(empty);
  };

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setShowAddForm(false);
    setForm({
      name: item.name,
      price: String(item.price),
      category: item.category,
      image: item.image,
      description: item.description,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(empty);
  };

  const cancelAdd = () => {
    setShowAddForm(false);
    setForm(empty);
  };

  const confirmDelete = (id: number) => {
    const item = menu.find((m) => m.id === id);
    deleteItem(id);
    setDeleteConfirm(null);
    if (editingId === id) cancelEdit();
    toast.success(`"${item?.name}" removed from menu`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="grid lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="hidden border-r border-border bg-card p-6 lg:flex lg:flex-col">
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
            className="mt-auto flex w-full items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-smooth hover:text-destructive"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </aside>

        <main className="container mx-auto px-4 py-10">
          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Stat label="Total Items" value={menu.length} />
            <Stat
              label="Categories"
              value={new Set(menu.map((m) => m.category)).size}
            />
            <Stat
              label="Avg. Price"
              value={`₹${Math.round(
                menu.reduce((s, m) => s + m.price, 0) / Math.max(menu.length, 1)
              )}`}
            />
          </div>

          {/* Table card */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2 className="text-lg font-bold">Menu Items</h2>
                <p className="text-xs text-muted-foreground">
                  {menu.length} items · click ✏️ to edit inline
                </p>
              </div>
              <button
                id="add-item-btn"
                onClick={() => {
                  setShowAddForm((v) => !v);
                  setEditingId(null);
                  setForm(empty);
                }}
                className="flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-smooth hover:scale-[1.03] hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </button>
            </div>

            {/* Add-item inline form */}
            {showAddForm && (
              <div className="border-b border-border bg-secondary/40 px-5 py-5">
                <p className="mb-3 text-sm font-semibold text-primary">
                  ＋ New Menu Item
                </p>
                <ItemForm
                  form={form}
                  onChange={onChange}
                  onSubmit={submit}
                  onCancel={cancelAdd}
                  submitLabel="Add to Menu"
                />
              </div>
            )}

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
                    <>
                      <tr
                        key={item.id}
                        className={`border-t border-border transition-colors ${
                          editingId === item.id
                            ? "bg-primary/5"
                            : "hover:bg-secondary/40"
                        }`}
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-10 w-10 rounded-lg object-cover ring-1 ring-border"
                              loading="lazy"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop";
                              }}
                            />
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="line-clamp-1 max-w-[200px] text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-5 py-3 font-semibold text-primary">
                          ₹{item.price}
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex justify-end gap-1">
                            <button
                              id={`edit-btn-${item.id}`}
                              onClick={() =>
                                editingId === item.id
                                  ? cancelEdit()
                                  : startEdit(item)
                              }
                              className={`rounded-md p-2 transition-smooth ${
                                editingId === item.id
                                  ? "bg-primary/10 text-primary"
                                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                              }`}
                              aria-label={
                                editingId === item.id ? "Cancel edit" : "Edit"
                              }
                            >
                              {editingId === item.id ? (
                                <X className="h-4 w-4" />
                              ) : (
                                <Pencil className="h-4 w-4" />
                              )}
                            </button>
                            {deleteConfirm === item.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => confirmDelete(item.id)}
                                  className="rounded-md bg-destructive/10 p-2 text-destructive transition-smooth hover:bg-destructive hover:text-white"
                                  aria-label="Confirm delete"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="rounded-md p-2 text-muted-foreground transition-smooth hover:bg-secondary"
                                  aria-label="Cancel delete"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <button
                                id={`delete-btn-${item.id}`}
                                onClick={() => setDeleteConfirm(item.id)}
                                className="rounded-md p-2 text-muted-foreground transition-smooth hover:bg-destructive/10 hover:text-destructive"
                                aria-label="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* Inline edit row */}
                      {editingId === item.id && (
                        <tr
                          key={`edit-${item.id}`}
                          className="border-t border-primary/20 bg-primary/5"
                        >
                          <td colSpan={4} className="px-5 py-5">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary">
                              Editing: {item.name}
                            </p>
                            <ItemForm
                              form={form}
                              onChange={onChange}
                              onSubmit={submit}
                              onCancel={cancelEdit}
                              submitLabel="Save Changes"
                            />
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
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
          font-size: 0.875rem;
          transition: all .2s;
        }
        textarea.input { height: auto; padding: .5rem .75rem; }
        .input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 20%, transparent);
        }
      `}</style>
    </div>
  );
}

/* ── Reusable inline form ─────────────────────────────────────── */
function ItemForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  submitLabel,
}: {
  form: FormState;
  onChange: (
    k: keyof FormState
  ) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  submitLabel: string;
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <Field label="Name">
          <input
            value={form.name}
            onChange={onChange("name")}
            className="input"
            placeholder="e.g. Margherita Pizza"
            required
          />
        </Field>
        <Field label="Price (₹)">
          <input
            type="number"
            min="1"
            value={form.price}
            onChange={onChange("price")}
            className="input"
            placeholder="299"
            required
          />
        </Field>
        <Field label="Category">
          <select
            value={form.category}
            onChange={onChange("category")}
            className="input"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Image URL">
          <div className="relative">
            <ImageIcon className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={form.image}
              onChange={onChange("image")}
              className="input pl-8"
              placeholder="https://..."
            />
          </div>
        </Field>
        <Field label="Description">
          <input
            value={form.description}
            onChange={onChange("description")}
            className="input"
            placeholder="Short description..."
          />
        </Field>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="flex items-center gap-1.5 rounded-lg bg-gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-smooth hover:scale-[1.02]"
        >
          <Check className="h-4 w-4" />
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1.5 rounded-lg border border-border px-5 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ── Helpers ──────────────────────────────────────────────────── */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
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
