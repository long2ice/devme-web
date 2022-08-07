import { FaGithub, FaGitlab } from "react-icons/fa";
import { useEffect, useState } from "react";
import { get_git, GitProvider } from "../apis/git";
import { format_time } from "../utils";

export default function Settings() {
  const [selectAll, setSelectAll] = useState(false);
  const [selectItem, setSelectItem] = useState<Record<number, boolean>>({});
  const [gitProviders, setGitProviders] = useState<Array<GitProvider>>([]);

  useEffect(() => {
    (async () => {
      setGitProviders(await get_git());
    })();
  }, []);

  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex items-center max-w-7xl mx-auto py-6">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>
      </header>
      <main>
        <div className="flex justify-center space-x-[2%] mt-[5%]">
          <div>
            <ul className="menu bg-base-100 w-56 rounded-box">
              <li>
                <a>Git Providers</a>
              </li>
              <li className="bordered">
                <a>I have border</a>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
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
        </div>
      </main>
    </div>
  );
}
