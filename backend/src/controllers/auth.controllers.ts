import { Request, Response } from "express";
import { UserRepository } from "../repositories/userRepositories";
import { UserService } from "../service/userService";
import { IUserRepository } from "../types/usersType";
import bcrypt from "bcrypt";
import { config } from "../config/config";
import jwt from "jsonwebtoken";
import { ILoginRepository } from "../types/loginType";
import { LoginRepository } from "../repositories/loginRepositories";
import { LoginService } from "../service/LoginService copy";
import {
  checkLoginAttempts,
  clearLoginAttempts,
  increaseLoginAttempts,
} from "../utils/loginAttempts";
import nodemailer from "nodemailer";
import { transporter } from "../config/nodemailer";


const userRepository: IUserRepository = new UserRepository();
const userService = new UserService(userRepository);

const loginRepository: ILoginRepository = new LoginRepository();
const loginService = new LoginService(loginRepository);

export const registerAuth = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, email, password, password_dos, institutional } = req.body;

  if (!name || !email || !password || !password_dos || !institutional) {
    return res.status(400).json({ message: "Complete todos los campos" });
  }

  if (password !== password_dos) {
    return res.status(400).json({ message: "Las contraseñas no coinciden" });
  }
  try {
    const existingUser = await userService.findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const passwordHash = await bcrypt.hash(password, Number(config.hashSalt));

    const newUser = {
      name,
      email,
      institutional,
      password: passwordHash,
    };

    const user = await userService.createUser(newUser);
    return res
      .status(201)
      .json({ message: "el usuario se creó correctamente", user });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const loginAuth = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  let ip =
    req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (Array.isArray(ip)) {
    ip = ip[0];
  }

  if (!email || !password) {
    return res.status(400).json({ message: "Complete todos los campos" });
  }

  const { blocked, minutesLeft } = checkLoginAttempts(ip as string);

  if (blocked) {
    return res.status(429).json({
      message: `Demasiados intentos de inicio de sesión. Por favor inténtelo de nuevo después
 ${minutesLeft} minutes.`,
    });
  }

  try {
    const user = await userService.findUserByEmail(email);

    if (!user) {
      increaseLoginAttempts(ip as string);
      return res.status(400).json({ message: "email o contraseña incorrectos" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      increaseLoginAttempts(ip as string);
      return res.status(400).json({ message: "email o contraseña incorrectos" });
    }

    clearLoginAttempts(ip as string);

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: "1d" }
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "User logged in successfully", user });

    await loginService.createLogin({ email, ip_address: ip });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutAuth = async (req: Request, res: Response): Promise<any> => {
  res.clearCookie("access_token").json({ message: "User logged out" });
};

export const verifyAuth = async (req: Request, res: Response): Promise<any> => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    if (typeof decoded !== "string" && "email" in decoded) {
      const verifyUser = await userService.findUserByEmail(decoded.email);
      return res.status(200).json({ message: "Authorized", user: decoded });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const forgotPasswordAuth = async (req: Request, res: Response): Promise<any> => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Ingrese un correo válido" });
  }

  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    const resetToken = jwt.sign({ email: user.email }, config.jwtSecret, {
      expiresIn: "1h",
    });

    if (!user._id) {
      return res.status(500).json({ message: "no se detecto ningun usuario" });
    }
    
    await userService.saveResetToken(user._id, resetToken);

    const mailOptions = {
      from: config.nodemailer.user,
      to: email,
      subject: "Recuperación de contraseña",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; text-align: center;">
          <img src="https://static.vecteezy.com/system/resources/previews/023/450/725/large_2x/brown-book-illustration-free-png.png" alt="Logo" style="width: 80px; margin-bottom: 10px;">
          <h2 style="color: #333;">Recuperación de contraseña</h2>
          <p style="color: #555;">Hola, <strong>${user.name}</strong></p>
          <p style="color: #555;">Haz clic en el siguiente botón para restablecer tu contraseña:</p>
          <a href="${config.url}/auth/reset-password/${resetToken}" 
             style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #000; text-decoration: none; border-radius: 5px; margin: 10px 0;">
            Restablecer contraseña
          </a>
          <p style="color: #999; font-size: 12px;">Este enlace expirará en 1 hora.</p>
          <hr style="border: 0; border-top: 1px solid #ddd;">
          <p style="color: #777; font-size: 12px;">Si no solicitaste este cambio, ignora este mensaje.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Correo de recuperación enviado" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const resetPasswordAuth = async (req: Request, res: Response):Promise<any> => {
  const { token, newPassword, password_dos } = req.body;

  if (!token || !newPassword || !password_dos) {
    return res.status(400).json({ message: "Token y nueva contraseña requeridos" });
  }

  if (newPassword !== password_dos) {
    return res.status(400).json({ message: "Las contraseñas no coinciden" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    if (typeof decoded !== "string" && "email" in decoded) {
      const user = await userService.findUserByEmail(decoded.email);
      if (!user) {
        return res.status(400).json({ message: "Token inválido" });
      }

      if (!user._id) {
        return res.status(500).json({ message: "el usuario no existe" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, Number(config.hashSalt));
      await userService.updatePassword(user._id, hashedPassword);

      return res.status(200).json({ message: "Contraseña restablecida correctamente" });
    } else {
      return res.status(400).json({ message: "Token inválido" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Token expirado o inválido" });
  }
};

export const getLogin = async (req: Request, res: Response) => {
  try {
    const logins = await loginService.findLogins();
    res.status(200).json(logins);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
