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
    <div className="w-full h-screen bg-black text-white font-sans antialiased overflow-hidden">
      <PerspectiveScrollShowcase projects={dummyProjects} />
    </div>
  );
}

export default App;
