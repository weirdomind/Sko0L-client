import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "@mui/material";
import theme from "./configs/muitheme";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
        <ToastContainer theme="dark" position="bottom-right" />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
