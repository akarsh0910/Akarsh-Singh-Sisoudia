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
    <div className="min-h-screen bg-[#111] text-[#f4f4f4] p-8 md:p-16">
      <Link to="/" className="inline-flex text-gray-400 hover:text-white transition-colors items-center gap-2 mb-12">
        ← Back to the doors
      </Link>
      
      <h1 className="text-5xl md:text-7xl font-bold mb-4">{project.title}</h1>
      <h2 className="text-2xl md:text-3xl text-gray-500 mb-8">{project.subtitle}</h2>
      
      <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800 flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2 space-y-6">
          <h3 className="text-3xl font-bold">Project Overview</h3>
          <p className="text-gray-400 text-lg leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-3 pt-4">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-5 py-2 bg-[#222] border border-gray-700 rounded-full text-sm font-medium">
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