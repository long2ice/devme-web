interface Env {
  name: string;
  value: string;
}

type FrameworkType = "html" | "Docker" | "docker-compose" | "NodeJS";

export type { Env, FrameworkType };
