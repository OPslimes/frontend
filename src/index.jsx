import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
