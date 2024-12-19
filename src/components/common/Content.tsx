import React from "react";
import { twJoin } from "tailwind-merge";

interface AppPostContent {
    postContent: string;
    classname?: string;
}

function Content({ postContent, classname }: AppPostContent) {
    return <div className={twJoin("text-black text-medium", classname)}>{postContent}</div>;
}

export default Content;
