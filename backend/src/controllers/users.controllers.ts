import { Request, Response } from "express";
import { UserRepository } from "../repositories/userRepositories";
import { UserService } from "../service/userService";
import { IUserRepository } from "../types/usersType";
import { config } from "../config/config";
import bcrypt from "bcrypt";

const userRepository: IUserRepository = new UserRepository();
const userService = new UserService(userRepository);

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { name, email, password, password_dos, institutional, role } = req.body;
  if (!name || !email || !password || !password_dos || !institutional || !role) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  if (password !== password_dos) {
    return res.status(400).json({ message: "Password do not match" });
  }

try {
   const existingUser = await userService.findUserByEmail(email);
   if (existingUser) {
     return res.status(400).json({ message: "User already exists" });
   }

   const passwordHash = await bcrypt.hash(password, Number(config.hashSalt));

   const newUser = {
     name,
     email,
     institutional,
     password: passwordHash,
     role
   };

   const user = await userService.createUser(newUser);
   return res.status(201).json({ message: "User created successfully", user });
} catch (error) {
  return res.status(500).json({ message: "Internal server error" });
}
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.findUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.findUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
