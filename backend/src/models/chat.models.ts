import mongoose from "mongoose";
import { Chat } from "../types/chatTypes";

const chatSchema: mongoose.Schema = new mongoose.Schema<Chat>(
  {
    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      }
    ], 
    exchange: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExchangeRequest",
      required: true,
    },

    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        content: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Chat>("Chat", chatSchema);