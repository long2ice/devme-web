import { FaGithub, FaGitlab } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Project() {
  return (
    <div className="card bg-base-100 shadow-xl mx-[20%] mt-[5%]">
      <div className="card-body">
        <h2 className="card-title">Import Git Repository</h2>
        <div className="card bg-gray-100 shadow-xl py-[5%] px-[20%] gap-2 mt-5">
          <p className="mb-[5%] text-gray-500">
            Select a Git provider to import an existing project from a Git
            Repository.
          </p>
          <button className="btn gap-4">
            <FaGithub size="1.5em" />
            <span>GitHub</span>
          </button>
          <button className="btn gap-4 btn-primary">
            <FaGitlab size="1.5em" />
            GitLab
          </button>
          <Link className="link link-neutral mt-10 text-gray-700" to={""}>
            Add Git Provider →
          </Link>
        </div>
        <Link className="mt-10 text-gray-700" to={""}>
          Import Third-Party Git Repository →
        </Link>
      </div>
    </div>
  );
}
