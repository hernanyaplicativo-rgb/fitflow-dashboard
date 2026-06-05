import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Dumbbell, ClipboardList, ShoppingBag, Sparkles, QrCode, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const perfis = [
  {
    to: "/owner",
    title: "Dono do Ginásio",
    subtitle: "Painel Multi-Ginásio · Web",
    desc: "Selecione o ginásio, veja faturação em CVE, alunos ativos e assinatura.",
    icon: Building2,
    tone: "neon" as const,
  },
  {
    to: "/trainer",
    title: "Criador de Treinos",
    subtitle: "Treinador · Painel Web",
    desc: "Monte fichas com séries, repetições, carga e descanso por aluno.",
    icon: Dumbbell,
    tone: "blue" as const,
  },
  {
    to: "/student/workout",
    title: "Treino de Hoje",
    subtitle: "Aluno · App Mobile",
    desc: "Checklist focado para o ginásio com cronómetro de descanso flutuante.",
    icon: ClipboardList,
    tone: "neon" as const,
  },
  {
    to: "/student/equipment",
    title: "Guia de Máquinas",
    subtitle: "Aluno · Leitura de QR Code",
    desc: "Tutorial instantâneo ao ler o autocolante do equipamento.",
    icon: QrCode,
    tone: "blue" as const,
  },
  {
    to: "/student/nutritionist",
    title: "Nutricionista IA",
    subtitle: "Aluno · App Mobile",
    desc: "Planos alimentares com produtos locais e metas biométricas.",
    icon: Sparkles,
    tone: "neon" as const,
  },
  {
    to: "/marketplace",
    title: "Marketplace",
    subtitle: "Aluno + Loja Parceira",
    desc: "Suplementos e artigos esportivos de lojas de Cabo Verde, em CVE.",
    icon: ShoppingBag,
    tone: "blue" as const,
  },
];

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="grid-bg absolute inset-x-0 top-0 h-[60vh] opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <header className="mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_12px_var(--neon)]" />
            Ecossistema Fitness · Cabo Verde
          </div>
          <h1 className="mt-4 text-5xl font-bold leading-[0.95] sm:text-7xl">
            PULSE<span className="neon-text">.</span>
            <br />
            <span className="text-muted-foreground">Treine. Acompanhe. Evolua.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground">
            Uma plataforma única para donos de ginásio, treinadores, alunos e lojas parceiras.
            Escolha um perfil abaixo para explorar a interface.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {perfis.map(({ to, title, subtitle, desc, icon: Icon, tone }) => (
            <Link
              key={to}
              to={to}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-transparent hover:shadow-[0_0_0_1px_var(--neon),0_20px_60px_-20px_color-mix(in_oklab,var(--neon)_50%,transparent)]"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                    tone === "neon"
                      ? "border-neon/40 bg-neon/10 text-neon"
                      : "border-neon-blue/40 bg-neon-blue/10 text-neon-blue"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <div className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
                {subtitle}
              </div>
              <h3 className="mt-1 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </Link>
          ))}
        </div>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
          <span>© PULSE · Mindelo · Praia · São Vicente</span>
          <span>Versão demo · Todos os valores em <span className="neon-text">CVE</span></span>
        </footer>
      </div>
    </div>
  );
}
