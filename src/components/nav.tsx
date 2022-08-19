import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to="/">
          DevME
        </Link>
      </div>
    </div>
  );
}
