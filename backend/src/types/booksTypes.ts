import { Repository } from "./repositoryTypes";
import { User } from "./usersType";

export interface Book {
    _id?: string;
    title: string;
    author: string;
    description: string;
    interes: string;
    status?: boolean;
    iduser?: User;
    image?: {
        public_id: string;
        secure_url: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IBookRepository extends Repository<Book> {
    findPaginated?: (skip: number, limit: number) => Promise<Book[]>;
    updateImage : (id: string, image: {
        public_id: string;
        secure_url: string;
    }) => Promise<Book | null>;
    findBooksByUserId: (id: string) => Promise<Book[]>;
}

export interface IBookService {
    createBook: (data: Book) => Promise<Book>;
    findBooks: () => Promise<Book[]>;
    findBookById: (id: string) => Promise<Book | null>;
    updateBook: (id: string, data: Book) => Promise<Book | null>;
    deleteBook: (id: string) => Promise<string | null>;
}