interface GitProvider {
  id: number;
  name: string;
  type: string;
  token: string;
  created_at: string;
  updated_at: string;
}

interface Repo {
  clone_url: string;
  name: string;
  pushed_at: string;
}

export type { GitProvider, Repo };