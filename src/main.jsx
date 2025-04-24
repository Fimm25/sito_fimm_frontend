import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.scss";
import { UserProvider } from "./context/UserContext.jsx";
import { ScrollProvider } from "./components/Scroll/ScrollContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ScrollProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ScrollProvider>
    </UserProvider>
  </React.StrictMode>
);
