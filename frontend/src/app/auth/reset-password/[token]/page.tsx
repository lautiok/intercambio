"use client";

import styles from "./reset-password.module.css";
import HeroAuth from "@/layout/heroAuth/heroAuth";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { useAuth } from "@/context/authContext";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function ResetPassword() {

    const { handleSubmit, register } = useForm();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordDos, setShowPasswordDos] = useState<boolean>(false);

    const router = useRouter();
    const params = useParams();
    const { resetPassword: resetPasswords, loading, error } = useAuth();

    const handlereset = handleSubmit(async (data) => {
       try {
          const token = params.token as string;
          const success = await resetPasswords(token, data.password, data.password_dos);
          if (success) {
              toast.success("Contraseña restablecida correctamente");
              router.push("/auth/login");
          } else {
              toast.error("hubo un error al restablecer la contraseña");
              console.log(error);
          }
       } catch (error) {
          console.log(error);
       }
    });

    return (
      <section className={styles.login}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <HeroAuth />
      <form className={styles.form} onSubmit={handlereset}>
      <label htmlFor="password">Contraseña</label>

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
        <label htmlFor="password">Confirmar contraseña</label>

      <div className={styles.passwordContainer}>
          <input
            type={showPasswordDos ? "text" : "password"}
            id="password"
            placeholder="Confirma tu contraseña"
            {...register("password_dos")}
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPasswordDos(!showPasswordDos)}
          >
            {showPasswordDos ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        </div>
        <button className={styles.buttonSubmit} type="submit" disabled={loading}>
          {loading ? "Cargando" : "Enviar"}
        </button>
      </form>
    </section>
    )
  }