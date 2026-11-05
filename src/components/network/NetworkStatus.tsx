"use client";

import { useEffect, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { useOnlineStatus } from "@/hooks/useBrowser";

type Props = { labels: { offline: string; online: string } };

export default function NetworkStatus({ labels }: Props) {
  const online = useOnlineStatus();
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const onOnline = () => {
      setShowBack(true);
      timer = setTimeout(() => setShowBack(false), 3500);
    };
    const onOffline = () => {
      if (timer) clearTimeout(timer);
      setShowBack(false);
    };

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  if (online && !showBack) return null;
  const isOffline = !online;

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