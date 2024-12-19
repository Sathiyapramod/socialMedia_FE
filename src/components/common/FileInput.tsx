import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import FileButton from "./FileButton";
import fileUploadIcon from "../../assets/fileUpload.svg";
import camera from "../../assets/camera.svg";

interface AppCreatePosts {
    files: File[] | [];
    setFiles: Dispatch<SetStateAction<File[] | []>>;
}

function FileInput({ files, setFiles }: AppCreatePosts) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);

    const ImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target?.files;
        // for images, either single (or) multiple uploads
        setFiles((prev) => {
            const selectedFiles = Array.from(selected);
            if (prev.length + selectedFiles.length >= 5) return prev;
            else return [...prev, ...selectedFiles];
        });
    };

    const videoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // for video, only single file upload
        const selected = e.target.files?.[0];
        if (selected) setFiles([selected]);
    };

    const startWebcam = async () => {
        // capturing from webcam
        setIsCapturing(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (error) {
            console.log("Error accessing webcam:", error);
            alert("Permission denied for accessing Camera");
        }
    };

    const captureFromWebcam = () => {
        // Click image from webcam

        if (canvasRef.current && videoRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            if (context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Get image as a Data URL and Blob
                canvas.toBlob((blob) => {
                    if (blob) {
                        const capturedFile = new File([blob], `captured-${Date.now()}.png`, {
                            type: "image/png",
                        });

                        setFiles((prev) => {
                            // appending the image to file List
                            if (prev.length >= 5) return prev;
                            else return [...prev, capturedFile];
                        });
                        setCapturedImage(canvas.toDataURL("image/png"));
                    }
                }, "image/png");
            }

            stopWebcam();
        }
    };

    const stopWebcam = () => {
        // stopping webcam

        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach((track) => track.stop());
        }
        setIsCapturing(false);
    };

    return (
        <div>
            <div className="flex flex-row">
                <FileButton
                    content={"Upload Image"}
                    onClick={ImageUpload}
                    src={fileUploadIcon}
                    accept="image/*"
                />
                <FileButton
                    content={"Upload Video"}
                    onClick={videoUpload}
                    src={fileUploadIcon}
                    accept="video/*"
                />
                <label
                    onClick={startWebcam}
                    className="flex items-center cursor-pointer gap-[5px] p-3 hover:border-b-2 transition ease-in duration-200"
                >
                    <img src={camera} alt="action_button" width={20} height={20} />
                    Camera
                </label>
            </div>
            {isCapturing && (
                <div className="fixed inset-0 flex items-center justify-center z-100">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={stopWebcam}></div>
                    <div className="bg-white rounded-lg shadow-lg z-100 w-[500px] h-[500px]">
                        <video ref={videoRef} className="w-full h-full"></video>
                        <button onClick={captureFromWebcam}>Capture</button>
                        <button onClick={stopWebcam}>Stop</button>
                        <canvas ref={canvasRef} style={{ display: "none" }} />
                    </div>
                </div>
            )}
            {files.length > 0 ? (
                <p className="text-black font-semibold mb-4 text-sm">
                    Preview <br />
                    <span className="text-light-gray text-xs">(Select upto 5 photos)</span>
                </p>
            ) : (
                <></>
            )}
            <div className="flex flex-row gap-[5px]">
                {files.length > 0 ? (
                    files.map((file, index) => {
                        return (
                            <div className="w-[100px] h-[100px]" key={index}>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        );
                    })
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default FileInput;
