import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronLeft, DollarSign, Package, AlertTriangle, Edit3, MapPin, TrendingUp, Search,
  ShoppingBag, Store, MessageCircle, CreditCard, Star, Filter,
} from "lucide-react";
import { toast } from "sonner";
import { useStore, type Produto } from "../lib/store";

export const Route = createFileRoute("/marketplace")({
  component: Marketplace,
});

const fmt = (n: number) => `${n.toLocaleString("pt-PT")} CVE`;

function Marketplace() {
  const [tab, setTab] = useState<"loja" | "parceira">("loja");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neon text-primary-foreground">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">PULSE Marketplace</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Cabo Verde</div>
            </div>
          </div>

          <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1 text-xs">
            <TabButton active={tab === "loja"} onClick={() => setTab("loja")}>
              <ShoppingBag className="h-3 w-3" /> Loja (Aluno)
            </TabButton>
            <TabButton active={tab === "parceira"} onClick={() => setTab("parceira")}>
              <Store className="h-3 w-3" /> Painel Parceiro
            </TabButton>
          </div>
        </div>
      </header>

      {tab === "loja" ? <ShopView /> : <PartnerView />}
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
        active ? "bg-neon text-primary-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

/* ------------------ SHOP (student-facing) ------------------ */

const produtos = [
  { id: 1, nome: "Creatina Monohidratada 300g", categoria: "Suplementos", loja: "Mindelo Fit Store", cidade: "São Vicente", preco: 4500, rating: 4.8, img: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=600&q=80", tag: "Mais vendido" },
  { id: 2, nome: "Whey Protein Isolado 900g", categoria: "Suplementos", loja: "Atlantic Nutrition", cidade: "Praia", preco: 8900, rating: 4.9, img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80", tag: "Novo" },
  { id: 3, nome: "Pré-treino Neon Burst 300g", categoria: "Suplementos", loja: "Mindelo Fit Store", cidade: "São Vicente", preco: 5200, rating: 4.6, img: "https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&w=600&q=80" },
  { id: 4, nome: "Luvas de Treino Premium", categoria: "Acessórios", loja: "Sal Sports Lab", cidade: "Sal", preco: 1800, rating: 4.5, img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80" },
  { id: 5, nome: "Shaker PULSE 700ml", categoria: "Acessórios", loja: "Atlantic Nutrition", cidade: "Praia", preco: 950, rating: 4.7, img: "https://images.unsplash.com/photo-1614102073832-030967418971?auto=format&fit=crop&w=600&q=80" },
  { id: 6, nome: "Faixa de Resistência (Kit 5)", categoria: "Acessórios", loja: "Sal Sports Lab", cidade: "Sal", preco: 3200, rating: 4.4, img: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80" },
  { id: 7, nome: "BCAA em Pó 250g", categoria: "Suplementos", loja: "Atlantic Nutrition", cidade: "Praia", preco: 3800, rating: 4.3, img: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?auto=format&fit=crop&w=600&q=80" },
  { id: 8, nome: "Cinta Lombar Profissional", categoria: "Acessórios", loja: "Mindelo Fit Store", cidade: "São Vicente", preco: 2400, rating: 4.6, img: "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?auto=format&fit=crop&w=600&q=80" },
];

const categorias = ["Tudo", "Suplementos", "Acessórios", "Equipamento", "Roupa"];

function ShopView() {
  const [cat, setCat] = useState("Tudo");
  const [search, setSearch] = useState("");

  const produtosFiltrados = produtos.filter((p) => {
    const matchCat = cat === "Tudo" || p.categoria === cat;
    const matchSearch = p.nome.toLowerCase().includes(search.toLowerCase()) || p.loja.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-border">
        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80" alt="Marketplace" className="h-44 w-full object-cover sm:h-56" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Lojas locais. <span className="neon-text">Entrega rápida.</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Suplementos e artigos esportivos de parceiros em Mindelo, Praia e Sal.
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Procurar produtos, lojas..."
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-3 text-sm outline-none focus:border-neon"
          />
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm">
          <Filter className="h-4 w-4" /> Filtros
        </button>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {categorias.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-xs transition ${
              cat === c
                ? "border-neon bg-neon/10 text-neon"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {produtosFiltrados.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            Nenhum produto encontrado para "{search}".
          </div>
        ) : (
          produtosFiltrados.map((p) => (
            <article key={p.id} className="group flex flex-col rounded-2xl border border-border bg-card p-4 transition hover:border-neon/40">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-surface to-surface-2">
              <img src={p.img} alt={p.nome} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              {p.tag && (
                <span className="absolute left-2 top-2 rounded-full bg-neon px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  {p.tag}
                </span>
              )}
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
              <Store className="h-3 w-3" /> {p.loja} · {p.cidade}
            </div>
            <h3 className="mt-1 line-clamp-2 text-sm font-semibold">{p.nome}</h3>
            <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-neon text-neon" /> {p.rating}
            </div>
            <div className="mt-3 text-xl font-bold neon-text">{fmt(p.preco)}</div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-1 rounded-lg bg-neon py-2 text-xs font-semibold text-primary-foreground transition hover:brightness-110">
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </button>
              <button className="flex items-center justify-center gap-1 rounded-lg border border-neon-blue/40 bg-neon-blue/10 py-2 text-xs font-semibold text-neon-blue">
                <CreditCard className="h-3.5 w-3.5" /> Pagar
              </button>
            </div>
          </article>
        )))}
      </div>

      <div className="mt-10 rounded-2xl border border-neon/30 bg-card p-6 neon-glow">
        <h3 className="text-lg font-semibold">És uma loja em Cabo Verde?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Vende para milhares de atletas registados no PULSE. Sem mensalidade — só comissão por venda.
        </p>
        <button className="mt-4 rounded-xl bg-neon px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          Tornar-me parceiro
        </button>
      </div>
    </main>
  );
}

/* ------------------ PARTNER PANEL ------------------ */

// const inventario = [
//   { id: 1, name: "Whey Protein Isolado 900g", price: 8900, stock: 42, img: "💪" },
//   ...
// ];

const pedidos = [
  { id: "#10482", buyer: "Marina Sousa", city: "Mindelo, SV", status: "Enviado" },
  { id: "#10481", buyer: "Diego Ferraz", city: "Praia, ST", status: "Em processamento" },
  { id: "#10480", buyer: "Ana Beatriz", city: "Espargos, SL", status: "Entregue" },
  { id: "#10479", buyer: "Lucas Tavares", city: "Assomada, ST", status: "Pendente" },
  { id: "#10478", buyer: "Pedro Henrique", city: "São Filipe, FG", status: "Enviado" },
];

function PartnerView() {
  const { inventario, addProduto } = useStore();
  
  const handleNovoProduto = () => {
    addProduto({ id: Date.now(), name: "Novo Suplemento Teste", price: 2500, stock: 10, img: "📦" });
    toast.success("Produto adicionado!", { description: "Novo produto disponível no inventário." });
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Loja parceira</div>
        <h1 className="text-3xl font-bold sm:text-4xl">Mindelo Fit Store</h1>
        <p className="text-sm text-muted-foreground">Suplementos & acessórios · São Vicente</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Kpi icon={DollarSign} label="Faturação total" value={fmt(482_900)} delta="+12.4%" tone="neon" />
        <Kpi icon={Package} label="Pedidos pendentes" value="23" delta="+5 hoje" tone="blue" />
        <Kpi icon={AlertTriangle} label="Stock baixo" value="4" delta="Ação necessária" tone="warn" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="rounded-2xl border border-border bg-card">
          <header className="flex items-center justify-between border-b border-border p-5">
            <div>
              <h2 className="text-lg font-semibold">Inventário</h2>
              <p className="text-xs text-muted-foreground">{inventario.length} produtos</p>
            </div>
            <button 
              onClick={handleNovoProduto}
              className="rounded-lg bg-neon px-4 py-2 text-sm font-semibold text-primary-foreground neon-glow"
            >
              + Novo produto
            </button>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Produto</th>
                  <th className="px-5 py-3 font-medium">Preço</th>
                  <th className="px-5 py-3 font-medium">Stock</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {inventario.map((p) => (
                  <tr key={p.id} className="border-t border-border/60 transition hover:bg-surface/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-xl">
                          {p.img}
                        </div>
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-semibold">{fmt(p.price)}</td>
                    <td className="px-5 py-3">
                      <StockBadge stock={p.stock} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button 
                        onClick={() => toast("A abrir editor de produto...")}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:border-neon hover:text-neon"
                      >
                        <Edit3 className="h-3 w-3" /> Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Pedidos recentes</h2>
            <button className="text-xs text-neon-blue hover:underline">Ver tudo</button>
          </div>
          <ul className="space-y-3">
            {pedidos.map((o) => (
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
    </main>
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
          <div className="mt-2 text-2xl font-bold">{value}</div>
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
    return <span className="rounded-full border border-destructive/40 bg-destructive/10 px-2 py-0.5 text-xs text-destructive">Esgotado</span>;
  if (stock < 10)
    return <span className="rounded-full border border-yellow-500/40 bg-yellow-500/10 px-2 py-0.5 text-xs text-yellow-400">Baixo · {stock}</span>;
  return <span className="rounded-full border border-neon/40 bg-neon/10 px-2 py-0.5 text-xs text-neon">{stock} em stock</span>;
}

function OrderStatus({ status }: { status: string }) {
  const map: Record<string, string> = {
    Entregue: "border-neon/40 bg-neon/10 text-neon",
    Enviado: "border-neon-blue/40 bg-neon-blue/10 text-neon-blue",
    "Em processamento": "border-yellow-500/40 bg-yellow-500/10 text-yellow-400",
    Pendente: "border-border bg-surface-2 text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs ${map[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" /> {status}
    </span>
  );
}
