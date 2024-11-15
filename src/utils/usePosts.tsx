import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/index";
import { fetchUserPosts } from "../../store/slices/postSlice";

export const useUserPosts = () => {
    const dispatch: AppDispatch = useDispatch();
    
    
  const { userPosts, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
      
      dispatch(fetchUserPosts());
      
  }, [dispatch]);

    return { userPosts, loading, error };
};
