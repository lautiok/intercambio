import mongoose from "mongoose";
import { User } from "../types/usersType";

const userSchema : mongoose.Schema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    institutional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Institucional",
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model<User>("Users", userSchema);