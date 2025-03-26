import usersModels from "../models/users.models";
import { IUserRepository, User } from "../types/usersType";

export class UserRepository implements IUserRepository{

    async create(data: User): Promise<User> {
        const newUser = new usersModels(data);
        return await newUser.save();
    }

    async find(): Promise<User[]> {
        return await usersModels.find().exec();
        
    }

    async findById(id: string): Promise<User | null> {
        return await usersModels.findById(id).exec();
    }

    async update(id: string, data: Partial<User>): Promise<User | null> {
        return await usersModels.findByIdAndUpdate(id, data, { 
            new: true,
        }).exec();
        
    }

    async delete(id: string): Promise<string | null> {
        const result = await usersModels.deleteOne({ _id: id }).exec();
       return result === null ? null : result.deletedCount.toString();
    }

    async findByEmail(email: string): Promise<User | null> {
        return await usersModels.findOne({ email }).exec();
    }
}