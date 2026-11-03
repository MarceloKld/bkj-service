"use client";

import { useEffect, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";

type Props = { labels: { offline: string; online: string } };

export default function NetworkStatus({ labels }: Props) {
  const [status, setStatus] = useState<"idle" | "offline" | "online">("idle");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const goOffline = () => {
      if (timer) clearTimeout(timer);
      setStatus("offline");
    };
    const goOnline = () => {
      setStatus("online");
      timer = setTimeout(() => setStatus("idle"), 3500);
    };

    if (!navigator.onLine) goOffline();
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  if (status === "idle") return null;
  const isOffline = status === "offline";

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)" }}
    >
      <div
        className={`animate-slide-down pointer-events-auto flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
          isOffline ? "bg-ink text-page" : "bg-accent text-on-accent"
        }`}
      >
        {isOffline ? <WifiOff size={18} aria-hidden="true" /> : <Wifi size={18} aria-hidden="true" />}
        {isOffline ? labels.offline : labels.online}
      </div>
    </div>
  );
}