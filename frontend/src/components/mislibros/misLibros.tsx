"use client";

import { useBooks } from "@/context/booksContext";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import style from "./mislibros.module.css";
import Link from "next/link";
import { CopyPlus } from "lucide-react";
import CardBooksEdit from "../cardBooksEdit/cardBooksEdit";

export default function MisLibros() {
    const params = useParams();
    const { id } = params;
    const { getBooksToken, booksToken} = useBooks();


    useEffect(() => {
        getBooksToken();
    }, []);




  return (
    <section className={style.mislibros}>
      <header className={style.header}>
        <h2>Mis libros</h2>
        <div className={style.headerButtons}>
          <Link href="/intercambio/books/create">
          <CopyPlus />
          <p>Agregar libro</p>
          </Link>
        </div>
      </header>
      <div className={style.containerBooks}>
        {booksToken.map((book) => (
            <CardBooksEdit key={book._id} id={book._id} image={book.image.secure_url} title={book.title} refreshBooks={() => getBooksToken()} />
        ))}
      </div>
    </section>
  );
}