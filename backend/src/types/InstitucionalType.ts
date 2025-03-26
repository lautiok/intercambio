import { Repository } from "./repositoryTypes";

export interface Institucional {
    _id?: string;
    institucion: string;
    direccion: string;
    email: string;
    telefono: string;
    pais: string;
}

export interface IinstitucionalRepository extends Repository<Institucional> {
}

export interface IinstitucionalService {
    createInstitucional: (data: Institucional) => Promise<Institucional>;
    findInstitucional: () => Promise<Institucional[]>;
    findInstitucionalById: (id: string) => Promise<Institucional | null>;
    updateInstitucional: (id: string, data: Institucional) => Promise<Institucional | null>;
    deleteInstitucional: (id: string) => Promise<string | null>;
}