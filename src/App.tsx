import { useState } from "react";
import PerspectiveScrollShowcase from "./components/PerspectiveScrollShowcase";
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
    <div className={`w-full min-h-screen font-sans antialiased overflow-x-clip transition-colors duration-500 ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 ${theme === "light" ? "bg-black/5 border-black/10 text-black hover:bg-black/10" : "bg-white/10 border-white/20 text-white hover:bg-white/20"}`}
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </button>

      {/* Top Filler Content */}
      <div className={`h-[50vh] flex items-center justify-center border-b transition-colors duration-500 ${theme === "light" ? "border-black/5" : "border-white/10"}`}>
        <h1 className={`text-4xl ${theme === "light" ? "text-black/50" : "text-white/50"}`}>
          Scroll down to see the magic ✨
        </h1>
      </div>

      {/* Main Component */}
      <PerspectiveScrollShowcase projects={dummyProjects} theme={theme} />

      {/* Bottom Filler Content */}
      <div className={`h-screen flex flex-col items-center justify-center border-t transition-colors duration-500 ${theme === "light" ? "bg-gray-100 border-black/5" : "bg-zinc-950 border-white/10"}`}>
        <h1 className={`text-2xl mb-4 ${theme === "light" ? "text-black/50" : "text-white/50"}`}>
          You have reached the bottom
        </h1>
        <p className={`text-lg ${theme === "light" ? "text-black/30" : "text-white/30"}`}>
          Add more components here
        </p>
      </div>

    </div>
  );
}

export default App;
