import profileIcon from './assets/icons/profile.png'
import projectsIcon from './assets/icons/projects.png'
import skillsIcon from './assets/icons/skills.png'
import contactIcon from './assets/icons/contact.png'
import attachmentIcon from './assets/icons/attachment.png'

const winIcons: Record<string, string> = {
  'My Profile': profileIcon,
  Experience:   projectsIcon,
  Skills:       skillsIcon,
  Contact:      contactIcon,
  Attachment:   attachmentIcon,
}

const winicon = ['My Profile', 'Experience', 'Skills', 'Contact', 'Attachment']
const row1    = winicon.slice(0, 3)
const row2    = winicon.slice(3)

type Props = {
  isMobile: boolean
  onOpen: (title: string) => void
}

function IconButton({ item, onOpen, mobile }: { item: string; onOpen: (t: string) => void; mobile: boolean }) {
  return (
    <div
      onClick={() => onOpen(item === 'My Profile' ? 'About Me' : item)}
      className={`flex flex-col items-center hover:bg-white/10 rounded-xl cursor-pointer transition active:scale-95 hover:scale-110 ${
        mobile ? 'p-3' : 'p-4'
      }`}
    >
      <img
        src={winIcons[item]}
        alt={item}
        className={mobile ? 'w-10 h-10 object-contain' : 'w-12 h-12 object-contain'}
      />
      <span className={mobile ? 'mt-1 text-xs' : 'mt-2 text-sm'}>{item}</span>
    </div>
  )
}

export default function CenterCard({ isMobile, onOpen }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl px-8 md:px-16 py-10 md:py-12 flex flex-col items-center gap-8 md:gap-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
            Hi, Welcome
          </h1>
          <p className="text-base md:text-xl text-gray-200 mt-3 font-medium tracking-wide">
            Please Take a Look Around
          </p>
        </div>

        {/* Desktop: single row */}
        {!isMobile && (
          <div className="flex gap-3">
            {winicon.map((item) => (
              <IconButton key={item} item={item} onOpen={onOpen} mobile={false} />
            ))}
          </div>
        )}

        {/* Mobile: 2 rows — 3 top, 2 bottom centered */}
        {isMobile && (
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              {row1.map((item) => (
                <IconButton key={item} item={item} onOpen={onOpen} mobile={true} />
              ))}
            </div>
            <div className="flex gap-2">
              {row2.map((item) => (
                <IconButton key={item} item={item} onOpen={onOpen} mobile={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}