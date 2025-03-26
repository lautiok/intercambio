import { IinstitucionalRepository, IinstitucionalService, Institucional } from "../types/InstitucionalType";

export class InstitucionalService implements IinstitucionalService {
    private repository: IinstitucionalRepository;

    constructor(repository: IinstitucionalRepository) {
        this.repository = repository;
    }

    async createInstitucional(data: Institucional): Promise<Institucional> {
        return await this.repository.create(data);
    }

    async findInstitucional(): Promise<Institucional[]> {
        return await this.repository.find();
    }

    async findInstitucionalById(id: string): Promise<Institucional | null> {
        return await this.repository.findById(id);
    }

    async updateInstitucional(id: string, data: Institucional): Promise<Institucional | null> {
        return await this.repository.update(id, data);
    }

    async deleteInstitucional(id: string): Promise<string | null> {
        return await this.repository.delete(id);
    }
}