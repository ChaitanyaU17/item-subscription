import axios from "axios";
import { BASE_URL, AUTH_TOKEN } from "../constants";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: AUTH_TOKEN,
    "Content-Type": "application/json",
  },
});

export default api;
