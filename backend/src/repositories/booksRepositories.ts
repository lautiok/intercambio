import booksModels from "../models/books.models";
import { IBookRepository, Book } from "../types/booksTypes";

export class BooksRepository implements IBookRepository {

    async create(data: Book): Promise<Book> {
        return await booksModels.create(data);
    }

    async find(): Promise<Book[]> {
        return await booksModels.find();
    }

    async findPaginated(skip: number, limit: number): Promise<Book[]> {
        return await booksModels.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

    }

    async findById(id: string): Promise<Book | null> {
        return await booksModels.findById(id);
    }

    async findBooksByUserId(id: string): Promise<Book[]> {
        return await booksModels.find({ iduser: id });
    }

    async update(id: string, data: Partial<Book>): Promise<Book | null> {
        return await booksModels.findByIdAndUpdate(id, data, { 
            new: true,
        });
    }

    async delete(id: string): Promise<string | null> {
      const result = await booksModels.deleteOne({ _id: id }).exec();
      return result === null ? null : result.deletedCount.toString();
    }

    async updateImage(id: string, image: { public_id: string; secure_url: string }): Promise<Book | null> {
        return await booksModels.findByIdAndUpdate(id, { image }, { 
            new: true,
        });
    }
}