import axios from "../axios";
import { CreateProject } from "../types/requests";
import { Project } from "../types/responses";

async function getProject(): Promise<Array<Project>> {
  const res = await axios.get("/project");
  return res.data;
}

async function createProject(project: CreateProject) {
  const res = await axios.post("/project", project);
  return res.data;
}

export { createProject, getProject };
