import { FrameworkProps } from "../../types/props";
import { useState } from "react";

export default function DockerCompose(props: FrameworkProps) {
  const [imageOverride, setImageOverride] = useState(false);
  const [image, setImage] = useState(props.info.image);
  return (
    <div className="flex gap-8 items-end">
      <div className="flex-1">
        <div className="mb-2 text-sm text-gray-500">IMAGE</div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={image}
            placeholder={`Base docker image name, default is \`${props.info.image}\``}
            className="input input-bordered w-full"
            disabled={!imageOverride}
            onChange={(event) => setImage(event.target.value)}
          />
          <div className="text-sm text-gray-500">OVERRIDE</div>
          <input
            type="checkbox"
            className="toggle"
            onChange={(event) => {
              setImageOverride(event.target.checked);
            }}
          />
        </div>
      </div>
    </div>
  );
}
