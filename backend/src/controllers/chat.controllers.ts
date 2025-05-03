import { Request, Response } from "express";
import { ChatRepository } from "../types/chatTypes";
import { ChatRepositories } from "../repositories/chatRepositorird";
import { ChatService } from "../service/chatService";


const chatRepository: ChatRepository = new ChatRepositories();
const chatService = new ChatService(chatRepository);


export const getMessages = async (req: Request, res: Response): Promise<any> => {
    const { chatId } = req.params;
    try {
        const chat = await chatService.mensajes(chatId);
        res.status(200).json(chat);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener mensajes" });
    }
}