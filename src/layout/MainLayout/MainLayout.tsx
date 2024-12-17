import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="flex ">
        <Sidebar />
        <main className="border border-red-500 w-8/12 px-0 rounded-[8px] z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
