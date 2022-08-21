import { useLocation } from "react-router-dom";

export default function Project() {
  const { state } = useLocation();
  // @ts-ignore
  const { project } = state;
  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex items-center max-w-7xl mx-auto py-6">
          <h1 className="text-3xl font-bold text-gray-900">Project Name</h1>
          <div className="flex gap-2 ml-auto">
            <a
              className="btn btn-outline"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              View Git Repository
            </a>
            <button className="btn">Visit</button>
          </div>
        </div>
      </header>
    </div>
  );
}
