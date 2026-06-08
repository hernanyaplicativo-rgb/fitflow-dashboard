import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, MessageCircle, Trophy, Flame, Zap, Crown, Medal, Target, ArrowLeft, Share2, Users } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/community")({
  component: CommunityPage,
});

const feed = [
  {
    id: 1,
    user: "Joana Silva",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    time: "há 12 min",
    type: "PR",
    title: "Novo recorde pessoal · Agachamento",
    detail: "100 kg × 5 reps · +5 kg",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80",
    likes: 24,
    comments: 6,
  },
  {
    id: 2,
    user: "Carlos Tavares",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    time: "há 1 h",
    type: "RUN",
    title: "Corrida matinal · Praia",
    detail: "8.4 km · 42:18 · 5:02/km",
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=1000&q=80",
    likes: 41,
    comments: 9,
  },
  {
    id: 3,
    user: "Marina Lopes",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    time: "há 3 h",
    type: "STREAK",
    title: "30 dias consecutivos 🔥",
    detail: "Desafio “Outubro Forte” concluído",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80",
    likes: 87,
    comments: 23,
  },
];

const liga = [
  { pos: 1, nome: "Marina Lopes", xp: 4820, ginasio: "Pulse Mindelo" },
  { pos: 2, nome: "Tu", xp: 4310, ginasio: "Pulse Mindelo", me: true },
  { pos: 3, nome: "Carlos Tavares", xp: 4105, ginasio: "Pulse Praia" },
  { pos: 4, nome: "Joana Silva", xp: 3890, ginasio: "Pulse Mindelo" },
  { pos: 5, nome: "Rui Monteiro", xp: 3502, ginasio: "Pulse Sal" },
  { pos: 6, nome: "Inês Brito", xp: 3211, ginasio: "Pulse Praia" },
];

const desafios = [
  { titulo: "30 dias de Cardio", participantes: 142, recompensa: "+500 XP · Badge Inferno", progresso: 67, cor: "neon" },
  { titulo: "Outubro Forte · Forças", participantes: 89, recompensa: "+300 XP · 10% CVE Loja", progresso: 40, cor: "blue" },
  { titulo: "10 000 passos diários", participantes: 318, recompensa: "Badge Maratonista", progresso: 85, cor: "neon" },
];

function CommunityPage() {
  const [tab, setTab] = useState<"feed" | "liga" | "desafios">("feed");
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  return (
    <div className="relative min-h-screen bg-background pb-20">
      <div className="grid-bg absolute inset-x-0 top-0 h-64 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="relative mx-auto max-w-3xl px-5 py-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Início
        </Link>

        <header className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Comunidade</div>
            <h1 className="mt-1 text-4xl font-bold">Treina <span className="neon-text">junto</span>.</h1>
            <p className="mt-1 text-sm text-muted-foreground">Feed, ligas semanais e desafios com a tua tribo PULSE.</p>
          </div>
          <div className="hidden rounded-xl border border-neon/40 bg-neon/10 px-3 py-2 text-right sm:block">
            <div className="flex items-center gap-1 text-xs text-neon"><Flame className="h-3 w-3" /> Streak</div>
            <div className="text-xl font-bold">14 dias</div>
          </div>
        </header>

        <div className="mb-6 flex rounded-xl border border-border bg-card/60 p-1 text-sm backdrop-blur">
          {([
            { k: "feed", l: "Feed", i: Users },
            { k: "liga", l: "Liga", i: Crown },
            { k: "desafios", l: "Desafios", i: Target },
          ] as const).map(({ k, l, i: Icon }) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 transition ${
                tab === k ? "bg-neon text-primary-foreground neon-glow" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-4 w-4" /> {l}
            </button>
          ))}
        </div>

        {tab === "feed" && (
          <div className="space-y-4">
            {feed.map((post) => (
              <article key={post.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="flex items-center gap-3 p-4">
                  <img src={post.avatar} alt={post.user} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{post.user}</div>
                    <div className="text-xs text-muted-foreground">{post.time}</div>
                  </div>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                    post.type === "PR" ? "border-neon/40 bg-neon/10 text-neon" :
                    post.type === "RUN" ? "border-neon-blue/40 bg-neon-blue/10 text-neon-blue" :
                    "border-orange-400/40 bg-orange-400/10 text-orange-300"
                  }`}>{post.type}</span>
                </div>
                <div className="relative">
                  <img src={post.image} alt={post.title} className="aspect-[16/10] w-full object-cover" loading="lazy" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-lg font-bold text-white">{post.title}</h3>
                    <p className="text-sm text-zinc-300">{post.detail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 text-sm">
                  <button
                    onClick={() => {
                      setLiked((s) => ({ ...s, [post.id]: !s[post.id] }));
                    }}
                    className={`flex items-center gap-1.5 transition ${liked[post.id] ? "text-neon" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Heart className={`h-4 w-4 ${liked[post.id] ? "fill-current" : ""}`} />
                    {post.likes + (liked[post.id] ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                    <MessageCircle className="h-4 w-4" /> {post.comments}
                  </button>
                  <button
                    onClick={() => toast("Link copiado!")}
                    className="ml-auto flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                  >
                    <Share2 className="h-4 w-4" /> Partilhar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {tab === "liga" && (
          <div className="rounded-2xl border border-border bg-card p-2">
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Liga semanal</div>
                <div className="text-lg font-bold">Cabo Verde · Sub 30</div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Trophy className="h-4 w-4 text-neon" /> termina em 3d 4h
              </div>
            </div>
            <div className="space-y-1.5">
              {liga.map((u) => (
                <div
                  key={u.pos}
                  className={`flex items-center gap-3 rounded-xl p-3 transition ${
                    u.me ? "bg-neon/10 ring-1 ring-neon/40" : "hover:bg-muted/40"
                  }`}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    u.pos === 1 ? "bg-yellow-400/20 text-yellow-300" :
                    u.pos === 2 ? "bg-zinc-300/20 text-zinc-200" :
                    u.pos === 3 ? "bg-orange-400/20 text-orange-300" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {u.pos <= 3 ? <Medal className="h-4 w-4" /> : u.pos}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{u.nome} {u.me && <span className="text-xs text-neon">(tu)</span>}</div>
                    <div className="text-xs text-muted-foreground">{u.ginasio}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-bold neon-text"><Zap className="h-3 w-3" /> {u.xp.toLocaleString()}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">XP</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "desafios" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {desafios.map((d) => (
              <div key={d.titulo} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    d.cor === "neon" ? "bg-neon/15 text-neon" : "bg-neon-blue/15 text-neon-blue"
                  }`}>
                    <Target className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-muted-foreground">{d.participantes} a participar</span>
                </div>
                <h3 className="mt-3 text-base font-bold">{d.titulo}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{d.recompensa}</p>
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span>Progresso</span><span>{d.progresso}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full ${d.cor === "neon" ? "bg-neon" : "bg-neon-blue"}`} style={{ width: `${d.progresso}%` }} />
                  </div>
                </div>
                <button
                  onClick={() => toast.success("Inscrito no desafio!")}
                  className="mt-4 w-full rounded-xl bg-foreground/5 py-2 text-sm font-medium transition hover:bg-foreground/10"
                >
                  {d.progresso > 0 ? "Continuar" : "Aceitar desafio"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
