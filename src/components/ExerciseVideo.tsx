import { useEffect, useRef } from "react";
import { X, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  src: string;
  poster?: string;
};

export function ExerciseVideoModal({ open, onClose, title, src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-widest text-neon">Execução correta</div>
            <h3 className="text-sm font-bold">{title}</h3>
          </div>
          <button
            onClick={() => {
              setMuted((m) => !m);
              if (videoRef.current) videoRef.current.muted = !muted;
            }}
            aria-label="Som"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="aspect-video w-full bg-background object-cover"
          autoPlay
          loop
          muted
          playsInline
          controls
        />
        <p className="px-4 py-3 text-xs text-muted-foreground">
          Repete o movimento com controlo. Mantém o core ativo e evita bloquear as articulações no fim do movimento.
        </p>
      </div>
    </div>
  );
}
