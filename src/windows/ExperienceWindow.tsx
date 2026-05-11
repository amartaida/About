import meImage from "../assets/image/work.png";

export default function ExperienceWindow() {
  const experiences = [
    { 
      title: "Informatic Tutor – Freelance", date: "Dec 2024 – Present", description: "Tutoring high school students for the National Informatics Olympiad, developing personalized exercises, and mentoring students in algorithmic thinking and coding skills." 
    },
    {
      title: "Finalist – National Science Competition (OSN) in Informatics",
      date: "Sep 2023",
      description: "Selected as one of the finalists in Indonesia’s most prestigious national competitive programming competition for high school students."
    },
    {
      title: "Peer Tutor – University & High School",
      date: "",
      description: "Providing tutoring and mentorship to peers in both informatics and physics, assisting with problem-solving, laboratory work, and algorithmic thinking.",
      subExperiences: [
        {
          title: "Informatic Peer Tutor – University",
          description: "Tutoring university peers in informatics, helping with coding assignments, algorithm understanding, and exam preparation."
        },
        {
          title: "Physics Laboratory Tutor – High School",
          description: "Assisted in physics lab sessions, guided peers through experiments, explained concepts, and supported instructors in preparing materials."
        }
      ]
    },
    {
      title: "Campus Projects",
      date: "",
      description: "",
      subExperiences: [
        {
          title: "Campus Website & Applications",
          description: "Developed and maintained web applications and internal tools, improving accessibility and workflow for students and staff."
        },
        {
          title: "Capture The Flag (CTF) Challenges",
          description: "Participated in cybersecurity competitions, solving complex problems in cryptography, reverse engineering, and network security."
        },
        {
          title: "Auditing & Security Assessments",
          description: "Conducted security audits on campus systems, identifying vulnerabilities and suggesting improvements to enhance system integrity."
        }
      ]
    }
  ];

  return (
    <div className="p-6 w-full max-w-3xl mx-auto space-y-6">
      <img
        src={meImage}
        alt="Contact Me"
        className="w-40 h-40 rounded-full object-cover mx-auto shadow-lg"
      />
      {experiences.map((exp, index) => (
        <div
          key={index}
          className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-4 shadow-md"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
            {exp.date && <span className="text-sm text-gray-400">{exp.date}</span>}
          </div>
          {exp.description && <p className="text-gray-300 text-sm mb-2">{exp.description}</p>}

          {/* Sub-experiences if any */}
          {exp.subExperiences && (
            <ul className="list-disc list-inside space-y-1">
              {exp.subExperiences.map((subExp, subIndex) => (
                <li key={subIndex}>
                  <span className="font-semibold text-white">{subExp.title}:</span>{" "}
                  <span className="text-gray-300">{subExp.description}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}