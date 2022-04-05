import dotenv from "dotenv";
dotenv.config();

export const ISDEV = process.env.NODE_ENV === "development";
export const SERVER_URL = ISDEV
  ? "http://localhost:8080"
  : process.env.SERVER_URL || "https://mysko0l-api.herokuapp.com";

console.log(SERVER_URL, process.env.SERVER_URL);
