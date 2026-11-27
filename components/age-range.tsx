"use client";

import { AGE_MAX, AGE_MIN } from "@/lib/apply/options";

export function AgeRange({ min, max, onChange }: { min: number; max: number; onChange: (min: number, max: number) => void }) {
  const pct = (v: number) => ((v - AGE_MIN) / (AGE_MAX - AGE_MIN)) * 100;
  return (
    <div>
      <div className="range-dual">
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-line" />
        <div className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand" style={{ left: `${pct(min)}%`, right: `${100 - pct(max)}%` }} />
        <input type="range" aria-label="최소 나이" min={AGE_MIN} max={AGE_MAX} step={1} value={min}
          onChange={(e) => onChange(Math.min(Number(e.target.value), max), max)} />
        <input type="range" aria-label="최대 나이" min={AGE_MIN} max={AGE_MAX} step={1} value={max}
          onChange={(e) => onChange(min, Math.max(Number(e.target.value), min))} />
      </div>
      <div className="mt-2 flex justify-between text-[15px] text-ink/70">
        <span data-testid="age-min">{min}살</span>
        <span data-testid="age-max">{max}살</span>
      </div>
    </div>
  );
}
