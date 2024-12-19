import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppPostsList } from "../../components/Homepage/Feeds";
import supabase from "../../utils/supabaseClient";
import { downloadImage } from "../../components/Homepage/Feeds";

interface StatePostsData {
    postsList: AppPostsList[];
    isLoading?: boolean;
    loadMore: boolean;
    error?: unknown;
}

const initialState: StatePostsData = {
    postsList: [],
    isLoading: false,
    loadMore: true,
    error: "",
};

export const fetchPosts = createAsyncThunk("feed/posts", async (page: number) => {
    try {
        const { data, error } = await supabase
            .from("posts")
            .select(`id,created_at,post,created_by,uploads(id,post_id,url_path)`)
            .range(page * 20, (page + 1) * 20 - 1);
        if (error) {
            return;
        } else {
            const postsWithUploads = await Promise.all(
                data.map(async (post) => {
                    const { uploads } = post;
                    if (uploads.length > 0) {
                        // perform mapping for my uploads
                        const newUploads = await Promise.all(
                            uploads.map(async (pic) => {
                                const image_url = await downloadImage(pic.url_path);
                                return { ...pic, url_path: image_url?.publicUrl ?? "" };
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
    }
});

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        resetState() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.loadMore = action.payload ? action.payload.length > 0 : false;
            state.postsList = [...state.postsList, ...action.payload];
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const { resetState } = postSlice.actions;

export default postSlice.reducer;
