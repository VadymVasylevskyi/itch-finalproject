import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../store/slices/userProfileSlice";
import { RootState, AppDispatch } from "../../store"; // Добавим AppDispatch
import useShowToast from "../utils/useToast"; // Для использования тостов

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

interface UseGetUserProfileByIdReturn {
    isLoading: boolean;
    userProfile: UserProfile | null;
    error: string | null;
}

const useGetUserProfileById = (userId: string): UseGetUserProfileByIdReturn => {
    const dispatch = useDispatch<AppDispatch>(); // Типизируем dispatch
    const showToast = useShowToast();

    // Получаем данные из Redux
    const { userProfile, loading, error } = useSelector((state: RootState) => state.userProfile);

    // Запрос на получение профиля пользователя при изменении userId
    useEffect(() => {
        if (userId) {
            dispatch(fetchUserProfile(userId)); // Диспатчим экшен для получения данных пользователя
        }
    }, [dispatch, userId]);

    // Показываем ошибку, если она есть
    useEffect(() => {
        if (error) {
            showToast({
                title: "Error",
                description: error.error || "Failed to fetch user profile", // Преобразуем ошибку в строку
                status: "error",
            });
        }
    }, [error, showToast]);

    return { 
        isLoading: loading, 
        userProfile, 
        error: error?.error || null // Преобразуем ошибку в строку
    };
};

export default useGetUserProfileById;
