"use client";
import { Book, MessagesSquare } from "lucide-react";
import style from "./booksdetail.module.css";
import { useRouter, useParams } from "next/navigation";
import { useBooks } from "@/context/booksContext";
import { useEffect, useState } from "react";
import { useExchange } from "@/context/exchangeContext";
export default function BookDetail() {
    const {id} = useParams();
    const { booksById, getBooksById, getBooksToken, booksToken } = useBooks();
    const [selectedBook, setSelectedBook] = useState<string>('');
    const { createExchange, exchangeRequest } = useExchange();
    const router = useRouter();

    useEffect(() => {
        getBooksById(`${id}`);
    },
    [id]);

    useEffect(() => {
        getBooksToken();
    }, []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            requestedBook: id,
            offeredBook: selectedBook,
            owner: booksById?.iduser,
        }

        try {
            const response = await createExchange(data);
            if (response === true) {
                router.push(`/intercambio`);
            }
        } catch (error) {
            console.log("Error creando solicitud de intercambio:", error);
        }
    }

    return (
        <section className={style.bookdetail}>
            <header className={style.header}>
                <h2>area de intercambio</h2>
            </header>
            <div className={style.containerBooks}>
                <div className={style.image}>
                    <img src={booksById?.image.secure_url} alt={booksById?.title} />
                </div>
                <div className={style.information}>
                <div className={style.details}>
                    <h1>{booksById?.title}</h1>
                    <p>{ booksById?.description }</p>
                    <p className={style.author}>{ booksById?.author }</p>
                    <p>{ booksById?.interes }</p>
                </div>
                <div className={style.actions}>
                    <form action="" onSubmit={handleSubmit}>
                    <select name="mislibros" id="mislibros" 
                     onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedBook(e.target.value)}
                    >
                        <option value="0">Selecciona un libro</option>
                        {booksToken?.map((book) => (
                            <option key={book._id} value={book._id}>{book.title}</option>
                        ))}
                    </select>
                    <button>Proponer intercambio</button>
                    </form>
                </div>
                </div>
            </div>

            <footer className={style.footer}>
                    <h2> <Book /> Cómo proponer un intercambio</h2>
                    <h3>Para proponer el intercambio, sigue estos pasos:</h3>
                    <ol>
                        <li>Selecciona el libro que deseas intercambiar.</li>
                        <li>Elige el libro que te interesa.</li>
                        <li>Envía una solicitud de intercambio al propietario del libro.</li>
                        <li>Espera la respuesta del propietario.</li>
                    </ol>
                    <span> <MessagesSquare /> Una vez que se acepte el intercambio, se habilitará un chat para coordinar los detalles.</span>
            </footer>
        </section>
    );
}