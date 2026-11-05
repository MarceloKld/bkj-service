"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type Props = { value: string; label: string; copiedLabel: string };

export default function CopyNumber({ value, label, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <button type="button" onClick={copy} className="btn border border-current">
      {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}