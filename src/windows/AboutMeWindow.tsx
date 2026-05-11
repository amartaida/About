import profilePic from '../assets/image/profile.png' 

export default function AboutMeWindow() {
  return (
    <div className="p-6 text-gray-200 space-y-6 w-full">
      {/* Who I am + profile image side by side */}
      <div className="flex items-center gap-6">
        <img
          src={profilePic}
          alt="Profile"
          className="w-32 h-32 rounded-full border-2 border-white/30 object-cover flex-shrink-0"
        />
        <div>
          <h2 className="text-xl font-semibold mb-2">Who I am:</h2>
          <p className="text-base leading-relaxed">
            I am a computer science (informatics) student focusing on cybersecurity. I enjoy understanding how systems work and protecting them from digital threats.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">What I do:</h2>
        <p className="text-base leading-relaxed">
          I do programming, scripting, and creating websites or applications. Currently, I focus on cybersecurity, learning how to identify and prevent security issues. I also tutor mathematics and informatics, especially helping students prepare for future informatics olympiads.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">What I’m interested in:</h2>
        <p className="text-base leading-relaxed">
          Backend web and app development, game development, solving competitive programming, and Capture The Flag (CTF) challenges in cybersecurity. Outside of tech, I enjoy music and gaming.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Education:</h2>
        <p className="text-base leading-relaxed">Second-year student majoring in Informatics at President University .</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Languages:</h2>
        <p className="text-base leading-relaxed">- Indonesian (primary) <br />- English (Second), <br />- currently studying Japanese and Chinese.</p>
      </div>
    </div>
  )
}