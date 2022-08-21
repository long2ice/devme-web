import { FaDocker, FaNodeJs } from "react-icons/fa";
import { FrameworkIconProps } from "../types/props";
import { GrDocker } from "react-icons/gr";
import { IoLogoHtml5 } from "react-icons/io";

export default function FrameworkIcon(props: FrameworkIconProps) {
  switch (props.framework) {
    case "Docker":
      return <FaDocker color="#0ea5e9" size={props.size} />;
    case "docker-compose":
      return <GrDocker color="#0ea5e9" size={props.size} />;
    case "NodeJS":
      return <FaNodeJs color="#10b981" size={props.size} />;
    case "Html":
      return <IoLogoHtml5 color="#f97316" size={props.size} />;
  }
}
