const NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}