import mongoose from "mongoose";
import { Book } from "../types/booksTypes";

const booksSchema : mongoose.Schema = new mongoose.Schema<Book>({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    interes: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    iduser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image: {
        public_id: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        },
    },
}, {
    timestamps: true,
    versionKey: false,
})

export default mongoose.model<Book>("Book", booksSchema);