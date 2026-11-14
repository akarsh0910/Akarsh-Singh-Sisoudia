import { useParams, Link } from 'react-router-dom';

export default function ProjectPage() {
  const { id } = useParams();

  const projectDetails = {
    taskflow: {
      title: "TaskFlow",
      subtitle: "Scheduling and workflow management",
      description:
        "A scheduling platform built with Spring Boot, React, and Docker.",
      tags: ["Spring Boot", "React", "Docker", "Scheduling"],
      color: "bg-blue-900",
    },
    hackhub: {
      title: "HackHub",
      subtitle: "Event management platform",
      description:
        "An event platform built with Next.js and Firebase for hackathon organizers and participants.",
      tags: ["Next.js", "Firebase", "Events"],
      color: "bg-purple-900",
    },
    "multi-compiler": {
      title: "Multi-Compiler",
      subtitle: "Containerized code execution",
      description:
        "A code execution service built with Node.js and Docker to compile and run programs in isolated containers.",
      tags: ["Node.js", "Docker", "Code execution"],
      color: "bg-emerald-900",
    },
  };

  const project = projectDetails[id] || {
    title: "Project Not Found",
    subtitle: "",
    description: "This project case study is currently being updated.",
    tags: [],
    color: "bg-gray-800",
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-8 text-[#111] transition-colors duration-500 dark:bg-[#111] dark:text-[#f4f4f4] md:p-16">
      <Link to="/" className="mb-12 inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white">
        ← Back to the doors
      </Link>
      
      <h1 className="text-5xl md:text-7xl font-bold mb-4">{project.title}</h1>
      <h2 className="mb-8 text-2xl text-gray-600 dark:text-gray-500 md:text-3xl">{project.subtitle}</h2>
      
      <div className="flex flex-col items-center gap-12 rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-[#1a1a1a] md:flex-row">
        <div className="w-full md:w-1/2 space-y-6">
          <h3 className="text-3xl font-bold">Project Overview</h3>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">{project.description}</p>
          <div className="flex flex-wrap gap-3 pt-4">
            {project.tags.map((tag, i) => (
              <span key={i} className="rounded-full border border-gray-300 bg-gray-100 px-5 py-2 text-sm font-medium dark:border-gray-700 dark:bg-[#222]">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Placeholder for actual project screenshots or videos */}
        <div className={`w-full md:w-1/2 h-[400px] ${project.color} rounded-xl flex items-center justify-center border border-gray-700 shadow-2xl`}>
          <span className="text-white/40 font-bold uppercase tracking-widest">Visual Asset</span>
        </div>
      </div>
    </div>
  );
}