import { useEffect, useState, useRef, useCallback } from 'react'

import CenterCard    from './CenterCard'
import Taskbar       from './Taskbar'
import WindowFrame   from './WindowFrame'
import MobileSheet   from './MobileSheet'

import AboutMeWindow    from './windows/AboutMeWindow'
import ExperienceWindow from './windows/ExperienceWindow'
import SkillsWindow     from './windows/SkillsWindow'
import ContactWindow    from './windows/ContactWindow'
import AttachmentWindow from './windows/AttachmentWindow'

// sound
import bgMusic  from './assets/music/cherrytree.mp3'
import activing from './assets/music/activating.mp3'
import closing  from './assets/music/closing.mp3'

type Position = { x: number; y: number }
type ZIndexMap = Record<string, number>

// ─── Static data ──────────────────────────────────────────────────────────────

const apps = [
  { title: 'About Me',   icon: '👨‍💻' },
  { title: 'Experience', icon: '📁' },
  { title: 'Skills',     icon: '⚡' },
  { title: 'Contact',    icon: '📨' },
  { title: 'Attachment', icon: '📎' },
]

const windowContent: Record<string, React.ReactNode> = {
  'About Me':   <AboutMeWindow />,
  Experience:   <ExperienceWindow />,
  Skills:       <SkillsWindow />,
  Contact:      <ContactWindow />,
  Attachment:   <AttachmentWindow />,
}

const INITIAL_POSITIONS: Record<string, Position> = {
  'About Me':   { x: 120, y: 100 },
  Experience:   { x: 180, y: 150 },
  Skills:       { x: 240, y: 200 },
  Contact:      { x: 300, y: 250 },
  Attachment:   { x: 360, y: 300 },
}

const INITIAL_Z: ZIndexMap = {
  'About Me':   100,
  Experience:   101,
  Skills:       102,
  Contact:      103,
  Attachment:   104,
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return isMobile
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ScreenMain() {
  const isMobile = useIsMobile()

  // Desktop window state
  const [closedWindows,  setClosedWindows]  = useState<string[]>(apps.map((a) => a.title))
  const [closingWindows, setClosingWindows] = useState<string[]>([])
  const [zIndexMap,      setZIndexMap]      = useState<ZIndexMap>(INITIAL_Z)
  const [topZIndex,      setTopZIndex]      = useState(200)

  // Mobile state
  const [mobileActive, setMobileActive] = useState<string | null>(null)

  // Shared
  const [time, setTime]       = useState(new Date())
  // Music starts OFF — user must press speaker to turn on
  const [isMuted, setIsMuted] = useState(true)
  const musicStarted          = useRef(false)

  // ── Audio refs ────────────────────────────────────────────────────────────
  const bgRef       = useRef<HTMLAudioElement | null>(null)
  const activingRef = useRef<HTMLAudioElement | null>(null)
  const closingRef  = useRef<HTMLAudioElement | null>(null)

  // Init all audio objects once
  useEffect(() => {
    const bg = new Audio(bgMusic)
    bg.loop   = true
    bg.volume = 0.4
    bg.muted  = true   // starts muted
    bgRef.current = bg

    const sfxOpen  = new Audio(activing)
    sfxOpen.volume = 0.7
    activingRef.current = sfxOpen

    const sfxClose  = new Audio(closing)
    sfxClose.volume = 0.7
    closingRef.current = sfxClose

    return () => {
      bg.pause()
      bg.src = ''
    }
  }, [])

  // Play a SFX — clone so overlapping calls work fine
  const playSfx = useCallback((src: string) => {
    const sfx = new Audio(src)
    sfx.volume = 0.7
    sfx.play().catch(() => {})
  }, [])

  // Toggle bg music mute/unmute
  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev
      const bg   = bgRef.current
      if (!bg) return next

      if (!next) {
        // Turning ON — start playing if first time
        if (!musicStarted.current) {
          bg.muted = false
          bg.play().catch(() => {})
          musicStarted.current = true
        } else {
          bg.muted = false
        }
      } else {
        bg.muted = true
      }

      return next
    })
  }

  // Desktop drag refs
  const posRef      = useRef<Record<string, Position>>(structuredClone(INITIAL_POSITIONS))
  const windowRefs  = useRef<Record<string, HTMLDivElement | null>>({})
  const draggingRef = useRef<string | null>(null)
  const offsetRef   = useRef<Position>({ x: 0, y: 0 })

  // Clock
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // Apply initial transform when a desktop window mounts
  const setWindowRef = useCallback((title: string) => (el: HTMLDivElement | null) => {
    windowRefs.current[title] = el
    if (el) {
      const pos = posRef.current[title] ?? INITIAL_POSITIONS[title]
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
    }
  }, [])

  // ── Helpers ───────────────────────────────────────────────────────────────

  const bringToFront = (title: string) => {
    setTopZIndex((prev) => {
      const next = prev + 1
      setZIndexMap((z) => ({ ...z, [title]: next }))
      return next
    })
  }

  const openWindow = (title: string) => {
    playSfx(activing)

    if (isMobile) {
      setMobileActive(title)
      return
    }
    setClosedWindows((prev) => prev.filter((t) => t !== title))
    bringToFront(title)
  }

  const closeWindow = (title: string) => {
    playSfx(closing)

    if (isMobile) {
      setMobileActive(null)
      return
    }
    setClosingWindows((prev) => [...prev, title])
    setTimeout(() => {
      setClosedWindows((prev)  => [...prev, title])
      setClosingWindows((prev) => prev.filter((t) => t !== title))
    }, 250)
  }

  // ── Desktop drag handlers ─────────────────────────────────────────────────

  const handleMouseMove = (e: React.MouseEvent) => {
    const title = draggingRef.current
    if (!title) return
    const x = e.clientX - offsetRef.current.x
    const y = e.clientY - offsetRef.current.y
    posRef.current[title] = { x, y }
    const el = windowRefs.current[title]
    if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  const handleMouseUp = () => { draggingRef.current = null }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      className="w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white relative font-sans select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* bg glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.25),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.25),transparent_40%)]" />
      <div style={{ zIndex: topZIndex }} />
      {/* Welcome card */}
      <CenterCard isMobile={isMobile} onOpen={openWindow} />

      {/* ── Desktop windows ─────────────────────────────────────────────── */}
      {!isMobile && apps
        .filter((app) => !closedWindows.includes(app.title))
        .map((app) => {
          const isClosing = closingWindows.includes(app.title)
          return (
            <WindowFrame
              key={app.title}
              title={app.title}
              icon={app.icon}
              isClosing={isClosing}
              zIndex={zIndexMap[app.title] ?? 100}
              divRef={setWindowRef(app.title)}
              onWindowMouseDown={() => bringToFront(app.title)}
              onTitleBarMouseDown={(e) => {
                e.preventDefault()
                bringToFront(app.title)
                draggingRef.current = app.title
                const rect = windowRefs.current[app.title]?.getBoundingClientRect()
                if (!rect) return
                offsetRef.current = {
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                }
              }}
              onClose={() => closeWindow(app.title)}
            >
              {windowContent[app.title]}
            </WindowFrame>
          )
        })}

      {/* ── Mobile bottom sheets ─────────────────────────────────────────── */}
      {isMobile && apps.map((app) => (
        <MobileSheet
          key={app.title}
          title={app.title}
          icon={app.icon}
          isOpen={mobileActive === app.title}
          onClose={() => closeWindow(app.title)}
        >
          {windowContent[app.title]}
        </MobileSheet>
      ))}

      {/* Taskbar */}
      <Taskbar
        apps={apps}
        closedWindows={closedWindows}
        time={time}
        isMobile={isMobile}
        isMuted={isMuted}
        onOpen={openWindow}
        onToggleMute={toggleMute}
      />
    </div>
  )
}