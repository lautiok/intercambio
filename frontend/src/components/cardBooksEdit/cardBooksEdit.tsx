"use client";
import Link from "next/link";
import style from "./cardbooksedit.module.css";
import { useBooks } from "@/context/booksContext";

type CardBooksProps = {
  image: string;
  title: string;
  id: string;
  refreshBooks: () => void;
};

export default function CardBooksEdit({ image, title, id, refreshBooks }: CardBooksProps) {
  const { deleteBook } = useBooks();

  return (
    <article className={style.card}>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <div className={style.buttonEdit}>
        <Link href={`/intercambio/books/user/edit/${id}`}>Editar</Link>
        <button
          className={style.buttonDelete}
          onClick={async () => {
            await deleteBook(id);
            refreshBooks();
          }}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
