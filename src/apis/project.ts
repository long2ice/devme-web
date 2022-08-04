import axios from "../axios";

interface CreateProject {}

async function create_project(project: CreateProject) {
  const res = await axios.post("/project", project);
  return res.data;
}

export default create_project;
