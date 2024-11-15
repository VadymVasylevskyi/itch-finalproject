import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.ts';
import postReducer from './slices/postSlice.ts';
import userProfileReducer from './slices/userProfileSlice';
import commentReducer from './slices/commentSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
        userProfile: userProfileReducer,
        comment: commentReducer,
    },
});

// Тип для всего состояния Redux
export type RootState = ReturnType<typeof store.getState>;
// Тип для dispatch, чтобы использовать его в хуках или компонентах
export type AppDispatch = typeof store.dispatch;

export default store;