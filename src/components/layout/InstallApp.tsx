"use client";

import { useRef, useSyncExternalStore } from "react";
import { Download, Share, SquarePlus } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { getInstallState, promptInstall, subscribeInstall } from "@/lib/pwa/install";

export default function InstallApp({ t }: { t: Dictionary["pwa"] }) {
  const state = useSyncExternalStore(subscribeInstall, getInstallState, () => "hidden" as const);
  const dialogRef = useRef<HTMLDialogElement>(null);

  if (state === "hidden") return null;

  return (
    <>
      <button
        type="button"
        onClick={() => (state === "prompt" ? void promptInstall() : dialogRef.current?.showModal())}
        className="link-underline inline-flex min-h-11 items-center gap-2 pb-0.5 text-sm font-semibold text-primary"
      >
        <Download size={16} aria-hidden="true" />
        {t.install}
      </button>

      {state === "ios" && (
        <dialog
          ref={dialogRef}
          aria-label={t.iosTitle}
          className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-3xl border border-line bg-page p-6 text-ink backdrop:bg-black/60"
        >
          <h2 className="font-display text-2xl font-bold">{t.iosTitle}</h2>
          <p className="mt-2 text-muted">{t.iosIntro}</p>
          <ol className="mt-4 space-y-4">
            <li className="flex gap-3">
              <Share size={22} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
              <span>{t.iosStep1}</span>
            </li>
            <li className="flex gap-3">
              <SquarePlus size={22} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
              <span>{t.iosStep2}</span>
            </li>
            <li className="flex gap-3">
              <Download size={22} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
              <span>{t.iosStep3}</span>
            </li>
          </ol>
          <form method="dialog">
            <button className="btn btn-primary mt-6 w-full">{t.close}</button>
          </form>
        </dialog>
      )}
    </>
  );
}