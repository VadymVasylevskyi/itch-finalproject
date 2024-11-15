import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/axiosConfig';

interface Post {
    _id: string;
    user_id: string;
    profile_image: string;
    image_url: string;
    user_name: string;
    caption: string;
    likes_count: number;
    comments_count: number;
    created_at: string;
    likedBy: string[];
}

interface PostState {
    userPosts: Post[];
    publicPosts: Post[];
    loading: boolean;
    error: string | null;
    likesByPost: { [postId: string]: string[] };  
}

const initialState: PostState = {
    userPosts: [],
    publicPosts: [],
    loading: false,
    error: null,
    likesByPost: {},
};

const fetchUserPosts = createAsyncThunk<Post[], void, { rejectValue: string }>(
    'posts/fetchUserPosts',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/post/all'); 
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.error || 'Failed to fetch user posts');
        }
    }
);

const fetchPublicPosts = createAsyncThunk<Post[], void, { rejectValue: string }>(
    'posts/fetchPublicPosts',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/post/all/public'); 
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.error || 'Failed to fetch public posts');
        }
    }
);


const fetchPostLikes = createAsyncThunk(
    'posts/fetchPostLikes',
    async (postId: string, thunkAPI) => {
        try {
            const response = await api.get(`/likes/${postId}/likes`);
            return { postId, likes: response.data };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.error || 'Failed to fetch post likes');
        }
    }
);


const likePost = createAsyncThunk(
    'posts/likePost',
    async ({ postId, userId }: { postId: string; userId: string }, thunkAPI) => {
        try {
            const response = await api.post(`/likes/${postId}/like/${userId}`);
            if (!response.ok) throw new Error('Post is already liked');
            return { postId, userId };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to like post';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

const unlikePost = createAsyncThunk(
    'posts/unlikePost',
    async ({ postId, userId }: { postId: string; userId: string }, thunkAPI) => {
        try {
            const response = await api.delete(`/likes/${postId}/unlike/${userId}`);
            if (!response.ok) throw new Error('Post is already unliked');
            return { postId, userId };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || 'Failed to unlike post');
        }
    }
);

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            
            .addCase(fetchUserPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.userPosts = action.payload;
            })
            .addCase(fetchUserPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error fetching user posts';
            })

            
            .addCase(fetchPublicPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPublicPosts.fulfilled, (state, action) => {
                // console.log('Public posts:', action.payload);
                state.loading = false;
                state.publicPosts = action.payload;
            })
            .addCase(fetchPublicPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error fetching public posts';
            })
            
            .addCase(fetchPostLikes.fulfilled, (state, action) => {
                const { postId, likes } = action.payload;
            
                state.likesByPost[postId] = likes;
            
                state.loading = false;
            })
            .addCase(fetchPostLikes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error fetching post likes';
            })

            
            .addCase(likePost.fulfilled, (state, action) => {
                const { postId, userId } = action.meta.arg;
                console.log(postId, userId);
                const updateLikes = (posts: Post[]) => posts.map((post) => {
                    if (post._id === postId) {
                        return {
                            ...post,
                            likes_count: post.likes_count + 1,
                            likedBy: [...post.likedBy, userId],
                        };
                    }
                    return post;
                });
                state.userPosts = updateLikes(state.userPosts);
                state.publicPosts = updateLikes(state.publicPosts);
                state.loading = false;
            })
            .addCase(likePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error liking post';
            })

            // Удаление лайка
            .addCase(unlikePost.fulfilled, (state, action) => {
                const { postId, userId } = action.meta.arg;
                const updateLikes = (posts: Post[]) => posts.map((post) => {
                    if (post._id === postId) {
                        return {
                            ...post,
                            likes_count: post.likes_count - 1,
                            likedBy: post.likedBy.filter((id) => id !== userId),
                        };
                    }
                    return post;
                });
                state.userPosts = updateLikes(state.userPosts);
                state.publicPosts = updateLikes(state.publicPosts);
                state.loading = false;
            })
            .addCase(unlikePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error unliking post';
            });
    }
});

export { fetchUserPosts, fetchPublicPosts, fetchPostLikes, likePost, unlikePost };
export default postSlice.reducer;
