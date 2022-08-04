import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

export default function Git() {
  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex items-center max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Git</h1>
          <Link to="/project" className="ml-auto">
            <button className="btn gap-2">
              <IoMdAdd size="1.5em" />
              New Git Provider
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
}
