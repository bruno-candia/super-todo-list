import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/home";
import "./styles/reset.css";
import "./styles/global.css";
import { Provider } from "react-redux";
import store from "./store/todo-list-store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Home />
    </Provider>
  </React.StrictMode>
);
