import mongoose from "mongoose";
import { ExchangeRequest } from "../types/exchangeRequestType";

const exchangeRequestSchema = new mongoose.Schema({
    requestedBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    idChat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: false,
    },
    offeredBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'completed'],
        default: 'pending',
    },
}, { timestamps: true });

export const ExchangeRequestModel = mongoose.model<ExchangeRequest>("ExchangeRequest", exchangeRequestSchema);