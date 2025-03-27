"use client";
import HeroAuth from "@/layout/heroAuth/heroAuth";
import styles from "./login.module.css";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { useAuth } from "@/context/authContext";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Page() {

  const { handleSubmit, register } = useForm();
  const { login, loading, error, user, isCheckingAuth } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    if (isCheckingAuth) {
      router.push("/intercambio");
    }
  }, []);

  const handleLogin = handleSubmit(async (data) => {
    const success = await login(data.email, data.password);
    if (success) {
      router.push("/intercambio");
    } else {
      console.log("Login failed");
    }
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (user) {
    console.log(user);
  }

  return (
    <section className={styles.login}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <HeroAuth />
      <form className={styles.form} onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Ejemplo@ejemplo.com" {...register("email")} />
        <div className={styles.label__container}>
          <label htmlFor="password">Contraseña</label>
          <Link href="/auth/forgot-password">¿Olvidaste tu contraseña?</Link>
        </div>
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Tu contraseña"
            {...register("password")}
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        </div>
        <button className={styles.buttonSubmit} type="submit" disabled={loading}>
          {loading ? "Cargando" : "Entrar"}
        </button>
      </form>
      <p>No tienes cuenta? <Link href="/auth/register">Crea tu cuenta</Link></p>
    </section>
  );
}
