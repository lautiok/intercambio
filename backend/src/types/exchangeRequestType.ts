import { Repository } from "./repositoryTypes";
import { User } from "./usersType";
import { Book } from "./booksTypes";
import { Chat } from "./chatTypes";

export interface ExchangeRequest {
    _id?: string;
    requestedBook: string | Book;
    offeredBook: string | Book;
    idChat?: string | Chat;
    requester: string | User;
    owner: string | User;
    status?: 'pending' | 'accepted' | 'rejected' | 'completed';
    createdAt?: Date;
    updatedAt?: Date;
}


export interface ExchangeRequestRepository extends Repository<ExchangeRequest> {
    findByRequester(userId: string): Promise<ExchangeRequest[]>;
    findById(id: string): Promise<ExchangeRequest | null>;
    findByOwner(userId: string): Promise<ExchangeRequest[]>;
    acceptExchangeRequest(id: string): Promise<ExchangeRequest | null>;
}

export interface ExchangeRequestService {
    deleteExchangeRequest(id: string): Promise<ExchangeRequest | null>;
    findByid(id: string): Promise<ExchangeRequest | null>;
    createExchangeRequest(data: ExchangeRequest): Promise<ExchangeRequest | null>;
    findByRequester(userId: string): Promise<ExchangeRequest[]>;
}