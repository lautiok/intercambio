"use client";

import { useAuth } from "@/context/authContext";

export default function page() {

    const { logout } = useAuth();
  return (
      <div>
          <button onClick={logout}>Logout</button>
      </div>
  );
}