import { useState } from "react";
import PerspectiveScrollShowcase from "../components/ui/perspective-scroll-showcase";
import { Sun, Moon } from "lucide-react";

const dummyProjects = [
  {
    title: "AI Gift Finder",
    tags: ["AI", "UX research", "App design"],
    bgText: "AI GIFT FINDER • AI GIFT FINDER • AI GIFT FINDER • AI GIFT FINDER •",
    src: "https://images.unsplash.com/photo-1676530780285-c3baa83ad200?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Eco Dashboard",
    tags: ["SaaS", "Dashboard", "Web"],
    bgText: "ECO DASHBOARD • ECO DASHBOARD • ECO DASHBOARD • ECO DASHBOARD •",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&h=900&fit=crop&q=80",
  },
  {
    title: "IQuality",
    tags: ["Branding", "UI/UX", "Mobile"],
    bgText: "IQUALITY MOBILE • IQUALITY MOBILE • IQUALITY MOBILE • IQUALITY MOBILE •",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop&q=80",
  },
  {
    title: "Urban Architecture",
    tags: ["Photography", "City", "Modern"],
    bgText: "URBAN ARCHITECTURE • URBAN ARCHITECTURE • URBAN ARCHITECTURE • URBAN ARCHITECTURE •",
    src: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1600&h=900&fit=crop&q=80",
  },
  {
    title: "Neon Nights",
    tags: ["Cyberpunk", "Neon", "Dark"],
    bgText: "NEON NIGHTS • NEON NIGHTS • NEON NIGHTS • NEON NIGHTS •",
    src: "https://images.unsplash.com/photo-1554200876-56c2f25224fa?w=1600&h=900&fit=crop&q=80",
  },
];

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  return (
    <div className={`${theme} antialiased font-sans`}>
      <div className="w-full min-h-screen overflow-x-clip transition-colors duration-500 bg-white dark:bg-black text-black dark:text-white">

        {/* Theme Toggle Button (For local dev only) */}
        <button
          onClick={toggleTheme}
          className="fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/20 text-black dark:text-white"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        {/* Top Filler Content */}
        <div className="h-[50vh] flex items-center justify-center border-b transition-colors duration-500 border-black/5 dark:border-white/10">
          <h1 className="text-4xl text-black/50 dark:text-white/50">
            Scroll down to see the magic ✨
          </h1>
        </div>

        {/* Main Component */}
        <PerspectiveScrollShowcase projects={dummyProjects} />

        {/* Bottom Filler Content */}
        <div className="h-screen flex flex-col items-center justify-center border-t transition-colors duration-500 bg-gray-100 dark:bg-zinc-950 border-black/5 dark:border-white/10">
          <h1 className="text-2xl mb-4 text-black/50 dark:text-white/50">
            You have reached the bottom
          </h1>
          <p className="text-lg text-black/30 dark:text-white/30">
            Add more components here
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
