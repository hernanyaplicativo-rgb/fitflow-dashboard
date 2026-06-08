import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Flame, Heart, Battery, TrendingUp, Award, Calendar, Zap, Activity, Moon } from "lucide-react";

export const Route = createFileRoute("/progress")({
  component: ProgressPage,
});

const semana = [
  { d: "Seg", v: 65 }, { d: "Ter", v: 80 }, { d: "Qua", v: 0 }, { d: "Qui", v: 92 },
  { d: "Sex", v: 70 }, { d: "Sáb", v: 100 }, { d: "Dom", v: 45 },
];

const prs = [
  { ex: "Agachamento", v: "120 kg", d: "+5 kg", data: "Hoje" },
  { ex: "Supino reto", v: "85 kg", d: "+2.5 kg", data: "Ontem" },
  { ex: "Levantamento Terra", v: "140 kg", d: "+10 kg", data: "Há 3 dias" },
  { ex: "5 km corrida", v: "23:42", d: "−18 s", data: "Há 5 dias" },
];

const badges = [
  { n: "Inferno 30d", emoji: "🔥", got: true },
  { n: "Maratonista", emoji: "🏃", got: true },
  { n: "Força Bruta", emoji: "💪", got: true },
  { n: "Madrugador", emoji: "🌅", got: true },
  { n: "Cardio Rei", emoji: "❤️", got: false },
  { n: "100 Treinos", emoji: "🏆", got: false },
];

function ProgressPage() {
  return (
    <div className="relative min-h-screen bg-background pb-12">
      <div className="grid-bg absolute inset-x-0 top-0 h-64 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="relative mx-auto max-w-4xl px-5 py-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Início
        </Link>

        <header className="mb-8">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Progresso</div>
          <h1 className="mt-1 text-4xl font-bold">A tua <span className="neon-text">evolução</span>.</h1>
          <p className="mt-1 text-sm text-muted-foreground">Streak, prontidão, recordes e resumo semanal — tudo num lugar.</p>
        </header>

        {/* Top metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric icon={Flame} label="Streak" value="14" unit="dias" tone="neon" sub="Recorde: 22" />
          <Metric icon={Battery} label="Prontidão" value="82" unit="%" tone="neon" sub="Recuperação ótima" />
          <Metric icon={Heart} label="FC repouso" value="58" unit="bpm" tone="blue" sub="−3 vs semana passada" />
          <Metric icon={Zap} label="XP semanal" value="1 240" unit="" tone="blue" sub="Nível 12 · 60%" />
        </div>

        {/* Weekly chart */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Resumo da semana</div>
              <h2 className="mt-1 text-xl font-bold">5 treinos · 4h 38min</h2>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold neon-text">+12%</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">vs semana passada</div>
            </div>
          </div>
          <div className="mt-6 flex items-end gap-3 h-40">
            {semana.map((d) => (
              <div key={d.d} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className={`w-full rounded-t-md transition-all ${d.v === 0 ? "bg-muted/40" : "bg-gradient-to-t from-neon/30 to-neon shadow-[0_0_12px_var(--neon)]"}`}
                    style={{ height: `${Math.max(d.v, 4)}%` }}
                  />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{d.d}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* PRs */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-neon" />
              <h2 className="text-lg font-bold">Recordes pessoais</h2>
            </div>
            <div className="mt-4 space-y-2">
              {prs.map((p) => (
                <div key={p.ex} className="flex items-center justify-between rounded-xl border border-border/60 bg-surface/40 p-3">
                  <div>
                    <div className="text-sm font-medium">{p.ex}</div>
                    <div className="text-xs text-muted-foreground">{p.data}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold">{p.v}</div>
                    <div className="text-xs text-neon">{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Badges */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-neon-blue" />
              <h2 className="text-lg font-bold">Conquistas</h2>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {badges.map((b) => (
                <div
                  key={b.n}
                  className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition ${
                    b.got
                      ? "border-neon/40 bg-neon/5"
                      : "border-border bg-surface/30 opacity-40 grayscale"
                  }`}
                >
                  <div className="text-2xl">{b.emoji}</div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-wider">{b.n}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Recovery / Sleep */}
          <section className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-neon-blue" />
              <h2 className="text-lg font-bold">Recuperação &amp; sono</h2>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Stat label="Sono médio" value="7h 24m" tone="blue" />
              <Stat label="Sono profundo" value="1h 48m" tone="neon" />
              <Stat label="HRV" value="62 ms" tone="blue" />
            </div>
            <div className="mt-4 rounded-xl border border-neon/30 bg-neon/5 p-4">
              <div className="flex items-start gap-3">
                <Activity className="mt-0.5 h-4 w-4 text-neon" />
                <div className="text-sm">
                  <div className="font-medium text-foreground">Recomendação IA</div>
                  <p className="text-muted-foreground">
                    A tua prontidão está em 82%. Bom dia para treino de força pesado.
                    Mantém a hidratação acima de 2.5 L e dorme antes das 23h.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value, unit, tone, sub }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; unit: string; tone: "neon" | "blue"; sub: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone === "neon" ? "bg-neon/15 text-neon" : "bg-neon-blue/15 text-neon-blue"}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-3xl font-bold">{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "neon" | "blue" }) {
  return (
    <div className="rounded-xl border border-border bg-surface/40 p-4">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-1 text-2xl font-bold ${tone === "neon" ? "neon-text" : "text-neon-blue"}`}>{value}</div>
    </div>
  );
}
