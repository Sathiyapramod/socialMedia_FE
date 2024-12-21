import React from "react";
import profBanner from "../../assets/photo-1504805572947-34fad45aed93.jpg";
import ProfilePicture from "../common/ProfilePicture";
import Banner from "./Banner";
import { useTypedSelector } from "../../store";
import Heading from "../common/Heading";
import TimeStamp from "../common/TimeStamp";
import Button from "../common/Button";

function ViewProfile(): React.ReactNode {
    const { displayName } = useTypedSelector((state) => state.users);

    return (
        <div className="bg-white pb-6">
            <Banner src={profBanner} />
            <div className="flex flex-row items-center justify-between">
                <ProfilePicture />
                <div className="flex-1 flex flex-row justify-between px-4">
                    <div>
                        <Heading content={displayName} />
                        <TimeStamp content="Just someone who loves designing, sketching, and finding beauty in the little things 💕" />
                    </div>
                    <div className="-mt-3">
                        <Button theme="light" content="Edit Profile" onClick={() => {}} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProfile;
