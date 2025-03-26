"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isCheckingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isCheckingAuth && !user) {
      router.push("/auth/login");
    }
  }, [user, isCheckingAuth, router]);

  return user ? <>{children}</> : null;
};