import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
