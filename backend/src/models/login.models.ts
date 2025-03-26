import mongoose from "mongoose";
import { login } from "../types/loginType";

const loginSchema : mongoose.Schema = new mongoose.Schema<login>({
    email: {
        type: String,
        required: true
    },
    ip_address: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model<login>("Login", loginSchema);