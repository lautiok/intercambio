import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";
import jwt from "jsonwebtoken";

export const ckeckSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;

    const checkToken = jwt.verify(token, config.jwtSecret);

    if (!checkToken) {
      res.status(401).json({ message: "no estás autorizado" });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "no estás autorizado" });
  }
};
