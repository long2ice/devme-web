import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects } from "../apis/project";
import { Project } from "../types/responses";
import { formatTime } from "../utils";
import FrameworkIcon from "../icon/framework";
import { FiExternalLink } from "react-icons/fi";

export default function Overview() {
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [showLink, setShowLink] = useState(0);
  useEffect(() => {
    (async () => {
      let data = await getProjects();
      setProjects(data);
    })();
  }, []);
  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex items-center max-w-7xl mx-auto py-6">
          <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
          <Link to="/new-project" className="ml-auto">
            <button className="btn gap-2">
              <IoMdAdd size="1.5em" />
              New Project
            </button>
          </Link>
        </div>
      </header>
      <main>
        <div className="grid grid-cols-4 gap-4 max-w-7xl mx-auto py-6">
          {projects.map((p) => (
            <Link
              to="/project"
              state={{ project: p }}
              key={p.id}
              onMouseEnter={() => setShowLink(p.id)}
              onMouseLeave={() => setShowLink(0)}
            >
              <div className="card bg-base-100 shadow-xl">
                <button
                  className={
                    "btn btn-sm btn-circle absolute top-0 right-0" +
                    (showLink === p.id ? "" : " hidden")
                  }
                >
                  <FiExternalLink />
                </button>
                <div className="card-body">
                  <h2 className="card-title">
                    <FrameworkIcon framework={p.framework} size="1.6em" />
                    {p.name}
                  </h2>
                  <div className="text-sm text-gray-500">
                    {formatTime(p.updated_at)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
