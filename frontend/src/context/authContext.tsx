"use client";

import { loginRequest, logoutRequest, registerRequest, verifyRequest } from "@/api/authApi";
import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export type NewUser = {
    name: string;
    email: string;
    password: string;
    password_dos: string;
    institutional: string;
};

type RegisterResponse = {
    message: string;
    user: User;
};

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
    register: (user: NewUser) => Promise<RegisterResponse>;
    logout: () => void;
    user: LoginResponse | null;
    setUser: (user: LoginResponse | null) => void;
    loading: boolean;
    error: string | null;
    isCheckingAuth: boolean;
}>({
    login: () => Promise.resolve(false),
    register: () => Promise.reject(new Error("Context not initialized")),
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

    const setTimedError = (message: string) => {
      setError(message);
      setTimeout(() => setError(null), 2000); 
  };

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
                if (axios.isAxiosError(error)) {
                    console.log ("Error en la verificación de autenticación:", error);
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
            setError(null); 
            const response = await loginRequest(email, password);
            setUser(response);
            return true;
        } catch (error) {
            let errorMessage = "An unknown error occurred";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || "Login failed";
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            setTimedError(errorMessage);
            console.error("Login error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const register = async (user: NewUser): Promise<RegisterResponse> => {
        try {
            setLoading(true);
            setError(null); 
            const response = await registerRequest(user);
            setUser(response);
            return response;
        } catch (error) {
            let errorMessage = "An unknown error occurred";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || "Registration failed";
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            setTimedError(errorMessage);
            console.error("Registration error:", error);
            throw error; 
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        try {
            setLoading(true);
            setError(null); 
            await logoutRequest();
            setUser(null);
        } catch (error) {
            let errorMessage = "An unknown error occurred";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || "Logout failed";
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            setTimedError(errorMessage);
            console.error("Logout error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ 
            login,
            register,
            setUser,
            user, 
            loading, 
            error, 
            logout,
            isCheckingAuth,
        }}>
            {children}
        </AuthContext.Provider>
    );
};