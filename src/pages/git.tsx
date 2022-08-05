import { FaGithub, FaGitlab } from "react-icons/fa";
import { useEffect, useState } from "react";
import { get_git, GitProvider, add_git } from "../apis/git";
import { format_time } from "../utils";

export default function Git() {
  const [selectAll, setSelectAll] = useState(false);
  const [selectItem, setSelectItem] = useState<Record<number, boolean>>({});
  const [gitProviders, setGitProviders] = useState<Array<GitProvider>>([]);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [type, setType] = useState("github");

  useEffect(() => {
    (async () => {
      setGitProviders(await get_git());
    })();
  }, []);

  async function add_git_provider() {
    await add_git(name, type, token);
  }

  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex items-center max-w-7xl mx-auto py-6">
          <h1 className="text-3xl font-bold text-gray-900">GitProvider</h1>
        </div>
      </header>
      <main>
        <div className="flex justify-center items-start mt-[5%] gap-10">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectAll}
                        onChange={(event) => {
                          setSelectAll(event.target.checked);
                          setSelectItem({});
                        }}
                      />
                    </label>
                  </th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Token</th>
                  <th>CreatedAt</th>
                  <th>UpdatedAt</th>
                </tr>
              </thead>
              <tbody>
                {gitProviders.map((item) => (
                  <tr key={item.id}>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={
                            selectItem[item.id] === undefined
                              ? selectAll
                              : selectItem[item.id]
                          }
                          onChange={(event) => {
                            setSelectItem({
                              ...selectItem,
                              [item.id]: event.target.checked,
                            });
                          }}
                        />
                      </label>
                    </th>
                    <th>
                      {item.type === "github" ? (
                        <FaGithub size="2em" />
                      ) : (
                        <FaGitlab size="2em" color="#ea580c" />
                      )}
                    </th>
                    <td>{item.name}</td>
                    <td>{item.token}</td>
                    <td>{format_time(item.created_at)}</td>
                    <td>{format_time(item.updated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card bg-base-100 shadow-xl w-[20%]">
            <div className="card-body">
              <h2 className="card-title">Add Git Provider</h2>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">
                    Your git provider identifier name
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Git provider type</span>
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
                  <span className="label-text">Your git provider token</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={token}
                  onChange={(event) => {
                    setToken(event.target.value);
                  }}
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn"
                  onClick={async () => await add_git_provider()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
