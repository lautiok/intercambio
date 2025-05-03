"use client";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import styles from "./chat.module.css";
import { useChat } from "@/context/chatContext";

interface ChatProps {
  chatId: string;
  userId: string;
}

const socket = io("http://localhost:8080", {
  withCredentials: true,
});

export default function Chat({ chatId, userId }: ChatProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  const { mensajesChat, mensajes } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mensajesChat(chatId);
    socket.emit("joinRoom", chatId);

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [chatId]);

  useEffect(() => {
    setMessages(mensajes);
  }, [mensajes]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    socket.emit("sendMessage", {
      roomId: chatId,
      senderId: userId,
      message,
    });

    setMessage("");
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messages}>
        <div className={styles.userId}>Tu ID: {userId}</div>
        {messages.map((msg, idx) => {
          const isMine = msg.sender === userId || msg.senderId === userId;
          return (
            <div
              key={idx}
              className={`${styles.message} ${isMine ? styles.myMessage : styles.otherMessage}`}
            >
              {msg.content}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button className={styles.sendButton} onClick={sendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
}
