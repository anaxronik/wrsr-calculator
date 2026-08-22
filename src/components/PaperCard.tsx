import { useMemo, type ReactNode } from 'react'

/* Same grain as .paper-bg in index.css — kept in sync manually. */
const NOISE_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")"

/**
 * Randomly torn paper edge: polygon points along all four sides with a small
 * perpendicular jitter. Combined with border-radius on the same element the
 * corners come out rounded while the sides stay torn. Regenerated per mount.
 */
function tornPolygon(jagPx: number, steps: number): string {
  const j = () => ((Math.random() * 2 - 1) * jagPx).toFixed(1)
  const at = (i: number) => ((100 / steps) * i).toFixed(2)
  const pts: string[] = []
  for (let i = 0; i <= steps; i++) pts.push(`${at(i)}% ${j()}px`) // top →
  for (let i = 1; i <= steps; i++) pts.push(`calc(100% + ${j()}px) ${at(i)}%`) // right ↓
  for (let i = steps; i >= 0; i--) pts.push(`${at(i)}% calc(100% + ${j()}px)`) // bottom ←
  for (let i = steps - 1; i >= 1; i--) pts.push(`${j()}px ${at(i)}%`) // left ↑
  return `polygon(${pts.join(', ')})`
}

/** Gray damp spots pressed against the card edges. */
function edgeStains(count: number): string {
  const parts: string[] = []
  for (let i = 0; i < count; i++) {
    const t = (Math.random() * 100).toFixed(1)
    const inset = (Math.random() * 4).toFixed(1) // 0..4% from the edge
    const edge = Math.floor(Math.random() * 4)
    const [x, y] =
      edge === 0 ? [t, inset]
      : edge === 1 ? [`${(100 - Number(inset)).toFixed(1)}`, t]
      : edge === 2 ? [t, `${(100 - Number(inset)).toFixed(1)}`]
      : [inset, t]
    const r = Math.round(3 + Math.random() * 8)
    const gray = Math.round(110 + Math.random() * 40)
    const alpha = (0.06 + Math.random() * 0.09).toFixed(3)
    parts.push(
      `radial-gradient(circle ${r}px at ${x}% ${y}%, rgba(${gray},${gray},${gray},${alpha}), transparent 70%)`,
    )
  }
  return parts.join(', ')
}

/**
 * Sheet of paper with torn edges, edge stains and a drop shadow
 * that follows the torn silhouette (shadow on the wrapper, clip on the
 * inner element — filter would be clipped otherwise).
 */
export default function PaperCard({
  children,
  className = '',
  jag = 2,
  steps = 14,
  stains = 12,
  radius = 10,
  padded = true,
}: {
  children: ReactNode
  className?: string
  jag?: number
  steps?: number
  stains?: number
  radius?: number
  /** When false, content touches the torn edges (for full-bleed headers). */
  padded?: boolean
}) {
  const clip = useMemo(() => tornPolygon(jag, steps), [jag, steps])
  const backgroundImage = useMemo(
    () => `${NOISE_URL}, ${edgeStains(stains)}`,
    [stains],
  )

  return (
    <div className={`torn-shadow ${className}`}>
      <div
        className="relative bg-paper-raised"
        style={{
          clipPath: clip,
          borderRadius: radius,
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage }}
        />
        <div className={padded ? 'relative p-5' : 'relative'}>{children}</div>
      </div>
    </div>
  )
}
