import loginModels from "../models/login.models";
import { ILoginRepository, login } from "../types/loginType";

export class LoginRepository implements ILoginRepository{
    
    async create(data: login): Promise<login> {
        const newLogin = new loginModels(data);
        return await newLogin.save();
    }

    async find(): Promise<login[]> {
        return await loginModels.find().exec();
        
    }

    async findById(id: string): Promise<login | null> {
        return await loginModels.findById(id).exec();
    }

    async update(id: string, data: Partial<login>): Promise<login | null> {
        return await loginModels.findByIdAndUpdate(id, data, { 
            new: true,
        }).exec();
        
    }

    async delete(id: string): Promise<string | null> {
        const result = await loginModels.deleteOne({ _id: id }).exec();
        return result === null ? null : result.deletedCount.toString();
    }

    async findByEmail(email: string): Promise<login | null> {
        return await loginModels.findOne({ email }).exec();
    }

}