import chatModels from "../models/chat.models";
import {  Chat, ChatRepository } from "../types/chatTypes";

export class ChatRepositories implements ChatRepository {
    async create(data: Chat): Promise<Chat> {
        return await chatModels.create(data);
    }

    async find(): Promise<Chat[]> {
        return await chatModels.find();
    }

    async findById(id: string): Promise<Chat | null> {
        return await chatModels.findById(id);
    }

    async update(id: string, data: Partial<Chat>): Promise<Chat | null> {
        return await chatModels.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<string | null> {
        const result = await chatModels.deleteOne({ _id: id }).exec();
        return result.deletedCount > 0 ? id : null;   
    }
}