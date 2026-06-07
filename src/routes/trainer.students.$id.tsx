import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, TrendingUp, Activity, Award, Calendar, Dumbbell, Mail, Phone, Edit3 } from "lucide-react";
import { useStore } from "../lib/store";

export const Route = createFileRoute("/trainer/students/$id")({
  component: StudentProfile,
});

const pesoMeses = [78, 77.4, 76.8, 76.1, 75.2, 74.5, 74.0, 73.6];
const cargaSupino = [50, 55, 60, 62, 65, 67, 70, 72.5];
const frequenciaSemana = [4, 5, 3, 5, 4, 5, 6, 5, 4, 5, 6, 5];

function StudentProfile() {
  const { id } = Route.useParams();
  const aluno = useStore((s) => s.alunos.find((a) => a.id === id) ?? s.alunos[0]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <Link to="/trainer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" /> Lista de alunos
        </Link>

        <header className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="flex items-center gap-5">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-neon to-neon-blue text-xl font-bold text-primary-foreground neon-glow">
              {aluno.avatar}
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-neon text-[10px] text-primary-foreground">●</span>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-neon">Aluno ativo</div>
              <h1 className="mt-1 text-3xl font-bold sm:text-4xl">{aluno.name}</h1>
              <div className="mt-1 text-sm text-muted-foreground">Objetivo · <span className="text-foreground">{aluno.goal}</span> · 8 meses no PULSE</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm hover:border-neon/40">
              <Mail className="h-4 w-4" /> Mensagem
            </button>
            <Link to="/trainer" className="flex items-center gap-2 rounded-xl bg-neon px-4 py-2.5 text-sm font-semibold text-primary-foreground neon-glow">
              <Edit3 className="h-4 w-4" /> Nova ficha
            </Link>
          </div>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          <KPI icon={Activity} label="Adesão 30d" value="92%" delta="+4%" />
          <KPI icon={Dumbbell} label="Sessões" value="24" delta="+6" />
          <KPI icon={TrendingUp} label="Carga média" value="+14%" delta="3 meses" />
          <KPI icon={Award} label="Recordes" value="7" delta="2 novos" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card title="Evolução de Peso Corporal" subtitle="Últimos 8 meses · kg">
            <LineChart data={pesoMeses} labels={["Mar","Abr","Mai","Jun","Jul","Ago","Set","Out"]} color="var(--neon-blue)" suffix="kg" />
          </Card>
          <Card title="Carga no Supino Reto" subtitle="Progressão de força · kg">
            <LineChart data={cargaSupino} labels={["S1","S2","S3","S4","S5","S6","S7","S8"]} color="var(--neon)" suffix="kg" />
          </Card>
          <Card title="Frequência Semanal" subtitle="Treinos por semana" className="lg:col-span-2">
            <BarChart data={frequenciaSemana} />
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
            <h3 className="text-sm font-semibold">Histórico de Treinos</h3>
            <ul className="mt-4 divide-y divide-border">
              {[
                { d: "Hoje", n: "Hipertrofia — Sup.", t: "62 min", c: "✓ Completo" },
                { d: "Ontem", n: "Pernas + Glúteos", t: "55 min", c: "✓ Completo" },
                { d: "2 dias", n: "HIIT Express", t: "28 min", c: "✓ Completo" },
                { d: "3 dias", n: "Empurrar", t: "48 min", c: "⚠ Parcial" },
                { d: "4 dias", n: "Mobilidade", t: "20 min", c: "✓ Completo" },
              ].map((h) => (
                <li key={h.d} className="flex items-center justify-between py-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-14 shrink-0 text-xs text-muted-foreground">{h.d}</span>
                    <span className="font-medium">{h.n}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{h.t}</span>
                    <span className={h.c.startsWith("✓") ? "text-neon" : "text-orange-400"}>{h.c}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold">Contacto</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" /> {aluno.name.toLowerCase().replace(" ", ".")}@email.cv</li>
                <li className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /> +238 9XX XX XX</li>
                <li className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4" /> Plano Pro · até Jun 2026</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-neon/30 bg-neon/5 p-5">
              <h3 className="text-sm font-semibold text-neon">Próxima sessão</h3>
              <div className="mt-2 text-2xl font-bold">Amanhã · 09:00</div>
              <div className="text-xs text-muted-foreground">Pernas + Glúteos · 60 min</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPI({ icon: Icon, label, value, delta }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; delta: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4 text-neon" />
        <span className="text-[10px] text-muted-foreground">{delta}</span>
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function Card({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-5 ${className}`}>
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function LineChart({ data, labels, color, suffix }: { data: number[]; labels: string[]; color: string; suffix: string }) {
  const w = 400, h = 140, pad = 20;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = pad + (i * (w - pad * 2)) / (data.length - 1);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return [x, y] as const;
  });
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const area = `${d} L${pts[pts.length - 1][0]},${h - pad} L${pts[0][0]},${h - pad} Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        <defs>
          <linearGradient id={`g-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#g-${color})`} />
        <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={color} />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
        {labels.map((l, i) => <span key={i}>{l}</span>)}
      </div>
      <div className="mt-1 flex justify-between text-xs">
        <span className="text-muted-foreground">Mín {min}{suffix}</span>
        <span className="font-semibold" style={{ color }}>Atual {data[data.length - 1]}{suffix}</span>
        <span className="text-muted-foreground">Máx {max}{suffix}</span>
      </div>
    </div>
  );
}

function BarChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-32 items-end gap-2">
      {data.map((v, i) => (
        <div key={i} className="group flex flex-1 flex-col items-center gap-1">
          <span className="text-[10px] font-mono text-muted-foreground opacity-0 transition group-hover:opacity-100">{v}</span>
          <div
            className="w-full rounded-t bg-gradient-to-t from-neon-blue/40 to-neon transition hover:from-neon-blue/60"
            style={{ height: `${(v / max) * 100}%` }}
          />
          <span className="text-[10px] text-muted-foreground">S{i + 1}</span>
        </div>
      ))}
    </div>
  );
}
