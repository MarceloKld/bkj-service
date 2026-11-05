"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useBrowser";

type Props = {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
  startTyping?: boolean;
  startDelay?: number;
};

type Phase = "wait" | "hold" | "deleting" | "typing";

export default function TypedText({
  words,
  typeSpeed = 80,
  deleteSpeed = 45,
  pause = 1800,
  startTyping = false,
  startDelay = 0,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(startTyping ? "" : (words[0] ?? ""));
  const [phase, setPhase] = useState<Phase>(startTyping ? "wait" : "hold");

  useEffect(() => {
    if (reduced || words.length === 0) return;
    if (words.length < 2 && !startTyping) return;

    let timer: ReturnType<typeof setTimeout>;

    if (phase === "wait") {
      timer = setTimeout(() => setPhase("typing"), startDelay);
    } else if (phase === "hold") {
      timer = setTimeout(() => setPhase("deleting"), pause);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
      } else {
        timer = setTimeout(() => {
          setIndex((i) => (i + 1) % words.length);
          setPhase("typing");
        }, 250);
      }
    } else {
      const target = words[index];
      if (text.length < target.length) {
        timer = setTimeout(() => setText(target.slice(0, text.length + 1)), typeSpeed);
      } else {
        timer = setTimeout(() => setPhase("hold"), 0);
      }
    }

    return () => clearTimeout(timer);
  }, [reduced, phase, text, index, words, typeSpeed, deleteSpeed, pause, startTyping, startDelay]);

  return (
    <span>
      {reduced ? (words[0] ?? "") : text}
      <span className="typed-caret" aria-hidden="true" />
    </span>
  );
}