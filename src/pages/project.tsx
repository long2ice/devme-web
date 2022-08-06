import { FaGithub, FaGitlab } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { get_git, GitProvider } from "../apis/git";

export default function Project() {
  const [gitProviders, setGitProviders] = useState<Array<GitProvider>>([]);

  useEffect(() => {
    (async () => {
      setGitProviders(await get_git());
    })();
  }, []);
  return (
    <div className="card bg-base-100 shadow-xl mx-[20%] mt-[5%]">
      <div className="card-body">
        <h2 className="card-title">Import Git Repository</h2>

        <div className="card bg-gray-100 shadow-xl py-[5%] px-[20%] gap-2 mt-5">
          <p className="mb-[5%] text-gray-500">
            Select a Git provider to import an existing project from a Git
            Repository.
          </p>
          {gitProviders.map((g) =>
            g.type === "github" ? (
              <button
                className="btn gap-4 flex flex-col justify-center"
                key={g.id}
              >
                <FaGithub size="1.5em" className="self-start absolute" />
                <span className="self-center w-full">{g.name}</span>
              </button>
            ) : (
              <button
                key={g.id}
                className="flex flex-col justify-center justify-start btn gap-4 bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600"
              >
                <FaGitlab size="1.5em" className="self-start absolute" />
                <span className="self-center w-full">{g.name}</span>
              </button>
            )
          )}

          <div className="card-actions">
            <Link className="link link-neutral mt-10 text-gray-700" to="/git">
              Add Git Provider →
            </Link>
          </div>
        </div>

        <div className="card-actions">
          <div className="link mt-10 text-gray-700 no-underline hover:cursor-pointer">
            Import Third-Party Git Repository →
          </div>
        </div>
      </div>
    </div>
  );
}
