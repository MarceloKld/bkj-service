import {
  Armchair,
  Cake,
  ConciergeBell,
  Flower2,
  GlassWater,
  Milk,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import type { ExtraIcon, MenusContent } from "@/data/menus";
import Reveal from "@/components/motion/Reveal";

type Props = { title: string; intro: string; extras: MenusContent["extras"] };

const icons: Record<ExtraIcon, typeof Cake> = {
  drinks: GlassWater,
  cake: Cake,
  decor: Flower2,
  service: ConciergeBell,
  dishes: UtensilsCrossed,
  rental: Armchair,
  waiters: Users,
  yogurts: Milk,
};

export default function ExtrasList({ title, intro, extras }: Props) {
  return (
    <Reveal>
      <h2 data-reveal className="font-display text-3xl font-bold sm:text-4xl">
        {title}
      </h2>
      <p data-reveal className="mt-3 max-w-xl text-lg text-muted">
        {intro}
      </p>
      <ul className="mt-8 grid gap-x-12 sm:grid-cols-2">
        {extras.map((e) => {
          const Icon = icons[e.icon];
          return (
            <li key={e.title} data-reveal className="flex gap-4 border-b border-line py-5">
              <Icon size={26} strokeWidth={1.5} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-display text-lg font-semibold">{e.title}</h3>
                <p className="mt-1 text-muted">{e.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Reveal>
  );
}