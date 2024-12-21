import React from "react";
import EditIcon from "../../assets/HiPencil.svg";
import { useTypedSelector } from "../../store";

function ProfilePicture() {
    const { photoURL } = useTypedSelector((state) => state.users);

    return (
        <div
            className="w-[270px] h-[270px] rounded-full bg-slate-200 ml-[45px] -mt-[135px] flex flex-col-reverse items-end p-4"
            style={{
                background: photoURL && `center / contain no-repeat url(${photoURL})`,
            }}
        >
            <div className="bg-slate-200 w-[40px] h-[40px] rounded-full flex justify-center cursor-pointer">
                <img src={EditIcon} alt="edit_banner_img" width="20" height="20" />
            </div>
        </div>
    );
}

export default ProfilePicture;
