import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllFramework } from "../apis/framework";
import _ from "lodash";
import { toast } from "react-toastify";
import { TiDelete } from "react-icons/ti";
import Html from "../components/framework/html";
import { FrameworkInfo } from "../types/responses";
import { FrameworkProps } from "../types/props";
import Nodejs from "../components/framework/nodejs";
import Docker from "../components/framework/docker";
import DockerCompose from "../components/framework/docker-compose";
import { Env } from "../types/schemas";
import { createProject } from "../apis/project";

export default function ImportProject() {
  const [frameworks, setFrameworks] = useState<Array<FrameworkInfo>>([]);
  const [frameworkInfo, setFrameworkInfo] = useState<FrameworkInfo>();
  const { state } = useLocation();
  // @ts-ignore
  const { gitURL, gitID } = state;
  // @ts-ignore
  const project = _.first(_.last(gitURL.split("/")).split("."));
  // @ts-ignore
  const [projectName, setProjectName] = useState<string>(project);
  const [envs, setEnvs] = useState<Array<Env>>([]);
  const [envName, setEnvName] = useState("");
  const [envValue, setEnvValue] = useState("");
  const [root, setRoot] = useState("./");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const data = await getAllFramework();
      setFrameworks(data);
      setFrameworkInfo(data[0]);
    })();
  }, []);

  const addEnv = () => {
    if (envName === "") {
      toast.error("Please input env name!");
      return;
    }
    if (envValue === "") {
      toast.error("Please input env value!");
      return;
    }
    if (
      _.find(envs, function (e) {
        return e.name === envName;
      })
    ) {
      toast.error("There is same key env!");
      return;
    }
    setEnvs((envs) => [...envs, { name: envName, value: envValue }]);
    setEnvName("");
    setEnvValue("");
  };

  const removeEnv = (name: string) => {
    _.remove(envs, function (e) {
      return e.name === name;
    });
    setEnvs((envs) => [...envs]);
  };
  const Framework = (props: FrameworkProps) => {
    switch (props.info.type) {
      case "html":
        return <Html {...props} />;
      case "NodeJS":
        return <Nodejs {...props} />;
      case "Docker":
        return <Docker {...props} />;
      case "docker-compose":
        return <DockerCompose {...props} />;
      default:
        return <div>Unsupported framework</div>;
    }
  };

  const submitProject = async () => {
    setLoading(true);
    await createProject({
      deployment: {},
      env: envs,
      framework: frameworkInfo?.type ?? "",
      git_provider_id: gitID,
      image: frameworkInfo?.image ?? "",
      name: projectName,
      root: root,
      url: gitURL,
    })
      .finally(() => {
        setLoading(false);
      })
      .then(() => {
        toast.success("Add project success!");
      });
  };

  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex items-center max-w-7xl mx-auto py-6">
          <h1 className="text-3xl font-bold text-gray-900">Import Project</h1>
          <Link
            className="btn ml-auto"
            to="/new-project"
            state={{ defaultGitID: gitID }}
          >
            Back
          </Link>
        </div>
      </header>
      <div className="card bg-base-100 shadow-xl mx-[20%] my-[2%]">
        <div className="card-body">
          <h2 className="card-title">Configure Project</h2>
          <div className="divider"></div>
          <div className="flex flex-col gap-4">
            <div>
              <div className="mb-2 text-sm text-gray-500">PROJECT NAME</div>
              <input
                type="text"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <div className="mb-2 text-sm text-gray-500">FRAMEWORK PRESET</div>
              <select
                className="select select-bordered w-full"
                value={frameworkInfo?.type}
                onChange={(e) =>
                  setFrameworkInfo(
                    _.find(frameworks, function (f) {
                      return f.type === e.target.value;
                    })
                  )
                }
              >
                {frameworks.map((f) => (
                  <option value={f.type} key={f.type}>
                    {f.type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="mb-2 text-sm text-gray-500">ROOT DIRECTORY</div>
              <input
                type="text"
                value={root}
                className="input input-bordered w-full"
                onChange={(event) => setRoot(event.target.value)}
              />
            </div>
            <div>
              <div className="collapse collapse-arrow border rounded-lg">
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-gray-700">
                  Build and Output Settings
                </div>
                <div className="collapse-content">
                  <Framework info={frameworkInfo ?? { type: "", image: "" }} />
                </div>
              </div>
            </div>
            <div>
              <div className="collapse collapse-arrow border rounded-lg">
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-gray-700">
                  Environment Variables
                </div>
                <div className="collapse-content">
                  <div className="flex gap-8 items-end">
                    <div className="flex-1">
                      <div className="mb-2 text-sm text-gray-500">NAME</div>
                      <input
                        type="text"
                        placeholder="Environment Name"
                        className="input input-bordered w-full"
                        value={envName}
                        onChange={(event) => setEnvName(event.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 text-sm text-gray-500">VALUE</div>
                      <input
                        type="text"
                        placeholder="Environment Value"
                        className="input input-bordered w-full"
                        value={envValue}
                        onChange={(event) => setEnvValue(event.target.value)}
                      />
                    </div>
                    <button className="btn" onClick={() => addEnv()}>
                      Add
                    </button>
                  </div>
                  <div className="overflow-x-auto mt-4 border rounded-lg">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Value</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {envs.map((env) => (
                          <tr key={env.name}>
                            <th>{env.name}</th>
                            <td>{env.value}</td>
                            <th>
                              <TiDelete
                                size="2em"
                                className="ml-auto hover:cursor-pointer"
                                onClick={() => removeEnv(env.name)}
                              />
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <button
              className={"btn" + (loading ? " loading" : "")}
              onClick={() => submitProject()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
