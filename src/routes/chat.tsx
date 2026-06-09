import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Send, Plus, Dumbbell, X } from "lucide-react";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
});

type Msg = {
  id: string;
  from: "me" | "coach";
  text?: string;
  card?: { title: string; group: string; sets: string };
  time: string;
};

const initial: Msg[] = [
  { id: "1", from: "coach", text: "Bom dia André! Pronto para o treino de hoje?", time: "08:12" },
  { id: "2", from: "me", text: "Pronto sim, coach! Foco em peito?", time: "08:14" },
  { id: "3", from: "coach", text: "Sim. Vou enviar a ficha agora.", time: "08:14" },
  { id: "4", from: "coach", card: { title: "Peito & Tríceps", group: "Hipertrofia", sets: "6 exercícios · 24 séries" }, time: "08:15" },
];

function ChatPage() {
  const [msgs, setMsgs] = useState<Msg[]>(initial);
  const [text, setText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = () => {
    if (!text.trim()) return;
    setMsgs([...msgs, { id: Date.now().toString(), from: "me", text, time: now() }]);
    setText("");
    setTimeout(() => {
      setMsgs((m) => [...m, { id: Date.now().toString() + "r", from: "coach", text: "Recebido 💪", time: now() }]);
    }, 900);
  };

  const sendFicha = () => {
    setMsgs([...msgs, { id: Date.now().toString(), from: "me", card: { title: "Pernas — Quadríceps", group: "Força", sets: "5 exercícios · 20 séries" }, time: now() }]);
    setMenuOpen(false);
  };

  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-card/90 px-4 py-3 backdrop-blur">
        <Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-5 w-5" /></Link>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=200&q=80" alt="coach" className="h-10 w-10 rounded-full object-cover" />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-neon shadow-[0_0_10px_var(--neon)]" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold">Coach Diogo Lima</div>
          <div className="flex items-center gap-1 text-[11px] text-neon">
            <span className="h-1.5 w-1.5 rounded-full bg-neon" /> Online
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 space-y-3 overflow-y-auto px-4 py-5 pb-32">
        {msgs.map((m) => (
          <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[78%] ${m.card ? "" : "rounded-2xl px-3.5 py-2 text-sm"} ${
              m.from === "me"
                ? "bg-zinc-800 text-foreground rounded-br-sm"
                : "border border-neon/20 bg-neon/5 text-foreground rounded-bl-sm"
            }`}>
              {m.text && <p className="leading-relaxed">{m.text}</p>}
              {m.card && (
                <div className="overflow-hidden rounded-2xl border border-neon/40 bg-card">
                  <div className="flex items-center gap-3 border-b border-border bg-neon/10 px-3 py-2">
                    <Dumbbell className="h-4 w-4 text-neon" />
                    <div className="text-[10px] font-mono uppercase tracking-widest text-neon">Nova ficha de treino</div>
                  </div>
                  <div className="p-3">
                    <div className="text-base font-bold">{m.card.title}</div>
                    <div className="text-xs text-muted-foreground">{m.card.group}</div>
                    <div className="mt-2 text-[11px] text-muted-foreground">{m.card.sets}</div>
                    <Link to="/student/workout" className="mt-3 inline-flex items-center justify-center rounded-lg bg-neon px-3 py-1.5 text-xs font-bold text-primary-foreground">
                      Abrir ficha
                    </Link>
                  </div>
                </div>
              )}
              <div className={`mt-1 text-[10px] ${m.from === "me" ? "text-zinc-500" : "text-muted-foreground"}`}>{m.time}</div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </main>

      {/* Composer */}
      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md border-t border-border bg-card/95 p-3 backdrop-blur">
        {menuOpen && (
          <div className="mb-3 rounded-2xl border border-border bg-surface p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Enviar</span>
              <button onClick={() => setMenuOpen(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            <button onClick={sendFicha} className="mt-2 flex w-full items-center gap-3 rounded-xl border border-neon/40 bg-neon/10 p-3 text-left">
              <Dumbbell className="h-5 w-5 text-neon" />
              <div>
                <div className="text-sm font-bold">Nova ficha de treino</div>
                <div className="text-[11px] text-muted-foreground">Partilhar rotina como card no chat</div>
              </div>
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <button onClick={() => setMenuOpen((v) => !v)} className="flex h-10 w-10 items-center justify-center rounded-full border border-neon/40 bg-neon/10 text-neon">
            <Plus className={`h-4 w-4 transition ${menuOpen ? "rotate-45" : ""}`} />
          </button>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Escrever mensagem…"
            className="flex-1 rounded-full border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-neon/50"
          />
          <button onClick={send} className="flex h-10 w-10 items-center justify-center rounded-full bg-neon text-primary-foreground">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
