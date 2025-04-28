import { Router } from "express";
import upload from "../../middleware/multer";
import { createBook, deleteBook, getBookById, getBooks, getBooksByUserId, getBooksPaginated, getBooksToken, updateBook, updateBookImage } from "../../controllers/books.controllers";
import { zodMiddleware } from "../../middleware/zodMiddleware";
import { booksSchema, bookUpdateSchema } from "../../schema/booksSchema";

const router = Router();

router.post("/", upload.single("image"), zodMiddleware(booksSchema), createBook);
router.get("/", getBooks);
router.get("/paginated", getBooksPaginated);
router.get("/user/token", getBooksToken);
router.get("/user/:id", getBooksByUserId);
router.get("/:id", getBookById);
router.put("/:id", zodMiddleware(bookUpdateSchema), updateBook)
router.put("/image/:id",upload.single("image"), updateBookImage)
router.delete("/:id", deleteBook);

export default router;