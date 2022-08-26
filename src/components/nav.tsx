import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="bg-neutral">
      <div className="max-w-7xl mx-auto navbar text-neutral-content">
        <div>
          <Link className="btn btn-ghost normal-case text-xl" to="/">
            DevME
          </Link>
        </div>
        <div>
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link className="btn btn-ghost" to="/">
                Overview
              </Link>
            </li>
            <li>
              <Link className="btn btn-ghost" to="/domains">
                Domains
              </Link>
            </li>
            <li>
              <Link className="btn btn-ghost" to="/deployments">
                Deployments
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
