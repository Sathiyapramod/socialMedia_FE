import React from "react";
import { AppPostsList, AppUploads } from "./Feeds";
import Heading from "../common/Heading";
import TimeStamp from "../common/TimeStamp";
import Content from "../common/Content";
import { UploadsData } from "./UploadsData";
import timeAgo from "../../utils/timeMachine";

function PostData({ post }: { post: AppPostsList }): React.ReactNode {
    return (
        <div className="w-full h-full shadow-md bg-[#f7ebff] p-[30px] rounded-[26px] mb-8">
            <div className="flex flex-row items-center justify-start gap-[15px] mb-[30px]">
                <div className="w-[50px] h-[50px] rounded-full bg-textarea "></div>
                <div className="flex flex-col">
                    <Heading content={post.created_by} />
                    <TimeStamp content={timeAgo(post.created_at)} />
                </div>
            </div>
            <Content postContent={post.post} classname="mb-4" />
            <div className="flex flex-row gap-[10px] items-start">
                {post.uploads.length > 0 ? (
                    post.uploads.map((up: AppUploads, index: number) => {
                        return <UploadsData up={up} key={index} />;
                    })
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default PostData;
