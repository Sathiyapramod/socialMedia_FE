import React, { useState } from "react";
import FileInput from "../common/FileInput";
import Button from "../common/Button";
import supabase from "../../utils/supabaseClient";

interface CreatePostsApp {
    onClose: () => void;
}

function CreatePosts({ onClose }: CreatePostsApp) {
    const [files, setFiles] = useState<File[] | []>([]);
    const [newPost, setNewPost] = useState<string>("");

    const handlePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewPost(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const postData = {
                post: newPost,
                created_by: localStorage.getItem("displayName"),
            };

            const { error, data } = await supabase.from("posts").insert(postData).select();

            if (!error) {
                // proceed upload the images
                if (files.length > 0) {
                    for (const file of files) {
                        const fileExt = file.name.split(".").pop();
                        const fileName = `${Math.random()}.${fileExt}`;
                        const filePath = `${fileName}`;

                        const { id } = data[0];

                        const { error: uploadError } = await supabase.storage
                            .from("uploads")
                            .upload(filePath, file);
                        if (uploadError) {
                            throw uploadError;
                        } else {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const uploadStatus = await supabase.from("uploads").insert({
                                url_path: filePath,
                                post_id: id,
                            });
                        }
                    }
                }
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
        <div className="bg-white h-full relative z-10">
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
