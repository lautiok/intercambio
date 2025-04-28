import Link from "next/link";
import styles from "./headerlanding.module.css";
export default function HeaderLanding() {
  return (
    <header className={styles.header}>
        <nav className={styles.nav}>
            <div className={styles.logoContainer}>
            <img src="/logo.png" alt="logo" className={styles.logo} />
            <h1>Intercambia</h1>
            </div>
            <ul className={styles.links}>
                <li>
                    <Link href="/">Inicio</Link>
                    <Link href="/servicios">Servicios</Link>
                    <Link href="/auth/register">Registrar</Link>
                </li>
            </ul>
        </nav>
        <div className={styles.buttons}>
            <Link href="/intercambio">
                <button className={styles.button}>Intercambiar</button>
            </Link>
        </div>
    </header>
  );
}