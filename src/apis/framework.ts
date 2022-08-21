import axios from "../axios";
import { FrameworkInfo } from "../types/responses";

async function getAllFramework(): Promise<Array<FrameworkInfo>> {
  const res = await axios.get("/framework");
  return res.data;
}

export { getAllFramework };
