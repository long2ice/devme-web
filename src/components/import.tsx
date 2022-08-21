import { ImportProps } from "../types/props";
import { formatTime } from "../utils";
import { useEffect, useState } from "react";
import _ from "lodash";
import { getGitRepos } from "../apis/git";
import { Repo } from "../types/responses";
import LinkImport from "./link-import";
import Git from "../icon/git";

export default function Import(props: ImportProps) {
  const [keyword, setKeyword] = useState("");
  const [repos, setRepos] = useState<Array<Repo> | null>(null);
  const [gitID, setGitID] = useState(props.gitID);
  const [gitName, setGitName] = useState("");
  const [loading, setLoading] = useState(true);

  async function getRepos(id: number) {
    let repos = await getGitRepos(id);
    setRepos(repos);
  }

  useEffect(() => {
    let g = _.find(props.gits, function (g) {
      return g.id === gitID;
    });
    setGitName(g?.name ?? "");
    (async () => {
      await getRepos(gitID);
      setLoading(false);
    })();
  }, [gitID, props.gits]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex-1 dropdown">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={gitName}
            onChange={() => {}}
          />
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box mt-2 w-full"
          >
            {props.gits.map((g) => (
              <li key={g.id}>
                <button
                  onClick={(e) => {
                    setGitID(g.id);
                    (e.target as HTMLButtonElement).blur();
                  }}
                >
                  {<Git type={g.type} size="1.5em" />}
                  {g.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="form-control flex-1">
          <div className="input-group">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search…"
              value={keyword}
              onChange={(event) => {
                setKeyword(event.target.value);
              }}
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {loading ? (
          <progress className="progress w-[40%]"></progress>
        ) : (
          <div className="border rounded-md w-full">
            {_.slice(
              _.filter(repos, (r) => {
                return _.includes(r.name, keyword);
              }),
              0,
              6
            ).map((r, i) => (
              <div
                className={
                  "flex items-center p-2 gap-2" + (i === 5 ? "" : " border-b")
                }
              >
                <div></div>
                <div>{r.name}</div>
                <div className="text-gray-500 text-sm">
                  {formatTime(r.pushed_at)}
                </div>
                <div className="ml-auto">
                  <LinkImport gitURL={r.clone_url} gitID={gitID} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
