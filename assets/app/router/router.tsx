import { RouterProvider, createBrowserRouter, useRoutes } from "react-router-dom"
import { dashboardRoutes } from "./routes/Dashboard"

export const Router = () => useRoutes([
    ...dashboardRoutes
])