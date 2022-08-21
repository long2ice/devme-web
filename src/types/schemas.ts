interface Env {
  name: string;
  value: string;
}

type FrameworkType = "Html" | "Docker" | "docker-compose" | "NodeJS";

export type { Env, FrameworkType };
