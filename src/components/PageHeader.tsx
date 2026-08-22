/**
 * Page title bar styled like an in-game window header:
 * dark reddish-brown bar, centered white caps text,
 * thin highlight line along the top edge (bevel effect),
 * optional game icon on the left.
 * flat = no rounding/shadow, for use inside a PaperCard (torn paper sheet).
 */
export default function PageHeader({
  title,
  icon,
  flat = false,
}: {
  title: string
  icon?: string
  flat?: boolean
}) {
  return (
    <div
      className={
        flat ? 'bg-accent' : 'overflow-hidden rounded-sm bg-accent shadow-md'
      }
    >
      <div className="h-px bg-white/25" />
      <div className="flex items-center justify-center gap-3 px-4 py-2.5">
        {icon && (
          <img
            src={icon}
            alt=""
            width={28}
            height={28}
            className="rounded-sm drop-shadow"
          />
        )}
        <h1 className="text-lg font-bold tracking-wide text-paper uppercase">
          {title}
        </h1>
      </div>
    </div>
  )
}
