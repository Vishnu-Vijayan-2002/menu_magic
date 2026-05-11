import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useMenu } from "@/context/MenuContext";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — FoodieHub" },
      { name: "description", content: "Review your FoodieHub cart and checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, changeQty, removeFromCart, clearCart } = useMenu();
  const subtotal = cart.reduce((s, x) => s + x.price * x.qty, 0);
  const delivery = subtotal > 0 ? 49 : 0;
  const total = subtotal + delivery;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold tracking-tight">Your Cart</h1>
        <p className="mt-2 text-muted-foreground">
          {cart.length} {cart.length === 1 ? "item" : "items"} ready to enjoy
        </p>

        {cart.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
            <p className="mt-1 text-muted-foreground">Add some delicious items to get started.</p>
            <Link
              to="/"
              className="mt-6 rounded-full bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow transition-smooth hover:scale-105"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-card"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground transition-smooth hover:text-destructive"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
                        <button
                          onClick={() => changeQty(item.id, item.qty - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-secondary"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                        <button
                          onClick={() => changeQty(item.id, item.qty + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-secondary"
                          aria-label="Increase"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-bold text-primary">₹{item.price * item.qty}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-lg font-bold">Order Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>₹{subtotal}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Delivery</dt>
                  <dd>₹{delivery}</dd>
                </div>
                <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-bold">
                  <dt>Total</dt>
                  <dd className="text-primary">₹{total}</dd>
                </div>
              </dl>
              <button
                onClick={() => {
                  toast.success("Order placed! 🎉");
                  clearCart();
                }}
                className="mt-6 w-full rounded-full bg-gradient-primary py-3 font-semibold text-primary-foreground shadow-glow transition-smooth hover:scale-[1.02]"
              >
                Checkout
              </button>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
