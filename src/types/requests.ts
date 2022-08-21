import { Env } from "./schemas";

interface CreateProject {
  name: string;
  url: string;
  framework: string;
  image: string;
  root: string;
  deployment: Record<string, any>;
  env: Array<Env>;
  git_provider_id?: number;
}

export type { CreateProject };
