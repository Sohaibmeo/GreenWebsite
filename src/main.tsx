
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

const markAppLoaded = () => {
  document.documentElement.classList.add("app-loaded");
};

if (document.readyState === "complete") {
  markAppLoaded();
} else {
  window.addEventListener("load", markAppLoaded, { once: true });
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
  