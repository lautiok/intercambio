"use client";
import { useBooks } from "@/context/booksContext";
import style from "./formupdatebooks.module.css";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

type FormBook = {
  title: string;
  author: string;
  description: string;
  interes: string;
};

export default function FormUpdateBooks() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormBook>();
  const { updateBook, loading, getBooksById, booksById } = useBooks();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    getBooksById(`${id}`);
  }, []);

  useEffect(() => {
    if (booksById) {
      setValue("title", booksById.title);
      setValue("author", booksById.author);
      setValue("description", booksById.description);
      setValue("interes", booksById.interes);
    }
  }, [booksById]);

  const handleSubmitForm = handleSubmit(async (data) => {
    try {
      const res = await updateBook(`${id}`, {
        title: data.title,
        author: data.author,
        description: data.description,
        interes: data.interes,
      });

      if (res) {
        router.push("/intercambio/books/users");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  });

  return (
    <section className={style.formcreatebooks}>
      <header className={style.header}>
        <h2>Editar libro</h2>
      </header>
      <form className={style.form} onSubmit={handleSubmitForm}>
        <div className={style.formGroup}>
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            placeholder="Título del libro"
            {...register("title")}
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="author">Autor</label>
          <input
            type="text"
            id="author"
            placeholder="Autor del libro"
            {...register("author")}
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            placeholder="Descripción del libro"
            {...register("description")}
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="interes">Interes</label>
          <input
            type="text"
            id="interes"
            placeholder="Interes del libro"
            {...register("interes")}
          />
        </div>
        <button className={style.btn} type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Actualizar libro"}
        </button>
      </form>
    </section>
  );
}
