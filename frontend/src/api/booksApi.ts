import { newBook, updateBook } from "@/context/booksContext";
import axios from "./axios";


export const createBookRequest = async (book: newBook & { image: File }) => {
    const formData = new FormData();

    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("description", book.description);
    formData.append("interes", book.interes);
    formData.append("image", book.image);

    const response = await axios.post("books", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const getBooksPaginatedRequest = async (page: number, limit: number) => {
    const response = await axios.get(`books/paginated?page=${page}&limit=${limit}`);
    return response.data;
};

export const getBooksRequest = async () => {
    const response = await axios.get("books");
    return response.data;
};

export const getBooksByIdRequest = async (id: string) => {
    const response = await axios.get(`books/${id}`);
    return response.data;
};

export const getBooksByUserIdRequest = async (id: string) => {
    const response = await axios.get(`books/user/${id}`);
    return response.data;
};

export const getBooksTokenRequest = async () => {
    const response = await axios.get("books/user/token");
    return response.data;
};

export const updateBookRequest = async (id : string, data: updateBook) => {
    const response = await axios.put(`books/${id}`, data);
    return response.data;
};

export const delateBookRequest = async (id: string) => {
    const response = await axios.delete(`books/${id}`);
    return response.data;
}