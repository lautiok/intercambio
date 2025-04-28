import { Request, Response } from "express";
import { IBookRepository } from "../types/booksTypes";
import { BooksRepository } from "../repositories/booksRepositories";
import { BooksService } from "../service/booksService";
import cloudinary from "../config/cloudinary";
import { Readable } from "stream";
import { UploadApiResponse } from "cloudinary";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { IUserRepository } from "../types/usersType";
import { UserRepository } from "../repositories/userRepositories";
import { UserService } from "../service/userService";

const booksRepository: IBookRepository = new BooksRepository();
const booksService = new BooksService(booksRepository);

const userRepository: IUserRepository = new UserRepository();
const userService = new UserService(userRepository);

export const createBook = async (req: Request, res: Response): Promise<any> => {
  const { title, author, description, interes } = req.body;

  if (!title || !author || !description || !interes) {
    return res.status(400).json({ message: "Faltan campos" });
  }

  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ message: "Falta la imagen" });
  }

  const token = req.cookies.access_token;
  const decodedToken = jwt.verify(token, config.jwtSecret) as { id: string };

  const { id } = decodedToken;

  if (!id) {
    return res
      .status(401)
      .json({ message: "No tienes permisos para realizar esta acción" });
  }

  const file = req.file as Express.Multer.File;

  try {
    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      const uniqueId = Date.now().toString();
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: "books",
          public_id: `book-${title.replace(/\s+/g, '-')}-${uniqueId}` 
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result)
            return reject(new Error("No se recibió respuesta de Cloudinary"));
          resolve(result);
        }
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
    
    console.log('Imagen subida a Cloudinary:', result.public_id);

    const user = await userService.findUserById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const book = await booksService.createBook({
      title,
      author,
      description,
      interes,
      iduser: user,
      image: {
        public_id: result.public_id,
        secure_url: result.secure_url,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el libro", error });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await booksService.findBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los libros", error });
  }
};

export const getBooksPaginated = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const books = await booksService.findBooksPaginated(skip, limit);

    res.status(200).json({
      currentPage: page,
      perPage: limit,
      books
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los libros paginados", error });
  }
};

export const getBookById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    const book = await booksService.findBookById(id);
    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el libro", error });
  }
};

export const getBooksByUserId = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const books = await booksService.findBooksByUserId(id);
    if (!books) {
      return res.status(404).json({ message: "Libros no encontrados" });
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los libros", error });
  }
}

export const getBooksToken = async (req: Request, res: Response): Promise<any> => {
  const token = req.cookies.access_token;
  const decodedToken = jwt.verify(token, config.jwtSecret) as { id: string };
  const { id } = decodedToken;

  try {
    const books = await booksService.findBooksByUserId(id);

    if (!books) {
      return res.status(404).json({ message: "Libros no encontrados" });
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los libros", error });
  }
}

export const updateBook = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { title, author, description, interes } = req.body;

  if (!title || !author || !description || !interes) {
    return res.status(400).json({ message: "Faltan campos" });
  }

  try {
    const book = await booksService.updateBook(id, {
      title,
      author,
      description,
      interes,
    });

    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el libro", error });
  }
};

export const updateBookImage = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const file = req.file as Express.Multer.File;

  if (!file) {
    return res.status(400).json({ message: "Falta la imagen" });
  }

  try {

    const bookToUpdate = await booksService.findBookById(id);

    if (!bookToUpdate) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    if (bookToUpdate.image && bookToUpdate.image.public_id) {
      await cloudinary.uploader.destroy(bookToUpdate.image.public_id);
    }

    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      const uniqueId = Date.now().toString();
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: "books",
          public_id: `book-${id.replace(/\s+/g, '-')}-${uniqueId}` 
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result)
            return reject(new Error("No se recibió respuesta de Cloudinary"));
          resolve(result);
        }
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });

    const book = await booksService.updateImage(id, {
      public_id: result.public_id,
      secure_url: result.secure_url,
    });
    res.status(200).json(book);
  } catch (error) {
      res.status(500).json({ message: "Error al actualizar la imagen", error });
  }
}

export const deleteBook = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const token = req.cookies.access_token;

  try {
    const bookToDelete = await booksService.findBookById(id);
    if (!bookToDelete) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    const decodedToken = jwt.verify(token, config.jwtSecret) as { id: string };

    const { id: userId } = decodedToken;

    if (!bookToDelete.iduser || bookToDelete.iduser.toString() !== userId) {
      return res.status(401).json({ message: "No tienes permisos para eliminar este libro" });
    }

    if (bookToDelete.image && bookToDelete.image.public_id) {
      await cloudinary.uploader.destroy(bookToDelete.image.public_id);
    } else {
        return res.status(404).json({ message: "No se encontró la imagen" });
    }

    await booksService.deleteBook(id);

    res.status(200).json({ message: "Libro eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el libro", error });
  }
};
