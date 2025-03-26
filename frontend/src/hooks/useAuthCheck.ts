import { useEffect, useState } from "react";
import { verifyRequest } from "@/api/authApi";
import { useAuth } from "@/context/authContext";

export const useAuthCheck = () => {
  const { user, setUser } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsChecking(true);
        const response = await verifyRequest();
        if (response?.user) {
          setUser(response);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsChecking(false);
      }
    };

    if (!user) {
      checkAuth();
    } else {
      setIsChecking(false);
    }
  }, [user, setUser]);

  return { isChecking };
};