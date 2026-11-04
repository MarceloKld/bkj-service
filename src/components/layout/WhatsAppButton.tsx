import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

type Props = { label: string; message: string };

export default function WhatsAppButton({ label, message }: Props) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed z-40 inline-flex h-14 items-center gap-2 rounded-full bg-primary px-4 font-semibold text-on-primary shadow-lg transition-transform duration-200 active:scale-95"
      style={{
        right: "calc(env(safe-area-inset-right) + 1rem)",
        bottom: "calc(env(safe-area-inset-bottom) + 1rem)",
      }}
    >
      <MessageCircle size={24} aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}