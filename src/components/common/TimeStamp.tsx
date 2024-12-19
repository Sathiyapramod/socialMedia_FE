import React from "react";

interface AppSubHeading {
    content: string;
    onClick?: () => void;
}

function TimeStamp({ content }: AppSubHeading) {
    return <div className="text-light-gray text-sm">{content}</div>;
}

export default TimeStamp;
