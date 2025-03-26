import {z} from "zod";

export const registerSchema = z.object({
    email: z.string().email({
        message: "El email debe ser válido",
    }),
    password: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
    }),
    password_dos: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
    }),
    institutional: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres",
    }),
    name: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres",
    }),
});

export const loginSchema = z.object({
    email: z.string().email({
        message: "El email debe ser válido",
    }),
    password: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
    }),
});