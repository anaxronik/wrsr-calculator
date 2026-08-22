import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { marketPrices as defaultPrices, type MarketPrice } from '../data/marketPrices.ts'

/**
 * Editable world-market prices. Defaults come from the screenshot snapshot;
 * user edits override them and persist to localStorage.
 * Pass `true` to reset a single price (or all) back to the snapshot.
 */
interface MarketPricesState {
  /** id -> partial price overrides (missing fields fall back to defaults) */
  overrides: Record<string, Partial<Omit<MarketPrice, 'id' | 'name'>>>
  /** false = show only rub columns, false for usd handled by UI */
  setPrice: (id: string, field: PriceField, value: number) => void
  resetPrice: (id: string) => void
  resetAll: () => void
}

export type PriceField = 'rubSell' | 'rubBuy' | 'usdSell' | 'usdBuy'

export const useMarketPrices = create<MarketPricesState>()(
  persist(
    (set) => ({
      overrides: {},
      setPrice: (id, field, value) =>
        set((s) => ({
          overrides: {
            ...s.overrides,
            [id]: { ...s.overrides[id], [field]: value },
          },
        })),
      resetPrice: (id) =>
        set((s) => {
          if (!(id in s.overrides)) return s
          const next = { ...s.overrides }
          delete next[id]
          return { overrides: next }
        }),
      resetAll: () => set({ overrides: {} }),
    }),
    {
      name: 'wrsr-market-prices',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

/** Merged view: snapshot defaults + user overrides. */
export function resolvePrices(overrides: MarketPricesState['overrides']): MarketPrice[] {
  return defaultPrices.map((p) =>
    overrides[p.id] ? { ...p, ...overrides[p.id] } : p,
  )
}
