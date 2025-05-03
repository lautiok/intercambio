import { ExchangeRequestRepository, ExchangeRequest, ExchangeRequestService } from "../types/exchangeRequestType";

export class exchangeRequestService implements ExchangeRequestService {
    private repository: ExchangeRequestRepository;

    constructor(repository: ExchangeRequestRepository) {
        this.repository = repository;
    }

    async createExchangeRequest(data: ExchangeRequest): Promise<ExchangeRequest> {
        return await this.repository.create(data);
    }

    async findByid(id: string): Promise<ExchangeRequest | null> {
        return await this.repository.findById(id);
    }

    async findByRequester(userId: string): Promise<ExchangeRequest[]> {
        return await this.repository.findByRequester(userId);
    }

    async findByOwner(userId: string): Promise<ExchangeRequest[]> {
        return await this.repository.findByOwner(userId);
    }

    async acceptExchangeRequest(id: string, chatId: string): Promise<ExchangeRequest | null> {
        return await this.repository.update(id, { status: 'accepted' , idChat: chatId });
    }
    async deleteExchangeRequest(id: string): Promise<any | null> {
        return await this.repository.delete(id);
    }
}