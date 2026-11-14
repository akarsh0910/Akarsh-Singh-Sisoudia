import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ProjectPage from "./ProjectPage";
import profileImg from "./assets/profile.png";

gsap.registerPlugin(ScrollTrigger);

function Home({ isDark, setIsDark }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const roleRef = useRef(null);
  const profileImageRef = useRef(null);
  const cordSwingRef = useRef(null);
  const cordLineRef = useRef(null);
  const cordHandleRef = useRef(null);
  const pullTimelineRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isContactOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsContactOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isContactOpen]);

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
          horizontalTrackRef.current.scrollWidth -
            horizontalSectionRef.current.clientWidth,
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

      gsap.utils.toArray(".section-title").forEach((title) => {
        gsap.fromTo(
          title,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      gsap.fromTo(
        profileImageRef.current,
        { filter: "grayscale(100%)" },
        {
          filter: "grayscale(0%)",
          ease: "none",
          scrollTrigger: {
            trigger: profileImageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.to(cordSwingRef.current, {
        rotate: 2,
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "top center",
      });
    });

    return () => {
      context.revert();
      pullTimelineRef.current?.kill();
    };
  }, []);

  const pullThemeCord = () => {
    setIsDark((currentTheme) => !currentTheme);
    pullTimelineRef.current?.kill();
    pullTimelineRef.current = gsap
      .timeline()
      .to(cordLineRef.current, {
        scaleY: 1.35,
        duration: 0.18,
        ease: "power2.out",
        transformOrigin: "top center",
      })
      .to(
        cordHandleRef.current,
        { y: 30, duration: 0.18, ease: "power2.out" },
        "<",
      )
      .to(cordLineRef.current, {
        scaleY: 1,
        duration: 0.65,
        ease: "elastic.out(1, 0.35)",
      })
      .to(
        cordHandleRef.current,
        { y: 0, duration: 0.65, ease: "elastic.out(1, 0.35)" },
        "<",
      );
  };

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
    <main className="overflow-x-hidden bg-[#f4f4f4] text-[#111] transition-colors duration-500 dark:bg-[#050505] dark:text-[#f4f4f4]">
      <section
        id="home"
        className="relative flex min-h-screen items-center px-6 pb-16 pt-28 sm:px-10 lg:px-16"
      >
        <div
          ref={cordSwingRef}
          className="absolute right-8 top-0 z-20 origin-top sm:right-14 lg:right-20"
        >
          <div
            ref={cordLineRef}
            className="mx-auto h-24 w-px origin-top bg-gradient-to-b from-black/20 to-black/60 dark:from-white/20 dark:to-white/70"
          />
          <button
            type="button"
            onClick={pullThemeCord}
            aria-label={`Pull to switch to ${isDark ? "light" : "dark"} mode`}
            aria-pressed={!isDark}
            className="group relative -mt-px flex h-10 w-8 items-center justify-center rounded-full border border-black/20 bg-gradient-to-br from-white via-gray-200 to-gray-400 shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-shadow hover:shadow-[0_5px_18px_rgba(0,0,0,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current dark:border-white/20 dark:from-gray-200 dark:via-gray-500 dark:to-gray-800"
          >
            <span
              ref={cordHandleRef}
              className="h-2 w-2 rounded-full bg-white/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]"
            />
            <span className="absolute inset-1 rounded-full border border-black/10 dark:border-white/10" />
          </button>
        </div>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative z-10">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-black/45 dark:text-white/45">
              Software developer · Lucknow, India
            </p>
            <h1 className="text-5xl font-black leading-[1.05] tracking-tighter sm:text-7xl lg:text-8xl">
              Hi, I’m
              <br />
              Akarsh<span className="text-black/35 dark:text-white/35">.</span>
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xl font-medium text-black/65 dark:text-white/65 sm:text-2xl">
              <span>I build as a</span>
              <span className="h-10 overflow-hidden rounded-full bg-[#f4f4f4] px-4 text-sm font-bold text-black sm:h-12 sm:px-5 sm:text-base">
                <span ref={roleRef} className="flex flex-col">
                  <span className="flex h-10 shrink-0 items-center whitespace-nowrap sm:h-12">
                    Full-Stack Developer
                  </span>
                  <span className="flex h-10 shrink-0 items-center whitespace-nowrap sm:h-12">
                    Software Engineer
                  </span>
                  <span className="flex h-10 shrink-0 items-center whitespace-nowrap sm:h-12">
                    Creative Problem Solver
                  </span>
                  <span className="flex h-10 shrink-0 items-center whitespace-nowrap sm:h-12">
                    Full-Stack Developer
                  </span>
                </span>
              </span>
            </div>
            <p className="mt-7 max-w-xl text-base leading-7 text-black/55 dark:text-white/50 sm:text-lg">
              I turn thoughtful ideas into useful digital experiences, bringing
              full-stack engineering and a love of detail to every build.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#work"
                className="rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-[#f4f4f4] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current dark:bg-[#f4f4f4] dark:text-[#111]"
              >
                Explore my work
              </a>
              <a
                href="#contact"
                className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-black/80 transition-colors hover:border-black/40 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current dark:border-white/15 dark:text-white/80 dark:hover:border-white/40 dark:hover:text-white"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div className="relative mx-auto flex aspect-square w-full max-w-[480px] items-end justify-center overflow-hidden rounded-[2rem] border border-black/10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,0,0,0.08),transparent_65%),linear-gradient(145deg,#eee,#ddd)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_0_100px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.08),transparent_65%),linear-gradient(145deg,#151515,#080808)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_100px_rgba(255,255,255,0.04)]">
            <img
              ref={profileImageRef}
              src={profileImg}
              alt="Akarsh"
              className="h-full w-full object-contain object-bottom [filter:grayscale(100%)]"
            />
          </div>
        </div>
        <span className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-black/40 dark:text-white/30 md:block">
          Scroll to explore
        </span>
      </section>

      <section
        id="work"
        className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
      >
        <div className="mb-12 flex flex-col justify-between gap-5 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-black/45 dark:text-white/40">
              Selected work · 01—03
            </p>
            <h2 className="section-title text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
              Open a door.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-black/55 dark:text-white/45">
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
              <span className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-7 dark:border-white/10 dark:bg-[#181818] sm:p-8">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/35">
                  Case study · 0{index + 1}
                </span>
                <span>
                  <span className="mb-3 block text-2xl font-semibold tracking-tight">
                    {project.title}
                  </span>
                  <span className="block max-w-[15rem] text-sm leading-6 text-black/55 dark:text-white/50">
                    {project.desc}
                  </span>
                  <span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/70 dark:text-white/70">
                    View project
                    <span aria-hidden="true">↗</span>
                  </span>
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.12] via-transparent to-black/40 ${project.color} shadow-2xl transition-transform duration-[800ms] ease-in-out [transform-style:preserve-3d] [backface-visibility:hidden] [transform-origin:left_center] group-hover:[transform:rotateY(-105deg)] group-focus-visible:[transform:rotateY(-105deg)]`}
              >
                <span className="absolute inset-4 rounded-xl border border-white/10" />
                <span className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-black/30" />
                <span className="absolute right-5 top-1/2 h-12 w-3 -translate-y-1/2 rounded-full border border-white/25 bg-gradient-to-r from-white/10 to-black/30 shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
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
        className="h-screen min-h-[620px] w-full overflow-hidden border-y border-black/10 bg-[#eaeaea] dark:border-white/[0.08] dark:bg-[#0a0a0a]"
      >
        <div
          ref={horizontalTrackRef}
          className="flex h-full w-max items-center gap-[7vw] px-[7vw] will-change-transform"
        >
          <div className="w-[min(72vw,520px)] shrink-0">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-black/45 dark:text-white/40">
              A little about me
            </p>
            <h2 className="section-title text-5xl font-black leading-[1.04] tracking-tighter sm:text-7xl lg:text-8xl">
              Let’s go back
              <br />
              in time<span className="text-black/30 dark:text-white/30">.</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-black/55 dark:text-white/45">
              A timeline of the experiences and milestones that keep me curious
              and moving forward.
            </p>
          </div>

          {timeline.map((item) => (
            <article
              key={item.year}
              className="flex h-[min(62vh,440px)] w-[min(78vw,450px)] shrink-0 flex-col justify-between rounded-2xl border border-gray-200 bg-white p-7 shadow-sm dark:border-[#222] dark:bg-[#111] dark:shadow-none sm:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/35">
                  Milestone
                </span>
                <span className="h-2 w-2 rounded-full bg-black/50 dark:bg-white/60" />
              </div>
              <div>
                <p className="mb-6 text-7xl font-bold tracking-tighter text-gray-200 dark:text-gray-800 sm:text-8xl">
                  {item.year}
                </p>
                <h3 className="mb-4 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-black/55 dark:text-white/50">{item.desc}</p>
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
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-black/45 dark:text-white/40">
          Have something in mind?
        </p>
        <h2 className="section-title max-w-5xl text-5xl font-black leading-tight tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          Got a project?
          <br className="hidden sm:block" /> Let&apos;s build it together.
        </h2>
        <button
          type="button"
          onClick={() => setIsContactOpen(true)}
          className="mt-9 rounded-full bg-[#111] px-7 py-3.5 text-sm font-semibold text-[#f4f4f4] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current dark:bg-[#f4f4f4] dark:text-[#111]"
        >
          Say hello
        </button>
        <p className="mt-20 font-mono text-[10px] uppercase tracking-[0.2em] text-black/35 dark:text-white/25">
          © {new Date().getFullYear()} Akarsh · Built with care
        </p>
      </section>

      {isContactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsContactOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-gray-800 bg-[#111] p-8 md:p-12"
          >
            <button
              type="button"
              onClick={() => setIsContactOpen(false)}
              aria-label="Close contact form"
              className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full text-xl text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              ×
            </button>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-white/40">
              Let&apos;s talk
            </p>
            <h2
              id="contact-modal-title"
              className="mb-8 pr-8 text-3xl font-bold tracking-tight text-white"
            >
              Tell me about your project.
            </h2>
            <form
              action="https://formspree.io/f/YOUR_ENDPOINT_HERE"
              method="POST"
              className="space-y-6"
            >
              <label className="block">
                <span className="sr-only">Name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Name"
                  required
                  className="w-full border-0 border-b border-gray-700 bg-transparent py-3 text-white transition-colors placeholder:text-white/40 focus:border-white focus:outline-none focus:ring-0"
                />
              </label>
              <label className="block">
                <span className="sr-only">Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Email"
                  required
                  className="w-full border-0 border-b border-gray-700 bg-transparent py-3 text-white transition-colors placeholder:text-white/40 focus:border-white focus:outline-none focus:ring-0"
                />
              </label>
              <label className="block">
                <span className="sr-only">Phone number</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="Phone number"
                  className="w-full border-0 border-b border-gray-700 bg-transparent py-3 text-white transition-colors placeholder:text-white/40 focus:border-white focus:outline-none focus:ring-0"
                />
              </label>
              <label className="block">
                <span className="sr-only">Project description or topic</span>
                <textarea
                  name="project_description"
                  placeholder="Project description / topic"
                  rows="4"
                  required
                  className="w-full resize-y border-0 border-b border-gray-700 bg-transparent py-3 text-white transition-colors placeholder:text-white/40 focus:border-white focus:outline-none focus:ring-0"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-[#f4f4f4] px-6 py-4 text-sm font-bold text-black transition-colors hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div
      className={`${isDark ? "dark" : ""} min-h-screen bg-[#f4f4f4] text-[#111] transition-colors duration-500 dark:bg-[#050505] dark:text-[#f4f4f4]`}
    >
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home isDark={isDark} setIsDark={setIsDark} />}
        />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </div>
  );
}
