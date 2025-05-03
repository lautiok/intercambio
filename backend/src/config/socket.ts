import { Server, Socket } from 'socket.io';
import ChatModel from '../models/chat.models'; 
import mongoose from 'mongoose';

let io: Server;

interface SendMessagePayload {
  roomId: string;
  senderId: string;
  message: string;
}

export const initSocket = (server: any): Server => {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('🟢 Usuario conectado:', socket.id);

    socket.on('joinRoom', (roomId: string) => {
      socket.join(roomId);
      console.log(`🟢 ${socket.id} se unió a la sala ${roomId}`);
    });

    socket.on('sendMessage', async ({ roomId, senderId, message }: SendMessagePayload) => {
      console.log(`💬 Mensaje de ${senderId} en ${roomId}: ${message}`);

      if (!mongoose.Types.ObjectId.isValid(roomId) || !mongoose.Types.ObjectId.isValid(senderId)) {
        console.error('❌ ID inválido en sendMessage');
        return;
      }

      const newMessage = {
        sender: senderId,
        content: message,
        timestamp: new Date(),
      };

      try {
        await ChatModel.findByIdAndUpdate(roomId, {
          $push: { messages: newMessage },
        });

        io.to(roomId).emit('receiveMessage', newMessage);
      } catch (error) {
        console.error('❌ Error al guardar mensaje en DB:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('🔴 Usuario desconectado:', socket.id);
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) throw new Error('Socket.io no inicializado');
  return io;
};
