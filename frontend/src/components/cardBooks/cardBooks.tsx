import Link from "next/link";
import style from "./cardbooks.module.css";

type CardBooksProps = {
  image: string;
  title: string;
    id: string;
};

export default function CardBooks({ image, title, id }: CardBooksProps) {
    return (
      <article className={style.card}>
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <Link href={`intercambio/books/${id}`}>intercambiar</Link>
      </article>
    );
  }