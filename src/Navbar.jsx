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
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 mix-blend-difference text-[#f4f4f4] text-sm">
      <div className="flex gap-6 font-medium">
        <a href="#" className="hover:text-gray-400 transition-colors">Home</a>
        <a href="#work" className="hover:text-gray-400 transition-colors">Work</a>
        <a href="#about" className="hover:text-gray-400 transition-colors">About</a>
        <a href="#contact" className="hover:text-gray-400 transition-colors">Contact</a>
      </div>
      
      <div className="hidden md:flex gap-8 text-xs font-mono text-gray-400 uppercase tracking-widest">
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