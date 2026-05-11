import { Search } from "lucide-react";
import { CATEGORIES } from "@/data/menuData";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
  priceCeiling: number;
};

export function MenuFilters({
  search,
  setSearch,
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
  priceCeiling,
}: Props) {
  return (
    <div className="space-y-5">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for burgers, pizza, desserts..."
          className="h-14 w-full rounded-full border border-border bg-card pl-12 pr-5 text-base shadow-card outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-smooth ${
              category === c
                ? "border-transparent bg-gradient-primary text-primary-foreground shadow-glow"
                : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
        <div className="mb-2 flex items-center justify-between text-sm">
          <label htmlFor="price" className="font-medium text-foreground">
            Max price
          </label>
          <span className="font-bold text-primary">₹{maxPrice}</span>
        </div>
        <input
          id="price"
          type="range"
          min={50}
          max={priceCeiling}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[var(--primary)]"
        />
      </div>
    </div>
  );
}
