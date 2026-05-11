type DesktopIconProps = {
  title: string
  iconSrc: string
  onClick: () => void
}

export default function DesktopIcon({ title, iconSrc, onClick }: DesktopIconProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center text-xs hover:bg-white/10 p-4 rounded-xl cursor-pointer transition hover:scale-110"
    >
      <img src={iconSrc} alt={title} className="w-12 h-12 object-contain" />
      <span className="mt-2 text-sm">{title}</span>
    </div>
  )
}