import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, Save, Search, Dumbbell, Users, ChevronLeft, Activity, Timer, Flame } from "lucide-react";

export const Route = createFileRoute("/trainer")({
  component: TrainerDashboard,
});

type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  load: string;
  rest: string;
};

const athletes = [
  { id: "1", name: "Marina Souza", goal: "Hypertrophy", avatar: "MS" },
  { id: "2", name: "Diego Ferraz", goal: "Strength", avatar: "DF" },
  { id: "3", name: "Lucas Tavares", goal: "Conditioning", avatar: "LT" },
  { id: "4", name: "Ana Beatriz", goal: "Fat loss", avatar: "AB" },
  { id: "5", name: "Pedro Henrique", goal: "Powerlifting", avatar: "PH" },
];

const exerciseLibrary = [
  "Bench Press", "Back Squat", "Deadlift", "Pull-up", "Overhead Press",
  "Barbell Row", "Leg Press", "Dumbbell Curl", "Tricep Dip", "Box Jump",
];

function TrainerDashboard() {
  const [selectedAthlete, setSelectedAthlete] = useState(athletes[0].id);
  const [workoutType, setWorkoutType] = useState("Musculação");
  const [workoutName, setWorkoutName] = useState("Hypertrophy — Upper Body");
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: "e1", name: "Bench Press", sets: 4, reps: "8-10", load: "70 kg", rest: "90s" },
    { id: "e2", name: "Barbell Row", sets: 4, reps: "8", load: "60 kg", rest: "90s" },
    { id: "e3", name: "Overhead Press", sets: 3, reps: "10", load: "40 kg", rest: "60s" },
  ]);

  const addExercise = () => {
    setExercises((prev) => [
      ...prev,
      { id: `e${Date.now()}`, name: "", sets: 3, reps: "10", load: "", rest: "60s" },
    ]);
  };
  const updateExercise = (id: string, patch: Partial<Exercise>) => {
    setExercises((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  };
  const removeExercise = (id: string) => {
    setExercises((prev) => prev.filter((e) => e.id !== id));
  };

  const athlete = athletes.find((a) => a.id === selectedAthlete)!;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-border bg-surface/40 p-6 lg:block">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Back
          </Link>
          <div className="mt-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon text-primary-foreground">
              <Dumbbell className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">PULSE Coach</div>
              <div className="text-xs text-muted-foreground">Trainer console</div>
            </div>
          </div>
          <nav className="mt-10 space-y-1 text-sm">
            {[
              { icon: Activity, label: "Workout Builder", active: true },
              { icon: Users, label: "Athletes" },
              { icon: Flame, label: "Programs" },
              { icon: Timer, label: "Sessions" },
            ].map((n) => (
              <button
                key={n.label}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition ${
                  n.active
                    ? "bg-neon/10 text-neon"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground"
                }`}
              >
                <n.icon className="h-4 w-4" /> {n.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 lg:p-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Workout Builder</div>
              <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Design today's session</h1>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-neon px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 neon-glow">
              <Save className="h-4 w-4" /> Save workout
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Builder */}
            <section className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Athlete">
                    <select
                      value={selectedAthlete}
                      onChange={(e) => setSelectedAthlete(e.target.value)}
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-neon"
                    >
                      {athletes.map((a) => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Workout type">
                    <select
                      value={workoutType}
                      onChange={(e) => setWorkoutType(e.target.value)}
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-neon"
                    >
                      {["Musculação", "CrossFit", "Funcional", "HIIT", "Mobilidade", "Powerlifting"].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Workout name">
                      <input
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-neon"
                      />
                    </Field>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Exercises <span className="text-muted-foreground">· {exercises.length}</span></h2>
                  <button
                    onClick={addExercise}
                    className="flex items-center gap-2 rounded-lg border border-neon/40 bg-neon/10 px-3 py-1.5 text-sm font-medium text-neon transition hover:bg-neon/20"
                  >
                    <Plus className="h-4 w-4" /> Add exercise
                  </button>
                </div>

                <div className="space-y-3">
                  {exercises.map((ex, i) => (
                    <div key={ex.id} className="group rounded-xl border border-border bg-surface/50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neon-blue/15 text-xs font-bold text-neon-blue">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="relative flex-1">
                          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                          <input
                            list={`lib-${ex.id}`}
                            value={ex.name}
                            onChange={(e) => updateExercise(ex.id, { name: e.target.value })}
                            placeholder="Search exercise..."
                            className="w-full rounded-lg border border-border bg-input py-2 pl-9 pr-3 text-sm outline-none focus:border-neon"
                          />
                          <datalist id={`lib-${ex.id}`}>
                            {exerciseLibrary.map((n) => <option key={n} value={n} />)}
                          </datalist>
                        </div>
                        <button
                          onClick={() => removeExercise(ex.id)}
                          className="rounded-lg border border-border p-2 text-muted-foreground transition hover:border-destructive/50 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        <MiniField label="Sets">
                          <input
                            type="number"
                            value={ex.sets}
                            onChange={(e) => updateExercise(ex.id, { sets: Number(e.target.value) })}
                            className="w-full rounded-md border border-border bg-input px-2 py-1.5 text-sm outline-none focus:border-neon"
                          />
                        </MiniField>
                        <MiniField label="Reps">
                          <input
                            value={ex.reps}
                            onChange={(e) => updateExercise(ex.id, { reps: e.target.value })}
                            className="w-full rounded-md border border-border bg-input px-2 py-1.5 text-sm outline-none focus:border-neon"
                          />
                        </MiniField>
                        <MiniField label="Load">
                          <input
                            value={ex.load}
                            onChange={(e) => updateExercise(ex.id, { load: e.target.value })}
                            placeholder="kg"
                            className="w-full rounded-md border border-border bg-input px-2 py-1.5 text-sm outline-none focus:border-neon"
                          />
                        </MiniField>
                        <MiniField label="Rest">
                          <input
                            value={ex.rest}
                            onChange={(e) => updateExercise(ex.id, { rest: e.target.value })}
                            className="w-full rounded-md border border-border bg-input px-2 py-1.5 text-sm outline-none focus:border-neon"
                          />
                        </MiniField>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Athlete preview */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-neon to-neon-blue text-sm font-bold text-primary-foreground">
                    {athlete.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{athlete.name}</div>
                    <div className="text-xs text-muted-foreground">Goal · {athlete.goal}</div>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  <Stat label="Sessions" value="24" />
                  <Stat label="Adherence" value="92%" />
                  <Stat label="PRs" value="7" />
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-sm font-semibold">Session summary</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <Row k="Type" v={workoutType} />
                  <Row k="Exercises" v={String(exercises.length)} />
                  <Row k="Total sets" v={String(exercises.reduce((s, e) => s + e.sets, 0))} />
                  <Row k="Est. duration" v={`${Math.max(20, exercises.length * 10)} min`} />
                </ul>
                <Link
                  to="/student/workout"
                  className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-neon-blue/40 bg-neon-blue/10 px-3 py-2 text-sm font-medium text-neon-blue transition hover:bg-neon-blue/20"
                >
                  Preview as athlete →
                </Link>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
function MiniField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface/50 py-2">
      <div className="text-lg font-bold neon-text">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex justify-between border-b border-border/50 pb-2 last:border-0">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </li>
  );
}
