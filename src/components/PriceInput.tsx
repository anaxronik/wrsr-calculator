import { useState } from 'react'
import { useMarketPrices, type PriceField } from '../store/marketPrices.ts'

/**
 * Editable price cell styled like an in-game input field:
 * creamy yellow fill, thin reddish-brown border, accent-colored text.
 * Empty input = not overridden (falls back to snapshot default).
 */
export default function PriceInput({
  id,
  field,
  value,
  disabled = false,
}: {
  id: string
  field: PriceField
  value: number
  disabled?: boolean
}) {
  const setPrice = useMarketPrices((s) => s.setPrice)
  const resetPrice = useMarketPrices((s) => s.resetPrice)
  const [text, setText] = useState<string | null>(null)

  const display = text ?? value.toFixed(2).replace('.', ',')

  const commit = (raw: string) => {
    const parsed = parseFloat(raw.replace(',', '.').replace(/\s/g, ''))
    if (Number.isFinite(parsed)) {
      setPrice(id, field, parsed)
    } else {
      resetPrice(id)
    }
    setText(null)
  }

  if (disabled) {
    return <span className="block text-center text-ink-soft">—</span>
  }

  return (
    <input
      type="text"
      inputMode="decimal"
      value={display}
      onChange={(e) => setText(e.target.value)}
      onFocus={(e) => e.target.select()}
      onBlur={(e) => commit(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
        if (e.key === 'Escape') setText(null)
      }}
      className={[
        'ml-auto block w-24 rounded-none border border-input-border bg-input-bg px-1.5 py-0.5 text-right text-sm text-ink tabular-nums outline-none',
      ].join(' ')}
    />
  )
}
