"use client";

import { useEffect, useState } from "react";

type Props = {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
};

export default function TypedText({ words, typeSpeed = 80, deleteSpeed = 45, pause = 1800 }: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? "");
  const [phase, setPhase] = useState<"hold" | "deleting" | "typing">("hold");

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout>;

    if (phase === "hold") {
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
  }, [phase, text, index, words, typeSpeed, deleteSpeed, pause]);

  return (
    <span>
      {text}
      <span className="typed-caret" aria-hidden="true" />
    </span>
  );
}