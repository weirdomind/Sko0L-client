console.log(process.env.NODE_ENV);
export const ISDEV = process.env.NODE_ENV === "development";
export const SERVER_URL = ISDEV
  ? "http://localhost:8080"
  : "https://mysko0l-api.herokuapp.com";
