import React from "react";
import Sidemenu from "../../components/Sidebar/Sidemenu";
import Button from "../../components/common/Button";
import { setClose } from "../../store/reducers/posts";
import { useAppDispatch } from "../../store";

function Sidebar(): React.ReactNode {
    const dispatch = useAppDispatch();

    const onClose = () => {
        dispatch(setClose());
    };

    return (
        <div className="w-[235px] mt-[70px]">
            <Sidemenu />
            <Button
                theme="dark"
                content="create post"
                onClick={onClose}
                classname="ml-[32px] mt-[56px]"
            />
        </div>
    );
}

export default Sidebar;
