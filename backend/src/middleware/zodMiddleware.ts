import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const zodMiddleware = (schema: z.ZodTypeAny) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error: any) {
            res.status(400).json({ message: error.errors[0].message });
        }
    };
};