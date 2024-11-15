import { useState, useEffect } from 'react';
import api from '../../api/axiosConfig'; 

interface UserProfile {
    id: string;
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

interface useGetUserByIdState {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
}

const useGetUserById = (userId: string): useGetUserByIdState => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                const response = await api.get<UserProfile>(`/user/${userId}`);
                setUser(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);

    return { user, loading, error };
};

export default useGetUserById;
