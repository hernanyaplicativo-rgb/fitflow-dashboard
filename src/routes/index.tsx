import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Dumbbell, ClipboardList, ShoppingBag, Sparkles, QrCode, ArrowUpRight, Calendar, ScanLine, LogIn, Users, TrendingUp, UserCircle2, MessageCircle, Wrench } from "lucide-react";

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
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80",
  },
  {
    to: "/trainer",
    title: "Criador de Treinos",
    subtitle: "Treinador · Painel Web",
    desc: "Monte fichas com séries, repetições, carga e descanso por aluno.",
    icon: Dumbbell,
    tone: "blue" as const,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80",
  },
  {
    to: "/student/workout",
    title: "Treino de Hoje",
    subtitle: "Aluno · App Mobile",
    desc: "Checklist focado para o ginásio com cronómetro de descanso flutuante.",
    icon: ClipboardList,
    tone: "neon" as const,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
  },
  {
    to: "/student/equipment",
    title: "Guia de Máquinas",
    subtitle: "Aluno · Leitura de QR Code",
    desc: "Tutorial instantâneo ao ler o autocolante do equipamento.",
    icon: QrCode,
    tone: "blue" as const,
    image: "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?auto=format&fit=crop&w=900&q=80",
  },
  {
    to: "/student/nutritionist",
    title: "Nutricionista IA",
    subtitle: "Aluno · App Mobile",
    desc: "Planos alimentares com produtos locais e metas biométricas.",
    icon: Sparkles,
    tone: "neon" as const,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
  },
  {
    to: "/marketplace",
    title: "Marketplace",
    subtitle: "Aluno + Loja Parceira",
    desc: "Suplementos e artigos esportivos de lojas de Cabo Verde, em CVE.",
    icon: ShoppingBag,
    tone: "blue" as const,
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=900&q=80",
  },
  {
    to: "/schedule",
    title: "Aulas Coletivas",
    subtitle: "Agenda · CrossFit · Pilates · HIIT",
    desc: "Calendário semanal com inscrição em tempo real e gestão de vagas.",
    icon: Calendar,
    tone: "neon" as const,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
  },
  {
    to: "/checkin",
    title: "Check-in QR",
    subtitle: "Aluno · Entrada do ginásio",
    desc: "Regista a tua frequência num segundo ao chegar.",
    icon: ScanLine,
    tone: "blue" as const,
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=900&q=80",
  },
  {
    to: "/community",
    title: "Comunidade",
    subtitle: "Feed · Liga · Desafios",
    desc: "Vê PRs da tribo, sobe na liga semanal e aceita desafios em grupo.",
    icon: Users,
    tone: "neon" as const,
    image: "https://images.unsplash.com/photo-1571388208497-71bedc66e932?auto=format&fit=crop&w=900&q=80",
  },
  {
    to: "/progress",
    title: "Progresso & PRs",
    subtitle: "Streak · Prontidão · Recordes",
    desc: "Streak, recuperação, recordes pessoais e resumo semanal com IA.",
    icon: TrendingUp,
    tone: "blue" as const,
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80",
  },
  {
    to: "/student/profile",
    title: "Perfil do Aluno",
    subtitle: "Customizável · 1RM Auto",
    desc: "Foto, bio, objetivo e Força Máxima Teórica calculada em tempo real.",
    icon: UserCircle2,
    tone: "neon" as const,
    image: "https://images.unsplash.com/photo-1583500178690-f7ed4f1c2b89?auto=format&fit=crop&w=900&q=80",
  },
  {
    to: "/chat",
    title: "Chat com Treinador",
    subtitle: "Mensagens em tempo real",
    desc: "Conversa direta com o teu coach e recebe fichas como cards no chat.",
    icon: MessageCircle,
    tone: "blue" as const,
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=900&q=80",
  },
  {
    to: "/trainer/exercises",
    title: "Cadastro de Exercícios",
    subtitle: "Treinador / Dono · Catálogo",
    desc: "Tira foto da máquina e define séries, repetições e carga padrão.",
    icon: Wrench,
    tone: "neon" as const,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
  },
];

const slides = [
  {
    category: "Treinar em Casa",
    title: "Desafio Cardio HIIT Express",
    tag: "Sem Equipamento • 20 min",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "Suplementos",
    title: "Creatina Monohidratada 300g",
    tag: "Melhor preço em CVE",
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "Treinar em Casa",
    title: "Fortalecimento de Core e Pernas",
    tag: "Nível Intermediário",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  },
];

function Index() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="grid-bg absolute inset-x-0 top-0 h-[60vh] opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <header className="mb-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_12px_var(--neon)]" />
              Ecossistema Fitness · Cabo Verde
            </div>
            <Link to="/auth" className="flex items-center gap-1.5 rounded-full border border-neon/40 bg-neon/10 px-3.5 py-1.5 text-xs font-medium text-neon transition hover:bg-neon/20">
              <LogIn className="h-3 w-3" /> Entrar
            </Link>
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

        {/* Carrossel de Destaque */}
        <section className="mb-16">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-zinc-800/80 bg-black shadow-2xl">
            <div className="relative aspect-[16/9] sm:aspect-[21/9]">
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    i === activeSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 sm:p-10">
                    <div className="mb-2 inline-flex items-center rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-mono uppercase tracking-wider text-neon neon-glow">
                      {slide.category}
                    </div>
                    <h2 className="text-2xl font-bold leading-tight text-white sm:text-4xl">
                      {slide.title}
                    </h2>
                    <p className="mt-2 text-sm text-zinc-300 sm:text-base">{slide.tag}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === activeSlide
                    ? "w-8 bg-neon shadow-[0_0_12px_var(--neon)]"
                    : "w-2.5 bg-zinc-600 hover:bg-zinc-400"
                }`}
                aria-label={`Ir para slide ${i + 1}`}
              />
            ))}
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {perfis.map(({ to, title, subtitle, desc, icon: Icon, tone, image }) => (
            <Link
              key={to}
              to={to}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition hover:border-transparent hover:shadow-[0_0_0_1px_var(--neon),0_20px_60px_-20px_color-mix(in_oklab,var(--neon)_50%,transparent)]"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="absolute right-3 top-3">
                  <ArrowUpRight className="h-4 w-4 text-white/80 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <div
                  className={`absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur ${
                    tone === "neon"
                      ? "border-neon/40 bg-neon/15 text-neon"
                      : "border-neon-blue/40 bg-neon-blue/15 text-neon-blue"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="p-6 pt-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {subtitle}
                </div>
                <h3 className="mt-1 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
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
