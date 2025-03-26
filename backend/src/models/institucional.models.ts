import mongoose from "mongoose";
import { Institucional } from "../types/InstitucionalType";

const institucionalSchema = new mongoose.Schema<Institucional>({
    institucion: { type: String, required: true, unique: true },
    direccion: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
    pais: { type: String, required: true },
});

export default mongoose.model<Institucional>("Institucional", institucionalSchema);