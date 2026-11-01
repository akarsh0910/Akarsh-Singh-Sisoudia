import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ProjectPage from "./ProjectPage";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const roleRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const context = gsap.context(() => {
      gsap
        .timeline({ repeat: -1 })
        .to(roleRef.current, {
          yPercent: -25,
          duration: 0.65,
          delay: 1.4,
          ease: "power2.inOut",
        })
        .to(roleRef.current, {
          yPercent: -50,
          duration: 0.65,
          delay: 1.4,
          ease: "power2.inOut",
        })
        .to(roleRef.current, {
          yPercent: -75,
          duration: 0.65,
          delay: 1.4,
          ease: "power2.inOut",
        });

      const getScrollDistance = () =>
        Math.max(
          0,
          horizontalTrackRef.current.scrollWidth - window.innerWidth,
        );

      gsap.to(horizontalTrackRef.current, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => context.revert();
  }, []);

  const projects = [
    {
      title: "TaskFlow",
      slug: "taskflow",
      desc: "Spring Boot, React & Docker Scheduling",
      color: "bg-blue-900",
    },
    {
      title: "HackHub",
      slug: "hackhub",
      desc: "Next.js & Firebase Event Platform",
      color: "bg-purple-900",
    },
    {
      title: "Multi-Compiler",
      slug: "multi-compiler",
      desc: "Node.js & Docker Code Execution",
      color: "bg-emerald-900",
    },
  ];

  const timeline = [
    {
      year: "2026",
      title: "Software Development Intern",
      desc: "Built predictive market backend at Dunitech Soft Solutions using Node.js, Express, TypeScript, and Prisma ORM.",
    },
    {
      year: "2024",
      title: "Hackathon Finalist",
      desc: "Secured 5th place out of 1000 participants building HackHub, an event management platform.",
    },
    {
      year: "2023",
      title: "CS Undergraduate",
      desc: "Began B.Tech at SRM Institute of Science and Technology focusing on AI, ML, and CS fundamentals.",
    },
  ];

  return (
    <main className="overflow-x-hidden bg-[#111] text-[#f4f4f4]">
      <section
        id="home"
        className="relative flex min-h-screen items-center px-6 pb-16 pt-28 sm:px-10 lg:px-16"
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="relative z-10">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-white/45">
              Software developer · Lucknow, India
            </p>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              Hi, I’m
              <br />
              Akarsh<span className="text-white/35">.</span>
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xl font-medium text-white/65 sm:text-2xl">
              <span>I build as a</span>
              <span className="h-10 overflow-hidden rounded-md border border-white/10 bg-white/[0.06] px-3 text-white sm:h-12 sm:px-4">
                <span ref={roleRef} className="flex flex-col">
                  <span className="flex h-10 items-center sm:h-12">
                    Full-Stack Developer
                  </span>
                  <span className="flex h-10 items-center sm:h-12">
                    Software Engineer
                  </span>
                  <span className="flex h-10 items-center sm:h-12">
                    Creative Problem Solver
                  </span>
                  <span className="flex h-10 items-center sm:h-12">
                    Full-Stack Developer
                  </span>
                </span>
              </span>
            </div>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/50 sm:text-lg">
              I turn thoughtful ideas into useful digital experiences, bringing
              full-stack engineering and a love of detail to every build.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#work"
                className="rounded-full bg-[#f4f4f4] px-6 py-3 text-sm font-semibold text-[#111] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Explore my work
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div
            role="img"
            aria-label="Profile photo placeholder"
            className="relative mx-auto aspect-square w-full max-w-[400px] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.09] via-[#1a1a1a] to-[#171717] shadow-[0_0_100px_rgba(255,255,255,0.07)]"
          >
            <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/[0.08] blur-3xl" />
            <div className="absolute inset-5 rounded-[1.5rem] border border-dashed border-white/15" />
            <div className="relative flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-3xl text-white/50">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-white/65">
                  Portrait coming soon
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">
                  Profile image
                </p>
              </div>
            </div>
          </div>
        </div>
        <span className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 md:block">
          Scroll to explore
        </span>
      </section>

      <section
        id="work"
        className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
      >
        <div className="mb-12 flex flex-col justify-between gap-5 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
              Selected work · 01—03
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Open a door.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/45">
            A few things I’ve built, each with a different problem to solve.
            Hover or focus a door to take a look inside.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              aria-label={`Open ${project.title} project case study`}
              onClick={() => navigate(`/project/${project.slug}`)}
              className="group relative h-[420px] cursor-pointer rounded-2xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-[460px]"
              style={{ perspective: "1200px" }}
            >
              <span className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#181818] p-7 sm:p-8">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/35">
                  Case study · 0{index + 1}
                </span>
                <span>
                  <span className="mb-3 block text-2xl font-semibold tracking-tight">
                    {project.title}
                  </span>
                  <span className="block max-w-[15rem] text-sm leading-6 text-white/50">
                    {project.desc}
                  </span>
                  <span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                    View project
                    <span aria-hidden="true">↗</span>
                  </span>
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 ${project.color} shadow-2xl transition-transform duration-700 ease-in-out [transform-style:preserve-3d] [backface-visibility:hidden] [transform-origin:left_center] group-hover:[transform:rotateY(-105deg)] group-focus-visible:[transform:rotateY(-105deg)]`}
              >
                <span className="absolute inset-4 rounded-xl border border-white/10" />
                <span className="h-1.5 w-16 rounded-full bg-black/20" />
                <span className="absolute right-5 top-1/2 h-12 w-3 -translate-y-1/2 rounded-sm border border-white/20 bg-white/25 shadow" />
                <span className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
                  Door 0{index + 1}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section
        id="about"
        ref={horizontalSectionRef}
        className="h-screen min-h-[620px] w-full overflow-hidden border-y border-white/[0.08] bg-[#0c0c0c]"
      >
        <div
          ref={horizontalTrackRef}
          className="flex h-full w-max items-center gap-[7vw] px-[7vw] will-change-transform"
        >
          <div className="w-[min(72vw,520px)] shrink-0">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
              A little about me
            </p>
            <h2 className="text-5xl font-semibold leading-[1.04] tracking-[-0.06em] sm:text-7xl">
              The path
              <br />
              so far<span className="text-white/30">.</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-white/45">
              A timeline of the experiences and milestones that keep me curious
              and moving forward.
            </p>
          </div>

          {timeline.map((item) => (
            <article
              key={item.year}
              className="flex h-[min(62vh,440px)] w-[min(78vw,450px)] shrink-0 flex-col justify-between rounded-2xl border border-white/10 bg-[#141414] p-7 sm:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/35">
                  Milestone
                </span>
                <span className="h-2 w-2 rounded-full bg-white/60" />
              </div>
              <div>
                <p className="mb-6 text-6xl font-semibold tracking-[-0.07em] text-white/15 sm:text-7xl">
                  {item.year}
                </p>
                <h3 className="mb-4 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-white/50">{item.desc}</p>
              </div>
            </article>
          ))}
          <div aria-hidden="true" className="w-[7vw] shrink-0" />
        </div>
      </section>

      <section
        id="contact"
        className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center"
      >
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
          Have something in mind?
        </p>
        <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl md:text-7xl">
          Let’s make something
          <br className="hidden sm:block" /> worth remembering.
        </h2>
        <a
          href="mailto:hello@example.com"
          className="mt-9 rounded-full bg-[#f4f4f4] px-7 py-3.5 text-sm font-semibold text-[#111] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Say hello
        </a>
        <p className="mt-20 font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
          © {new Date().getFullYear()} Akarsh · Built with care
        </p>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </>
  );
}
