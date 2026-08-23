import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.tsx'
import PaperCard from '../components/PaperCard.tsx'
import { BUILDINGS, EXTRA_RES_NAMES, type Building } from '../data/buildings.ts'
import { marketPrices } from '../data/marketPrices.ts'
import { useProfit, type Chain } from '../store/profit.ts'

/** rub prices by resource id from the market snapshot (sell/buy at border) */
const PRICE_BY_ID = new Map(marketPrices.map((p) => [p.id, p]))
const NAME_BY_ID = new Map(marketPrices.map((p) => [p.id, p.name]))
const WORKERS_PRICE = 3.15 // ₽ per worker-day, 3 shifts per day
const SHIFTS = 3

const icon = (res: string) => `game-icons/resources/${res}.png`
const resName = (res: string) => NAME_BY_ID.get(res) ?? EXTRA_RES_NAMES[res] ?? res
const fmtAmt = (t: number) =>
  t < 0.1 ? `${(t * 1000).toFixed(1)} кг` : `${t.toFixed(2)} т`
const fmtRub = (v: number) => `${v >= 0 ? '' : '−'}${Math.abs(v).toFixed(2)} ₽`
/** first building that produces the given resource (id or undefined) */
const producerFor = (res: string) =>
  BUILDINGS.find((b) => Object.prototype.hasOwnProperty.call(b.prod, res))?.id

function ChainRow({
  chain,
  building,
  index,
}: {
  chain: Chain
  building: Building
  index: number
}) {
  const { setQty, remove, toggleRes, add } = useProfit()

  const workers = building.workers * chain.qty
  const scale = building.workers > 0 ? workers : chain.qty
  const total = (tons: number) => tons * scale
  let rev = 0
  for (const [res, tons] of Object.entries(building.prod)) {
    if (chain.off[res]) continue
    rev += (PRICE_BY_ID.get(res)?.rubSell ?? 0) * total(tons)
  }
  // cost of consumed resources
  let cost = 0
  for (const [res, tons] of Object.entries(building.cons)) {
    if (chain.off[res]) continue
    cost += (PRICE_BY_ID.get(res)?.rubBuy ?? 0) * total(tons)
  }
  // workers salary: 3 shifts × 3.15 ₽
  const workersCost = chain.off.workers ? 0 : workers * SHIFTS * WORKERS_PRICE
  cost += workersCost
  const profit = rev - cost

  return (
    <PaperCard jag={2} stains={6} className="min-w-0">
      <div className="flex items-center gap-3">
        <input
          type="number"
          min={1}
          value={chain.qty}
          onChange={(e) => setQty(index, parseInt(e.target.value, 10))}
          className="w-16 rounded-none border border-input-border bg-input-bg px-2 py-1 text-center text-sm tabular-nums outline-none"
        />
        <div className="min-w-0 flex-1 font-semibold">{building.name}</div>
        <span
          className={`text-lg font-bold tabular-nums ${
            profit >= 0 ? 'text-green-800' : 'text-accent-soft'
          }`}
        >
          {profit >= 0 ? '+' : '−'}
          {Math.abs(profit).toFixed(1)} ₽/сут
        </span>
        <button
          onClick={() => remove(index)}
          className="cursor-pointer border-none bg-transparent px-1 text-xl text-accent-soft hover:opacity-70"
          aria-label="Удалить"
        >
          ×
        </button>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-sm border border-line/60 bg-paper-dark/40 p-3">
          <h4 className="mb-1.5 flex items-baseline justify-between gap-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Потребляет в сутки
            <span className="text-sm normal-case text-accent-soft tabular-nums">
              −{cost.toFixed(1)} ₽
            </span>
          </h4>
          <ul className="space-y-1">
            {building.workers > 0 && (
              <ResRow
                res="workers"
                label={`Рабочие ×${SHIFTS}`}
                on={!chain.off.workers}
                onToggle={toggleOn => toggleRes(index, 'workers', toggleOn)}
                amount={`${workers} чел`}
                value={workersCost > 0 ? `−${workersCost.toFixed(2)} ₽` : undefined}
                negative
                title="нанимается на границе"
              />
            )}
            {Object.entries(building.cons).map(([res, tons]) => {
              const amt = total(tons)
              const price = PRICE_BY_ID.get(res)
              const on = !chain.off[res]
              const v = on && price ? price.rubBuy * amt : 0
              const pid = producerFor(res)
              return (
                <ResRow
                  key={res}
                  res={res}
                  label={resName(res)}
                  on={on}
                  onToggle={v2 => toggleRes(index, res, v2)}
                  amount={fmtAmt(amt)}
                  value={on && price ? fmtRub(-v) : undefined}
                  negative
                  title="покупается на границе"
                  addProducer={pid ? () => add(pid) : undefined}
                />
              )
            })}
            {building.workers === 0 && Object.keys(building.cons).length === 0 && (
              <li className="text-sm text-ink-soft">—</li>
            )}
          </ul>
        </div>
        <div className="rounded-sm border border-line/60 bg-paper-dark/40 p-3">
          <h4 className="mb-1.5 flex items-baseline justify-between gap-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Производит в сутки
            <span className="text-sm normal-case text-green-800 tabular-nums">
              +{rev.toFixed(1)} ₽
            </span>
          </h4>
          <ul className="space-y-1">
            {Object.entries(building.prod).map(([res, tons]) => {
              const amt = total(tons)
              const price = PRICE_BY_ID.get(res)
              const on = !chain.off[res]
              const v = on && price ? price.rubSell * amt : 0
              return (
                <ResRow
                  key={res}
                  res={res}
                  label={resName(res)}
                  on={on}
                  onToggle={v2 => toggleRes(index, res, v2)}
                  amount={fmtAmt(amt)}
                  value={on && price ? fmtRub(v) : undefined}
                  title="продаётся на границе"
                />
              )
            })}
            {Object.keys(building.prod).length === 0 && (
              <li className="text-sm text-ink-soft">—</li>
            )}
          </ul>
        </div>
      </div>

      {building.note && (
        <p className="mt-3 border-t border-dashed border-ink/30 pt-2 text-right text-xs text-ink-soft">
          {building.note}
        </p>
      )}
    </PaperCard>
  )
}

function ResRow({
  res,
  label,
  on,
  onToggle,
  amount,
  value,
  negative = false,
  title,
  addProducer,
}: {
  res: string
  label: string
  on: boolean
  onToggle: (on: boolean) => void
  amount: string
  value?: string
  negative?: boolean
  title?: string
  /** when resource is off, show a "+" that adds a producing building */
  addProducer?: (() => void) | undefined
}) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={on}
        onChange={(e) => onToggle(e.target.checked)}
        title={title}
        className="size-3.5 shrink-0 cursor-pointer accent-[#8a413a]"
      />
      {res === 'workers' ? (
        <img src="game-icons/resources/workers.png" alt="" width={18} height={18} />
      ) : (
        <img src={icon(res)} alt="" width={18} height={18} />
      )}
      <span className={`mr-auto ${on ? '' : 'text-ink-soft line-through'}`}>
        {label}
      </span>
      <span className="text-xs tabular-nums text-ink-soft">
        {amount}
        {value && (
          <>
            {' · '}
            <b className={negative ? 'text-accent-soft' : 'text-green-800'}>
              {value}
            </b>
          </>
        )}
      </span>
      {addProducer && !on && (
        <button
          onClick={addProducer}
          title={`Добавить здание: ${label} (производство)`}
          className="grid size-5 shrink-0 cursor-pointer place-items-center rounded-sm border border-line bg-paper-raised text-sm leading-none text-ink hover:bg-paper-dark"
        >
          +
        </button>
      )}
    </li>
  )
}

export default function Profit() {
  const chains = useProfit((s) => s.chains)
  const add = useProfit((s) => s.add)
  const clear = useProfit((s) => s.clear)
  const setResEverywhere = useProfit((s) => s.setResEverywhere)
  const [selected, setSelected] = useState('')

  const withBuildings = useMemo(
    () =>
      chains
        .map((c, i) => ({ chain: c, building: BUILDINGS.find((b) => b.id === c.buildingId), index: i }))
        .filter((x): x is { chain: Chain; building: Building; index: number } => Boolean(x.building)),
    [chains],
  )

  const totals = useMemo(() => {
    let rev = 0
    let cost = 0
    // amt = physical total across all chains; on = portion from enabled chains
    const cons = new Map<string, { amt: number; on: number; idx: number[] }>()
    const prod = new Map<string, { amt: number; on: number; idx: number[] }>()
    let workersTotal = 0
    let workersCost = 0
    const resOn = new Map<string, boolean>()
    for (const { chain, building, index } of withBuildings) {
      const workers = building.workers * chain.qty
      const scale = building.workers > 0 ? workers : chain.qty
      if (building.workers > 0) workersTotal += workers
      if (!chain.off.workers && building.workers > 0) {
        workersCost += workers * SHIFTS * WORKERS_PRICE
      }
      for (const [res, tons] of Object.entries(building.prod)) {
        const amt = tons * scale
        const e = prod.get(res) ?? { amt: 0, on: 0, idx: [] }
        e.amt += amt
        e.idx.push(index)
        if (!chain.off[res]) {
          e.on += amt
          rev += (PRICE_BY_ID.get(res)?.rubSell ?? 0) * amt
        }
        resOn.set(res, (resOn.get(res) ?? false) || !chain.off[res])
        prod.set(res, e)
      }
      for (const [res, tons] of Object.entries(building.cons)) {
        const amt = tons * scale
        const e = cons.get(res) ?? { amt: 0, on: 0, idx: [] }
        e.amt += amt
        e.idx.push(index)
        if (!chain.off[res]) {
          e.on += amt
          cost += (PRICE_BY_ID.get(res)?.rubBuy ?? 0) * amt
        }
        resOn.set(res, (resOn.get(res) ?? false) || !chain.off[res])
        cons.set(res, e)
      }
    }
    const byName = (a: [string, unknown], b: [string, unknown]) =>
      resName(a[0]).localeCompare(resName(b[0]), 'ru')
    return {
      rev,
      cost,
      profit: rev - cost,
      cons: [...cons.entries()].sort(byName),
      prod: [...prod.entries()].sort(byName),
      workersTotal,
      workersCost,
      workersOn: withBuildings.some(
        ({ chain, building }) => building.workers > 0 && !chain.off.workers,
      ),
      resOn,
    }
  }, [withBuildings])

  return (
    <section className="flex flex-col gap-4">
      <PageHeader title="Калькулятор прибыли" icon="game-icons/trade_prices.png" />

      <PaperCard jag={1} stains={5}>
        <div className="flex items-end justify-between gap-3">
          <label className="flex flex-1 flex-col gap-1 text-xs text-ink-soft">
            Добавить здание
            <select
              value={selected}
              onChange={(e) => {
                if (e.target.value) {
                  add(e.target.value)
                  setSelected('')
                }
              }}
              className="rounded-none border border-input-border bg-input-bg px-2 py-2 text-sm text-ink outline-none"
            >
              <option value="">— выберите здание из списка —</option>
              {BUILDINGS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </label>
          {chains.length > 0 && (
            <button
              onClick={clear}
              className="mb-0.5 cursor-pointer border border-line bg-paper-raised px-2 py-1.5 text-xs text-ink-soft hover:bg-paper-dark"
            >
              Очистить всё
            </button>
          )}
        </div>
      </PaperCard>

      {withBuildings.map(({ chain, building, index }) => (
        <ChainRow key={`${chain.buildingId}-${index}`} chain={chain} building={building} index={index} />
      ))}

      {withBuildings.length > 0 && (
        <PaperCard jag={2} stains={6}>
          <div className="flex items-center gap-3 tabular-nums">
            <span className="font-semibold">Итого</span>
            <span
              className={`ml-auto text-lg font-bold ${
                totals.profit >= 0 ? 'text-green-800' : 'text-accent-soft'
              }`}
            >
              {totals.profit >= 0 ? '+' : '−'}
              {Math.abs(totals.profit).toFixed(0)} ₽/сут
            </span>
          </div>
          <p className="mt-1 text-xs tabular-nums text-ink-soft">
            Требуется рабочих в смену {totals.workersTotal} · в сутки ×{SHIFTS} ={' '}
            {totals.workersTotal * SHIFTS}
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-sm border border-line/60 bg-paper-dark/40 p-3">
              <h4 className="mb-1.5 flex items-baseline justify-between gap-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Потребляет в сутки
                <span className="text-sm normal-case text-accent-soft tabular-nums">
                  −{totals.cost.toFixed(0)} ₽
                </span>
              </h4>
              <ul className="space-y-1">
                {totals.workersTotal > 0 && (
                  <li className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={totals.workersOn}
                      onChange={(e) => setResEverywhere('workers', e.target.checked)}
                      title="нанимается на границе"
                      className="size-3.5 shrink-0 cursor-pointer accent-[#8a413a]"
                    />
                    <img src="game-icons/resources/workers.png" alt="" width={18} height={18} />
                    <span className={`mr-auto ${totals.workersOn ? '' : 'text-ink-soft line-through'}`}>
                      Рабочие ×3
                    </span>
                    <span className="text-xs tabular-nums text-ink-soft">
                      {totals.workersTotal} чел
                      {totals.workersOn && (
                        <>
                          {' · '}
                          <b className="text-accent-soft">−{totals.workersCost.toFixed(0)} ₽</b>
                        </>
                      )}
                    </span>
                  </li>
                )}
                {totals.cons.map(([res, e]) => {
                  const price = PRICE_BY_ID.get(res)
                  const on = totals.resOn.get(res) ?? true
                  const pid = producerFor(res)
                  return (
                    <li key={res} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={(ev) => setResEverywhere(res, ev.target.checked, e.idx)}
                        title="покупается на границе"
                        className="size-3.5 shrink-0 cursor-pointer accent-[#8a413a]"
                      />
                      <img src={icon(res)} alt="" width={18} height={18} />
                      <span className={`mr-auto ${on ? '' : 'text-ink-soft line-through'}`}>
                        {resName(res)}
                      </span>
                      <span className="text-xs tabular-nums text-ink-soft">
                        {fmtAmt(e.amt)}
                        {on && price && (
                          <>
                            {' · '}
                            <b className="text-accent-soft">{fmtRub(-price.rubBuy * e.on)}</b>
                          </>
                        )}
                      </span>
                      {pid && !on && (
                        <button
                          onClick={() => add(pid)}
                          title={`Добавить здание: ${resName(res)} (производство)`}
                          className="grid size-5 shrink-0 cursor-pointer place-items-center rounded-sm border border-line bg-paper-raised text-sm leading-none text-ink hover:bg-paper-dark"
                        >
                          +
                        </button>
                      )}
                    </li>
                  )
                })}
                {totals.cons.length === 0 && totals.workersTotal === 0 && (
                  <li className="text-sm text-ink-soft">—</li>
                )}
              </ul>
            </div>
            <div className="rounded-sm border border-line/60 bg-paper-dark/40 p-3">
              <h4 className="mb-1.5 flex items-baseline justify-between gap-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Производит в сутки
                <span className="text-sm normal-case text-green-800 tabular-nums">
                  +{totals.rev.toFixed(0)} ₽
                </span>
              </h4>
              <ul className="space-y-1">
                {totals.prod.map(([res, e]) => {
                  const price = PRICE_BY_ID.get(res)
                  const on = totals.resOn.get(res) ?? true
                  const pid = producerFor(res)
                  return (
                    <li key={res} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={(ev) => setResEverywhere(res, ev.target.checked, e.idx)}
                        title="продаётся на границе"
                        className="size-3.5 shrink-0 cursor-pointer accent-[#8a413a]"
                      />
                      <img src={icon(res)} alt="" width={18} height={18} />
                      <span className={`mr-auto ${on ? '' : 'text-ink-soft line-through'}`}>
                        {resName(res)}
                      </span>
                      <span className="text-xs tabular-nums text-ink-soft">
                        {fmtAmt(e.amt)}
                        {on && price && (
                          <>
                            {' · '}
                            <b className="text-green-800">{fmtRub(price.rubSell * e.on)}</b>
                          </>
                        )}
                      </span>
                      {pid && !on && (
                        <button
                          onClick={() => add(pid)}
                          title={`Добавить здание: ${resName(res)} (производство)`}
                          className="grid size-5 shrink-0 cursor-pointer place-items-center rounded-sm border border-line bg-paper-raised text-sm leading-none text-ink hover:bg-paper-dark"
                        >
                          +
                        </button>
                      )}
                    </li>
                  )
                })}
                {totals.prod.length === 0 && (
                  <li className="text-sm text-ink-soft">—</li>
                )}
              </ul>
            </div>
          </div>
        </PaperCard>
      )}

      {withBuildings.length === 0 && (
        <p className="px-1 text-sm text-ink-soft">
          Выберите здание сверху — оно появится карточкой. В карточке: количество
          зданий, галочки «свой ресурс» (снимите, если ресурс уже производится у
          вас и не покупается/не продаётся), суточные затраты и прибыль.
        </p>
      )}
    </section>
  )
}
