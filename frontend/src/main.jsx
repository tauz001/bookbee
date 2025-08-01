import React from "react"
import ReactDOM from "react-dom/client"
import {RouterProvider} from "react-router-dom"
import {router} from "./router"
import "./App.css" // Changed from index.css to App.css

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
