import axios from "./axios";

export const institucionalRequest = async () => {
  const response = await axios.get("institucional");
  return response.data;
};

export const createInstitucionalRequest = async (data: FormData) => {
  const response = await axios.post("institucional", data);
  return response.data;
};
