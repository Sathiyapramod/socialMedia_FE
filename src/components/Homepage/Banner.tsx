import React from "react";
import EditIcon from "../../assets/HiPencil.svg";

interface AppProfileBanner {
    src: string;
    onClick: () => void;
}

function Banner({ src, onClick }: AppProfileBanner) {
    return (
        <div
            className={`w-full h-[312px] bg-center bg-cover rounded-t-xl flex flex-col-reverse items-end p-4`}
            style={{ backgroundImage: `url(${src})` }}
        >
            <div
                className="bg-slate-200 w-[40px] h-[40px] rounded-full flex justify-center cursor-pointer"
                onClick={onClick}
            >
                <img src={EditIcon} alt="edit_banner_img" width="20" height="20" />
            </div>
        </div>
    );
}

export default Banner;
