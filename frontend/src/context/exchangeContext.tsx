"use client";
import { acceptExchangeRequest, createExchangeRequest, deleteExchangeRequest, findByOwnerRequest, findByRequesterRequest } from "@/api/exchange";
import { ReactNode, createContext, useContext, useState, useEffect } from "react";

export type ExchangeRequest = {
    _id: string;
    requestedBook: string;
    offeredBook: string;
    owner: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};


export const useExchange = () => useContext(ExchangeContext);

export const ExchangeContext = createContext<{
    exchangeRequest: ExchangeRequest[];
    setExchangeRequest: (exchangeRequests: ExchangeRequest[]) => void;
    createExchange: (data:any) => Promise<boolean>;
    findByOwner: () => Promise<any>;
    exchangeOwner: any;
    setExchangeOwner: (exchangeOwner: any) => void;
    acceptExchanges: (id: string) => Promise<boolean>;
    acceptExchange: any;
    setAcceptExchange: (acceptExchange: any) => void;
    deleteExchange: (id: string) => Promise<boolean>;
    findByRequester: () => Promise<any>;
    exchangeRequester: any;
    setExchangeRequester: (exchangeRequester: any) => void;
}>({
    exchangeRequest: [],
    setExchangeRequest: () => {},
    createExchange: () => Promise.resolve(false),
    findByOwner: () => Promise.resolve(false),
    exchangeOwner: [],
    setExchangeOwner: () => {},
    acceptExchanges: () => Promise.resolve(false),
    acceptExchange: [],
    setAcceptExchange: () => {},
    deleteExchange: () => Promise.resolve(false),
    findByRequester: () => Promise.resolve(false),
    exchangeRequester: [],
    setExchangeRequester: () => {},
});

export const ExchangeProvider = ({ children }: { children: ReactNode }) => {
    const [exchangeRequest, setExchangeRequest] = useState<any>([]);
    const [exchangeRequester, setExchangeRequester] = useState<any>([]);
    const [exchangeOwner, setExchangeOwner] = useState<any>([]);
    const [acceptExchange, setAcceptExchange] = useState<any>([]);

    const createExchange = async (data: any) => {
        try {
            const response = await createExchangeRequest(data);
            setExchangeRequest(response);
            return true;
        } catch (error) {
            console.log("Error creando solicitud de intercambio:", error);
            return false;
        }
    };

    const findByOwner = async () => {
        try {
            const response = await findByOwnerRequest();
            setExchangeOwner(response);
        } catch (error) {
            console.log("Error al encontrar la solicitud de intercambio:", error);
        }
    }

    const acceptExchanges = async (id: string) => {
        try {
            const response = await acceptExchangeRequest(id);
            setAcceptExchange(response);
            return true;
        } catch (error) {
            console.log("Error al aceptar la solicitud de intercambio:", error);
            return false;
        }
    }

    const deleteExchange = async (id: string) => {
        try {
            const response = await deleteExchangeRequest(id);
            setExchangeRequest(response);
            return true;
        } catch (error) {
            console.log("Error al eliminar la solicitud de intercambio:", error);
            return false;
        }
    }

    const findByRequester = async () => {
        try {
            const response = await findByRequesterRequest();
            setExchangeRequester(response);
        } catch (error) {
            console.log("Error al encontrar la solicitud de intercambio:", error);
        }
    }

    return (
        <ExchangeContext.Provider value={{
            exchangeRequest,
            setExchangeRequest,
            createExchange,
            findByOwner,
            exchangeOwner,
            setExchangeOwner,
            acceptExchanges,
            acceptExchange,
            setAcceptExchange,
            deleteExchange,
            findByRequester,
            exchangeRequester,
            setExchangeRequester,
        }}>
            {children}
        </ExchangeContext.Provider>
    );
};