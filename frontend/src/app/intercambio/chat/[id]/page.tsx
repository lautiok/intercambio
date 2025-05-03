"use client";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Chat from "@/components/chat/chat";

export default function ChatPage() {
    const params = useParams();
    const id = params?.id as string;
    const { user } = useAuth();


    if (!user?.user.id) {
        return <main>Chat no encontrada</main>;
    }

  return <main>
    <Chat chatId={id} userId={user.user.id} />
  </main>;
}