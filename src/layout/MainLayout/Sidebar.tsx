import React, { useState } from "react";
import Sidemenu from "../../components/Sidebar/Sidemenu";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import CreatePosts from "../../components/Homepage/CreatePosts";

function Sidebar() {
    const [isOpen, setOpen] = useState<boolean>(false);

    const onClose = () => setOpen((pv) => !pv);

    return (
        <div className="w-[235px] mt-[70px]">
            <Sidemenu />
            <Button
                theme="dark"
                content="create post"
                onClick={onClose}
                classname="ml-[32px] mt-[56px]"
            />
            <Modal isOpen={isOpen} onClose={onClose} title="Create Post">
                <CreatePosts onClose={onClose} />
            </Modal>
        </div>
    );
}

export default Sidebar;
