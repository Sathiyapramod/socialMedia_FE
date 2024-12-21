import React from "react";
import logo from "../../assets/logo.svg";
import Logo from "../../components/common/Logo";
import Avatar from "../../components/common/Avatar";
import Heading from "../../components/common/Heading";
import { useNavigate } from "react-router-dom";
import supabase from "../../utils/supabaseClient";
import { useAppDispatch } from "../../store";
import { logout } from "../../store/reducers/auth";
import { useTypedSelector } from "../../store";
import { toast } from "sonner";

function Navbar() {
    const { displayName, photoURL } = useTypedSelector((state) => state.users);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            dispatch(logout());
            if (error) {
                toast.error("Error while Logging out");
            } else {
                navigate("/");
                toast.success("Logged out Successfully");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error("Error");
        }
    };

    return (
        <div className="sticky top-0 bg-white shadow-md flex flex-row items-center w-full pt-[11px] ps-[32px] pe-[32px] gap-[53px] flex-wrap sm:flex-nowrap ">
            <Logo src={logo} />
            <div className="flex flex-row justify-between items-center w-full">
                <div>
                    <div className="text-light-gray text-sm">Welcome Back,</div>
                    <Heading content={displayName ?? ""} />
                </div>
                <div className="hidden md:flex flex-row items-center gap-[25px]">
                    <Heading content="Logout" onClick={handleLogout} classname="cursor-pointer" />
                    {/* state management */}
                    <Avatar src={photoURL} />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
