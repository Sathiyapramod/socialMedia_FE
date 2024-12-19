import React from "react";
import profBanner from "../../assets/photo-1504805572947-34fad45aed93.jpg";
import ProfilePicture from "../common/ProfilePicture";
import Banner from "./Banner";

import userDp from "../../assets/user_dp.jpg";
import Heading from "../common/Heading";
import TimeStamp from "../common/TimeStamp";
import Button from "../common/Button";

function ViewProfile(): React.ReactNode {
    return (
        <div className="bg-white pb-6">
            <Banner src={profBanner} onClick={() => {}} />
            <div className="flex flex-row items-center justify-between">
                <ProfilePicture src={userDp} />
                <div className="flex-1 flex flex-row justify-between px-4">
                    <div>
                        <Heading content="Sakshi Agarwal" />
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
