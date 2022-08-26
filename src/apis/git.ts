import axios from "../axios";
import { Repo } from "../types/responses";

async function getGit() {
  const res = await axios.get("/git");
  return res.data;
}

async function addGit(name: string, type: string, token: string) {
  const res = await axios.post("/git", {
    name,
    type,
    token,
  });
  return res.data;
}

async function getGitRepos(id: number): Promise<Array<Repo>> {
  const res = await axios.get(`/git/${id}/repo`);
  return res.data;
}

async function getGitRepoBranches(
  id: number,
  url: string
): Promise<Array<string>> {
  const res = await axios.get(`/git/${id}/repo/branches`, {
    params: {
      url,
    },
  });
  return res.data;
}

export { getGit, addGit, getGitRepos, getGitRepoBranches };
