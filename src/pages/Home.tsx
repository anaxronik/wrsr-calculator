import { Link } from 'react-router'
import PaperCard from '../components/PaperCard.tsx'

const cards = [
  {
    to: '/market',
    icon: 'game-icons/trade_prices.png',
    title: 'Цены на ресурсы',
    description:
      'Текущие цены мирового рынка: продажа и покупка в рублях и долларах.',
  },
  {
    to: '/profit',
    title: 'Калькулятор прибыли',
    description:
      'Рентабельность производственных цепочек: цены покупки/продажи, зарплаты рабочих, свои ресурсы.',
  },
  {
    to: '/buildings',
    title: 'Здания',
    description:
      'Справочник зданий: рабочие, потребление и производство ресурсов, стоимость строительства.',
  },
]

export default function Home() {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-accent-soft">
          Калькулятор для Workers &amp; Resources: Soviet Republic
        </h1>
        <p className="mt-2 text-ink-soft">
          Планирование экономики республики: производственные цепочки, цены,
          рабочие и прибыль.
       </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {cards.map((card) => (
          <Link key={card.to} to={card.to} className="block">
            <PaperCard>
              <div className="flex items-start gap-3">
                {card.icon && (
                  <img
                    src={card.icon}
                    alt=""
                    width={40}
                    height={40}
                    className="mt-0.5 shrink-0"
                  />
                )}
                <div>
                  <h2 className="font-semibold">{card.title}</h2>
                  <p className="mt-1 text-sm text-ink-soft">
                    {card.description}
                  </p>
                </div>
              </div>
            </PaperCard>
          </Link>
        ))}
      </div>
    </section>
  )
}
