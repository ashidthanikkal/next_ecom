import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function useUser() {
  const [token, setToken] = useState("");

  // Load token from cookies when component mounts
  useEffect(() => {
    const savedToken = Cookies.get("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return { token };
}
