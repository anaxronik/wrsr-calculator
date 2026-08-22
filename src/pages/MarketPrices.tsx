import PageHeader from '../components/PageHeader.tsx'
import PaperCard from '../components/PaperCard.tsx'
import PriceInput from '../components/PriceInput.tsx'
import { useMarketPrices, resolvePrices } from '../store/marketPrices.ts'

export default function MarketPrices() {
  const overrides = useMarketPrices((s) => s.overrides)
  const rows = resolvePrices(overrides)
  return (
    <section>
      <PaperCard padded={false} stains={8} jag={3} steps={16}>
        <div className="pt-4">
          <PageHeader
            title="Цены на ресурсы"
            icon="game-icons/trade_prices.png"
            flat
          />
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dashed border-ink/50 text-left">
                  <th className="py-2 pr-4 font-semibold">Ресурс</th>
                  <th className="px-3 py-2 text-right font-semibold">
                    Продажа ₽
                  </th>
                  <th className="px-3 py-2 text-right font-semibold">
                    Покупка ₽
                  </th>
                  <th className="px-3 py-2 text-right font-semibold">
                    Продажа $
                  </th>
                  <th className="px-3 py-2 text-right font-semibold">
                    Покупка $
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className="transition-colors hover:bg-white/40"
                  >
                    <td className="py-1.5 pr-4">
                      <span className="flex items-center gap-2">
                        <img
                          src={`game-icons/resources/${r.id}.png`}
                          alt=""
                          width={22}
                          height={22}
                          className="shrink-0"
                        />
                        <span>{r.name}</span>
                      </span>
                    </td>
                    <td className="px-3 py-1.5 text-right">
                      <PriceInput
                        id={r.id}
                        field="rubSell"
                        value={r.rubSell}
                        disabled={r.noSell}
                      />
                    </td>
                    <td className="px-3 py-1.5 text-right">
                      <PriceInput
                        id={r.id}
                        field="rubBuy"
                        value={r.rubBuy}
                      />
                    </td>
                    <td className="px-3 py-1.5 text-right">
                      <PriceInput
                        id={r.id}
                        field="usdSell"
                        value={r.usdSell}
                        disabled={r.noSell}
                      />
                    </td>
                    <td className="px-3 py-1.5 text-right">
                      <PriceInput
                        id={r.id}
                        field="usdBuy"
                        value={r.usdBuy}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PaperCard>
    </section>
  )
}
