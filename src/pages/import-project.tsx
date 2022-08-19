import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFramework } from "../apis/framework";
import _ from "lodash";
import { toast } from "react-toastify";
import { TiDelete } from "react-icons/ti";

interface Env {
  name: string;
  value: string;
}

export default function ImportProject() {
  const [framework, setFramework] = useState([]);
  const { state } = useLocation();
  // @ts-ignore
  const { gitURL } = state;
  // @ts-ignore
  const project = _.first(_.last(gitURL.split("/")).split("."));
  // @ts-ignore
  const [projectName, setProjectName] = useState<string>(project);
  const [envs, setEnvs] = useState<Array<Env>>([]);
  const [envName, setEnvName] = useState("");
  const [envValue, setEnvValue] = useState("");
  useEffect(() => {
    (async () => {
      setFramework(await getFramework());
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

  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex items-center max-w-7xl mx-auto py-6">
          <h1 className="text-3xl font-bold text-gray-900">Import Project</h1>
          <Link className="btn ml-auto" to="/new-project">
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
              <select className="select select-bordered w-full">
                {framework.map((f) => (
                  <option value={f} key={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="mb-2 text-sm text-gray-500">ROOT DIRECTORY</div>
              <input
                type="text"
                value="./"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <div className="collapse collapse-arrow border rounded-lg">
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-gray-700">
                  Build and Output Settings
                </div>
                <div className="collapse-content">
                  <p>hello</p>
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
            <button className="btn">Deploy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
