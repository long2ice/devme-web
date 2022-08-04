export default function AddGit() {
  return (
    <div className="card bg-base-100 shadow-xl mx-[20%] mt-[5%]">
      <div className="card-body">
        <h2 className="card-title">Add Git Provider</h2>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">
              Your git provider identifier name
            </span>
          </label>
          <input type="text" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Choice git provider type</span>
          </label>
          <div className="flex gap-4">
            <label className="flex gap-2">
              <span>GitHub</span>
              <input type="radio" name="type" className="radio" checked />
            </label>
            <label className="flex gap-2">
              <span>GitLab</span>
              <input
                type="radio"
                name="type"
                className="radio checked:bg-primary"
              />
            </label>
          </div>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your git provider token</span>
          </label>
          <input type="text" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}
