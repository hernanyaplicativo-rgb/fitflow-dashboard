import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, Pause, Play, RotateCcw, Timer, Flame } from "lucide-react";

import { useStore, type Exercise } from "../lib/store";

export const Route = createFileRoute("/student/workout")({
  component: StudentWorkout,
});

function StudentWorkout() {
  const treino = useStore((state) => state.workout);
  const [done, setDone] = useState<Record<string, number>>({});
  const [timer, setTimer] = useState<{ exId: string; remaining: number; running: boolean } | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timer?.running) {
      intervalRef.current = setInterval(() => {
        setTimer((t) => {
          if (!t) return t;
          if (t.remaining <= 1) return { ...t, remaining: 0, running: false };
          return { ...t, remaining: t.remaining - 1 };
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [timer?.running]);

  const completeSet = (ex: Exercise) => {
    setDone((d) => ({ ...d, [ex.id]: Math.min(ex.sets, (d[ex.id] ?? 0) + 1) }));
    setTimer({ exId: ex.id, remaining: ex.rest, running: true });
  };

  const totalSets = treino.reduce((s, e) => s + e.sets, 0);
  const completedSets = Object.values(done).reduce((s, v) => s + v, 0);
  const pct = Math.round((completedSets / totalSets) * 100);

  return (
    <div className="relative mx-auto min-h-screen max-w-md overflow-hidden bg-background text-foreground">
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-64 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative px-5 pb-32 pt-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link to="/student/equipment" className="flex items-center gap-1.5 rounded-full border border-neon-blue/40 bg-neon-blue/10 px-3 py-1 text-xs text-neon-blue">
            Escanear máquina
          </Link>
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs">
            <Flame className="h-3 w-3 text-neon" /> Dia 3/5
          </div>
        </div>

        <header className="relative mt-6 overflow-hidden rounded-2xl border border-border">
          <img src="https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=900&q=80" alt="Treino" className="h-44 w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-neon">Treino de Hoje</div>
            <h1 className="mt-2 text-3xl font-bold leading-tight">
              Hipertrofia
              <br />
              <span className="neon-text">Membros Superiores</span>
            </h1>
          </div>
        </header>

        <div className="mt-6 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-semibold">{completedSets}/{totalSets} séries</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-neon to-neon-blue transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <ul className="mt-6 space-y-3">
          {treino.map((ex, i) => {
            const completedForEx = done[ex.id] ?? 0;
            const isComplete = completedForEx >= ex.sets;
            return (
              <li
                key={ex.id}
                className={`rounded-2xl border bg-card p-4 transition ${
                  isComplete ? "border-neon/40 opacity-70" : "border-border"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      Exercício {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className={`mt-0.5 text-lg font-semibold ${isComplete ? "line-through" : ""}`}>
                      {ex.name}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <Chip>{ex.sets} séries</Chip>
                      <Chip>{ex.reps} reps</Chip>
                      <Chip tone="blue">{ex.load}</Chip>
                      <Chip>{ex.rest}s descanso</Chip>
                    </div>
                    <div className="mt-3 flex gap-1.5">
                      {Array.from({ length: ex.sets }).map((_, k) => (
                        <div
                          key={k}
                          className={`h-1.5 flex-1 rounded-full ${
                            k < completedForEx ? "bg-neon shadow-[0_0_8px_var(--neon)]" : "bg-surface-2"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => !isComplete && completeSet(ex)}
                    disabled={isComplete}
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 transition ${
                      isComplete
                        ? "border-neon bg-neon text-primary-foreground"
                        : "border-neon/50 text-neon hover:bg-neon hover:text-primary-foreground hover:neon-glow"
                    }`}
                    aria-label="Marcar série como concluída"
                  >
                    <Check className="h-6 w-6" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {timer && timer.remaining > 0 && (
        <div className="fixed inset-x-0 bottom-6 z-40 mx-auto max-w-md px-5">
          <div className="flex items-center gap-3 rounded-2xl border border-neon-blue/40 bg-card/95 p-4 backdrop-blur neon-glow-blue">
            <div className="relative flex h-12 w-12 items-center justify-center">
              <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--surface-2)" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15" fill="none"
                  stroke="var(--neon-blue)" strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={`${(timer.remaining / (treino.find(e => e.id === timer.exId)?.rest ?? 60)) * 94} 94`}
                />
              </svg>
              <Timer className="h-4 w-4 text-neon-blue" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Descanso</div>
              <div className="text-2xl font-bold tabular-nums neon-text-blue">
                {String(Math.floor(timer.remaining / 60)).padStart(1, "0")}:{String(timer.remaining % 60).padStart(2, "0")}
              </div>
            </div>
            <button
              onClick={() => setTimer((t) => (t ? { ...t, running: !t.running } : t))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground"
            >
              {timer.running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setTimer(null)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "blue" }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 ${
        tone === "blue"
          ? "border-neon-blue/40 bg-neon-blue/10 text-neon-blue"
          : "border-border bg-surface-2 text-muted-foreground"
      }`}
    >
      {children}
    </span>
  );
}
