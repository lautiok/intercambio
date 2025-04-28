import { IBookRepository, Book, IBookService } from "../types/booksTypes";

export class BooksService implements IBookService {
    private repository: IBookRepository;

    constructor(repository: IBookRepository) {
        this.repository = repository;
    }

    async createBook(data: Book): Promise<Book> {
        return await this.repository.create(data);
    }

    async findBooks(): Promise<Book[]> {
        return await this.repository.find();
    }

    async findBooksPaginated(skip: number, limit: number): Promise<Book[]> {
        return await this.repository.findPaginated!(skip, limit);
    }

    async findBookById(id: string): Promise<Book | null> {
        return await this.repository.findById(id);
    }

    async findBooksByUserId(id: string): Promise<Book[]> {
        return await this.repository.findBooksByUserId(id);
    }

    async updateBook(id: string, data: Book): Promise<Book | null> {
        return await this.repository.update(id, data);
    }

    async deleteBook(id: string): Promise<string | null> {
        return await this.repository.delete(id);
    }
    async updateImage(id: string, image: { public_id: string; secure_url: string }): Promise<Book | null> {
        return await this.repository.updateImage(id, image);
    }
}