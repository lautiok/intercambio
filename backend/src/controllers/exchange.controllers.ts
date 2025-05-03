import { Request, Response } from "express";
import { ExchangeRequestRepositories } from "../repositories/exchangeRequestRepository";
import { ExchangeRequestRepository } from "../types/exchangeRequestType";
import { exchangeRequestService } from "../service/exchangeRequestService";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { ChatRepository } from "../types/chatTypes";
import { ChatRepositories } from "../repositories/chatRepositorird";
import { ChatService } from "../service/chatService";

const chatRepository: ChatRepository = new ChatRepositories();
const chatService = new ChatService(chatRepository);

const exchangeRepository: ExchangeRequestRepository = new ExchangeRequestRepositories();
const exchangeService = new exchangeRequestService(exchangeRepository);

export const create = async (req: Request, res: Response): Promise<any> => {
    const { requestedBook, offeredBook, owner } = req.body;
    const token = req.cookies.access_token;
    const decodedToken = jwt.verify(token, config.jwtSecret) as { id: string };
    const requester = decodedToken.id;
    
    if (!requestedBook || !offeredBook || !requester || !owner) {
        return res.status(400).json({ message: "Faltan campos" });
    }

    try {
        const exchangeRequest = await exchangeService.createExchangeRequest({
            requestedBook,
            offeredBook,
            requester,
            owner,
        });

        res.status(200).json(exchangeRequest);
    } catch (error) {
        return res.status(500).json({ message: "Error al crear la solicitud de intercambio" });
    }
}

export const findByRequester = async (req: Request, res: Response): Promise<any> => {
    const token = req.cookies.access_token;
    const decodedToken = jwt.verify(token, config.jwtSecret) as { id: string };
    const requester = decodedToken.id;


    if (!requester) {
        return res.status(400).json({ message: "hubo un error en el token para encontrar la solicitud" });
    }


    try {
        const exchangeRequests = await exchangeService.findByRequester(requester);
        res.status(200).json(exchangeRequests);
    } catch (error) {
        return res.status(500).json({ message: "Error al encontrar la solicitud de intercambio" });
    }
}

export const findByOwner = async (req: Request, res: Response): Promise<any> => {
    const token = req.cookies.access_token;
    const decodedToken = jwt.verify(token, config.jwtSecret) as { id: string };
    const owner = decodedToken.id;

    if (!owner) {
        return res.status(400).json({ message: "hubo un error en el token para encontrar la solicitud" });
    }

    try {
        const exchangeRequests = await exchangeService.findByOwner(owner);
        res.status(200).json(exchangeRequests);
    } catch (error) {
        return res.status(500).json({ message: "Error al encontrar la solicitud de intercambio" });
    }
}



export const acceptExchangeRequest = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {

        const exchange = await exchangeService.findByid(id);

        if (!exchange) {
            return res.status(404).json({ message: "Solicitud de intercambio no encontrada" });
        }


        if (!exchange._id) {
            return res.status(404).json({ message: "Solicitud de intercambio no encontrada" });
        }

        const data = {
            participants: [
                { user: exchange.requestedBook.toString() },
                { user: exchange.owner.toString() }
            ],
            exchange: exchange._id.toString()
        }

        const chat = await chatService.createChat(data);

        if (!chat._id) { 
            return res.status(404).json({ message: "Error al aceptar la solicitud de intercambio" });
        }

    

        await exchangeService.acceptExchangeRequest(id, chat._id);
       
        res.status(200).json(chat);
    } catch (error) {
        return res.status(500).json({ message: "Error al aceptar la solicitud de intercambio" });
    }
}

export const deleteExchangeRequest = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        const exchange = await exchangeService.deleteExchangeRequest(id);

        if (!exchange) {
            return res.status(404).json({ message: "Solicitud de intercambio no encontrada" });
        }

        res.status(200).json(exchange);
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar la solicitud de intercambio" });
    }
}
