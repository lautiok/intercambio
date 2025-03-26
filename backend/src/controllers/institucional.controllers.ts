import { Request, Response } from "express";
import { IinstitucionalRepository } from "../types/InstitucionalType";
import { InstitucionalRepository } from "../repositories/institucionalRepositories";
import { InstitucionalService } from "../service/institucionalService";


const institucionalRepository: IinstitucionalRepository = new InstitucionalRepository();
const institucionalService = new InstitucionalService(institucionalRepository);


export const createInstitucional = async (req: Request, res: Response) => {
    const { institucion, direccion, email, telefono, pais } = req.body;

    if (!institucion || !direccion || !email || !telefono || !pais) {
        res.status(400).json({ message: "Faltan campos" });
        return;
    }

    try {
        const institucional = await institucionalService.createInstitucional({
            institucion,
            direccion,
            email,
            telefono,
            pais,
        });
        res.status(201).json(institucional);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const getInstitucional = async (req: Request, res: Response) => {
    try {
        const institucional = await institucionalService.findInstitucional();
        res.status(200).json(institucional);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const getInstitucionalById = async (req: Request, res: Response) => {
    try {
        const institucional = await institucionalService.findInstitucionalById(req.params.id);
        res.status(200).json(institucional);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const updateInstitucional = async (req: Request, res: Response) => {
    try {
        const institucional = await institucionalService.updateInstitucional(req.params.id, req.body);
        res.status(200).json(institucional);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const deleteInstitucional = async (req: Request, res: Response) => {
    try {
        const institucional = await institucionalService.deleteInstitucional(req.params.id);
        res.status(200).json(institucional);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

