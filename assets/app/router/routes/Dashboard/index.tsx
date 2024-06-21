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
                element: <div>
                    <h1>This is dashboard!</h1>
                    <p>
                        Welcome to the dashboard!
                    </p>
                </div>
            }
        ]
    }
]