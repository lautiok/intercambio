"use client";
import { getMessagesRequest } from "@/api/chat";
import { ReactNode, createContext, useContext, useState, useEffect } from "react";


export type mensajeChat = {
    sender: string;
    content: string;
};



export const useChat = () => useContext(ChatContext);

export const ChatContext = createContext<{
    mensajes: mensajeChat[];
    setMensajes: (mensajes: mensajeChat[]) => void;
    mensajesChat: (chatId: string) => Promise<boolean>;
}>({
    mensajes: [],
    setMensajes: () => {},
    mensajesChat: () => Promise.resolve(false),
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [mensajes, setMensajes] = useState<mensajeChat[]>([]);

    const mensajesChat = async (chatId: string) => {
        try {
            const response = await getMessagesRequest(chatId);
            setMensajes(response);
            return true;
        } catch (error) {
            console.log("Error al obtener mensajes:", error);
            return false;
        }
    }

   
    return (
        <ChatContext.Provider value={{
            mensajes,
            setMensajes,
            mensajesChat,
        }}>
            {children}
        </ChatContext.Provider>
    );
};