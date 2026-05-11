import type { ReactNode } from "react";

type Props = {
  title: string
  icon: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function MobileSheet({ title, icon, isOpen, onClose, children }: Props) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/10 border-t border-white/20 rounded-t-3xl shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ height: '80%' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/30" />
        </div>

        {/* Title bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <div className="flex items-center gap-2 font-medium">
            <span>{icon}</span>
            <span>{title}</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-80px)]">
          {children}
        </div>
      </div>
    </>
  )
}