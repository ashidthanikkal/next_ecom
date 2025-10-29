"use client";
import { useEffect, useState } from "react";

export function useUser() {
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch from an API endpoint that reads cookies server-side
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me"); // example endpoint
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setToken(data.token); // or store user info
      } catch {
        setToken("");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { token, isLoading };
}
