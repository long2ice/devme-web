import { Env, FrameworkType } from "./schemas";

interface GitProvider {
  id: number;
  name: string;
  type: "github" | "gitlab";
  token: string;
  created_at: string;
  updated_at: string;
}

interface Repo {
  clone_url: string;
  name: string;
  pushed_at: string;
}

interface FrameworkInfo {
  type: string;
  image: string;
}

interface Project {
  id: number;
  name: string;
  url: string;
  framework: FrameworkType;
  image: string;
  root: string;
  deployment: Record<string, any>;
  env: Env;
  git_provider_id?: number;
  created_at: string;
  updated_at: string;
}

export type { GitProvider, Repo, FrameworkInfo, Project };
