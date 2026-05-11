import { Plus } from "lucide-react";
import type { MenuItem } from "@/data/menuData";
import { useMenu } from "@/context/MenuContext";
import { toast } from "sonner";

export function MenuCard({ item }: { item: MenuItem }) {
  const { addToCart } = useMenu();

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-glow">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-smooth group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
          {item.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-card-foreground">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-primary">₹{item.price}</span>
          <button
            onClick={() => {
              addToCart(item);
              toast.success(`${item.name} added to cart`);
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-smooth hover:scale-105"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
