import axios from "./axios";

export const createExchangeRequest = async (data: any) => {
    const response = await axios.post("/exchange", data);
    return response.data;
};

export const findByOwnerRequest = async () => {
    const response = await axios.get(`/exchange/owner/`);
    return response.data;
};

export const findByRequesterRequest = async () => {
    const response = await axios.get(`/exchange/requester/`);
    return response.data;
};

export const acceptExchangeRequest = async (id: string) => {
    const response = await axios.put(`/exchange/${id}/accept`);
    return response.data;
};

export const deleteExchangeRequest = async (id: string) => {
    const response = await axios.delete(`/exchange/${id}`);
    return response.data;
};