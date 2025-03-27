"use client"
import { ReactNode, createContext, useContext, useState } from "react";
import axios from "axios";
import { institucionalRequest } from "@/api/intstitucionalApi";

type Institucional = {
    _id: string;
    institucion: string;
    direccion: string;
    email: string;
    telefono: string;
    pais: string;
};

export const InstitucionalContext = createContext<{
    institucional: Institucional[]; 
    getInstitucional: () => Promise<void>;
    setInstitucional: (institucional: Institucional[]) => void;
    loading: boolean;
    error: string | null;
}>({
    institucional: [], 
    setInstitucional: () => {},
    getInstitucional: async () => {},
    loading: false,
    error: null,
});

export const InstitucionalProvider = ({ children }: { children: ReactNode }) => {
    const [institucional, setInstitucional] = useState<Institucional[]>([]);

    const getInstitucional = async () => {
        try {
            const response = await institucionalRequest();
            setInstitucional(response);
        } catch (error) {
            console.log("Error obteniendo institucional:", error);
        }
    };

    return (
        <InstitucionalContext.Provider value={{
            institucional,
            setInstitucional,
            getInstitucional,
            loading: false,
            error: null
        }}>
            {children}
        </InstitucionalContext.Provider>
    );
};

export const useInstitucional = () => useContext(InstitucionalContext);
