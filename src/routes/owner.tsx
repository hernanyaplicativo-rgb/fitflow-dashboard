import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2, ChevronLeft, Users, GraduationCap, Wallet, Crown,
  TrendingUp, ArrowUpRight, LogIn, Check, Activity, Calendar,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/owner")({
  component: OwnerArea,
});

type Gym = {
  id: string;
  name: string;
  city: string;
  faturacao: number; // CVE
  alunos: number;
  professores: number;
  plano: "Essencial" | "Pro" | "Elite";
  cor: string;
};

const ginasios: Gym[] = [
  { id: "g1", name: "Ginásio Mindelo", city: "Mindelo · São Vicente", faturacao: 1_842_000, alunos: 412, professores: 9, plano: "Pro", cor: "from-neon to-neon-blue" },
  { id: "g2", name: "Fitness Praia", city: "Praia · Santiago", faturacao: 2_310_500, alunos: 583, professores: 14, plano: "Elite", cor: "from-neon-blue to-neon" },
  { id: "g3", name: "Box CrossFit Sal", city: "Santa Maria · Sal", faturacao: 720_000, alunos: 168, professores: 5, plano: "Essencial", cor: "from-neon to-neon" },
];

const fmtCVE = (n: number) => `${n.toLocaleString("pt-PT")} CVE`;

function OwnerArea() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = ginasios.find((g) => g.id === selectedId) ?? null;

  if (!selected) return <GymSelector onSelect={setSelectedId} />;
  return <OwnerDashboard gym={selected} onSwitch={() => setSelectedId(null)} />;
}

function GymSelector({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="grid-bg absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-3xl px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-3 w-3" /> Voltar
        </Link>

        <div className="mt-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neon text-primary-foreground neon-glow">
            <LogIn className="h-5 w-5" />
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight">
            Selecione o seu <span className="neon-text">ginásio</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Cada conta só visualiza e gere os dados do seu próprio espaço.
          </p>
        </div>

        <div className="mt-10 grid gap-3">
          {ginasios.map((g) => (
            <button
              key={g.id}
              onClick={() => onSelect(g.id)}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left transition hover:border-neon/60"
            >
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${g.cor} text-primary-foreground`}>
                <Building2 className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{g.name}</h3>
                  <PlanBadge plano={g.plano} />
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">{g.city}</div>
                <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                  <span>{g.alunos} alunos</span>
                  <span>{g.professores} professores</span>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon" />
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Sistema multi-tenant · isolamento total de dados entre ginásios
        </p>
      </div>
    </div>
  );
}

function OwnerDashboard({ gym, onSwitch }: { gym: Gym; onSwitch: () => void }) {
  const meses = ["Mai", "Jun", "Jul", "Ago", "Set", "Out"];
  const valores = [62, 71, 68, 84, 79, 95];
  const max = Math.max(...valores);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neon text-primary-foreground">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">{gym.name}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{gym.city}</div>
            </div>
          </div>
          <button
            onClick={onSwitch}
            className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:border-neon hover:text-neon"
          >
            Trocar de ginásio
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-border">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80" alt="Ginásio" className="h-48 w-full object-cover sm:h-60" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
            <div className="text-xs uppercase tracking-[0.2em] text-neon">Painel do Dono</div>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Visão geral · Outubro</h1>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi icon={Wallet} label="Faturação mensal" value={fmtCVE(gym.faturacao)} delta="+18%" tone="neon" />
          <Kpi icon={GraduationCap} label="Alunos ativos" value={String(gym.alunos)} delta="+24 este mês" tone="blue" />
          <Kpi icon={Users} label="Professores" value={String(gym.professores)} delta="2 vagas abertas" tone="neon" />
          <Kpi icon={Crown} label="Assinatura PULSE" value={gym.plano} delta="Renova 12/Nov" tone="blue" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Chart */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-lg font-semibold">Faturação dos últimos 6 meses</h2>
                <p className="text-xs text-muted-foreground">Valores em milhares de CVE</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-neon">
                <TrendingUp className="h-3 w-3" /> +32% YoY
              </div>
            </div>
            <div className="mt-6 flex h-48 items-end gap-3">
              {valores.map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-neon-blue to-neon transition hover:opacity-80"
                    style={{ height: `${(v / max) * 100}%`, boxShadow: i === valores.length - 1 ? "0 0 24px var(--neon)" : undefined }}
                  />
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{meses[i]}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Sub plan */}
          <aside className="rounded-2xl border border-neon/40 bg-card p-6 neon-glow">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-neon" />
              <span className="text-xs uppercase tracking-wider text-neon">Plano {gym.plano}</span>
            </div>
            <div className="mt-2 text-3xl font-bold">
              {gym.plano === "Elite" ? "12.500" : gym.plano === "Pro" ? "7.900" : "3.900"}
              <span className="ml-1 text-sm font-normal text-muted-foreground">CVE / mês</span>
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              {[
                "Alunos ilimitados",
                "Treinadores ilimitados",
                "Nutricionista IA incluída",
                "Marketplace integrado",
                "Suporte prioritário",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-neon" /> {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => toast.success("Pedido de gestão enviado!", { description: "Em breve, a equipa PULSE entrará em contacto para alterar o seu plano." })}
              className="mt-6 w-full rounded-xl bg-neon py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Gerir assinatura
            </button>
          </aside>
        </div>

        {/* Quick links */}
        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <QuickLink to="/trainer" icon={Activity} label="Criar treino" desc="Aceder ao painel do treinador" />
          <QuickLink to="/marketplace" icon={Calendar} label="Marketplace" desc="Vendas e parceiros" />
          <QuickLink to="/student/nutritionist" icon={Users} label="Nutricionista IA" desc="Visualizar como aluno" />
        </section>
      </main>
    </div>
  );
}

function Kpi({
  icon: Icon, label, value, delta, tone,
}: { icon: typeof Wallet; label: string; value: string; delta: string; tone: "neon" | "blue" }) {
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
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
          tone === "neon" ? "border-neon/40 bg-neon/10 text-neon" : "border-neon-blue/40 bg-neon-blue/10 text-neon-blue"
        }`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function PlanBadge({ plano }: { plano: string }) {
  const tone = plano === "Elite" ? "border-neon/40 bg-neon/10 text-neon"
    : plano === "Pro" ? "border-neon-blue/40 bg-neon-blue/10 text-neon-blue"
    : "border-border bg-surface text-muted-foreground";
  return <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${tone}`}>{plano}</span>;
}

function QuickLink({ to, icon: Icon, label, desc }: { to: string; icon: typeof Activity; label: string; desc: string }) {
  return (
    <Link to={to} className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-neon/40">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-blue/10 text-neon-blue">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-neon" />
    </Link>
  );
}
