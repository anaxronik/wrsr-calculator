import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * Profit calculator chains: which buildings the user added,
 * how many of each, and which resources are "own" (not bought/sold).
 */
export interface Chain {
  buildingId: string
  qty: number
  /** resource id -> false when produced/consumed in-house (checkbox off) */
  off: Record<string, boolean>
}

interface ProfitState {
  chains: Chain[]
  add: (buildingId: string) => void
  remove: (index: number) => void
  setQty: (index: number, qty: number) => void
  toggleRes: (index: number, res: string, on: boolean) => void
  /** toggle a resource on/off in the given chains (or all when omitted) */
  setResEverywhere: (res: string, on: boolean, indices?: number[]) => void
  clear: () => void
}

export const useProfit = create<ProfitState>()(
  persist(
    (set) => ({
      chains: [],
      add: (buildingId) =>
        set((s) => ({
          chains: [...s.chains, { buildingId, qty: 1, off: {} }],
        })),
      remove: (index) =>
        set((s) => ({ chains: s.chains.filter((_, i) => i !== index) })),
      setQty: (index, qty) =>
        set((s) => ({
          chains: s.chains.map((c, i) =>
            i === index ? { ...c, qty: Math.max(1, qty || 1) } : c,
          ),
        })),
      toggleRes: (index, res, on) =>
        set((s) => ({
          chains: s.chains.map((c, i) => {
            if (i !== index) return c
            const off = { ...c.off }
            if (on) delete off[res]
            else off[res] = true
            return { ...c, off }
          }),
        })),
      setResEverywhere: (res, on, indices) =>
        set((s) => ({
          chains: s.chains.map((c, i) => {
            if (indices && !indices.includes(i)) return c
            const off = { ...c.off }
            if (on) delete off[res]
            else off[res] = true
            return { ...c, off }
          }),
        })),
      clear: () => set({ chains: [] }),
    }),
    {
      name: 'wrsr-profit-chains',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
)
