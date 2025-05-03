"use client";
import {
  createBookRequest,
  delateBookRequest,
  getBooksByIdRequest,
  getBooksByUserIdRequest,
  getBooksPaginatedRequest,
  getBooksRequest,
  getBooksTokenRequest,
  updateBookImageRequest,
  updateBookRequest,
} from "@/api/booksApi";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

export type newBook = {
  title: string;
  author: string;
  description: string;
  interes: string;
  image: File;
};

export type books = {
  _id: string;
  image: {
    public_id: string;
    secure_url: string;
  };
  title: string;
  author: string;
  description: string;
  interes: string;
  status: boolean;
  iduser: string;
  createdAt: string;
  updatedAt: string;
};

export type updateBook = {
  title: string;
  author: string;
  description: string;
  interes: string;
};

export const useBooks = () => useContext(BooksContext);

export const BooksContext = createContext<{
  books: books[];
  setBooks: (books: books[]) => void;
  getBooks: () => Promise<void>;
  getBooksPaginated: (page: number, limit: number) => Promise<void>;
  booksUsers: books[];
  setBooksUsers: (books: books[]) => void;
  getBooksByUserId: (id: string) => Promise<void>;
  createBook: (book: newBook) => Promise<boolean>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  deleteBook: (id: string) => Promise<void>;
  getBooksToken: () => Promise<void>;
  setBooksToken: (books: books[]) => void;
  booksToken: books[];
  getBooksById: (id: string) => Promise<void>;
  booksById: books | null;
  setBooksById: (book: books) => void;
  updateBook: (id: string, data: updateBook) => Promise<boolean>;
  booksPaginate: books[];
  setBooksPaginate: (books: books[]) => void;
  updateBookImage: (id: string, image: File) => Promise<boolean>;
}>({
  books: [],
  setBooks: () => {},
  getBooks: async () => {},
  getBooksPaginated: async () => {},
  booksUsers: [],
  setBooksUsers: () => {},
  getBooksByUserId: async () => {},
  createBook: () => Promise.resolve(false),
  loading: false,
  setLoading: () => {},
  deleteBook: async () => {},
  getBooksToken: async () => {},
  setBooksToken: () => {},
  booksToken: [],
  getBooksById: async () => {},
  booksById: null,
  setBooksById: () => {},
  updateBook: async () => Promise.resolve(false),
  booksPaginate: [],
  setBooksPaginate: () => {},
  updateBookImage: async () => Promise.resolve(false),
});

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<books[]>([]);
  const [booksUsers, setBooksUsers] = useState<books[]>([]);
  const [booksById, setBooksById] = useState<books | null>(null);
  const [booksToken, setBooksToken] = useState<books[]>([]);
  const [booksPaginate, setBooksPaginate] = useState<books[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  const createBook = async (book: newBook): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await createBookRequest(book);
      setBooks(response);
      setLoading(false);
      return true;
    } catch (error) {
      console.log("Error creando libro:", error);
      setLoading(false);
      return false;
    }
  };

  const getBooks = async () => {
    try {
      const response = await getBooksRequest();
      setBooks(response);
    } catch (error) {
      console.log("Error obteniendo libros:", error);
    }
  };

  const getBooksPaginated = async (page: number, limit: number) => {
    try {
      const response = await getBooksPaginatedRequest(page, limit);
      console.log("Libros paginados:", response);
      setBooksPaginate(response.books);
    } catch (error) {
      console.log("Error obteniendo libros:", error);
    }
  };

  const getBooksById = async (id: string) => {
    try {
      const response = await getBooksByIdRequest(id);
      setBooksById(response);
    } catch (error) {
      console.log("Error obteniendo libro:", error);
    }
  };

  const getBooksByUserId = async (id: string) => {
    try {
      const response = await getBooksByUserIdRequest(id);
      setBooksUsers(response);
    } catch (error) {
      console.log("Error obteniendo libros:", error);
    }
  };

  const getBooksToken = async () => {
    try {
      const response = await getBooksTokenRequest();
      setBooksToken(response);
    } catch (error) {
      console.log("Error obteniendo libros:", error);
    }
  };

  const updateBook = async (id: string, data: updateBook) => {
    try {
      setLoading(true);
      const response = await updateBookRequest(id, data);
      setLoading(false);
      return response;
    } catch (error) {
      console.log("Error actualizando libro:", error);
      setLoading(false);
    }
  };

  const updateBookImage = async (id: string, image: File) => {
    try {
      setLoading(true);
      const response = await updateBookImageRequest(id, image);
      setLoading(false);
      return response;
    } catch (error) {
      console.log("Error actualizando libro:", error);
      setLoading(false);
    }
  };




  const deleteBook = async (id: string) => {
    try {
      setLoading(true);
      const response = await delateBookRequest(id);
      setBooks(response);
      setLoading(false);
    } catch (error) {
      console.log("Error eliminando libro:", error);
      setLoading(false);
    }
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        getBooks,
        booksUsers,
        setBooksUsers,
        getBooksByUserId,
        createBook,
        loading,
        setLoading,
        deleteBook,
        getBooksToken,
        setBooksToken,
        booksToken,
        getBooksById,
        booksById,
        setBooksById,
        updateBook,
        getBooksPaginated,
        booksPaginate,
        setBooksPaginate,
        updateBookImage,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
