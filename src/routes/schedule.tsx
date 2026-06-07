import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Calendar, Users, MapPin, Clock, Flame } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/schedule")({
  component: SchedulePage,
});

type Aula = {
  id: string;
  hora: string;
  duracao: number;
  nome: string;
  modalidade: "CrossFit" | "Pilates" | "HIIT" | "Yoga" | "Funcional";
  treinador: string;
  sala: string;
  vagas: number;
  total: number;
  intensidade: 1 | 2 | 3;
};

const semana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const aulasPorDia: Record<number, Aula[]> = {
  0: [
    { id: "a1", hora: "07:00", duracao: 60, nome: "CrossFit Manhã", modalidade: "CrossFit", treinador: "Diego F.", sala: "Box 1", vagas: 3, total: 12, intensidade: 3 },
    { id: "a2", hora: "09:30", duracao: 50, nome: "Pilates Solo", modalidade: "Pilates", treinador: "Marina S.", sala: "Estúdio A", vagas: 8, total: 10, intensidade: 1 },
    { id: "a3", hora: "18:00", duracao: 45, nome: "HIIT Express", modalidade: "HIIT", treinador: "Lucas T.", sala: "Sala Funcional", vagas: 0, total: 15, intensidade: 3 },
    { id: "a4", hora: "19:30", duracao: 60, nome: "Yoga Restaurativo", modalidade: "Yoga", treinador: "Ana B.", sala: "Estúdio B", vagas: 12, total: 20, intensidade: 1 },
  ],
  1: [
    { id: "b1", hora: "08:00", duracao: 50, nome: "Funcional Total", modalidade: "Funcional", treinador: "Pedro H.", sala: "Sala Funcional", vagas: 5, total: 12, intensidade: 2 },
    { id: "b2", hora: "12:30", duracao: 40, nome: "HIIT Almoço", modalidade: "HIIT", treinador: "Diego F.", sala: "Box 1", vagas: 6, total: 12, intensidade: 3 },
    { id: "b3", hora: "19:00", duracao: 60, nome: "CrossFit WOD", modalidade: "CrossFit", treinador: "Diego F.", sala: "Box 1", vagas: 2, total: 12, intensidade: 3 },
  ],
  2: [
    { id: "c1", hora: "07:00", duracao: 60, nome: "CrossFit Manhã", modalidade: "CrossFit", treinador: "Diego F.", sala: "Box 1", vagas: 4, total: 12, intensidade: 3 },
    { id: "c2", hora: "18:30", duracao: 45, nome: "Pilates Avançado", modalidade: "Pilates", treinador: "Marina S.", sala: "Estúdio A", vagas: 1, total: 8, intensidade: 2 },
  ],
  3: [
    { id: "d1", hora: "08:00", duracao: 50, nome: "Funcional Total", modalidade: "Funcional", treinador: "Pedro H.", sala: "Sala Funcional", vagas: 7, total: 12, intensidade: 2 },
    { id: "d2", hora: "19:00", duracao: 60, nome: "Yoga Vinyasa", modalidade: "Yoga", treinador: "Ana B.", sala: "Estúdio B", vagas: 9, total: 20, intensidade: 1 },
  ],
  4: [
    { id: "e1", hora: "07:30", duracao: 45, nome: "HIIT Sexta", modalidade: "HIIT", treinador: "Lucas T.", sala: "Sala Funcional", vagas: 0, total: 15, intensidade: 3 },
    { id: "e2", hora: "18:00", duracao: 60, nome: "CrossFit Team", modalidade: "CrossFit", treinador: "Diego F.", sala: "Box 1", vagas: 6, total: 12, intensidade: 3 },
  ],
  5: [
    { id: "f1", hora: "09:00", duracao: 90, nome: "CrossFit Comp.", modalidade: "CrossFit", treinador: "Diego F.", sala: "Box 1", vagas: 3, total: 16, intensidade: 3 },
    { id: "f2", hora: "11:00", duracao: 60, nome: "Pilates Open", modalidade: "Pilates", treinador: "Marina S.", sala: "Estúdio A", vagas: 5, total: 10, intensidade: 2 },
  ],
  6: [],
};

const corPorModalidade: Record<string, string> = {
  CrossFit: "border-neon/40 bg-neon/10 text-neon",
  Pilates: "border-neon-blue/40 bg-neon-blue/10 text-neon-blue",
  HIIT: "border-destructive/40 bg-destructive/10 text-destructive",
  Yoga: "border-purple-400/40 bg-purple-400/10 text-purple-300",
  Funcional: "border-orange-400/40 bg-orange-400/10 text-orange-300",
};

function SchedulePage() {
  const [dia, setDia] = useState(0);
  const [inscritas, setInscritas] = useState<Set<string>>(new Set());
  const aulas = aulasPorDia[dia] ?? [];

  const toggle = (aula: Aula) => {
    if (aula.vagas === 0 && !inscritas.has(aula.id)) {
      toast.error("Aula lotada", { description: "Entra na lista de espera ou escolhe outro horário." });
      return;
    }
    setInscritas((prev) => {
      const next = new Set(prev);
      if (next.has(aula.id)) {
        next.delete(aula.id);
        toast("Inscrição cancelada", { description: aula.nome });
      } else {
        next.add(aula.id);
        toast.success("Inscrito!", { description: `${aula.nome} · ${semana[dia]} ${aula.hora}` });
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" /> Hub
        </Link>

        <header className="relative mt-6 overflow-hidden rounded-3xl border border-border">
          <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80" alt="Aulas coletivas" className="h-52 w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neon">
              <Calendar className="h-3 w-3" /> Aulas Coletivas
            </div>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Agenda Semanal</h1>
            <p className="mt-1 text-sm text-muted-foreground">CrossFit · Pilates · HIIT · Yoga · Funcional</p>
          </div>
        </header>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {semana.map((d, i) => (
            <button
              key={d}
              onClick={() => setDia(i)}
              className={`flex min-w-[64px] flex-col items-center rounded-2xl border px-3 py-3 text-xs transition ${
                dia === i
                  ? "border-neon bg-neon/10 text-neon neon-glow"
                  : "border-border bg-card text-muted-foreground hover:border-neon/30"
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider">{d}</span>
              <span className="mt-1 text-lg font-bold text-foreground">{8 + i}</span>
              <span className="mt-0.5 text-[10px]">{aulasPorDia[i]?.length ?? 0} aulas</span>
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {aulas.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center">
              <Calendar className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">Sem aulas agendadas para {semana[dia]}.</p>
            </div>
          ) : (
            aulas.map((aula) => {
              const inscrita = inscritas.has(aula.id);
              const ocupacao = ((aula.total - aula.vagas) / aula.total) * 100;
              return (
                <div
                  key={aula.id}
                  className={`overflow-hidden rounded-2xl border bg-card p-5 transition ${
                    inscrita ? "border-neon/60 neon-glow" : "border-border hover:border-neon-blue/40"
                  }`}
                >
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="flex flex-col items-center rounded-xl bg-surface/60 px-3 py-2">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Hora</div>
                      <div className="text-xl font-bold tabular-nums">{aula.hora}</div>
                      <div className="text-[10px] text-muted-foreground">{aula.duracao} min</div>
                    </div>

                    <div className="flex-1 min-w-[180px]">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider ${corPorModalidade[aula.modalidade]}`}>
                          {aula.modalidade}
                        </span>
                        <span className="flex items-center gap-0.5">
                          {Array.from({ length: 3 }).map((_, k) => (
                            <Flame
                              key={k}
                              className={`h-3 w-3 ${k < aula.intensidade ? "text-neon" : "text-muted-foreground/30"}`}
                            />
                          ))}
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-lg font-semibold">{aula.nome}</h3>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" />{aula.treinador}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{aula.sala}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{aula.duracao} min</span>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                          <div
                            className={`h-full rounded-full transition-all ${ocupacao >= 100 ? "bg-destructive" : ocupacao >= 80 ? "bg-neon" : "bg-neon-blue"}`}
                            style={{ width: `${Math.min(100, ocupacao)}%` }}
                          />
                        </div>
                        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                          {aula.total - aula.vagas}/{aula.total}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggle(aula)}
                      className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                        inscrita
                          ? "border border-neon bg-neon text-primary-foreground"
                          : aula.vagas === 0
                          ? "border border-border bg-surface/50 text-muted-foreground"
                          : "border border-neon-blue/40 bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20"
                      }`}
                    >
                      {inscrita ? "Inscrito ✓" : aula.vagas === 0 ? "Lista de espera" : "Inscrever"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
