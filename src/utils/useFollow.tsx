// useFollow.tsx
import { useState, useCallback } from 'react';
import api from '../../api/axiosConfig';

const useFollow = () => {
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState<any[]>([]);

  const fetchFollowing = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/follow/${userId}/following`);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error('Error fetching following:', error);
      setLoading(false);
      return [];
    }
  }, []);

  const followUser = useCallback(async (currentUserId: string, postUserId: string) => {
    try {
      setLoading(true);
      const response = await api.post(`/follow/${currentUserId}/follow/${postUserId}`);
      setFollowing((prevFollowing) => [...prevFollowing, response.data]);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error('Error following user:', error);
      setLoading(false);
    }
  }, []);

  const unfollowUser = useCallback(async (currentUserId: string, postUserId: string) => {
    try {
      setLoading(true);
      await api.delete(`/follow/${currentUserId}/unfollow/${postUserId}`);
      setFollowing((prevFollowing) =>
        prevFollowing.filter((follow) => follow.followed_user_id !== postUserId)
      );
      setLoading(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
      setLoading(false);
    }
  }, []);

  return { following, fetchFollowing, followUser, unfollowUser, loading };
};

export default useFollow;
