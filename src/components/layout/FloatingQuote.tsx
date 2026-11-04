"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import TypedText from "@/components/motion/TypedText";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

type Props = { href: string; label: string; closeLabel: string; phrases: string[] };

export default function FloatingQuote({ href, label, closeLabel, phrases }: Props) {
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("bkj-bubble") === "closed") setClosed(true);
    } catch {}
  }, []);

  const close = () => {
    setClosed(true);
    try {
      sessionStorage.setItem("bkj-bubble", "closed");
    } catch {}
  };

  return (
    <div
      className="float-diag fixed z-40 flex items-end gap-3"
      style={{
        right: "calc(env(safe-area-inset-right) + 1rem)",
        bottom: "calc(env(safe-area-inset-bottom) + 1rem)",
      }}
    >
      {!closed && (
        <div className="bubble-in relative w-[13.5rem] rounded-2xl rounded-br-sm border border-line bg-surface p-3 pr-10 text-sm leading-snug text-ink shadow-md">
          <Link href={href} tabIndex={-1} aria-hidden="true" className="block min-h-[2.6rem]">
            <TypedText words={phrases} startTyping startDelay={3300} typeSpeed={45} deleteSpeed={20} pause={2600} />
          </Link>
          <button
            type="button"
            onClick={close}
            aria-label={closeLabel}
            className="absolute right-0 top-0 grid h-11 w-11 place-items-center text-muted"
          >
            <X size={16} aria-hidden="true" />
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