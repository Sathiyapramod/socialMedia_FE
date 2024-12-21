import React, { useRef, useEffect } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { AppUploads } from "./Feeds";

export function UploadsData({ up }: { up: AppUploads }): React.ReactNode {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const isVisible = useIntersectionObserver({
        targetSelector: "video",
    });

    useEffect(() => {
        if (videoRef.current) {
            if (isVisible) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [isVisible]);

    return (
        <div className="w-[180px] rounded-lg shadow-lg">
            {up.type === "image" ? (
                <img
                    src={up.url_path}
                    alt={up.post_id}
                    className="w-full rounded-lg object-cover z-10"
                />
            ) : (
                <video
                    ref={videoRef}
                    src={up.url_path}
                    controls
                    muted
                    className="w-full rounded-lg -z-[100] object-cover bg-transparent"
                    preload="metadata"
                >
                    The Browser Does not support video streaming
                </video>
            )}
        </div>
    );
}
