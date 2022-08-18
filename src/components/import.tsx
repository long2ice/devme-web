import { ImportProps } from "../types/props";
import { formatTime } from "../utils";
import { useState } from "react";
import _ from "lodash";

export default function Import(props: ImportProps) {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <select className="select select-bordered flex-1">
          {props.gits.map((g) => (
            <option>{g.name}</option>
          ))}
        </select>
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
      <div>
        <div className="border rounded-md">
          {_.slice(
            _.filter(props.repos, (r) => {
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
                <button className="btn">Import</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
