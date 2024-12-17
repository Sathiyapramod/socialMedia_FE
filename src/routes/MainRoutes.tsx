import React, { lazy } from "react";
import MainLayout from "../layout/MainLayout/MainLayout";

const Homepage = lazy(() => import("@pages/Homepage/Homepage"));
const Profile = lazy(() => import("@pages/Profile/Profile"));

const MainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/home",
            element: <Homepage />, // home page
        },
        {
            path: "/profile",
            element: <Profile />,
        },
    ],
};

export default MainRoutes;
