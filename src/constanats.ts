export const ISDEV = process.env.NODE_ENV === "development";
export const SERVER_URL = ISDEV
  ? "http://localhost:8080"
  : process.env.SERVER_URL || process.env.REACT_APP_SERVER_URL;
