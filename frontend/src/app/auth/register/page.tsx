"use client";
import HeroAuth from "@/layout/heroAuth/heroAuth";
import styles from "./register.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/authContext";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useInstitucional } from "@/context/institucionalContext";

export default function Page() {
  const { handleSubmit, register } = useForm();
  const { loading, error, register: registrar } = useAuth();
  const { getInstitucional, institucional } = useInstitucional();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordDos, setShowPasswordDos] = useState(false);
  const [selectedInstitucional, setSelectedInstitucional] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    getInstitucional();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleRegister = handleSubmit(async (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_dos: data.password_dos,
      institutional: selectedInstitucional || "",
    };
    const success = await registrar(newUser);
    if (success) {
      router.push("/auth/login");
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInstitucional(event.target.value);
  };

  return (
    <section className={styles.login}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <HeroAuth />
      <form className={styles.form} onSubmit={handleRegister}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          placeholder="Johan Matt"
          {...register("name")}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Ejemplo@ejemplo.com"
          {...register("email")}
        />
        <label htmlFor="institutional">Institución</label>

        <select
          name="institutional"
          id="institutional"
          onChange={handleChange}
          value={selectedInstitucional || ""}
          disabled={institucional.length === 0}
        >
          <option value="">Selecciona una institución</option>
          {institucional.map((institucion) => (
            <option value={institucion._id} key={institucion._id}>
              {institucion.institucion}
            </option>
          ))}
        </select>

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
        <label htmlFor="password_dos">Repetir contraseña</label>
        <div className={styles.passwordContainer}>
          <input
            type={showPasswordDos ? "text" : "password"}
            id="password_dos"
            placeholder="Repite tu contraseña"
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
        <button
          className={styles.buttonSubmit}
          type="submit"
          disabled={loading}
        >
          {loading ? "Cargando" : "Registrar"}
        </button>
      </form>
      <p>
        ¿Ya tienes cuenta? <Link href="/auth/login">Inicia sesión</Link>
      </p>
    </section>
  );
}
