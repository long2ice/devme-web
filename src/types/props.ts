import { GitProvider, Repo } from "./responses";

interface ImportProps {
  repos: Array<Repo>;
  gits: Array<GitProvider>;
}

export type { ImportProps };
