import axios from "./axios";

export const getMessagesRequest = async (chatId: string) => {
    const response = await axios.get(`/chat/${chatId}/messages`);
    return response.data;
};