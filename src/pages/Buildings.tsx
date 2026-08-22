import PageHeader from '../components/PageHeader.tsx'

export default function Buildings() {
  return (
    <section className="flex flex-col gap-4">
      <PageHeader title="Здания" />
      <p className="text-ink-soft">
        Здесь будет справочник зданий и их характеристик.
      </p>
    </section>
  )
}
