import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Play, ChevronDown, QrCode, Shield, Target, Settings2 } from "lucide-react";

export const Route = createFileRoute("/student/equipment")({
  component: EquipmentDetail,
});

const sections = [
  {
    icon: Settings2,
    title: "Ajuste do banco",
    body: "Ajuste o encosto a 45°. Mantenha as costas totalmente apoiadas e os pés firmes na plataforma, na largura dos ombros.",
  },
  {
    icon: Shield,
    title: "Segurança",
    body: "Sempre engate a trava lateral antes de iniciar. Não estenda completamente os joelhos no topo do movimento para proteger as articulações.",
  },
  {
    icon: Target,
    title: "Músculos ativados",
    body: "Primário: quadríceps. Secundários: glúteos, isquiotibiais e panturrilhas. Variando a posição dos pés você muda a ênfase.",
  },
];

function EquipmentDetail() {
  const [open, setOpen] = useState<string | null>("Ajuste do banco");

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background text-foreground">
      <div className="relative">
        {/* Video player */}
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-surface to-background">
          <div className="grid-bg absolute inset-0 opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-neon text-primary-foreground transition hover:scale-105 neon-glow">
              <Play className="h-8 w-8 fill-current" />
              <span className="absolute inset-0 animate-ping rounded-full bg-neon/40" />
            </button>
          </div>
          <div className="absolute left-4 top-4">
            <Link to="/" className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground backdrop-blur">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </div>
          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-neon/40 bg-card/80 px-3 py-1 text-xs text-neon backdrop-blur">
            <QrCode className="h-3 w-3" /> Scanned
          </div>
          <div className="absolute bottom-4 left-4 rounded-md bg-background/80 px-2 py-1 text-xs font-mono backdrop-blur">
            02:14 · Tutorial
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-12 pt-6">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Equipment</div>
          <h1 className="mt-1 text-3xl font-bold">
            Leg Press <span className="neon-text">45°</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Equipamento composto para membros inferiores · Zona de força
          </p>

          <div className="mt-5 flex gap-2 text-xs">
            <span className="rounded-full border border-neon/40 bg-neon/10 px-3 py-1 text-neon">Iniciante</span>
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-muted-foreground">Composto</span>
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-muted-foreground">Inferiores</span>
          </div>

          {/* Accordion */}
          <div className="mt-8 space-y-2">
            {sections.map((s) => {
              const isOpen = open === s.title;
              return (
                <div key={s.title} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <button
                    onClick={() => setOpen(isOpen ? null : s.title)}
                    className="flex w-full items-center gap-3 px-4 py-4 text-left"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon-blue/15 text-neon-blue">
                      <s.icon className="h-4 w-4" />
                    </div>
                    <span className="flex-1 text-sm font-semibold">{s.title}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-4 text-sm text-muted-foreground">{s.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="mt-8 w-full rounded-xl bg-neon py-3.5 text-sm font-semibold text-primary-foreground neon-glow">
            Adicionar ao meu treino
          </button>
        </div>
      </div>
    </div>
  );
}
