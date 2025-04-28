"use client";
import Link from "next/link";
import styles from "./headerdashboard.module.css";
import { Search, User } from "lucide-react"
import MenuUser from "../menuUser/menuUser";
import { useAuth } from "@/context/authContext";
export default function HeaderDashboard() {
    const {user} = useAuth();
  return (
    <header className={styles.header}>
        <section className={styles.sectionLogo}>
            <Link href="/intercambio">
            <img src="/logo.png" alt="logo" className={styles.logo} />
            </Link>
        </section>
        <section className={styles.sectionSearch}>
            <div className={styles.searchContainer}>
            <Search />
                <input type="text" placeholder="Buscar" />
            </div>
        </section>
        <section className={styles.sectionNav}>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li>
                        <Link href="/intercambio">Inicio</Link>
                    </li>
                    <li>
                        <Link href="/filter/agregados">Recien Agregados</Link>
                    </li>
                    <li>
                        <Link href="/intercambio/books/user">Mis Libros</Link>
                    </li>
                    <li>
                        <Link href="/filter/favoritos">Favoritos</Link>
                    </li>
                </ul>
            </nav>
            
        </section>
        <section className={styles.sectionButtons}>
            <MenuUser />
        </section>
    </header>
  );
}