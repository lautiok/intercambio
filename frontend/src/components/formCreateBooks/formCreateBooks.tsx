"use client";
import { useBooks } from "@/context/booksContext";
import style from "./formcreatebooks.module.css";
import {useForm} from "react-hook-form";
import { useRouter } from "next/navigation";

export default function FormCreateBooks() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const { createBook, loading } = useBooks();
    const router = useRouter();

    const handleSubmitForm = handleSubmit(async (data) => {
        try {
          const res = await createBook({
            title: data.title,
            author: data.author,
            description: data.description,
            interes: data.interes,
            image: data.image[0],
          });
      
          if (res) {
            router.push("/intercambio/books/user");
          }
        } catch (error) {
          console.error("Error creating book:", error);
        }
      });
    return (
        <section className={style.formcreatebooks}>
            <header className={style.header}>
                <h2>Agregar libro</h2>
            </header>
            <form className={style.form} onSubmit={handleSubmitForm}>
                <div className={style.formGroup}>
                    <label htmlFor="title">Título</label>
                    <input type="text" id="title"  placeholder="Título del libro" {...register("title")} />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="author">Autor</label>
                    <input type="text" id="author"  placeholder="Autor del libro" {...register("author")} />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="description">Descripción</label>
                    <textarea id="description"  placeholder="Descripción del libro" {...register("description")} />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="interes">Interes</label>
                    <input type="text" id="interes"  placeholder="Interes del libro" {...register("interes")} />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="image">Imagen</label>
                    <input type="file" id="image"  {...register("image")} />
                </div>
                <button className={style.btn} type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Agregar libro"}
                </button>
            </form>
        </section>
    );
}