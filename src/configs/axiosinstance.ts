import axios from "axios";
import { SERVER_URL } from "../constanats";

const server = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default server;
