import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, DollarSign, Package, AlertTriangle, Edit3, MapPin, TrendingUp, Search } from "lucide-react";

export const Route = createFileRoute("/partner")({
  component: PartnerDashboard,
});

const products = [
  { id: 1, name: "Whey Protein Isolate 900g", price: "R$ 189,90", stock: 42, img: "💪" },
  { id: 2, name: "Creatine Monohydrate 300g", price: "R$ 119,00", stock: 4, img: "⚡" },
  { id: 3, name: "Pre-Workout Neon Burst", price: "R$ 149,90", stock: 18, img: "🔥" },
  { id: 4, name: "BCAA Powder 250g", price: "R$ 89,90", stock: 0, img: "🧬" },
  { id: 5, name: "Shaker Pulse 700ml", price: "R$ 49,90", stock: 120, img: "🥤" },
  { id: 6, name: "Resistance Band Set", price: "R$ 99,00", stock: 7, img: "🎯" },
];

const orders = [
  { id: "#10482", buyer: "Marina Souza", city: "São Paulo, SP", status: "Shipped" },
  { id: "#10481", buyer: "Diego Ferraz", city: "Rio de Janeiro, RJ", status: "Processing" },
  { id: "#10480", buyer: "Ana Beatriz", city: "Belo Horizonte, MG", status: "Delivered" },
  { id: "#10479", buyer: "Lucas Tavares", city: "Curitiba, PR", status: "Pending" },
  { id: "#10478", buyer: "Pedro Henrique", city: "Porto Alegre, RS", status: "Shipped" },
];

function PartnerDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link to="/" className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-3 w-3" /> Back
            </Link>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Marketplace<span className="neon-text">.</span>
            </h1>
            <p className="text-sm text-muted-foreground">Iron Forge Supplements · Partner store</p>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search products, orders..."
                className="w-72 rounded-xl border border-border bg-card py-2.5 pl-10 pr-3 text-sm outline-none focus:border-neon"
              />
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Kpi
            icon={DollarSign}
            label="Total revenue"
            value="R$ 48.290"
            delta="+12.4%"
            tone="neon"
          />
          <Kpi
            icon={Package}
            label="Pending orders"
            value="23"
            delta="+5 today"
            tone="blue"
          />
          <Kpi
            icon={AlertTriangle}
            label="Low stock"
            value="4"
            delta="Action required"
            tone="warn"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Inventory */}
          <section className="rounded-2xl border border-border bg-card">
            <header className="flex items-center justify-between border-b border-border p-5">
              <div>
                <h2 className="text-lg font-semibold">Inventory</h2>
                <p className="text-xs text-muted-foreground">{products.length} products</p>
              </div>
              <button className="rounded-lg bg-neon px-4 py-2 text-sm font-semibold text-primary-foreground neon-glow">
                + New product
              </button>
            </header>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Product</th>
                    <th className="px-5 py-3 font-medium">Price</th>
                    <th className="px-5 py-3 font-medium">Stock</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t border-border/60 transition hover:bg-surface/50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-xl">
                            {p.img}
                          </div>
                          <span className="font-medium">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 font-semibold">{p.price}</td>
                      <td className="px-5 py-3">
                        <StockBadge stock={p.stock} />
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:border-neon hover:text-neon">
                          <Edit3 className="h-3 w-3" /> Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Orders */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent orders</h2>
              <button className="text-xs text-neon-blue hover:underline">View all</button>
            </div>
            <ul className="space-y-3">
              {orders.map((o) => (
                <li key={o.id} className="rounded-xl border border-border bg-surface/40 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">{o.buyer}</div>
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {o.city}
                      </div>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{o.id}</span>
                  </div>
                  <div className="mt-2">
                    <OrderStatus status={o.status} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function Kpi({
  icon: Icon, label, value, delta, tone,
}: {
  icon: typeof DollarSign; label: string; value: string; delta: string;
  tone: "neon" | "blue" | "warn";
}) {
  const toneClass =
    tone === "neon" ? "text-neon border-neon/40 bg-neon/10"
    : tone === "blue" ? "text-neon-blue border-neon-blue/40 bg-neon-blue/10"
    : "text-destructive border-destructive/40 bg-destructive/10";
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-2 text-3xl font-bold">{value}</div>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3" /> {delta}
          </div>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${toneClass}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0)
    return <span className="rounded-full border border-destructive/40 bg-destructive/10 px-2 py-0.5 text-xs text-destructive">Out</span>;
  if (stock < 10)
    return <span className="rounded-full border border-yellow-500/40 bg-yellow-500/10 px-2 py-0.5 text-xs text-yellow-400">Low · {stock}</span>;
  return <span className="rounded-full border border-neon/40 bg-neon/10 px-2 py-0.5 text-xs text-neon">{stock} in stock</span>;
}

function OrderStatus({ status }: { status: string }) {
  const map: Record<string, string> = {
    Delivered: "border-neon/40 bg-neon/10 text-neon",
    Shipped: "border-neon-blue/40 bg-neon-blue/10 text-neon-blue",
    Processing: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400",
    Pending: "border-border bg-surface-2 text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs ${map[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" /> {status}
    </span>
  );
}
