import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, Pause, Play, Plus, RotateCcw, Timer, Flame } from "lucide-react";

export const Route = createFileRoute("/student/workout")({
  component: StudentWorkout,
});

type SetRow = { id: string; load: string; reps: string; done: boolean };

type Block = {
  id: string;
  name: string;
  image: string;
  group: string;
  sets: SetRow[];
};

const initial: Block[] = [
  {
    id: "1",
    name: "Supino reto com barra",
    group: "Peito",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
    sets: [
      { id: "a", load: "60", reps: "10", done: false },
      { id: "b", load: "65", reps: "8", done: false },
      { id: "c", load: "70", reps: "8", done: false },
      { id: "d", load: "70", reps: "6", done: false },
    ],
  },
  {
    id: "2",
    name: "Remada curvada",
    group: "Costas",
    image: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=900&q=80",
    sets: [
      { id: "a", load: "50", reps: "10", done: false },
      { id: "b", load: "55", reps: "8", done: false },
      { id: "c", load: "60", reps: "8", done: false },
    ],
  },
  {
    id: "3",
    name: "Desenvolvimento militar",
    group: "Ombros",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80",
    sets: [
      { id: "a", load: "30", reps: "10", done: false },
      { id: "b", load: "35", reps: "8", done: false },
      { id: "c", load: "40", reps: "6", done: false },
    ],
  },
];

const REST = 60;

function StudentWorkout() {
  const [blocks, setBlocks] = useState<Block[]>(initial);
  const [rest, setRest] = useState<{ remaining: number; running: boolean } | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (rest?.running) {
      intervalRef.current = setInterval(() => {
        setRest((r) => {
          if (!r) return r;
          if (r.remaining <= 1) return { remaining: 0, running: false };
          return { ...r, remaining: r.remaining - 1 };
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [rest?.running]);

  const toggleSet = (bId: string, sId: string) => {
    setBlocks((bs) => bs.map((b) => b.id !== bId ? b : {
      ...b, sets: b.sets.map((s) => s.id !== sId ? s : { ...s, done: !s.done }),
    }));
    setRest({ remaining: REST, running: true });
  };

  const editSet = (bId: string, sId: string, key: "load" | "reps", val: string) => {
    setBlocks((bs) => bs.map((b) => b.id !== bId ? b : {
      ...b, sets: b.sets.map((s) => s.id !== sId ? s : { ...s, [key]: val }),
    }));
  };

  const addSet = (bId: string) => {
    setBlocks((bs) => bs.map((b) => b.id !== bId ? b : {
      ...b, sets: [...b.sets, { id: Date.now().toString(), load: b.sets.at(-1)?.load ?? "20", reps: b.sets.at(-1)?.reps ?? "10", done: false }],
    }));
  };

  const totalSets = blocks.reduce((s, b) => s + b.sets.length, 0);
  const doneSets = blocks.reduce((s, b) => s + b.sets.filter((x) => x.done).length, 0);
  const pct = Math.round((doneSets / totalSets) * 100);

  return (
    <div className="relative mx-auto min-h-screen max-w-md bg-background pb-40">
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-64 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      {/* Rest timer (top, fixed) */}
      {rest && rest.remaining > 0 && (
        <div className="sticky top-0 z-30 mx-auto max-w-md border-b border-neon-blue/40 bg-card/95 px-5 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--surface-2)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--neon-blue)" strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={`${(rest.remaining / REST) * 94} 94`} />
              </svg>
              <Timer className="h-3.5 w-3.5 text-neon-blue" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Descanso</div>
              <div className="text-xl font-bold tabular-nums neon-text-blue">
                0:{String(rest.remaining).padStart(2, "0")}
              </div>
            </div>
            <button onClick={() => setRest((t) => t ? { ...t, running: !t.running } : t)} className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface">
              {rest.running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button onClick={() => setRest(null)} className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="relative px-5 pt-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs">
            <Flame className="h-3 w-3 text-neon" /> Dia 3/5
          </div>
        </div>

        <header className="mt-6">
          <div className="text-xs uppercase tracking-[0.2em] text-neon">Treino de Hoje</div>
          <h1 className="mt-1 text-3xl font-bold">Peito <span className="neon-text">& Ombros</span></h1>
        </header>

        <div className="mt-5 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-semibold">{doneSets}/{totalSets} séries</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full bg-gradient-to-r from-neon to-neon-blue transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {blocks.map((b, i) => (
            <article key={b.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative h-36">
                <img src={b.image} alt={b.name} className="absolute inset-0 h-full w-full object-cover opacity-90" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="text-[10px] uppercase tracking-widest text-neon">Exercício {String(i + 1).padStart(2, "0")} · {b.group}</div>
                  <h2 className="text-lg font-bold">{b.name}</h2>
                </div>
              </div>

              {/* Sets table */}
              <div className="p-4">
                <div className="grid grid-cols-[28px_1fr_1fr_44px] items-center gap-2 px-1 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>#</span>
                  <span>Carga (kg)</span>
                  <span>Reps</span>
                  <span className="text-right">OK</span>
                </div>
                <div className="space-y-1.5">
                  {b.sets.map((s, idx) => (
                    <div key={s.id} className={`grid grid-cols-[28px_1fr_1fr_44px] items-center gap-2 rounded-lg border px-2 py-1.5 transition ${s.done ? "border-neon/40 bg-neon/5" : "border-border bg-surface/40"}`}>
                      <span className="text-sm font-bold tabular-nums text-muted-foreground">{idx + 1}º</span>
                      <input
                        type="number" inputMode="decimal" value={s.load}
                        onChange={(e) => editSet(b.id, s.id, "load", e.target.value)}
                        className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm tabular-nums outline-none focus:border-neon/50"
                      />
                      <input
                        type="number" inputMode="numeric" value={s.reps}
                        onChange={(e) => editSet(b.id, s.id, "reps", e.target.value)}
                        className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm tabular-nums outline-none focus:border-neon/50"
                      />
                      <button
                        onClick={() => toggleSet(b.id, s.id)}
                        aria-label="Marcar série"
                        className={`ml-auto flex h-9 w-9 items-center justify-center rounded-full border-2 transition ${
                          s.done
                            ? "border-neon bg-neon text-primary-foreground shadow-[0_0_14px_var(--neon)]"
                            : "border-neon/40 text-neon hover:bg-neon/10"
                        }`}
                      >
                        {s.done && <Check className="h-4 w-4" />}
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => addSet(b.id)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-neon/40 bg-neon/5 px-3 py-2 text-xs font-medium text-neon hover:bg-neon/10"
                >
                  <Plus className="h-3.5 w-3.5" /> Adicionar série
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
