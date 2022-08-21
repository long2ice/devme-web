import { FrameworkInfo, GitProvider } from "./responses";
import { FrameworkType } from "./schemas";

interface ImportProps {
  gitID: number;
  gits: Array<GitProvider>;
}

interface GitIconProps {
  type: "github" | "gitlab";
  size?: string;
  className?: string;
  color?: string;
}

interface LinkImportProps {
  gitURL: string;
  gitID?: number;
}

interface FrameworkProps {
  info: FrameworkInfo;
}

interface FrameworkIconProps {
  framework: FrameworkType;
  size?: string;
}

export type {
  ImportProps,
  GitIconProps,
  LinkImportProps,
  FrameworkProps,
  FrameworkIconProps,
};
