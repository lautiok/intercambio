import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const checkRole = (roles: string) => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, config.jwtSecret);
        if (typeof decoded !== "string" && "role" in decoded) {
            if (roles.includes(decoded.role)) {
                return next();
            }
            else {
                return res.status(401).json({ message: "Unauthorized" });
            }
        }
    } catch (error) {
        return res.status(401).json({ message: "Internal server error" });
    }
};