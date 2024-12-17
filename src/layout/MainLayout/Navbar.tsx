import React from "react";
import logo from "@assets/logo.svg";
import Logo from "@components/common/Logo";
import Avatar from "@components/common/Avatar";
import Heading from "../../components/common/Heading";
import { useNavigate } from "react-router-dom";
import supabase from "../../utils/supabaseClient";

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.log(error);
            } else navigate("/");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        }
    };

    return (
        <div className="flex flex-row items-center w-full pt-[11px] ps-[32px] pe-[32px] gap-[53px] flex-wrap sm:flex-nowrap sticky top-0 z-10">
            <Logo src={logo} width={150} height={150} />
            <div className="flex flex-row justify-between items-center w-full">
                <div>
                    <div className="text-light-gray text-sm">Welcome Back,</div>
                    {/* <div className="text-black text-medium font-semibold">Sakshi Agarwal</div> */}
                    <Heading content="Sakshi Agarwal" />
                </div>
                <div className="hidden md:flex flex-row items-center gap-[25px]">
                    {/* <div className="text-black text-medium font-semibold">Logout</div> */}
                    <Heading content="Logout" onClick={handleLogout} classname="cursor-pointer" />
                    {/* state management */}
                    <Avatar src={""} />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
