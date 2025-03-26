import institucionalModels from "../models/institucional.models";
import { IinstitucionalRepository, Institucional } from "../types/InstitucionalType";

export class InstitucionalRepository implements IinstitucionalRepository {
    
    async create(data: Institucional): Promise<Institucional> {
        return await institucionalModels.create(data);
    }

    async find(): Promise<Institucional[]> {
        return await institucionalModels.find();
    }

    async findById(id: string): Promise<Institucional | null> {
        return await institucionalModels.findById(id);
    }

    async update(id: string, data: Partial<Institucional>): Promise<Institucional | null> {
        return await institucionalModels.findByIdAndUpdate(id, data, { 
            new: true,
        });
    }

    async delete(id: string): Promise<string | null> {
      const result = await institucionalModels.deleteOne({ _id: id }).exec();
      return result === null ? null : result.deletedCount.toString();
    }
}