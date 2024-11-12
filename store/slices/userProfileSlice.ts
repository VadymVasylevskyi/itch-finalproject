// userProfileSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosConfig';

interface FetchUserProfileError {
  error: string;
}

interface UserProfile {
  username: string;
  email: string;
  full_name: string;
  bio: string;
  profile_image: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  created_at: Date;
}

export const fetchUserProfile = createAsyncThunk<UserProfile, string, { rejectValue: FetchUserProfileError }>(
  'userProfile/fetchUserProfile',
  async (userId, thunkAPI) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
      return thunkAPI.rejectWithValue({ error: 'Unknown error' });
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    userProfile: null as UserProfile | null,
    loading: false,
    error: null as FetchUserProfileError | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as FetchUserProfileError;
      });
  },
});

export default userProfileSlice.reducer;
