import { Institucional } from "./InstitucionalType";
import { Repository } from "./repositoryTypes";

export interface User {
    _id?: string;
    name: string;
    email: string;
    role?: string;
    institutional: Institucional;
    password: string;
}

export interface IUserRepository extends Repository<User> {
    findByEmail: (email: string) => Promise<User | null>;
    update: (userId: string, updateData: object) => Promise<User | null>;
}

export interface IUserService {
    createUser: (data: User) => Promise<User>;
    findUsers: () => Promise<User[]>;
    findUserById: (id: string) => Promise<User | null>; 
    updateUser: (id: string, data: Partial<User>) => Promise<User | null>;
    deleteUser: (id: string) => Promise<string | null>;
}