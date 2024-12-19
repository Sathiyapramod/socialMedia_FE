import React, { useEffect, useState } from "react";
import Heading from "../common/Heading";
import supabase from "../../utils/supabaseClient";
import PostData from "./PostData";
import { useAppDispatch, useTypedSelector } from "../../store";
import { fetchPosts } from "../../store/reducers/posts";
import PostLoader from "../Skeletons/PostLoader";

export interface AppUploads {
    id: string;
    post_id: string;
    url_path: string;
}

export interface AppPostsList {
    id: string;
    created_at: string;
    created_by: string;
    user_dp?: string;
    post: string;
    uploads: AppUploads[] | [];
}

export const downloadImage = async (filePath: string) => {
    const { data } = supabase.storage.from("uploads").getPublicUrl(filePath);
    if (!data) console.log("Error while fetching upload");
    return data;
};

function Feeds(): React.ReactNode {
    const dispatch = useAppDispatch();

    const [page, setPage] = useState<number>(0);

    const { postsList, isLoading, loadMore } = useTypedSelector((state) => state.posts);

    useEffect(() => {
        if (!isLoading) dispatch(fetchPosts(page));
    }, [dispatch, page]);

    const handleScroll = () => {
        if (
            document.documentElement.clientHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100 &&
            !isLoading &&
            loadMore
        )
            setPage((prev) => prev + 1);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading, loadMore]);

    return (
        <div className="bg-white p-6 rounded-[8px]">
            <Heading content="News Feed" classname="mb-[58px]" />

            <div>
                {postsList.length > 0 ? (
                    postsList.map((post: AppPostsList, index: number) => {
                        return <PostData post={post} key={index} />;
                    })
                ) : (
                    <PostLoader />
                )}
            </div>
        </div>
    );
}

export default Feeds;
