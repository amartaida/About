import instagram from "../assets/icons/instagram.png";
import linkedin from "../assets/icons/linkedin.png";
import email from "../assets/icons/email.png";
import meImage from "../assets/image/contactme.png";

const links = [
  {
    href: "mailto:ashrafmalabali880@gmail.com",
    img: email,
    alt: "Email",
  },
  {
    href: "https://instagram.com/asrfm.0",
    img: instagram,
    alt: "Instagram",
    external: true,
  },
  {
    href: "https://linkedin.com/in/mohamad-ashraf-malabali-b46aa2325/?skipRedirect=true",
    img: linkedin,
    alt: "LinkedIn",
    external: true,
  },
];

export default function ContactWindow() {
  return (
    <div className="w-full p-6 text-gray-200 flex flex-col items-center gap-6">
      
      <div className="text-center space-y-2">
        <h3 className="text-sm opacity-80">
          It's rare to see people want to contact me. Feel free to reach out!!.
        </h3>

        <h2 className="text-2xl font-bold tracking-wide">Contact Me</h2>
      </div>

      {/* IMAGE TENGAH + BUNDAR */}
      <img
        src={meImage}
        alt="Contact Me"
        className="w-40 h-40 rounded-full object-cover mx-auto shadow-lg"
      />

      <div className="flex items-center justify-center gap-6">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="w-20 h-20 flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <img
              src={link.img}
              alt={link.alt}
              className="w-[80%] h-[80%] object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  );
}