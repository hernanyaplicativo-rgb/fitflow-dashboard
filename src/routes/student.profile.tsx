import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowLeft, Camera, Save, Trophy, Flame, Dumbbell, Target } from "lucide-react";

export const Route = createFileRoute("/student/profile")({
  component: StudentProfile,
});

function StudentProfile() {
  const [editing, setEditing] = useState(false);
  const [photo, setPhoto] = useState<string>(
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80",
  );
  const [profile, setProfile] = useState({
    name: "André Tavares",
    bio: "Sem dor, sem glória. Treino 5x por semana em Mindelo.",
    goal: "Ganho de Massa",
    weight: "78",
    height: "176",
  });

  // Cálculo automático 1RM = Carga * (1 + Reps/30)
  const bestLift = { carga: 95, reps: 5, exercise: "Supino reto" };
  const oneRM = useMemo(
    () => Math.round(bestLift.carga * (1 + bestLift.reps / 30)),
    [],
  );

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  return (
    <div className="relative min-h-screen bg-background pb-16">
      <div className="grid-bg absolute inset-x-0 top-0 h-64 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-3xl px-5 py-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Início
        </Link>

        {/* Header card */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="relative h-32 bg-gradient-to-br from-neon/30 via-transparent to-neon-blue/20">
            <div className="absolute inset-0 grid-bg opacity-40" />
          </div>
          <div className="px-6 pb-6">
            <div className="-mt-14 flex items-end justify-between">
              <div className="relative">
                <img
                  src={photo}
                  alt="avatar"
                  className="h-28 w-28 rounded-2xl border-4 border-card object-cover shadow-xl"
                />
                <label className="absolute -bottom-2 -right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-neon/50 bg-card text-neon hover:bg-neon/10">
                  <Camera className="h-4 w-4" />
                  <input type="file" accept="image/*" className="hidden" onChange={onPhoto} />
                </label>
              </div>
              <button
                onClick={() => setEditing((v) => !v)}
                className="flex items-center gap-1.5 rounded-full border border-neon/40 bg-neon/10 px-4 py-2 text-xs font-medium text-neon hover:bg-neon/20"
              >
                {editing ? <><Save className="h-3 w-3" /> Guardar</> : "Editar perfil"}
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <Field label="Nome" value={profile.name} editing={editing} onChange={(v) => setProfile({ ...profile, name: v })} />
              <Field label="Biografia" value={profile.bio} editing={editing} onChange={(v) => setProfile({ ...profile, bio: v })} multiline />
              <div className="grid grid-cols-3 gap-3">
                <Field label="Objetivo" value={profile.goal} editing={editing} onChange={(v) => setProfile({ ...profile, goal: v })} />
                <Field label="Peso (kg)" value={profile.weight} editing={editing} onChange={(v) => setProfile({ ...profile, weight: v })} />
                <Field label="Altura (cm)" value={profile.height} editing={editing} onChange={(v) => setProfile({ ...profile, height: v })} />
              </div>
            </div>
          </div>
        </div>

        {/* Histórico de Conquistas */}
        <section className="mt-6 rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-neon" />
            <h2 className="text-lg font-bold">Histórico de Conquistas</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Stat icon={Dumbbell} label="Treinos concluídos" value="142" tone="neon" />
            <Stat icon={Flame} label="Streak atual" value="14 dias" tone="neon" />
            <Stat icon={Target} label="Força Máxima Teórica (1RM)" value={`${oneRM} kg`} tone="blue" sub={`${bestLift.exercise} · ${bestLift.carga}kg × ${bestLift.reps}`} />
          </div>
          <div className="mt-4 rounded-xl border border-neon/30 bg-neon/5 p-4 text-xs text-muted-foreground">
            Fórmula 1RM = Carga × (1 + Repetições/30). Atualiza automaticamente a cada novo PR.
          </div>
        </section>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link to="/chat" className="rounded-2xl border border-border bg-card p-5 hover:border-neon/50">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Mensagens</div>
            <div className="mt-1 text-lg font-bold">Falar com o treinador →</div>
          </Link>
          <Link to="/student/workout" className="rounded-2xl border border-border bg-card p-5 hover:border-neon/50">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Hoje</div>
            <div className="mt-1 text-lg font-bold">Iniciar treino →</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, editing, onChange, multiline }: { label: string; value: string; editing: boolean; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      {editing ? (
        multiline ? (
          <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2} className="mt-1 w-full rounded-lg border border-border bg-surface/40 p-2 text-sm" />
        ) : (
          <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-surface/40 p-2 text-sm" />
        )
      ) : (
        <div className={`mt-0.5 ${multiline ? "text-sm text-muted-foreground" : "text-base font-semibold"}`}>{value}</div>
      )}
    </div>
  );
}

function Stat({ icon: Icon, label, value, tone, sub }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; tone: "neon" | "blue"; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/40 p-4">
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone === "neon" ? "bg-neon/15 text-neon" : "bg-neon-blue/15 text-neon-blue"}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-0.5 text-2xl font-bold ${tone === "neon" ? "neon-text" : "text-neon-blue"}`}>{value}</div>
      {sub && <div className="mt-1 text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  );
}
