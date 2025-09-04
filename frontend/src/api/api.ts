import axios from "axios";

export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL_AUTH,
});

export const apiProduct = axios.create({
  baseURL: import.meta.env.VITE_API_URL_PRODUCT,
});
