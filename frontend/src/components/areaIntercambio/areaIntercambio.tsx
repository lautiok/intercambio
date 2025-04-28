"use client";
import { useBooks } from "@/context/booksContext";
import style from "./areaIntercambio.module.css";
import { useEffect, useState } from "react";
import CardBooks from "../cardBooks/cardBooks";
export default function AreaIntercambio() {
  const { getBooksPaginated, books, booksPaginate, getBooks } = useBooks();
  const [page, setPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    getBooksPaginated(page, limit);
  }, [page, limit]);

  return (
    <section className={style.areaintercambio}>
      <header className={style.header}>
        <h2>Área de intercambio</h2>
        <div className={style.filteResult}>
        <p>Mostrando {Math.min(page * limit, books.length)} de {books.length} libros</p>
          <select name="popularidad" id="popularidad">
            <option value="popular">Ordenar por popularidad</option>
            <option value="popular">Mas popular</option>
            <option value="nuevo">Lo mas nuevo</option>
            <option value="antiguo">Antiguo</option>
          </select>
        </div>
      </header>
      <div className={style.containerBooks}>
        {Array.isArray(booksPaginate) &&
          booksPaginate.map((book) => (
            <CardBooks
              key={book._id}
              id={book._id}
              image={book.image.secure_url}
              title={book.title}
            />
          ))}
      </div>
      <div className={style.pagination}>
        <div className={style.paginationContainer}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          {"<"}
        </button>
        <button disabled={page * limit >= books.length} onClick={() => setPage(page + 1)}>{`>`}</button>
        </div>
        <span>Página {page}</span>
      </div>

    </section>
  );
}
