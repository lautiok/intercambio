import { Repository } from "./repositoryTypes";

export interface Chat {
    _id?: string;
    participants: Array<{  
        user: string;     
    }>;
    exchange: string | null;
    messages?: Array<{    
        sender: string;
        content: string;
    }>;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Mensaje {
    sender: string;
    content: string;
}

export interface ChatRepository extends Repository<Chat> {
}

export interface ChatServiceType {
    createChat(data: Chat): Promise<Chat>;
    mensajes(chatId: string): Promise<Mensaje[]>;
}