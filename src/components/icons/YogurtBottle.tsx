type Props = { level: 1 | 2 | 3 | 4 | 5 };

const heights = { 1: 40, 2: 48, 3: 58, 4: 68, 5: 80 } as const;

export default function YogurtBottle({ level }: Props) {
  const height = heights[level];
  return (
    <svg
      viewBox="0 0 24 40"
      height={height}
      width={height * 0.6}
      fill="none"
      strokeWidth="1.6"
      strokeLinejoin="round"
      className="stroke-ink"
      aria-hidden="true"
    >
      <rect x="4" y="20" width="16" height="10" className="fill-primary/20 stroke-none" />
      <rect x="8" y="1.5" width="8" height="4.5" rx="1.2" className="fill-primary stroke-primary" />
      <path d="M9 6v3.5C9 11 4 12.5 4 17v18a3.5 3.5 0 0 0 3.5 3.5h9A3.5 3.5 0 0 0 20 35V17c0-4.5-5-6-5-7.5V6" />
    </svg>
  );
}