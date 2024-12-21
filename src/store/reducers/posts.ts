import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppPostsList } from "../../components/Homepage/Feeds";
import supabase from "../../utils/supabaseClient";
import { downloadImage } from "../../components/Homepage/Feeds";

import { RootState } from "..";

interface StatePostsData {
    postsList: AppPostsList[];
    isLoading?: boolean;
    isPostCreated?: boolean;
    loadMore: boolean;
    error?: unknown;
    page: number;
    onClose: boolean;
}

const initialState: StatePostsData = {
    postsList: [],
    isLoading: false,
    isPostCreated: false,
    loadMore: true,
    error: "",
    page: 0,
    onClose: false,
};

export const fetchPosts = createAsyncThunk(
    "feed/posts",
    async (page: number, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase
                .from("posts")
                .select(`id,created_at,post,created_by, uploads(id,post_id,url_path)`)
                .order("created_at", { ascending: false })
                .range(page * 20, (page + 1) * 20 - 1);

            if (error) {
                return rejectWithValue(error.message);
            } else {
                const postsWithUploads = await Promise.all(
                    data.map(async (post) => {
                        const { uploads } = post;
                        if (uploads.length > 0) {
                            // perform mapping for my uploads
                            const newUploads = await Promise.all(
                                uploads.map(async (pic) => {
                                    // check and validate url for video
                                    const isVideo = pic.url_path.match(/\.mp4|webm|ogg$/i);

                                    const image_url = await downloadImage(pic.url_path);
                                    return {
                                        ...pic,
                                        url_path: image_url?.publicUrl ?? "",
                                        type: isVideo ? "video" : "image",
                                    };
                                })
                            );
                            return { ...post, uploads: newUploads };
                        }
                        return { ...post };
                    })
                );
                return postsWithUploads;
            }
        } catch (err) {
            console.log(err);
            return rejectWithValue("Failed to fetch posts");
        }
    }
);

export const createPost = createAsyncThunk(
    "feed/create",
    async (
        { post, files }: { post: string; files: File[] | [] },
        { getState, rejectWithValue }
    ) => {
        try {
            const state = getState() as RootState;
            const postData = {
                post,
                created_by: state.users.displayName,
            };

            const { error, data } = await supabase.from("posts").insert(postData).select();

            if (error) return rejectWithValue(error.message);
            else {
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

                        if (error) {
                            throw uploadError;
                        } else {
                            await supabase.from("uploads").insert({
                                url_path: filePath,
                                post_id: id,
                            });
                        }
                    }
                }
            }
        } catch (err) {
            console.error("Error creating post:", err);
        }
    }
);

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        resetState() {
            return initialState;
        },
        setPage(state, action) {
            state.page = action.payload;
        },
        setClose(state) {
            state.onClose = !state.onClose;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
            state.isPostCreated = false;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            // Create a set of existing post IDs for quick lookup
            const existingPostIds = new Set(state.postsList.map((post) => post.id));
            // Filter out duplicates from the new posts
            const newPosts = action.payload.filter((post) => !existingPostIds.has(post.id));
            // Update the postsList with unique entries
            state.postsList = [...state.postsList, ...newPosts];
        });
        builder.addCase(createPost.pending, (state) => {
            state.error = null;
        });
        builder.addCase(createPost.rejected, (state, action) => {
            state.error = action.error;
        });
        builder.addCase(createPost.fulfilled, (state) => {
            state.error = null;
            state.isPostCreated = true;
        });
    },
});

export const { resetState, setPage, setClose } = postSlice.actions;

export default postSlice.reducer;
