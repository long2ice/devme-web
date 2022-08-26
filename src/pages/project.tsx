import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGitRepoBranches } from "../apis/git";
import { deploy } from "../apis/deploy";

export default function Project() {
  const { state } = useLocation();
  // @ts-ignore
  const { project } = state;
  const [branches, setBranches] = useState<Array<string>>();
  const [branch, setBranch] = useState<string>("");
  const [deployLoading, setDeployLoading] = useState(false);
  const deployProject = async () => {
    setDeployLoading(true);
    await deploy(project.id, branch).finally(() => {
      setDeployLoading(false);
    });
  };
  useEffect(() => {
    (async () => {
      const branches = await getGitRepoBranches(
        project.git_provider_id,
        project.url
      );
      setBranches(branches);
      setBranch(branches[0]);
    })();
  }, [project]);
  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex items-center max-w-7xl mx-auto py-6">
          <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
          <div className="flex gap-2 ml-auto">
            <label
              className={"btn btn-primary" + (deployLoading ? " loading" : "")}
              htmlFor="deploy-modal"
            >
              Deploy
            </label>
            <input type="checkbox" id="deploy-modal" className="modal-toggle" />
            <label htmlFor="deploy-modal" className="modal cursor-pointer">
              <label className="modal-box relative" htmlFor="deploy-modal">
                <h3 className="font-bold text-lg">Select branch</h3>
                <select
                  className="select select-bordered w-full mt-4"
                  value={branch}
                  onChange={(event) => setBranch(event.target.value)}
                >
                  {branches?.map((b, i) => (
                    <option value={b} key={b}>
                      {b}
                    </option>
                  ))}
                </select>
                <div className="modal-action">
                  <label
                    htmlFor="deploy-modal"
                    className="btn"
                    onClick={async () => await deployProject()}
                  >
                    Deploy
                  </label>
                </div>
              </label>
            </label>
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
      <div className="card bg-base-100 shadow-xl mx-[20%] mt-[2%]">
        <div className="card-body">
          <h2 className="card-title">Deployment</h2>
        </div>
      </div>
    </div>
  );
}
