import { Chat, ChatRepository, ChatServiceType, Mensaje } from "../types/chatTypes";

export class ChatService implements ChatServiceType {
    private repository: ChatRepository;

    constructor(repository: ChatRepository) {
        this.repository = repository;
    }

    async createChat(data: Chat): Promise<Chat> {
        return await this.repository.create(data);
    }

    async mensajes(chatId: string): Promise<Mensaje[]> {
        const chat = await this.repository.findById(chatId);
        return chat?.messages || []; 
    }
}