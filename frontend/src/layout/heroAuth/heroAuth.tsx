import styles from "./heroauth.module.css";
export default function HeroAuth() {
  return (
    <section className={styles.heroauth}>
      <div className={styles.heroauth__container}>
        <img src="/logo.png" alt="logo-intercambia" />
        <h1>Intercambia</h1>
        <p>Plataforma de intercambio de libros</p>
      </div>
    </section>
  );
}