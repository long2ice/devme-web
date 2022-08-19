import axios from "../axios";

async function getFramework() {
  const res = await axios.get("/framework");
  return res.data;
}
export { getFramework };
