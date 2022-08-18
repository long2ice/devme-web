export default function Project() {
  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex items-center max-w-7xl mx-auto py-6">
          <h1 className="text-3xl font-bold text-gray-900">Project Name</h1>
          <div className="flex gap-2 ml-auto">
            <button className="btn btn-outline">View Git Repository</button>
            <button className="btn">Visit</button>
          </div>
        </div>
      </header>
    </div>
  );
}
