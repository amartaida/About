import meImage from "../assets/image/skill.png";

export default function SkillsWindow() {
  const skills = [
    "C++",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
    "PHP",
    "Penetration Testing",
    "Ethical Hacking",
    "Network Security",
    "Vulnerability Assessment",
    "UI/UX Design",
    "Node.js",
    "TypeScript",
    "Git & GitHub",
    "Tutoring"
  ];

  return (
    <div className="flex flex-col items-center">
      <img
        src={meImage}
        alt="meImage"
        className="w-65 h-65 rounded-full object-cover"
      />
      
      <div className="bg-gray-800 transition-colors rounded-lg p-4 shadow-md">
        
        <h2 className="text-lg font-semibold mb-4">Skills & Expertise</h2>
        <div className="flex flex-wrap gap-2">
          
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-900 px-4 py-2   rounded-full text-sm hover:bg-gray-700 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}