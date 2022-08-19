import { FaGit, FaGithub, FaGitlab } from "react-icons/fa";
import { GitIconProps } from "../types/props";

export default function GitIcon(props: GitIconProps) {
  let size = props.size ?? "2em";
  switch (props.type) {
    case "github":
      return (
        <FaGithub size={size} className={props.className} color={props.color} />
      );
    case "gitlab":
      return (
        <FaGitlab
          size={size}
          className={props.className}
          color={props.color ?? "#ea580c"}
        />
      );
    default:
      return (
        <FaGit size={size} className={props.className} color={props.color} />
      );
  }
}
