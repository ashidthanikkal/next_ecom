
import axios from "axios"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api", // update to your backend URL
  withCredentials: true, // if you use cookies
})
