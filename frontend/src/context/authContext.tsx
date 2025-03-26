"use client";

import { loginRequest, logoutRequest, verifyRequest } from "@/api/authApi";
import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

type User = {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    institutional: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  };
  
  type LoginResponse = {
    message: string;
    user: User;
  };

  export const useAuth = () => useContext(AuthContext);

  export const AuthContext = createContext<{
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    user: LoginResponse | null;
    setUser: (user: LoginResponse | null) => void;
    loading: boolean;
    error: string | null;
    isCheckingAuth: boolean;
  }>({
    login: () => Promise.resolve(false),
    logout: () => {},
    user: null,
    setUser: () => {},
    loading: false,
    error: null,
    isCheckingAuth: true,
  });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<LoginResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);


    useEffect(() => {

      const checkAuth = async () => {
        try {
          const response = await verifyRequest();
          if (response?.user) {
            setUser(response);
          }
        } catch (error) {
          setUser(null);
        console.log("Error verifying auth:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          await logoutRequest();
        }
        } finally {
          setIsCheckingAuth(false);
        }
      };

      checkAuth();
    }, []);



    const login = async (email: string, password: string): Promise<boolean> => {
        try {
          setLoading(true);
          const response = await loginRequest(email, password);
          setUser(response);
            setLoading(false);
            return true;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setError(error.response?.data?.message || "Error en la solicitud");
          } else if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Ocurrió un error desconocido");
          }
          console.error("Error login:", error);
          return false;
        } finally {
          setLoading(false);
        }
      };

      const logout = async () => {
        try {
          setLoading(true);
          const response = await logoutRequest();
          setUser(null);
          setLoading(false);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setError(error.response?.data?.message || "Error en la solicitud");
          } else if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Ocurrió un error desconocido");
          }
        } finally {
          setLoading(false);
        }
      };      

      return (
        <AuthContext.Provider value={{ 
          login, 
          setUser,
          user, 
          loading, 
          error, 
          logout,
          isCheckingAuth 
        }}>
          {children}
        </AuthContext.Provider>
      );
  }