import { useMemo } from 'react'

/**
 * Gray damp stains on the paper, placed at random positions.
 * Re-rolled on every page load; rendered as a fixed overlay below content
 * (root layout must have `isolate` for the -z-10 layer to stay above the
 * paper background yet under everything else).
 */
function randomGrayStains(count: number): string {
  const parts: string[] = []
  for (let i = 0; i < count; i++) {
    const x = (Math.random() * 100).toFixed(1)
    const y = (Math.random() * 100).toFixed(1)
    const w = Math.round(9 + Math.random() * 16)
    const h = Math.round(6 + Math.random() * 14)
    const gray = Math.round(105 + Math.random() * 45)
    const alpha = (0.08 + Math.random() * 0.12).toFixed(3)
    parts.push(
      `radial-gradient(ellipse ${w}px ${h}px at ${x}% ${y}%, rgba(${gray},${gray},${gray},${alpha}), transparent 70%)`,
    )
  }
  return parts.join(', ')
}

export default function PaperStains({ count = 60 }: { count?: number }) {
  const stains = useMemo(() => randomGrayStains(count), [count])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 mix-blend-multiply"
      style={{ backgroundImage: stains }}
    />
  )
}
