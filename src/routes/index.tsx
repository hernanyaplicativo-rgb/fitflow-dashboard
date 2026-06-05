import { createFileRoute, Link } from "@tanstack/react-router";
import { Dumbbell, ClipboardList, ShoppingBag, Sparkles, QrCode, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const screens = [
  {
    to: "/trainer",
    title: "Workout Builder",
    subtitle: "Trainer · Web Dashboard",
    desc: "Assign athletes, design splits, dial in sets, reps, load and rest.",
    icon: Dumbbell,
    tone: "neon" as const,
  },
  {
    to: "/student/workout",
    title: "Today's Session",
    subtitle: "Athlete · PWA Mobile",
    desc: "A focused checklist for the gym floor with a floating rest timer.",
    icon: ClipboardList,
    tone: "blue" as const,
  },
  {
    to: "/partner",
    title: "Marketplace Console",
    subtitle: "Partner · Web Dashboard",
    desc: "Sales, inventory and live order tracking for partner stores.",
    icon: ShoppingBag,
    tone: "neon" as const,
  },
  {
    to: "/student/nutritionist",
    title: "AI Nutritionist",
    subtitle: "Athlete · PWA Mobile",
    desc: "Conversational meal plans tied to biometric goals.",
    icon: Sparkles,
    tone: "blue" as const,
  },
  {
    to: "/student/equipment",
    title: "Machine Guide",
    subtitle: "Athlete · QR Scan",
    desc: "Instant tutorial when you scan a sticker on the equipment.",
    icon: QrCode,
    tone: "neon" as const,
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid-bg absolute inset-x-0 top-0 h-[60vh] opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <header className="mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_12px_var(--neon)]" />
            Fitness OS · Demo
          </div>
          <h1 className="mt-4 text-5xl font-bold leading-[0.95] sm:text-7xl">
            PULSE<span className="neon-text">.</span>
            <br />
            <span className="text-muted-foreground">Train. Track. Transact.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground">
            A connected ecosystem for trainers, athletes and partner stores.
            Pick a surface below to explore the interface.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {screens.map(({ to, title, subtitle, desc, icon: Icon, tone }) => (
            <Link
              key={to}
              to={to}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-transparent hover:shadow-[0_0_0_1px_var(--neon),0_20px_60px_-20px_color-mix(in_oklab,var(--neon)_50%,transparent)]"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                    tone === "neon"
                      ? "border-neon/40 bg-neon/10 text-neon"
                      : "border-neon-blue/40 bg-neon-blue/10 text-neon-blue"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <div className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
                {subtitle}
              </div>
              <h3 className="mt-1 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
