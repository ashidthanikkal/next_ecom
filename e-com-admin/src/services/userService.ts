import { api } from "@/lib/api";

export const userService = {
  getUsers: (data: { skip: 0; limit: 10; searchingText: "" }, token: string) =>
    api.post("/users", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  userStatusChange: (userId: string, status: number, token: string) =>
    api.put(
      `/users/${userId}`,
      { userId, status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
};
