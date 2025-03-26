import {z} from "zod";

export const createUserSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres",
    }),
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
    role: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres",
    }),
});