import PageHeader from '../components/PageHeader.tsx'

export default function Profit() {
  return (
    <section className="flex flex-col gap-4">
      <PageHeader title="Калькулятор прибыли" />
      <p className="text-ink-soft">
        Здесь будет расчёт рентабельности производственных цепочек.
      </p>
    </section>
  )
}
