import React from "react";

function PostLoader() {
    return (
        <div>
            <div className="animate-pulse max-md:w-full max-lg:w-3/4 xl:w-full xl:h-full mx-auto border border-gray-300 mb-6 p-4 shadow-xl rounded-2xl bg-white">
                <div className="flex flex-row items-center gap-5 mb-4">
                    <div className="rounded-full w-[50px] h-[50px] bg-slate-200"></div>
                    <span className="h-6 w-1/2 bg-slate-200 rounded"></span>
                </div>
                <div className="rounded h-24 w-11/12 bg-slate-200"></div>
            </div>
            <div className="animate-pulse max-md:w-full max-lg:w-3/4 xl:w-full xl:h-[350px] mx-auto border border-gray-300 mb-6 p-4 shadow-xl rounded-2xl bg-white">
                <div className="flex flex-row items-center gap-5 mb-4">
                    <div className="rounded-full w-[50px] h-[50px] bg-slate-200"></div>
                    <span className="h-6 w-1/2 bg-slate-200 rounded"></span>
                </div>
                <div className="rounded h-48 w-11/12 bg-slate-200"></div>
            </div>
        </div>
    );
}

export default PostLoader;
