export type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
};

export const CATEGORIES = ["Burger", "Pizza", "Drinks", "Dessert", "Meals"] as const;

export const defaultMenu: MenuItem[] = [
  {
    id: 1,
    name: "Smash Cheeseburger",
    price: 199,
    category: "Burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
    description: "Double smashed beef patties, melted cheddar, pickles & house sauce.",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    price: 299,
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop",
    description: "San Marzano tomato, fresh mozzarella, basil, extra virgin olive oil.",
  },
  {
    id: 3,
    name: "Pepperoni Pizza",
    price: 349,
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop",
    description: "Crispy pepperoni cups, mozzarella, oregano, hand-tossed crust.",
  },
  {
    id: 4,
    name: "Crispy Chicken Burger",
    price: 229,
    category: "Burger",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&auto=format&fit=crop",
    description: "Buttermilk fried chicken, slaw, spicy mayo, brioche bun.",
  },
  {
    id: 5,
    name: "Iced Caramel Latte",
    price: 149,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop",
    description: "Cold brew espresso, milk and silky caramel over ice.",
  },
  {
    id: 6,
    name: "Fresh Lemonade",
    price: 99,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&auto=format&fit=crop",
    description: "Hand-squeezed lemons, mint, sparkling water.",
  },
  {
    id: 7,
    name: "Molten Chocolate Cake",
    price: 179,
    category: "Dessert",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop",
    description: "Warm dark chocolate cake with a gooey center & vanilla ice cream.",
  },
  {
    id: 8,
    name: "New York Cheesecake",
    price: 199,
    category: "Dessert",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop",
    description: "Classic baked cheesecake on a graham cracker crust, berry compote.",
  },
  {
    id: 9,
    name: "Grilled Chicken Bowl",
    price: 279,
    category: "Meals",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
    description: "Herb chicken, brown rice, roasted veg, tahini drizzle.",
  },
  {
    id: 10,
    name: "Steak & Fries",
    price: 499,
    category: "Meals",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop",
    description: "Sirloin steak, garlic butter, crispy hand-cut fries.",
  },
];
