import React from "react";
import logo from "@assets/logo.svg";
import Logo from "@components/common/Logo";
import Avatar from "@components/common/Avatar";

function Navbar() {
    return (
        <div className="flex flex-row items-center w-full pt-[11px] ps-[32px] pe-[32px] gap-[53px] flex-wrap sm:flex-nowrap">
            <Logo src={logo} width={150} height={150} />
            <div className="flex flex-row justify-between items-center w-full">
                <div>
                    <div className="text-light-gray text-sm">Welcome Back,</div>
                    <div className="text-black text-medium font-semibold">Sakshi Agarwal</div>
                </div>
                <div className="hidden md:flex flex-row items-center gap-[25px]">
                    <div className="text-black text-medium font-semibold">Logout</div>
                    {/* state management */}
                    <Avatar src={""} />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
