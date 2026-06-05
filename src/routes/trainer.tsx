import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, Save, Search, Dumbbell, Users, ChevronLeft, Activity, Timer, Flame } from "lucide-react";

export const Route = createFileRoute("/trainer")({
  component: TrainerDashboard,
});

import { toast } from "sonner";
import { useStore, type Exercise, type Aluno } from "../lib/store";

const bibliotecaExercicios = [
  "Supino reto", "Agachamento livre", "Levantamento terra", "Barra fixa", "Desenvolvimento militar",
  "Remada curvada", "Leg Press 45°", "Rosca direta", "Tríceps no pulley", "Box Jump",
  "Burpees", "Kettlebell Swing", "Prancha abdominal",
];

const modalidades = ["Musculação", "CrossFit", "Pilates", "Funcional", "HIIT", "Mobilidade"];

function TrainerDashboard() {
  const { alunos, addAluno, setWorkout } = useStore();
  const [activeTab, setActiveTab] = useState("Criador de Treinos");
  const [alunoSelecionado, setAlunoSelecionado] = useState(alunos[0]?.id || "");
  const [modalidade, setModalidade] = useState("Musculação");
  const [nomeTreino, setNomeTreino] = useState("Hipertrofia — Membros Superiores");
  const [exercicios, setExercicios] = useState<Exercise[]>([
    { id: "e1", name: "Supino reto", sets: 4, reps: "8-10", load: "70 kg", rest: 90 },
    { id: "e2", name: "Remada curvada", sets: 4, reps: "8", load: "60 kg", rest: 90 },
    { id: "e3", name: "Desenvolvimento militar", sets: 3, reps: "10", load: "40 kg", rest: 60 },
  ]);

  const addExercise = () => {
    setExercicios((prev) => [
      ...prev,
      { id: `e${Date.now()}`, name: "", sets: 3, reps: "10", load: "", rest: 60 },
    ]);
  };
  const updateExercise = (id: string, patch: Partial<Exercise>) => {
    setExercicios((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  };
  const removeExercise = (id: string) => {
    setExercicios((prev) => prev.filter((e) => e.id !== id));
  };

  const aluno = alunos.find((a) => a.id === alunoSelecionado) || alunos[0];

  const handleSave = () => {
    setWorkout(exercicios);
    toast.success("Treino guardado com sucesso!", {
      description: `Sessão "${nomeTreino}" atribuída a ${aluno.name}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <aside className="hidden w-64 shrink-0 border-r border-border bg-surface/40 p-6 lg:block">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Voltar
          </Link>
          <div className="mt-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon text-primary-foreground">
              <Dumbbell className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">PULSE Treinador</div>
              <div className="text-xs text-muted-foreground">Painel do professor</div>
            </div>
          </div>
          <nav className="mt-10 space-y-1 text-sm">
            {[
              { icon: Activity, label: "Criador de Treinos" },
              { icon: Users, label: "Alunos" },
              { icon: Flame, label: "Programas" },
              { icon: Timer, label: "Sessões" },
            ].map((n) => (
              <button
                key={n.label}
                onClick={() => setActiveTab(n.label)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition ${
                  activeTab === n.label
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
          {activeTab === "Criador de Treinos" ? (
            <>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Criador de Treinos</div>
                  <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Monte a ficha de hoje</h1>
                </div>
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-xl bg-neon px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 neon-glow"
                >
                  <Save className="h-4 w-4" /> Guardar treino
                </button>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <section className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Aluno">
                    <select
                      value={alunoSelecionado}
                      onChange={(e) => setAlunoSelecionado(e.target.value)}
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-neon"
                    >
                      {alunos.map((a) => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Modalidade">
                    <select
                      value={modalidade}
                      onChange={(e) => setModalidade(e.target.value)}
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-neon"
                    >
                      {modalidades.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Nome do treino">
                      <input
                        value={nomeTreino}
                        onChange={(e) => setNomeTreino(e.target.value)}
                        className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-neon"
                      />
                    </Field>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Exercícios <span className="text-muted-foreground">· {exercicios.length}</span></h2>
                  <button
                    onClick={addExercise}
                    className="flex items-center gap-2 rounded-lg border border-neon/40 bg-neon/10 px-3 py-1.5 text-sm font-medium text-neon transition hover:bg-neon/20"
                  >
                    <Plus className="h-4 w-4" /> Adicionar exercício
                  </button>
                </div>

                <div className="space-y-3">
                  {exercicios.map((ex, i) => (
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
                            placeholder="Pesquisar exercício..."
                            className="w-full rounded-lg border border-border bg-input py-2 pl-9 pr-3 text-sm outline-none focus:border-neon"
                          />
                          <datalist id={`lib-${ex.id}`}>
                            {bibliotecaExercicios.map((n) => <option key={n} value={n} />)}
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
                        <MiniField label="Séries">
                          <input
                            type="number"
                            value={ex.sets}
                            onChange={(e) => updateExercise(ex.id, { sets: Number(e.target.value) })}
                            className="w-full rounded-md border border-border bg-input px-2 py-1.5 text-sm outline-none focus:border-neon"
                          />
                        </MiniField>
                        <MiniField label="Repetições">
                          <input
                            value={ex.reps}
                            onChange={(e) => updateExercise(ex.id, { reps: e.target.value })}
                            className="w-full rounded-md border border-border bg-input px-2 py-1.5 text-sm outline-none focus:border-neon"
                          />
                        </MiniField>
                        <MiniField label="Carga">
                          <input
                            value={ex.load}
                            onChange={(e) => updateExercise(ex.id, { load: e.target.value })}
                            placeholder="kg"
                            className="w-full rounded-md border border-border bg-input px-2 py-1.5 text-sm outline-none focus:border-neon"
                          />
                        </MiniField>
                        <MiniField label="Descanso (s)">
                          <input
                            type="number"
                            value={ex.rest}
                            onChange={(e) => updateExercise(ex.id, { rest: Number(e.target.value) })}
                            className="w-full rounded-md border border-border bg-input px-2 py-1.5 text-sm outline-none focus:border-neon"
                          />
                        </MiniField>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-neon to-neon-blue text-sm font-bold text-primary-foreground">
                    {aluno.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{aluno.name}</div>
                    <div className="text-xs text-muted-foreground">Objetivo · {aluno.goal}</div>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  <Stat label="Sessões" value="24" />
                  <Stat label="Adesão" value="92%" />
                  <Stat label="Recordes" value="7" />
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-sm font-semibold">Resumo da sessão</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <Row k="Modalidade" v={modalidade} />
                  <Row k="Exercícios" v={String(exercicios.length)} />
                  <Row k="Séries totais" v={String(exercicios.reduce((s, e) => s + e.sets, 0))} />
                  <Row k="Duração estimada" v={`${Math.max(20, exercicios.length * 10)} min`} />
                </ul>
                <Link
                  to="/student/workout"
                  className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-neon-blue/40 bg-neon-blue/10 px-3 py-2 text-sm font-medium text-neon-blue transition hover:bg-neon-blue/20"
                >
                  Pré-visualizar como aluno →
                </Link>
              </div>
              </aside>
            </div>
          </>
        ) : activeTab === "Alunos" ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Gestão de Alunos</h1>
              <button 
                onClick={() => {
                  const newAluno: Aluno = { id: Date.now().toString(), name: "Novo Aluno", goal: "Iniciante", avatar: "NA" };
                  addAluno(newAluno);
                  toast.success("Aluno adicionado!", { description: "Novo Aluno está agora disponível." });
                }}
                className="flex items-center gap-2 rounded-xl bg-neon px-4 py-2 text-sm font-semibold text-primary-foreground neon-glow"
              >
                <Plus className="h-4 w-4" /> Novo Aluno
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {alunos.map(a => (
                <div key={a.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-neon/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-neon to-neon-blue text-sm font-bold text-primary-foreground">
                    {a.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-xs text-muted-foreground">{a.goal}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === "Programas" ? (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Programas de Treino</h1>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Hipertrofia 12 Semanas", "Seca Verão", "Força Máxima", "Iniciante Total"].map(prog => (
                <div key={prog} className="rounded-2xl border border-border bg-card p-6 transition hover:border-neon-blue/40">
                  <Flame className="h-6 w-6 text-neon-blue mb-3" />
                  <h3 className="text-lg font-semibold">{prog}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Programa pré-construído com várias semanas.</p>
                  <button className="mt-4 rounded-lg bg-surface px-4 py-2 text-xs font-medium hover:bg-surface-2">Ver detalhes</button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Sessões de Hoje</h1>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="border-b border-border p-4 text-sm font-medium">Próximas Sessões</div>
              <ul className="divide-y divide-border">
                {["09:00 - Marina Sousa", "11:30 - Lucas Tavares", "15:00 - Ana Beatriz"].map(sessao => (
                  <li key={sessao} className="p-4 hover:bg-surface/50 flex items-center justify-between">
                    <span>{sessao}</span>
                    <button className="text-neon text-xs hover:underline">Iniciar Acompanhamento</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
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
