import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosConfig';

// Получить все комментарии к посту
export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (postId: string, { rejectWithValue }) => {
      try {
        const response = await api.get(`/comment/${postId}`);
        return response.data; // Возвращаем массив комментариев
      } catch (error) {
        return rejectWithValue(error.response?.data);
      }
    }
  );
  
  // Добавить комментарий к посту
  export const addComment = createAsyncThunk(
    'comments/addComment',
    async ({ postId, commentText }: { postId: string; commentText: string }, { rejectWithValue }) => {
      try {
        const response = await api.post(`/comment/${postId}`, { comment_text: commentText });
        return response.data; // Возвращаем новый комментарий
      } catch (error) {
        return rejectWithValue(error.response?.data);
      }
    }
  );
  
  // Удалить комментарий
  export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async (commentId, { rejectWithValue }) => {
      try {
        await api.delete(`/comment/${commentId}`);
        return commentId; // Возвращаем ID удаленного комментария
      } catch (error) {
        return rejectWithValue(error.response?.data);
      }
    }
  );

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
      comments: [],       // Список комментариев
      loading: false,     // Статус загрузки
      error: null,        // Ошибки
    },
    reducers: {},
    extraReducers: (builder) => {
      // Обработка получения комментариев
      builder
        .addCase(fetchComments.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
          state.loading = false;
          state.comments = action.payload;
        })
        .addCase(fetchComments.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  
      // Обработка добавления комментария
      builder
        .addCase(addComment.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addComment.fulfilled, (state, action) => {
          state.loading = false;
          state.comments.push(action.payload); // Добавляем новый комментарий
        })
        .addCase(addComment.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  
      // Обработка удаления комментария
      builder
        .addCase(deleteComment.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteComment.fulfilled, (state, action) => {
          state.loading = false;
          state.comments = state.comments.filter(
            (comment) => comment._id !== action.payload // Удаляем комментарий из списка
          );
        })
        .addCase(deleteComment.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default commentsSlice.reducer;
