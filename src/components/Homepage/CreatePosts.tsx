import React, { useState } from "react";
import FileInput from "../common/FileInput";
import Button from "../common/Button";
import supabase from "../../utils/supabaseClient";

interface CreatePostsApp {
    onClose: () => void;
}

function CreatePosts({ onClose }: CreatePostsApp) {
    console.log({ onClose });
    const [files, setFiles] = useState<File[] | []>([]);
    const [newPost, setNewPost] = useState<string>("");

    const handlePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewPost(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const postData = {
                post: newPost,
            };

            const { error } = await supabase
                .from("posts") // Replace with your table name
                .insert(postData);
            if (!error) {
                onClose();
                setNewPost("");
                setFiles([]);

                // todo : toaster placement
            }
        } catch (err) {
            console.error("Error uploading post:", err);
        }
    };

    return (
        <div className="bg-white h-full relative">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="m-2 w-full rounded-lg border-base-gray text-medium border p-4 min-h-[256px] max-h-[256px] bg-slate-200 placeholder:text-medium placeholder:font-thin focus:border-base-gray focus:outline-none"
                    placeholder="What’s on your mind?"
                    value={newPost}
                    onChange={handlePost}
                />
                <FileInput files={files} setFiles={setFiles} />
                <div className="flex flex-row-reverse">
                    <Button theme="dark" content="Create" classname="" />
                </div>
            </form>
        </div>
    );
}

export default CreatePosts;
