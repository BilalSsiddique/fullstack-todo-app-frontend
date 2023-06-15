import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import Providers from "./Components/Providers.tsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
      <Providers>
        <App />
      </Providers>

  </React.StrictMode>
);
