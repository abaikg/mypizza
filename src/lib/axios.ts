import axios from "axios";

export const strapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
  },
});
