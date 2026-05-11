import { Link } from "@tanstack/react-router";
import { ShoppingBag, UtensilsCrossed, Shield } from "lucide-react";
import { useMenu } from "@/context/MenuContext";

export function Navbar() {
  const { cart, isAdmin } = useMenu();
  const count = cart.reduce((s, x) => s + x.qty, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Foodie<span className="text-primary">Hub</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/"
            activeProps={{ className: "bg-secondary text-foreground" }}
            activeOptions={{ exact: true }}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
          >
            Menu
          </Link>
          <Link
            to="/cart"
            activeProps={{ className: "bg-secondary text-foreground" }}
            className="relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
          >
            <span className="hidden sm:inline">Cart</span>
            <ShoppingBag className="inline h-4 w-4 sm:ml-1" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <Link
            to={isAdmin ? "/admin" : "/login"}
            className="ml-1 inline-flex items-center gap-1.5 rounded-md bg-gradient-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-smooth hover:opacity-90"
          >
            <Shield className="h-4 w-4" />
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
