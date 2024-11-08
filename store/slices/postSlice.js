import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosConfig';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, thunkAPI) => {
    try {
        const response = await api.get('/posts'); // Запрос к API для получения постов с комментариями
        return response.data.map(post => ({
            ...post,
            comments: post.comments || [], // Инициализируем пустым массивом, если комментарии отсутствуют
        }));
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        error: null,
    },
    reducers: {
        addComment: (state, action) => {
            const { postId, comment } = action.payload;
            const post = state.posts.find(post => post.id === postId);
            if (post) {
                post.comments.push(comment);
            }
        },
        deleteComment: (state, action) => {
            const { postId, commentId } = action.payload;
            const post = state.posts.find(post => post.id === postId);
            if (post) {
                post.comments = post.comments.filter(comment => comment.id !== commentId);
            }
        },
        editComment: (state, action) => {
            const { postId, commentId, text } = action.payload;
            const post = state.posts.find(post => post.id === postId);
            if (post) {
                const comment = post.comments.find(comment => comment.id === commentId);
                if (comment) {
                    comment.text = text;
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { addComment, deleteComment, editComment } = postSlice.actions;
export default postSlice.reducer;
