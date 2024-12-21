import React, { useEffect, useRef } from "react";
import Heading from "../common/Heading";
import supabase from "../../utils/supabaseClient";
import PostData from "./PostData";
import { useAppDispatch, useTypedSelector } from "../../store";
import { fetchPosts } from "../../store/reducers/posts";
import PostLoader from "../Skeletons/PostLoader";
import { setPage, setClose } from "../../store/reducers/posts";
import CreatePosts from "./CreatePosts";

export interface AppUploads {
    id: string;
    post_id: string;
    url_path: string;
    type?: string;
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

    // Create a ref for the feeds component
    const feedsRef = useRef<HTMLDivElement | null>(null);

    const { postsList, page, onClose } = useTypedSelector((state) => state.posts);

    const getPosts = () => dispatch(fetchPosts(0));

    useEffect(() => {
        getPosts();
    }, [dispatch]);

    const handleScroll = () => {
        const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
        if (clientHeight + scrollTop <= scrollHeight) {
            // totalPostsCount should be the total number of posts in your DB
            dispatch(setPage(page + 1));
            dispatch(fetchPosts(page + 1));
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (feedsRef.current) {
            const scrollPosition = feedsRef.current.offsetTop - window.innerHeight / 2;

            feedsRef.current.scrollIntoView({ behavior: "smooth" });
            window.scrollTo({
                top: scrollPosition,
                behavior: "smooth",
            });
        }
    }, [onClose]);

    return (
        <div className="bg-white p-6 rounded-[8px]" ref={feedsRef}>
            {!onClose ? <Heading content="News Feed" classname="mb-[58px]" /> : <></>}
            <CreatePosts onClose={() => {}} />
            {postsList.length > 0 ? (
                postsList.map((post: AppPostsList, index: number) => {
                    return <PostData post={post} key={index} />;
                })
            ) : (
                <PostLoader />
            )}
        </div>
    );
}

export default Feeds;
