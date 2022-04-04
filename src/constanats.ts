export const ISDEV = process.env.NODE_ENV === "development";
export const SERVER_URL = ISDEV
  ? "http://localhost:8080"
  : "https://sko0l-api.herokuapp.com";

console.log();
