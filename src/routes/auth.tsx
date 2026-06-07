import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, User, ArrowRight, Dumbbell } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [perfil, setPerfil] = useState<"aluno" | "treinador" | "dono" | "loja">("aluno");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(mode === "login" ? "Bem-vindo de volta!" : "Conta criada com sucesso!", {
      description: `A entrar como ${perfil}…`,
    });
    setTimeout(() => {
      const dest = perfil === "aluno" ? "/student/workout" : perfil === "treinador" ? "/trainer" : perfil === "dono" ? "/owner" : "/marketplace";
      navigate({ to: dest });
    }, 600);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-neon/20 blur-3xl" />
      <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-neon-blue/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center">
          <div className="hidden lg:block">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              ← Voltar ao início
            </Link>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neon text-primary-foreground">
                <Dumbbell className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">PULSE<span className="neon-text">.</span></div>
            </div>
            <h1 className="mt-8 text-5xl font-bold leading-tight">
              Entre no seu<br /><span className="neon-text">ecossistema fitness</span>.
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Treinos personalizados, marketplace local em CVE e gestão completa do ginásio — tudo num só sítio.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 text-center">
              {[{ n: "12+", l: "Ginásios" }, { n: "1.4k", l: "Alunos" }, { n: "98%", l: "Adesão" }].map((s) => (
                <div key={s.l} className="rounded-xl border border-border bg-card/60 py-4 backdrop-blur">
                  <div className="text-2xl font-bold neon-text">{s.n}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl border border-border bg-card/80 p-8 backdrop-blur-xl shadow-2xl">
            <div className="mb-6 flex rounded-xl border border-border bg-surface/50 p-1 text-sm">
              {(["login", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 rounded-lg py-2 transition ${mode === m ? "bg-neon text-primary-foreground neon-glow" : "text-muted-foreground"}`}
                >
                  {m === "login" ? "Entrar" : "Criar conta"}
                </button>
              ))}
            </div>

            <h2 className="text-2xl font-bold">{mode === "login" ? "Bem-vindo de volta" : "Vamos começar"}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "login" ? "Acede à tua conta PULSE" : "Cria uma conta gratuita em 30 segundos"}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {mode === "signup" && (
                <InputField icon={User} placeholder="Nome completo" type="text" required />
              )}
              <InputField icon={Mail} placeholder="email@exemplo.cv" type="email" required />
              <InputField icon={Lock} placeholder="Palavra-passe" type="password" required />

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">Eu sou…</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(["aluno", "treinador", "dono", "loja"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPerfil(p)}
                      className={`rounded-lg border px-2 py-2 text-xs capitalize transition ${
                        perfil === p
                          ? "border-neon bg-neon/10 text-neon"
                          : "border-border bg-surface/50 text-muted-foreground hover:border-neon/40"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {mode === "login" && (
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <input type="checkbox" className="rounded border-border bg-input" /> Manter sessão
                  </label>
                  <button type="button" className="text-neon-blue hover:underline">Esqueci a palavra-passe</button>
                </div>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-neon py-3 text-sm font-semibold text-primary-foreground neon-glow transition hover:brightness-110"
              >
                {mode === "login" ? "Entrar" : "Criar conta"} <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" /> ou continua com <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="rounded-xl border border-border bg-surface/50 py-2.5 text-sm font-medium transition hover:border-neon/40">Google</button>
              <button className="rounded-xl border border-border bg-surface/50 py-2.5 text-sm font-medium transition hover:border-neon/40">Apple</button>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Ao continuar aceitas os <span className="text-foreground underline">Termos</span> e a <span className="text-foreground underline">Privacidade</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ icon: Icon, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        {...props}
        className="w-full rounded-xl border border-border bg-input py-3 pl-10 pr-3 text-sm outline-none transition focus:border-neon focus:ring-2 focus:ring-neon/20"
      />
    </div>
  );
}
