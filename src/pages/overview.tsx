import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Overview() {
  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex items-center max-w-7xl mx-auto py-6">
          <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
          <Link to="/new-project" className="ml-auto">
            <button className="btn gap-2">
              <IoMdAdd size="1.5em" />
              New Project
            </button>
          </Link>
        </div>
      </header>
      <main>
        <div className="grid grid-cols-4 gap-4 max-w-7xl mx-auto py-6">
          <Link to="/project">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
