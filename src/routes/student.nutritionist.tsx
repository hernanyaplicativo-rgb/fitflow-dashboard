import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Send, Sparkles, Target, Flame, Droplet } from "lucide-react";

export const Route = createFileRoute("/student/nutritionist")({
  component: NutritionistChat,
});

type Refeicao = { hora: string; nome: string; kcal: number; macros: string };
type Msg = { id: string; role: "ai" | "user"; content: string; plano?: Refeicao[] };

const initialMessages: Msg[] = [
  {
    id: "m1",
    role: "ai",
    content:
      "Olá Marina! Como és **ectomorfa** e tens como meta **ganho de massa**, montei um plano com produtos acessíveis no mercado de Mindelo:",
    plano: [
      { hora: "07:00", nome: "Papa de aveia + banana + ovo cozido", kcal: 520, macros: "P40 · HC70 · G12" },
      { hora: "10:30", nome: "Sanduíche de atum em pão integral + sumo natural", kcal: 480, macros: "P38 · HC45 · G18" },
      { hora: "13:00", nome: "Cachupa rica (milho, feijão, carne) + salada", kcal: 780, macros: "P55 · HC90 · G22" },
      { hora: "16:00", nome: "Iogurte natural + amendoim torrado", kcal: 320, macros: "P22 · HC20 · G18" },
      { hora: "20:00", nome: "Garoupa grelhada + batata-doce + legumes", kcal: 700, macros: "P50 · HC60 · G26" },
    ],
  },
];

function NutritionistChat() {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { id: `u${Date.now()}`, role: "user", content: input };
    const aiMsg: Msg = {
      id: `a${Date.now()}`,
      role: "ai",
      content:
        "Boa pergunta! Suplementar com **creatina monohidratada (5g/dia)** ajuda na performance. Para o pós-treino, mantém whey + uma fruta (banana ou manga) até 1h depois do treino.",
    };
    setMessages((m) => [...m, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 px-5 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-neon text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-neon" />
            </div>
            <div>
              <div className="text-sm font-semibold">Nutri IA</div>
              <div className="text-[10px] text-muted-foreground">Online · responde em segundos</div>
            </div>
          </div>
          <div className="w-9" />
        </div>

        {/* Floating profile card */}
        <div className="mt-4 rounded-2xl border border-neon/30 bg-card p-3 neon-glow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-neon to-neon-blue text-xs font-bold text-primary-foreground">
                MS
              </div>
              <div>
                <div className="text-sm font-semibold">Marina Sousa</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Ectomorfa · Ganho de massa</div>
              </div>
            </div>
            <span className="rounded-full border border-neon/40 bg-neon/10 px-2 py-0.5 text-[10px] text-neon">Ativo</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Bio icon={Target} label="Meta" value="Massa" />
            <Bio icon={Flame} label="Alvo" value="2800 kcal" />
            <Bio icon={Droplet} label="Água" value="3.2 L" />
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-4 overflow-y-auto px-5 py-6">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                m.role === "user"
                  ? "rounded-br-sm bg-neon text-primary-foreground"
                  : "rounded-bl-sm border border-border bg-card"
              }`}
            >
              <div dangerouslySetInnerHTML={{ __html: m.content.replace(/\*\*(.+?)\*\*/g, "<strong class='text-neon-blue'>$1</strong>") }} />
              {m.plano && (
                <div className="mt-3 space-y-2">
                  {m.plano.map((meal, i) => (
                    <div key={i} className="rounded-xl border border-border bg-surface/60 p-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-neon">{meal.hora}</span>
                        <span className="font-semibold">{meal.kcal} kcal</span>
                      </div>
                      <div className="mt-1 text-sm font-medium">{meal.nome}</div>
                      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                        {meal.macros}
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between border-t border-border pt-2 text-xs">
                    <span className="text-muted-foreground">Total diário</span>
                    <span className="font-bold neon-text">2.800 kcal</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </main>

      <footer className="sticky bottom-0 border-t border-border bg-background/95 p-4 backdrop-blur">
        <div className="flex items-end gap-2 rounded-2xl border border-border bg-card p-2">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Pergunta sobre dieta, suplementos..."
            className="flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={send}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neon text-primary-foreground transition hover:brightness-110 neon-glow"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}

function Bio({ icon: Icon, label, value }: { icon: typeof Target; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface/60 px-2 py-1.5">
      <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="mt-0.5 text-sm font-bold neon-text-blue">{value}</div>
    </div>
  );
}
