import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./src/utils/routerConfiguration";

const root = document.getElementById("root");

const reactRoot = ReactDOM.createRoot(root);

reactRoot.render(<RouterProvider router={appRouter} />);
