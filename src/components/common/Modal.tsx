import React from "react";
import Heading from "./Heading";
import ActionButton from "./ActionButton";
import leftArrow from "../../assets/leftArrow.svg";

interface AppModal {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: AppModal) {
    if (!isOpen) return;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-100">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg z-10 w-[1168px] h-fit py-10">
                <div className="flex justify-start px-10 items-center gap-[10px]">
                    <ActionButton src={leftArrow} onClick={onClose} />
                    <Heading content={title} />
                </div>
                <div className="px-10">{children}</div>
            </div>
        </div>
    );
}

export default Modal;
