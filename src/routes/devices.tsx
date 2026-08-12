import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronLeft, Watch, Heart, Footprints, Flame, Moon, Activity,
  RefreshCw, Check, Plus, Battery, Bluetooth,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/devices")({
  component: Devices,
  head: () => ({
    meta: [
      { title: "Wearables & Sincronização · Mindelo Gym" },
      { name: "description", content: "Liga o teu relógio ou pulseira ao Mindelo Gym e sincroniza passos, calorias, frequência cardíaca e sono automaticamente." },
      { property: "og:title", content: "Wearables & Sincronização · Mindelo Gym" },
      { property: "og:description", content: "Apple Health, Google Fit, Garmin, Strava e Fitbit ligados ao teu treino." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Device = {
  id: string;
  nome: string;
  tipo: string;
  logo: string;
  ligado: boolean;
  bateria?: number;
  ultimaSync?: string;
  cor: string;
};

const iniciais: Device[] = [
  { id: "d1", nome: "Apple Health", tipo: "iPhone · Apple Watch", logo: "🍎", ligado: true, bateria: 78, ultimaSync: "há 4 min", cor: "text-neon" },
  { id: "d2", nome: "Google Fit", tipo: "Android · Wear OS", logo: "🟢", ligado: true, ultimaSync: "há 12 min", cor: "text-neon-blue" },
  { id: "d3", nome: "Garmin Connect", tipo: "Forerunner · Venu", logo: "⌚", ligado: false, cor: "text-muted-foreground" },
  { id: "d4", nome: "Strava", tipo: "Corrida · Ciclismo", logo: "🏃", ligado: false, cor: "text-muted-foreground" },
  { id: "d5", nome: "Fitbit", tipo: "Charge · Versa", logo: "💠", ligado: false, cor: "text-muted-foreground" },
  { id: "d6", nome: "Xiaomi Mi Band", tipo: "Mi Fitness", logo: "🔶", ligado: false, cor: "text-muted-foreground" },
];

const horas = ["00h", "04h", "08h", "12h", "16h", "20h", "Agora"];
const bpmDia = [54, 51, 88, 132, 96, 74, 68];

function Devices() {
  const [devices, setDevices] = useState(iniciais);
  const [aSincronizar, setASincronizar] = useState(false);

  const ligados = devices.filter((d) => d.ligado).length;

  const toggle = (id: string) => {
    setDevices((list) =>
      list.map((d) =>
        d.id === id
          ? { ...d, ligado: !d.ligado, ultimaSync: !d.ligado ? "agora mesmo" : undefined, cor: !d.ligado ? "text-neon" : "text-muted-foreground" }
          : d,
      ),
    );
    const d = devices.find((x) => x.id === id);
    toast.success(d?.ligado ? `${d.nome} desligado` : `${d?.nome} ligado ao Mindelo Gym!`, {
      description: d?.ligado ? undefined : "Dados de atividade a sincronizar em segundo plano.",
    });
  };

  const sincronizar = () => {
    setASincronizar(true);
    setTimeout(() => {
      setASincronizar(false);
      setDevices((l) => l.map((d) => (d.ligado ? { ...d, ultimaSync: "agora mesmo" } : d)));
      toast.success("Sincronização concluída", { description: "Passos, calorias, FC e sono atualizados." });
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div>
              <div className="text-sm font-semibold">Wearables & Sincronização</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {ligados} dispositivo{ligados === 1 ? "" : "s"} ligado{ligados === 1 ? "" : "s"}
              </div>
            </div>
          </div>
          <button
            onClick={sincronizar}
            className="inline-flex items-center gap-2 rounded-xl border border-neon/40 bg-neon/10 px-3 py-2 text-xs font-semibold text-neon"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${aSincronizar ? "animate-spin" : ""}`} />
            {aSincronizar ? "A sincronizar…" : "Sincronizar"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl border border-border">
          <img
            src="https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=1400&q=80"
            alt="Relógio desportivo no pulso durante o treino"
            className="h-44 w-full object-cover sm:h-56"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-neon">Dados em tempo real</div>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">O teu relógio a falar com o Mindelo Gym</h1>
            <p className="mt-1 max-w-md text-xs text-muted-foreground sm:text-sm">
              Passos, calorias, frequência cardíaca e sono entram automaticamente no teu progresso e na prontidão diária.
            </p>
          </div>
        </div>

        {/* Métricas de hoje */}
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric icon={Footprints} label="Passos hoje" value="9.842" sub="Meta 10.000" tone="neon" pct={98} />
          <Metric icon={Flame} label="Calorias ativas" value="742 kcal" sub="+18% vs. média" tone="blue" pct={74} />
          <Metric icon={Heart} label="FC repouso" value="54 bpm" sub="Excelente" tone="neon" pct={62} />
          <Metric icon={Moon} label="Sono" value="7h 20m" sub="Qualidade 86%" tone="blue" pct={86} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Gráfico FC */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-lg font-semibold">Frequência cardíaca · 24h</h2>
                <p className="text-xs text-muted-foreground">Recebida do Apple Watch</p>
              </div>
              <span className="rounded-full border border-neon/40 bg-neon/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-neon">
                Máx 132 bpm
              </span>
            </div>
            <BpmChart />
            <div className="mt-3 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
              {horas.map((h) => <span key={h}>{h}</span>)}
            </div>
          </section>

          {/* Zonas */}
          <aside className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Zonas de treino</h2>
            <p className="text-xs text-muted-foreground">Tempo por zona · últimos 7 dias</p>
            <div className="mt-5 space-y-3">
              {[
                { z: "Zona 5 · Máxima", t: "12 min", pct: 8 },
                { z: "Zona 4 · Anaeróbia", t: "38 min", pct: 24 },
                { z: "Zona 3 · Aeróbia", t: "1h 12m", pct: 46 },
                { z: "Zona 2 · Queima", t: "2h 05m", pct: 78 },
                { z: "Zona 1 · Leve", t: "3h 40m", pct: 96 },
              ].map((r) => (
                <div key={r.z}>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{r.z}</span>
                    <span className="font-semibold">{r.t}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface">
                    <div className="h-full rounded-full bg-gradient-to-r from-neon-blue to-neon" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Dispositivos */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Bluetooth className="h-4 w-4 text-neon-blue" />
            <h2 className="text-lg font-semibold">Dispositivos & apps</h2>
          </div>
          <p className="text-xs text-muted-foreground">Liga as tuas fontes de dados. Podes desligar a qualquer momento.</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {devices.map((d) => (
              <div
                key={d.id}
                className={`flex items-center gap-3 rounded-2xl border p-4 transition ${
                  d.ligado ? "border-neon/40 bg-neon/5" : "border-border bg-surface/40"
                }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-background text-xl">{d.logo}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold">{d.nome}</span>
                    {d.ligado && <Check className="h-3.5 w-3.5 shrink-0 text-neon" />}
                  </div>
                  <div className="truncate text-[11px] text-muted-foreground">{d.tipo}</div>
                  <div className="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground">
                    {d.ligado && d.ultimaSync && <span className="text-neon">Sync {d.ultimaSync}</span>}
                    {d.ligado && d.bateria != null && (
                      <span className="inline-flex items-center gap-1">
                        <Battery className="h-3 w-3" /> {d.bateria}%
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => toggle(d.id)}
                  className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                    d.ligado
                      ? "border border-border text-muted-foreground hover:text-destructive"
                      : "bg-neon text-primary-foreground"
                  }`}
                >
                  {d.ligado ? "Desligar" : "Ligar"}
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => toast("Procurar dispositivos por Bluetooth…", { description: "Mantém o relógio próximo e desbloqueado." })}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border py-4 text-sm text-muted-foreground transition hover:border-neon/50 hover:text-neon"
          >
            <Plus className="h-4 w-4" /> Adicionar outro dispositivo
          </button>
        </section>

        {/* Atividades importadas */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-neon" />
            <h2 className="text-lg font-semibold">Atividades importadas</h2>
          </div>
          <div className="mt-4 divide-y divide-border">
            {[
              { n: "Corrida · Marginal de Mindelo", d: "Hoje · 07:12", km: "8,4 km", kcal: "612 kcal", fc: "148 bpm", src: "Strava" },
              { n: "Treino de força · Peito & Tríceps", d: "Ontem · 18:40", km: "52 min", kcal: "428 kcal", fc: "121 bpm", src: "Apple Watch" },
              { n: "Natação · Laginha", d: "Domingo · 09:05", km: "1,2 km", kcal: "395 kcal", fc: "132 bpm", src: "Garmin" },
            ].map((a) => (
              <div key={a.n} className="flex flex-wrap items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{a.n}</div>
                  <div className="text-[11px] text-muted-foreground">{a.d} · via {a.src}</div>
                </div>
                <div className="flex gap-4 text-xs">
                  <span className="text-neon">{a.km}</span>
                  <span className="text-muted-foreground">{a.kcal}</span>
                  <span className="text-muted-foreground">{a.fc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-neon-blue/30 bg-neon-blue/5 p-4">
          <Watch className="h-5 w-5 shrink-0 text-neon-blue" />
          <p className="text-xs text-muted-foreground">
            Com o relógio ligado, o Mindelo Gym ajusta a tua <span className="text-foreground">prontidão diária</span> e sugere carga de treino
            com base na frequência cardíaca de repouso e na qualidade do sono.
          </p>
        </div>
      </main>
    </div>
  );
}

function BpmChart() {
  const max = 150;
  const min = 40;
  const pts = bpmDia
    .map((v, i) => {
      const x = (i / (bpmDia.length - 1)) * 100;
      const y = 100 - ((v - min) / (max - min)) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="mt-6 h-44 w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="bpmFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--neon)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--neon)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,100 ${pts} 100,100`} fill="url(#bpmFill)" />
        <polyline points={pts} fill="none" stroke="var(--neon)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        {bpmDia.map((v, i) => {
          const x = (i / (bpmDia.length - 1)) * 100;
          const y = 100 - ((v - min) / (max - min)) * 100;
          return <circle key={i} cx={x} cy={y} r="1.2" fill="var(--neon)" vectorEffect="non-scaling-stroke" />;
        })}
      </svg>
    </div>
  );
}

function Metric({
  icon: Icon, label, value, sub, tone, pct,
}: { icon: typeof Heart; label: string; value: string; sub: string; tone: "neon" | "blue"; pct: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <Icon className={`h-4 w-4 ${tone === "neon" ? "text-neon" : "text-neon-blue"}`} />
      </div>
      <div className="mt-2 text-xl font-bold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{sub}</div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface">
        <div
          className={`h-full rounded-full ${tone === "neon" ? "bg-neon" : "bg-neon-blue"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
