import { api } from "@/lib/api";

export const authService = {
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data), // REST Example

  register: (data: { username: string; email: string; password: string,role?:string }) =>
    api.post("/auth/register", data),

  forgotPassword: (data: { email: string }) =>
    api.post("/auth/forgot-password", data),

  resetPassword: (data: { token: string; newPassword: string }) =>
    api.post("/auth/reset-password", data),
};
