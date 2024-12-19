import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="flex flex-col">
            <Navbar />
            <div className="flex">
                <aside className="self-start sticky top-[135px]">
                    <Sidebar />
                </aside>
                <main className="w-8/12 px-0 rounded-[8px] overflow-y-auto bg-background">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
