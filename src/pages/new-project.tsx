import { FaGithub, FaGitlab } from "react-icons/fa";
import { useEffect, useState } from "react";
import { add_git, get_git, GitProvider } from "../apis/git";
import { IoMdAdd } from "react-icons/io";

export default function NewProject() {
  const [gitProviders, setGitProviders] = useState<Array<GitProvider>>([]);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [type, setType] = useState("github");

  async function add_git_provider() {
    await add_git(name, type, token);
  }

  useEffect(() => {
    (async () => {
      setGitProviders(await get_git());
    })();
  }, []);
  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex items-center max-w-7xl mx-auto py-6">
          <h1 className="text-3xl font-bold text-gray-900">New Project</h1>
        </div>
      </header>
      <div className="card bg-base-100 shadow-xl mx-[20%] mt-[2%]">
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
              <label
                htmlFor="add-git"
                className="btn ml-auto modal-button mt-10"
              >
                <IoMdAdd size="1.5em" />
                Add Git Provider
              </label>
              <input type="checkbox" id="add-git" className="modal-toggle" />
              <label className="modal cursor-pointer" htmlFor="add-git">
                <div className="modal-box">
                  <h2 className="card-title">Add Git Provider</h2>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={name}
                      placeholder="Your git provider identifier name"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Type</span>
                    </label>
                    <div className="flex gap-4">
                      <label className="flex gap-2 items-center">
                        <FaGithub size="2em" />
                        <input
                          type="radio"
                          name="type"
                          className="radio"
                          checked
                          onChange={(event) => {
                            if (event.target.checked) {
                              setType("github");
                            }
                          }}
                        />
                      </label>
                      <label className="flex gap-2 items-center">
                        <FaGitlab size="2em" color="#ea580c" />
                        <input
                          type="radio"
                          name="type"
                          className="radio checked:bg-orange-600"
                          onChange={(event) => {
                            if (event.target.checked) {
                              setType("gitlab");
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Token</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your git provider token"
                      className="input input-bordered w-full max-w-xs"
                      value={token}
                      onChange={(event) => {
                        setToken(event.target.value);
                      }}
                    />
                  </div>
                  <div className="modal-action">
                    <button
                      className="btn"
                      onClick={async () => await add_git_provider()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="card-actions">
            <div className="link mt-10 text-gray-700 no-underline hover:cursor-pointer">
              Import Third-Party Git Repository →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
