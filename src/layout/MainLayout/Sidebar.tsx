import React from "react";
import Sidemenu from "@components/Sidebar/Sidemenu";
import Button from "@components/common/Button";

function Sidebar() {
    return (
        <div className="w-[255px] h-screen mt-[70px]">
            <Sidemenu />
            <Button theme="dark" content="create post" onClick={() => {}} classname="ml-[32px]" />
        </div>
    );
}

export default Sidebar;
