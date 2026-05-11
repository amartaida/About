type App = { title: string; icon: string }

type Props = {
  apps: App[]
  closedWindows: string[]
  time: Date
  isMobile: boolean
  isMuted: boolean
  onOpen: (title: string) => void
  onToggleMute: () => void
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  if (muted) {
    // Speaker off (X)
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 3.586L7.707 8.879A1 1 0 017 9H4a1 1 0 00-1 1v4a1 1 0 001 1h3a1 1 0 01.707.293L13 20.414V3.586zM11 1.172a2 2 0 012.93-.174l.07.074V1l.07.072A2 2 0 0115 2.828v18.344a2 2 0 01-3.13 1.656L11 22.828 5.828 17H4a3 3 0 01-3-3v-4a3 3 0 013-3h1.828L11 1.172zM17.293 9.293a1 1 0 011.414 0L20 10.586l1.293-1.293a1 1 0 111.414 1.414L21.414 12l1.293 1.293a1 1 0 01-1.414 1.414L20 13.414l-1.293 1.293a1 1 0 01-1.414-1.414L18.586 12l-1.293-1.293a1 1 0 010-1.414z" />
      </svg>
    )
  }
  // Speaker on (waves)
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 3.586L7.707 8.879A1 1 0 017 9H4a1 1 0 00-1 1v4a1 1 0 001 1h3a1 1 0 01.707.293L13 20.414V3.586zM11 1.172a2 2 0 012.93-.174l.07.074V1l.07.072A2 2 0 0115 2.828v18.344a2 2 0 01-3.13 1.656L11 22.828 5.828 17H4a3 3 0 01-3-3v-4a3 3 0 013-3h1.828L11 1.172zM16.5 12a4.5 4.5 0 00-1.329-3.182 1 1 0 10-1.414 1.414A2.5 2.5 0 0114.5 12a2.5 2.5 0 01-.743 1.768 1 1 0 101.414 1.414A4.5 4.5 0 0016.5 12zM19.071 6.929a1 1 0 10-1.414 1.414A6.5 6.5 0 0119.5 12a6.5 6.5 0 01-1.843 4.657 1 1 0 101.414 1.414A8.5 8.5 0 0021.5 12a8.5 8.5 0 00-2.429-5.071z" />
    </svg>
  )
}

export default function Taskbar({ apps, closedWindows, time, isMobile, isMuted, onOpen, onToggleMute }: Props) {
  const clockStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  // Mobile: clock + mute button
  if (isMobile) {
    return (
      <div className="absolute bottom-4 right-4 h-10 bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl flex items-center gap-2 px-3 z-50 shadow-xl">
        <button
          onClick={onToggleMute}
          className={`p-1.5 rounded-lg transition ${isMuted ? 'text-gray-500 hover:text-gray-300' : 'text-white hover:text-blue-300'}`}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          <SpeakerIcon muted={isMuted} />
        </button>
        <div className="w-px h-5 bg-white/10" />
        <span className="text-sm text-gray-300">{clockStr}</span>
      </div>
    )
  }

  // Desktop: full taskbar
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-14 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-5 px-5 z-50 shadow-2xl">
      <div className="flex gap-2">
        {apps
          .filter((app) => !closedWindows.includes(app.title))
          .map((app) => (
            <div
              key={app.title}
              onClick={() => onOpen(app.title)}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm cursor-pointer transition"
            >
              {app.icon} {app.title}
            </div>
          ))}
      </div>

      <div className="flex items-center gap-3 border-l border-white/10 pl-4">
        <button
          onClick={onToggleMute}
          className={`p-1.5 rounded-lg transition ${isMuted ? 'text-gray-500 hover:text-gray-300' : 'text-white hover:text-blue-300'}`}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          <SpeakerIcon muted={isMuted} />
        </button>

        <span className="text-sm text-gray-300">{clockStr}</span>
      </div>
    </div>
  )
}