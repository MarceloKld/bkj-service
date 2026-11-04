"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { X } from "lucide-react";
import TypedText from "@/components/motion/TypedText";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

type Props = { href: string; label: string; closeLabel: string; phrases: string[] };

const KEY = "bkj-bubble";
const listeners = new Set<() => void>();
let closedInMemory = false;

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot() {
  if (closedInMemory) return true;
  try {
    return sessionStorage.getItem(KEY) === "closed";
  } catch {
    return false;
  }
}

function closeBubble() {
  closedInMemory = true;
  try {
    sessionStorage.setItem(KEY, "closed");
  } catch {}
  listeners.forEach((listener) => listener());
}

export default function FloatingQuote({ href, label, closeLabel, phrases }: Props) {
  const closed = useSyncExternalStore(subscribe, getSnapshot, () => false);

  return (
    <div
      className="float-diag fixed z-40 flex flex-col items-end gap-3"
      style={{
        right: "calc(env(safe-area-inset-right) + 1rem)",
        bottom: "calc(env(safe-area-inset-bottom) + 1rem)",
      }}
    >
      {!closed && (
        <div className="bubble-in relative">
          <Link
            href={href}
            tabIndex={-1}
            aria-hidden="true"
            className="block w-max max-w-[15rem] rounded-2xl border border-line bg-surface px-4 py-3 text-sm leading-snug text-ink shadow-md after:absolute after:-bottom-[7px] after:right-[22px] after:h-3 after:w-3 after:rotate-45 after:border-b after:border-r after:border-line after:bg-surface after:content-['']"
          >
            <TypedText words={phrases} startTyping startDelay={3300} typeSpeed={45} deleteSpeed={20} pause={2600} />
          </Link>
          <button
            type="button"
            onClick={closeBubble}
            aria-label={closeLabel}
            className="absolute -left-4 -top-4 grid h-11 w-11 place-items-center"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full border border-line bg-surface text-muted">
              <X size={14} aria-hidden="true" />
            </span>
          </button>
        </div>
      )}

      <Link
        href={href}
        aria-label={label}
        className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-on-primary shadow-lg transition-transform duration-200 active:scale-95"
      >
        <WhatsAppIcon size={28} />
      </Link>
    </div>
  );
}