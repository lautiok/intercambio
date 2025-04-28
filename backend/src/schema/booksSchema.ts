import { z } from "zod";

export const booksSchema = z.object({
    title: z.string({
        message: "El título debe tener al menos 3 caracteres",
    }).min(3).max(100),
    author: z.string({
        message: "El autor debe tener al menos 3 caracteres",
    }).min(1).max(100),
    description: z.string({
        message: "La descripción debe tener al menos 3 caracteres",
    }).min(3),
    interes: z.string({
        message: "Los intereses deben tener al menos 3 caracteres",
    }).min(3).max(100),
});

export const bookUpdateSchema = z.object({
    title: z.string({
        message: "El título debe tener al menos 3 caracteres",
    }).min(3).max(100),
    author: z.string({
        message: "El autor debe tener al menos 3 caracteres",
    }).min(2).max(100),
    description: z.string({
        message: "La descripción debe tener al menos 3 caracteres",
    }).min(3),
    interes: z.string({
        message: "Los intereses deben tener al menos 3 caracteres",
    }).min(3).max(100),
});