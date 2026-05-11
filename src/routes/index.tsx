import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MenuCard } from "@/components/MenuCard";
import { MenuFilters } from "@/components/MenuFilters";
import { useMenu } from "@/context/MenuContext";

export const Route = createFileRoute("/")({
  component: Home,
});


function Home() {
  const { menu } = useMenu();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const ceiling = useMemo(
    () => Math.max(500, ...menu.map((m) => m.price)),
    [menu],
  );
  const [maxPrice, setMaxPrice] = useState(ceiling);

  const items = useMemo(
    () =>
      menu.filter(
        (m) =>
          (category === "All" || m.category === category) &&
          m.price <= maxPrice &&
          m.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [menu, search, category, maxPrice],
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <main id="menu" className="container mx-auto px-4 py-16">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight">Today's Menu</h2>
          <p className="mt-2 text-muted-foreground">
            Hand-picked dishes from our kitchen — search, filter and order what you love.
          </p>
        </div>

        <MenuFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          priceCeiling={ceiling}
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((it) => (
            <MenuCard key={it.id} item={it} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="mt-20 text-center text-muted-foreground">
            No dishes match your filters. Try widening your search.
          </div>
        )}
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} FoodieHub — Crafted with love.
      </footer>
    </div>
  );
}
