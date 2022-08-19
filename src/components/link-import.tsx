import { Link } from "react-router-dom";
import { LinkImportProps } from "../types/props";
import { toast } from "react-toastify";

export default function LinkImport(props: LinkImportProps) {
  return (
    <Link
      to="/import-project"
      className="btn"
      state={{ gitURL: props.gitURL }}
      onClick={(e) => {
        if (props.gitURL.trim() === "") {
          toast.error("Must set git url!");
          e.preventDefault();
        }
      }}
    >
      Import
    </Link>
  );
}
