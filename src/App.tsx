import PerspectiveScrollShowcase, { type Project } from './components/PerspectiveScrollShowcase';

const dummyProjects: Project[] = [
  {
    title: "AI Gift Finder",
    tags: ["AI", "UX research", "App design"],
    bgText: "BOL BOL BOL",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Iquality Dashboard",
    tags: ["Product design", "Design system", "Branding"],
    bgText: "IQUALITY IQUALITY",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Eco Tracker",
    tags: ["Sustainability", "Mobile app", "Interaction"],
    bgText: "GREEN GREEN GREEN",
    src: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80&w=2000"
  }
];

function App() {
  return (
    <div className="w-full min-h-screen bg-black text-white font-sans antialiased overflow-x-clip">
      <div className="h-[50vh] flex items-center justify-center border-b border-white/10">
        <h1 className="text-4xl text-white/50">Scroll down to see the magic ✨</h1>
      </div>

      <PerspectiveScrollShowcase projects={dummyProjects} />

      <div className="h-screen flex flex-col items-center justify-center bg-zinc-950 border-t border-white/10">
        <h1 className="text-2xl text-white/50 mb-4">You have reached the bottom</h1>
        <p className="text-white/30 text-lg">Add more components here</p>
      </div>
    </div>
  );
}

export default App;
