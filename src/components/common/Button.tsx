import React from "react";
import { twMerge } from "tailwind-merge";

interface AppButton {
    theme: string;
    content: string;
    classname?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
}

function Button({ theme, content, onClick, classname }: AppButton) {
    return (
        <button
            onClick={onClick}
            className={twMerge(
                "w-[170px] h-[48px] px-[16px] py-[5px] text-sm font-bold rounded-full border border-black",
                theme === "dark" ? "bg-black text-white" : "bg-white text-black",
                classname
            )}
        >
            {content.toUpperCase()}
        </button>
    );
}

export default Button;
