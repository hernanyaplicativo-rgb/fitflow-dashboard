import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, QrCode, Check, Flame, Calendar, Clock } from "lucide-react";

export const Route = createFileRoute("/checkin")({
  component: CheckinPage,
});

function CheckinPage() {
  const [scanning, setScanning] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!scanning) return;
    const t = setTimeout(() => {
      setScanning(false);
      setDone(true);
    }, 2400);
    return () => clearTimeout(t);
  }, [scanning]);

  const reset = () => {
    setDone(false);
    setScanning(true);
  };

  return (
    <div className="relative mx-auto min-h-screen max-w-md overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative px-5 pb-12 pt-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Check-in</div>
          <div className="w-9" />
        </div>

        {!done ? (
          <>
            <div className="mt-8 text-center">
              <h1 className="text-3xl font-bold">Aponta para o<br />QR Code da <span className="neon-text">entrada</span></h1>
              <p className="mt-2 text-sm text-muted-foreground">O check-in é instantâneo e regista a tua frequência.</p>
            </div>

            <div className="relative mx-auto mt-10 aspect-square w-full max-w-xs">
              <div className="absolute inset-0 overflow-hidden rounded-3xl border border-border bg-black">
                <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80" alt="Scanner" className="h-full w-full object-cover opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-44 w-44">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-neon/30 to-neon-blue/30 blur-xl" />
                    <div className="relative h-full w-full rounded-2xl border-2 border-neon">
                      <span className="absolute -left-0.5 -top-0.5 h-6 w-6 border-l-4 border-t-4 border-neon" />
                      <span className="absolute -right-0.5 -top-0.5 h-6 w-6 border-r-4 border-t-4 border-neon" />
                      <span className="absolute -bottom-0.5 -left-0.5 h-6 w-6 border-b-4 border-l-4 border-neon" />
                      <span className="absolute -bottom-0.5 -right-0.5 h-6 w-6 border-b-4 border-r-4 border-neon" />
                      <div className="absolute inset-x-2 top-2 h-0.5 animate-[scan_2s_linear_infinite] bg-neon shadow-[0_0_12px_var(--neon)]" />
                      <QrCode className="absolute inset-0 m-auto h-16 w-16 text-neon/40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <style>{`@keyframes scan { 0% { transform: translateY(0); } 50% { transform: translateY(150px); } 100% { transform: translateY(0); } }`}</style>

            <div className="mt-6 rounded-2xl border border-border bg-card p-4 text-center text-xs text-muted-foreground">
              {scanning ? "A procurar QR Code…" : "Toca para escanear novamente"}
            </div>
          </>
        ) : (
          <div className="mt-8 text-center">
            <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-full bg-neon/30" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-neon text-primary-foreground neon-glow">
                <Check className="h-16 w-16" strokeWidth={3} />
              </div>
            </div>
            <h2 className="mt-8 text-3xl font-bold">Check-in <span className="neon-text">confirmado</span></h2>
            <p className="mt-2 text-sm text-muted-foreground">PULSE Mindelo · {new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}</p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <Tile icon={Flame} label="Sequência" value="7 dias" />
              <Tile icon={Calendar} label="Este mês" value="14×" />
              <Tile icon={Clock} label="Tempo médio" value="58 min" />
            </div>

            <Link to="/student/workout" className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-neon py-3.5 text-sm font-semibold text-primary-foreground neon-glow">
              Começar treino de hoje
            </Link>
            <button onClick={reset} className="mt-3 w-full rounded-xl border border-border bg-card py-3 text-sm text-muted-foreground">
              Escanear outro QR
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Tile({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3">
      <Icon className="mx-auto h-4 w-4 text-neon" />
      <div className="mt-1.5 text-base font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
