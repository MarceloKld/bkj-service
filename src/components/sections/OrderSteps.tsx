import Reveal from "@/components/motion/Reveal";

type Props = { title: string; steps: { title: string; text: string }[] };

export default function OrderSteps({ title, steps }: Props) {
  return (
    <Reveal>
      <h2 data-reveal className="font-display text-3xl font-bold sm:text-4xl">
        {title}
      </h2>
      <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} data-reveal className="border-t-2 border-primary pt-4">
            <span className="font-display text-sm text-primary">0{i + 1}</span>
            <h3 className="mt-1 font-display text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}