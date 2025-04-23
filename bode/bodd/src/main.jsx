import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ColorProvider } from "./context/ColorContext.jsx";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ColorProvider>
    
    <App />
    </ColorProvider>
  </StrictMode>
);
