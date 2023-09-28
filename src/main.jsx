import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Initialization for ES Users
import { ThemeProvider } from "@material-tailwind/react";
import BirdProvider from "./BirdContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BirdProvider>
        <App />
      </BirdProvider>
    </ThemeProvider>
  </React.StrictMode>
);
