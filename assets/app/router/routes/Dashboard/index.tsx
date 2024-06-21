import { DashboardPage } from "@/pages/Dashboard";
import { Suspense } from "react";
import { Outlet, RouteObject } from "react-router-dom";

export const dashboardRoutes: RouteObject[] = [
    {
        id: 'dashboard',
        path: '/',
        element: <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
        </Suspense>,
        children: [
            {
                index: true,
                element: <DashboardPage />
            }
        ]
    }
]