"use client";
import toast, { Toaster } from "react-hot-toast";
import styles from "./forgot-password.module.css";
import HeroAuth from "@/layout/heroAuth/heroAuth";
import { useForm } from 'react-hook-form';
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const { handleSubmit, register } = useForm();
    const { forgetPassword, loading } = useAuth();
    const router = useRouter();

    const handleForgot = handleSubmit(async (data) => {
        try {
            const success = await forgetPassword(data.email);

            if (success) {
                toast.success("Se ha enviado un correo de recuperación de contraseña");
                router.push("/auth/login");
            } else {
                toast.error("Error enviando correo de recuperación de contraseña");
            }
        } catch (error) {
            console.log(error);
        }
    });
   return (
    <section className={styles.login}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <HeroAuth />
      <form className={styles.form} onSubmit={handleForgot}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Ejemplo@ejemplo.com" {...register("email")} />
        <button className={styles.buttonSubmit} type="submit" disabled={loading}>
          {loading ? "Cargando" : "Enviar"}
        </button>
      </form>
     
    </section>
   )
}