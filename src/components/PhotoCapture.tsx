import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, ImageUp, RefreshCw, Check, X, SwitchCamera } from "lucide-react";

/**
 * Botão + modal para tirar fotos com a câmara do dispositivo (getUserMedia)
 * com alternativa de envio a partir da galeria.
 */
export function PhotoCaptureButton({
  onCapture,
  label = "Tirar foto",
  className = "",
}: {
  onCapture: (dataUrl: string) => void;
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ||
          "inline-flex items-center gap-2 rounded-xl bg-neon px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
        }
      >
        <Camera className="h-4 w-4" /> {label}
      </button>
      {open && (
        <CameraModal
          onClose={() => setOpen(false)}
          onConfirm={(d) => {
            onCapture(d);
            setOpen(false);
          }}
        />
      )}
    </>
  );
}

function CameraModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: (dataUrl: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [shot, setShot] = useState<string | null>(null);
  const [facing, setFacing] = useState<"environment" | "user">("environment");
  const [error, setError] = useState<string | null>(null);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function start() {
      setError(null);
      stop();
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
      } catch {
        if (!cancelled) setError("Câmara indisponível ou sem permissão. Podes enviar uma foto da galeria.");
      }
    }
    if (!shot) start();
    return () => {
      cancelled = true;
      stop();
    };
  }, [facing, shot, stop]);

  const snap = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    setShot(canvas.toDataURL("image/jpeg", 0.85));
    stop();
  };

  const pickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setShot(String(reader.result));
    reader.readAsDataURL(f);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Camera className="h-4 w-4 text-neon" /> Tirar foto
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative aspect-[4/3] bg-surface">
          {shot ? (
            <img src={shot} alt="Pré-visualização" className="h-full w-full object-cover" />
          ) : (
            <>
              <video ref={videoRef} playsInline muted className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-6 rounded-2xl border-2 border-dashed border-neon/40" />
              {error && (
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-xs text-muted-foreground">
                  {error}
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 p-4">
          {shot ? (
            <>
              <button
                onClick={() => setShot(null)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className="h-4 w-4" /> Repetir
              </button>
              <button
                onClick={() => onConfirm(shot)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-neon py-2.5 text-sm font-semibold text-primary-foreground neon-glow"
              >
                <Check className="h-4 w-4" /> Usar foto
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-2.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <ImageUp className="h-4 w-4" /> Galeria
              </button>
              <button
                onClick={snap}
                disabled={!!error}
                className="h-14 w-14 rounded-full border-4 border-neon bg-neon/20 transition hover:bg-neon/40 disabled:opacity-30"
                aria-label="Capturar"
              />
              <button
                onClick={() => setFacing(facing === "environment" ? "user" : "environment")}
                className="flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-2.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <SwitchCamera className="h-4 w-4" /> Virar
              </button>
            </>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={pickFile} />
      </div>
    </div>
  );
}
