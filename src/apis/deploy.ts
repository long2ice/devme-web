import axios from "../axios";

async function deploy(project_id: number, branch: string) {
  const res = await axios.post(`/project/${project_id}/deploy`, {
    branch,
  });
  return res.data;
}

export { deploy };
