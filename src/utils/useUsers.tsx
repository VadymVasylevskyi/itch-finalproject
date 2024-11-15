import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/index";
import { fetchUserProfile } from "../../store/slices/userProfileSlice";

export const useUserProfile = (userId: string) => {
    const dispatch: AppDispatch = useDispatch();
    
    const { userProfile, loading, error } = useSelector((state: RootState) => state.userProfile);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserProfile(userId));
        }
    }, [dispatch, userId]);

    return { userProfile, loading, error };
};
