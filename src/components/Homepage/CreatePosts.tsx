import React, { useState } from "react";
import FileInput from "../common/FileInput";
import Button from "../common/Button";
import { useAppDispatch } from "../../store";
import { createPost, fetchPosts } from "../../store/reducers/posts";
import { toast } from "sonner";

interface CreatePostsApp {
    onClose: () => void;
}

function CreatePosts({ onClose = () => {} }: CreatePostsApp) {
    const dispatch = useAppDispatch();
    const [files, setFiles] = useState<File[] | []>([]);
    const [newPost, setNewPost] = useState<string>("");

    const handlePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewPost(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            await dispatch(createPost({ post: newPost, files }));

            await dispatch(fetchPosts(0));

            onClose();
            setNewPost("");
            setFiles([]);
            toast.success("Great ! Your Post has been created !!! 😊");
        } catch (err) {
            console.error("Error uploading post:", err);
        }
    };

    return (
        <div className="bg-white h-full">
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
