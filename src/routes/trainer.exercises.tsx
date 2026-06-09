import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Camera, Plus, Dumbbell, Trash2 } from "lucide-react";

export const Route = createFileRoute("/trainer/exercises")({
  component: TrainerExercises,
});

type Exercise = {
  id: string;
  name: string;
  group: string;
  sets: number;
  reps: string;
  load: string;
  image: string;
};

const initial: Exercise[] = [
  { id: "1", name: "Supino reto com barra", group: "Peito", sets: 4, reps: "8-10", load: "60", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80" },
  { id: "2", name: "Agachamento livre", group: "Pernas", sets: 5, reps: "5", load: "100", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80" },
];

function TrainerExercises() {
  const [list, setList] = useState<Exercise[]>(initial);
  const [draft, setDraft] = useState<Omit<Exercise, "id">>({
    name: "", group: "Peito", sets: 3, reps: "10", load: "20", image: "",
  });

  const onImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setDraft({ ...draft, image: URL.createObjectURL(f) });
  };

  const save = () => {
    if (!draft.name.trim()) return;
    setList([{ ...draft, id: Date.now().toString(), image: draft.image || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80" }, ...list]);
    setDraft({ name: "", group: "Peito", sets: 3, reps: "10", load: "20", image: "" });
  };

  return (
    <div className="relative min-h-screen bg-background pb-16">
      <div className="grid-bg absolute inset-x-0 top-0 h-64 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-5xl px-5 py-8">
        <Link to="/trainer" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Painel
        </Link>

        <header className="mb-6">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Treinador / Dono</div>
          <h1 className="mt-1 text-4xl font-bold">Cadastro de <span className="neon-text">máquinas & exercícios</span></h1>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Form */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold">Novo exercício</h2>

            <label className="mt-4 block">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Imagem (foto real da máquina)</div>
              <div className="mt-2 flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-surface/40 hover:border-neon/50">
                {draft.image ? (
                  <img src={draft.image} alt="preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Camera className="h-6 w-6" />
                    <span className="text-xs">Toque para enviar foto</span>
                  </div>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={onImage} />
              </div>
            </label>

            <div className="mt-4 space-y-3">
              <Input label="Nome do exercício" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} placeholder="Ex: Supino inclinado halteres" />
              <div className="grid grid-cols-2 gap-3">
                <Select label="Grupo Muscular" value={draft.group} onChange={(v) => setDraft({ ...draft, group: v })} options={["Peito", "Costas", "Pernas", "Ombros", "Bíceps", "Tríceps", "Core", "Cardio"]} />
                <Input label="Séries" value={String(draft.sets)} onChange={(v) => setDraft({ ...draft, sets: Number(v) || 0 })} type="number" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Repetições" value={draft.reps} onChange={(v) => setDraft({ ...draft, reps: v })} placeholder="8-12" />
                <Input label="Carga padrão (kg)" value={draft.load} onChange={(v) => setDraft({ ...draft, load: v })} type="number" />
              </div>
            </div>

            <button onClick={save} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-neon px-4 py-3 text-sm font-bold text-primary-foreground hover:opacity-90">
              <Plus className="h-4 w-4" /> Adicionar ao catálogo
            </button>
          </section>

          {/* List */}
          <section>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Catálogo ({list.length})</div>
            <ul className="mt-3 space-y-3">
              {list.map((ex) => (
                <li key={ex.id} className="flex gap-4 overflow-hidden rounded-2xl border border-border bg-card">
                  <img src={ex.image} alt={ex.name} className="h-28 w-28 object-cover" />
                  <div className="flex flex-1 flex-col justify-center py-3 pr-3">
                    <div className="text-[10px] uppercase tracking-widest text-neon">{ex.group}</div>
                    <h3 className="mt-0.5 text-base font-bold">{ex.name}</h3>
                    <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
                      <Chip><Dumbbell className="h-3 w-3" /> {ex.sets}×{ex.reps}</Chip>
                      <Chip tone="blue">{ex.load} kg</Chip>
                    </div>
                  </div>
                  <button onClick={() => setList(list.filter((x) => x.id !== ex.id))} className="px-3 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-1 w-full rounded-lg border border-border bg-surface/40 px-3 py-2 text-sm outline-none focus:border-neon/50" />
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-surface/40 px-3 py-2 text-sm outline-none focus:border-neon/50">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "blue" }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 ${tone === "blue" ? "border-neon-blue/40 bg-neon-blue/10 text-neon-blue" : "border-border bg-surface text-muted-foreground"}`}>{children}</span>
  );
}
