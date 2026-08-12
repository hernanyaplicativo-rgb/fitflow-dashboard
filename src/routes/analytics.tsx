import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronLeft, TrendingUp, TrendingDown, Users, Wallet, UserMinus,
  Clock, ShoppingBag, Download, Target, AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/analytics")({
  component: Analytics,
  head: () => ({
    meta: [
      { title: "Analytics do Ginásio · Mindelo Gym" },
      { name: "description", content: "Receita, retenção, churn, frequência por horário e produtos mais vendidos do teu ginásio, em CVE." },
      { property: "og:title", content: "Analytics do Ginásio · Mindelo Gym" },
      { property: "og:description", content: "Relatórios avançados para donos: receita, retenção, churn e horas de pico." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const fmtCVE = (n: number) => `${n.toLocaleString("pt-PT")} CVE`;

const receitaMeses = [
  { m: "Mai", v: 1_240_000 }, { m: "Jun", v: 1_420_000 }, { m: "Jul", v: 1_360_000 },
  { m: "Ago", v: 1_680_000 }, { m: "Set", v: 1_580_000 }, { m: "Out", v: 1_842_000 },
];

const retencao = [100, 92, 84, 78, 71, 68];

const heat = {
  dias: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  horas: ["06h", "08h", "10h", "12h", "17h", "19h", "21h"],
  dados: [
    [42, 68, 24, 30, 74, 96, 55],
    [38, 61, 22, 34, 70, 92, 48],
    [45, 72, 28, 31, 79, 98, 60],
    [36, 58, 20, 29, 66, 88, 44],
    [48, 75, 26, 38, 82, 90, 52],
    [30, 84, 62, 40, 34, 26, 12],
  ],
};

const produtos = [
  { n: "Whey Protein 1kg", q: 128, r: 512_000, img: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=200&q=80" },
  { n: "Creatina 300g", q: 96, r: 288_000, img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=200&q=80" },
  { n: "Garrafa térmica Mindelo Gym", q: 74, r: 111_000, img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=200&q=80" },
  { n: "Luvas de treino", q: 61, r: 91_500, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=200&q=80" },
  { n: "Barra proteica (cx. 12)", q: 53, r: 79_500, img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=200&q=80" },
];

const risco = [
  { n: "Nilton Furtado", d: "18 dias sem check-in", p: 86 },
  { n: "Cátia Mendes", d: "14 dias sem check-in", p: 72 },
  { n: "Dário Rocha", d: "11 dias · plano expira em 6 dias", p: 64 },
  { n: "Ivandra Lima", d: "9 dias sem check-in", p: 51 },
];

const periodos = ["30 dias", "6 meses", "12 meses"] as const;

function Analytics() {
  const [periodo, setPeriodo] = useState<(typeof periodos)[number]>("6 meses");
  const maxReceita = Math.max(...receitaMeses.map((r) => r.v));
  const maxHeat = Math.max(...heat.dados.flat());

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <Link to="/owner" className="text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div>
              <div className="text-sm font-semibold">Analytics do Ginásio</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Ginásio Mindelo · São Vicente</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl border border-border p-0.5">
              {periodos.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriodo(p)}
                  className={`rounded-lg px-3 py-1.5 text-xs transition ${
                    periodo === p ? "bg-neon text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => toast.success("Relatório exportado", { description: "PDF com todos os indicadores enviado para o teu email." })}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground transition hover:border-neon hover:text-neon"
            >
              <Download className="h-3.5 w-3.5" /> Exportar
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi icon={Wallet} label="Receita (Out)" value={fmtCVE(1_842_000)} delta="+16,6%" up tone="neon" />
          <Kpi icon={Users} label="Retenção 6 meses" value="68%" delta="+4 pts vs. semestre" up tone="blue" />
          <Kpi icon={UserMinus} label="Churn mensal" value="5,2%" delta="-1,1 pt" up tone="neon" />
          <Kpi icon={Target} label="Receita média / aluno" value={fmtCVE(4_470)} delta="-2,3%" up={false} tone="blue" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Receita */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-lg font-semibold">Receita mensal</h2>
                <p className="text-xs text-muted-foreground">Mensalidades + marketplace · {periodo}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-neon"><TrendingUp className="h-3 w-3" /> +32% YoY</span>
            </div>
            <div className="mt-6 flex h-52 items-end gap-3">
              {receitaMeses.map((r, i) => (
                <div key={r.m} className="group flex flex-1 flex-col items-center gap-2">
                  <span className="text-[10px] text-muted-foreground opacity-0 transition group-hover:opacity-100">
                    {Math.round(r.v / 1000)}k
                  </span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-neon-blue to-neon transition hover:opacity-80"
                    style={{ height: `${(r.v / maxReceita) * 100}%`, boxShadow: i === receitaMeses.length - 1 ? "0 0 24px var(--neon)" : undefined }}
                  />
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{r.m}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Retenção coorte */}
          <aside className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Curva de retenção</h2>
            <p className="text-xs text-muted-foreground">Coorte de alunos inscritos em Maio</p>
            <div className="mt-5 space-y-3">
              {retencao.map((v, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Mês {i}</span>
                    <span className="font-semibold">{v}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-neon to-neon-blue"
                      style={{ width: `${v}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] text-muted-foreground">
              A maior perda acontece entre o mês 1 e o mês 2 — ativar onboarding com o treinador reduz o churn.
            </p>
          </aside>
        </div>

        {/* Heatmap frequência */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-neon-blue" />
            <h2 className="text-lg font-semibold">Frequência por horário</h2>
          </div>
          <p className="text-xs text-muted-foreground">Check-ins médios por dia e hora · quanto mais brilhante, mais cheio</p>

          <div className="mt-5 overflow-x-auto">
            <div className="min-w-[520px]">
              <div className="ml-12 grid grid-cols-7 gap-1.5 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
                {heat.horas.map((h) => <span key={h}>{h}</span>)}
              </div>
              <div className="mt-1.5 space-y-1.5">
                {heat.dados.map((linha, i) => (
                  <div key={heat.dias[i]} className="flex items-center gap-1.5">
                    <span className="w-10 shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground">{heat.dias[i]}</span>
                    <div className="grid flex-1 grid-cols-7 gap-1.5">
                      {linha.map((v, j) => (
                        <div
                          key={j}
                          title={`${heat.dias[i]} ${heat.horas[j]} · ${v} check-ins`}
                          className="flex h-9 items-center justify-center rounded-lg text-[10px] font-semibold"
                          style={{
                            backgroundColor: `color-mix(in oklab, var(--neon) ${Math.round((v / maxHeat) * 85)}%, var(--surface))`,
                            color: v / maxHeat > 0.55 ? "var(--background)" : "var(--muted-foreground)",
                          }}
                        >
                          {v}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-muted-foreground">
            Pico às <span className="text-neon">19h</span> (até 98 alunos). Sugestão: abrir uma segunda turma de HIIT às 20h e criar tarifa
            reduzida no período das 10h–12h.
          </p>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Produtos */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-neon" />
              <h2 className="text-lg font-semibold">Produtos mais vendidos</h2>
            </div>
            <div className="mt-4 divide-y divide-border">
              {produtos.map((p, i) => (
                <div key={p.n} className="flex items-center gap-3 py-3">
                  <span className="w-4 text-xs font-bold text-muted-foreground">{i + 1}</span>
                  <img src={p.img} alt={p.n} className="h-11 w-11 rounded-xl object-cover" loading="lazy" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{p.n}</div>
                    <div className="text-[11px] text-muted-foreground">{p.q} unidades vendidas</div>
                  </div>
                  <div className="text-sm font-semibold text-neon">{fmtCVE(p.r)}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Risco de churn */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-neon-blue" />
              <h2 className="text-lg font-semibold">Alunos em risco de saída</h2>
            </div>
            <p className="text-xs text-muted-foreground">Modelo preditivo com base em check-ins e validade do plano</p>
            <div className="mt-4 space-y-3">
              {risco.map((r) => (
                <div key={r.n} className="rounded-xl border border-border bg-surface/40 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{r.n}</div>
                      <div className="text-[11px] text-muted-foreground">{r.d}</div>
                    </div>
                    <span className="shrink-0 rounded-full border border-neon-blue/40 bg-neon-blue/10 px-2 py-0.5 text-[10px] font-semibold text-neon-blue">
                      {r.p}% risco
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
                    <div className="h-full rounded-full bg-gradient-to-r from-neon-blue to-neon" style={{ width: `${r.p}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => toast.success("Campanha criada", { description: "Mensagem de reativação enviada aos 4 alunos em risco." })}
              className="mt-4 w-full rounded-xl bg-neon py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Enviar campanha de reativação
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

function Kpi({
  icon: Icon, label, value, delta, up, tone,
}: { icon: typeof Wallet; label: string; value: string; delta: string; up: boolean; tone: "neon" | "blue" }) {
  const Trend = up ? TrendingUp : TrendingDown;
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-2 text-2xl font-bold">{value}</div>
          <div className={`mt-1 flex items-center gap-1 text-xs ${up ? "text-neon" : "text-destructive"}`}>
            <Trend className="h-3 w-3" /> {delta}
          </div>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
          tone === "neon" ? "border-neon/40 bg-neon/10 text-neon" : "border-neon-blue/40 bg-neon-blue/10 text-neon-blue"
        }`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
