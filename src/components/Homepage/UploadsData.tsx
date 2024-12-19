import React from "react";
import { AppUploads } from "./Feeds";

export function UploadsData({ up }: { up: AppUploads }): React.ReactNode {
    return (
        <div className="w-[180px] rounded-lg shadow-lg">
            <img
                src={up.url_path}
                alt={up.post_id}
                className="w-full rounded-lg object-cover z-10"
            />
        </div>
    );
}
