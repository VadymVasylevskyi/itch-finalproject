import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import userProfileReducer from './slices/userProfileSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
        userProfile: userProfileReducer,
    },
});

export default store;