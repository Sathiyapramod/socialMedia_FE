import React from "react";
import EditIcon from "../../assets/HiPencil.svg";
import { useTypedSelector } from "../../store";
import supabase from "../../utils/supabaseClient";

function Banner() {
    const { displayName } = useTypedSelector((state) => state.users);

    const uploadBanner = async (e) => {
        try {
            const file = e.target.files?.[0];
            if (file) {
                const fileExt = file.name.split(".").pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                await supabase.storage.from("banners").upload(filePath, file);
                await supabase.from("user_dat").insert({
                    banner: filePath,
                    username: displayName,
                });
            }
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return (
        <div
            className={`w-full h-[312px] bg-slate-100 bg-center bg-cover rounded-t-xl flex flex-col-reverse items-end p-4`}
            // style={{ backgroundImage: src && `url(${src})` }}
        >
            <div className="bg-slate-200 w-[40px] h-[40px] rounded-full flex justify-center cursor-pointer">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="file-upload"
                    onClick={uploadBanner}
                    multiple
                />
                <label
                    htmlFor={`file-upload`}
                    className="flex items-center cursor-pointer gap-[5px] p-3 duration-200"
                >
                    <img src={EditIcon} alt="edit_banner_img" width="20" height="20" />
                </label>
            </div>
        </div>
    );
}

export default Banner;
