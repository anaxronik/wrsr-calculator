import { NavLink, Route, Routes } from 'react-router'
import Home from './pages/Home.tsx'
import Profit from './pages/Profit.tsx'
import Buildings from './pages/Buildings.tsx'
import MarketPrices from './pages/MarketPrices.tsx'
import PaperStains from './components/PaperStains.tsx'

const navIconClass = 'rounded-sm shadow-sm'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'flex items-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
    isActive
      ? 'bg-paper text-accent shadow-sm'
      : 'bg-paper/15 text-paper hover:bg-paper/30',
  ].join(' ')

export default function App() {
  return (
    <div className="paper-bg isolate flex min-h-svh flex-col text-ink">
      <PaperStains />
      <header className="bg-accent shadow-md">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <NavLink to="/" className="text-base font-bold tracking-tight text-paper">
            W&RSR Калькулятор
          </NavLink>
          <nav className="flex flex-wrap items-center gap-1.5">
            <NavLink to="/market" className={navLinkClass}>
              <img
                src="game-icons/trade_prices.png"
                alt=""
                width={26}
                height={26}
                className={navIconClass}
              />
              Цены на ресурсы
            </NavLink>
            <NavLink to="/profit" className={navLinkClass}>
              Прибыль
            </NavLink>
            <NavLink to="/buildings" className={navLinkClass}>
              Здания
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<MarketPrices />} />
          <Route path="/profit" element={<Profit />} />
          <Route path="/buildings" element={<Buildings />} />
        </Routes>
      </main>

      <footer className="border-t border-line/70 py-4 text-center text-xs text-ink-soft">
        Неофициальный инструмент для Workers &amp; Resources: Soviet Republic
      </footer>
    </div>
  )
}
