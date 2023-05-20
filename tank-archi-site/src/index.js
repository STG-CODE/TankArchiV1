//basic imports
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//context import
import { LoginContext } from "./pages/Shared/Context/login-context";

const root = ReactDOM.createRoot(document.getElementById("root"));

function startPage() {
  const page = (
    <LoginContext.Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoginContext.Provider>
  );
  root.render(page);
}

setInterval(startPage, 1000);
