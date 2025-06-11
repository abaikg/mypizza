import axios from "axios";

export const strapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://supportive-connection-48c9c03e13.strapiapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
