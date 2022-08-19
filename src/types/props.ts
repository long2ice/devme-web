import { GitProvider } from "./responses";

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
}

export type { ImportProps, GitIconProps, LinkImportProps };
