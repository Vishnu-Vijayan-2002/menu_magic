import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shield } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useMenu } from "@/context/MenuContext";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — FoodieHub" },
      { name: "description", content: "Admin sign-in for FoodieHub menu management." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useMenu();
  const navigate = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(u, p)) {
      toast.success("Welcome back, Admin");
      navigate({ to: "/admin" });
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto flex items-center justify-center px-4 py-20">
        <form
          onSubmit={submit}
          className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-card"
        >
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
              <Shield className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">Admin Login</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Use <span className="font-mono text-foreground">admin</span> /{" "}
              <span className="font-mono text-foreground">1234</span>
            </p>
          </div>

          <label className="block text-sm font-medium">Username</label>
          <input
            value={u}
            onChange={(e) => setU(e.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="admin"
          />
          <label className="mt-4 block text-sm font-medium">Password</label>
          <input
            type="password"
            value={p}
            onChange={(e) => setP(e.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="••••"
          />
          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-gradient-primary py-3 font-semibold text-primary-foreground shadow-glow transition-smooth hover:scale-[1.02]"
          >
            Sign In
          </button>
        </form>
      </main>
    </div>
  );
}
