import axios from "./axios";

export const institucionalRequest = async () => {
  const response = await axios.get("institucional");
  return response.data;
};