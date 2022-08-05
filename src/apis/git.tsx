import axios from "../axios";

interface GitProvider {
  id: number;
  name: string;
  type: string;
  token: string;
  created_at: string;
  updated_at: string;
}

async function get_git() {
  const res = await axios.get("/git");
  return res.data;
}

async function add_git(name: string, type: string, token: string) {
  const res = await axios.post("/git", {
    name,
    type,
    token,
  });
  return res.data;
}

export { get_git, add_git };
export type { GitProvider };
