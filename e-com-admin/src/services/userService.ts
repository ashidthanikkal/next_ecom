import { api } from "@/lib/api";

export const userService = {
  getUsers: (body: Record<string, any>, token: string) =>
    api.post("/users", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
