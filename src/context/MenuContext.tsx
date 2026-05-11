import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultMenu, type MenuItem } from "@/data/menuData";

export type CartItem = MenuItem & { qty: number };

type MenuContextValue = {
  menu: MenuItem[];
  cart: CartItem[];
  isAdmin: boolean;
  addItem: (item: Omit<MenuItem, "id">) => void;
  updateItem: (id: number, patch: Partial<MenuItem>) => void;
  deleteItem: (id: number) => void;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  changeQty: (id: number, qty: number) => void;
  clearCart: () => void;
  login: (u: string, p: string) => boolean;
  logout: () => void;
};

const MenuContext = createContext<MenuContextValue | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<MenuItem[]>(defaultMenu);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setMenu(read<MenuItem[]>("menu", defaultMenu));
    setCart(read<CartItem[]>("cart", []));
    setIsAdmin(read<boolean>("admin", false));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("menu", JSON.stringify(menu));
  }, [menu, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem("admin", JSON.stringify(isAdmin));
  }, [isAdmin, hydrated]);

  const value: MenuContextValue = useMemo(
    () => ({
      menu,
      cart,
      isAdmin,
      addItem: (item) => setMenu((m) => [...m, { ...item, id: Date.now() }]),
      updateItem: (id, patch) =>
        setMenu((m) => m.map((it) => (it.id === id ? { ...it, ...patch } : it))),
      deleteItem: (id) => setMenu((m) => m.filter((it) => it.id !== id)),
      addToCart: (item) =>
        setCart((c) => {
          const found = c.find((x) => x.id === item.id);
          if (found) return c.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x));
          return [...c, { ...item, qty: 1 }];
        }),
      removeFromCart: (id) => setCart((c) => c.filter((x) => x.id !== id)),
      changeQty: (id, qty) =>
        setCart((c) =>
          qty <= 0
            ? c.filter((x) => x.id !== id)
            : c.map((x) => (x.id === id ? { ...x, qty } : x)),
        ),
      clearCart: () => setCart([]),
      login: (u, p) => {
        if (u === "admin" && p === "1234") {
          setIsAdmin(true);
          return true;
        }
        return false;
      },
      logout: () => setIsAdmin(false),
    }),
    [menu, cart, isAdmin],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used within MenuProvider");
  return ctx;
}
