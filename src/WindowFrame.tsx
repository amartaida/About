import type { ReactNode } from "react";

type Props = {
  title: string
  icon: string
  isClosing: boolean
  zIndex: number
  divRef: (el: HTMLDivElement | null) => void
  onWindowMouseDown: () => void
  onTitleBarMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
  onClose: () => void
  children: ReactNode
}

export default function WindowFrame({
  title,
  icon,
  isClosing,
  zIndex,
  divRef,
  onWindowMouseDown,
  onTitleBarMouseDown,
  onClose,
  children,
}: Props) {
  return (
    <div
      ref={divRef}
      className={`absolute w-[600px] h-[600px] backdrop-blur-2xl bg-black/48 border border-white/20 rounded-2xl shadow-2xl overflow-hidden ${
        isClosing ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
      }`}
      style={{
        zIndex,
        transition: isClosing ? 'opacity 250ms, transform 250ms' : 'none',
        top: 0,
        left: 0,
      }}
      onMouseDown={onWindowMouseDown}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between bg-black/40 px-4 py-2 border-b border-white/10 select-none cursor-move"
        onMouseDown={onTitleBarMouseDown}
      >
        <div className="flex items-center gap-2 font-medium">
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        <div className="flex gap-2">
          <button className="w-3 h-3 rounded-full bg-yellow-400" />
          <button className="w-3 h-3 rounded-full bg-green-400" />
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="w-3 h-3 rounded-full bg-red-500"
          />
        </div>
      </div>

      {/* Scrollable content with custom themed scrollbar */}
      <div className="p-4 overflow-y-auto overflow-x-hidden h-[calc(100%-48px)]
                      scrollbar-thin scrollbar-thumb-white/30 hover:scrollbar-thumb-white/50 
                      scrollbar-track-black/20 scrollbar-thumb-rounded transition-colors">
        {children}
      </div>
    </div>
  )
}