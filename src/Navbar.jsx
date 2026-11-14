import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Don't show the full navbar on project detail pages for a cleaner look
  if (location.pathname !== "/") return null;

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-black/[0.08] bg-white/60 px-8 py-5 text-sm text-[#111] backdrop-blur-md dark:border-white/[0.06] dark:bg-black/40 dark:text-[#f4f4f4]">
      <div className="flex gap-6 font-medium">
        <a href="#" className="hover:text-gray-400 transition-colors">Home</a>
        <a href="#work" className="hover:text-gray-400 transition-colors">Work</a>
        <a href="#about" className="hover:text-gray-400 transition-colors">About</a>
        <a href="#contact" className="hover:text-gray-400 transition-colors">Contact</a>
      </div>
      
      <div className="hidden gap-8 font-mono text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400 md:flex">
        <span>Lucknow, IND</span>
        <span>{time}</span>
        <span className="text-green-500 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Available for work
        </span>
      </div>
    </nav>
  );
}