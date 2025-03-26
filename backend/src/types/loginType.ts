import { Repository } from "./repositoryTypes";

export interface login {
    _id?: string;
    email: string;
    ip_address: any;
}

export interface ILoginRepository extends Repository<login> {
    findByEmail: (email: string) => Promise<login | null>;
}

export interface ILoginService {
    createLogin: (data: login) => Promise<login>;
    findLogins: () => Promise<login[]>;
    findLoginById: (id: string) => Promise<login | null>;
    deleteLogin: (id: string) => Promise<string | null>;
}