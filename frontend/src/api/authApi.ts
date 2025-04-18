import { NewUser } from "@/context/authContext";
import axios from "./axios";

export const loginRequest = async (email: string, password: string) => {
  const response = await axios.post("auth/login", {
    email,
    password,
  });
  return response.data;
};

export const registerRequest = async (user: NewUser) => {
  const response = await axios.post("auth/register", user);
  return response.data;
} 

export const logoutRequest = async () => {
  const response = await axios.post("auth/logout", {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const verifyRequest = async () => {
  const response = await axios.post("auth/verify", {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const forgotPasswordRequest = async (email: string) => {
  const response = await axios.post("auth/forgot-password", {
    email,
  });
  return response.data;
};

export const resetPasswordRequest = async (data: any) => {
  const response = await axios.post("auth/reset-password", data);
  return response.data;
};