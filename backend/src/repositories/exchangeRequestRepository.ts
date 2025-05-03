import { ExchangeRequestRepository, ExchangeRequest } from "../types/exchangeRequestType";
import { ExchangeRequestModel } from "../models/exchangeRequest.models";

export class ExchangeRequestRepositories implements ExchangeRequestRepository {
    async create(data: ExchangeRequest): Promise<ExchangeRequest> {
        return await ExchangeRequestModel.create(data);
    }

    async find (): Promise<ExchangeRequest[]> {
        return await ExchangeRequestModel.find();
    }

    async findById(id: string): Promise<ExchangeRequest | null> {
        return await ExchangeRequestModel.findById(id);
    }

    async update(id: string, data: Partial<ExchangeRequest>): Promise<ExchangeRequest | null> {
        return await ExchangeRequestModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<string | null> {
        const result = await ExchangeRequestModel.deleteOne({ _id: id }).exec();
        return result === null ? null : result.deletedCount.toString();
    }

    async findByRequester(userId: string): Promise<ExchangeRequest[]> {
        return await ExchangeRequestModel.find({ requester: userId });
    }

    async findByOwner(userId: string): Promise<ExchangeRequest[]> {
        return await ExchangeRequestModel.find({ owner: userId });
    }

    async acceptExchangeRequest(id: string): Promise<ExchangeRequest | null> {
        return await ExchangeRequestModel.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });
    }
}