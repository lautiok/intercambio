import nodemailer from "nodemailer";
import { config } from "./config";

export const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: config.nodemailer.user,
        pass: config.nodemailer.password,
      },
    });
