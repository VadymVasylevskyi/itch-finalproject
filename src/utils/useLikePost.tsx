import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost, fetchPostLikes } from '../../store/slices/postSlice';
import { RootState } from '../../store/index';
import { useToast } from '@chakra-ui/react';

const useLikePost = (postId: string) => {
    const dispatch = useDispatch();
    const toast = useToast();

    // Данные о пользователе и лайках
    const authUser = useSelector((state: RootState) => state.auth.user);
    const likedBy = useSelector((state: RootState) => state.posts.likesByPost?.[postId] || []);
    const isPostLiked = likedBy.includes(authUser?.id || '');

    // Локальные состояния для лайков и статуса обновления
    const [likesCount, setLikesCount] = useState(0);
    const [isLiked, setIsLiked] = useState(isPostLiked);
    const [isUpdating, setIsUpdating] = useState(false);
    // Используем селектор для извлечения поста из состояния
const post = useSelector((state: RootState) =>
    state.posts.userPosts.find((p) => p._id === postId) ||
    state.posts.publicPosts.find((p) => p._id === postId)
);

if (!post) {
    console.error(`Post with ID ${postId} not found`);
    return { isLiked: false, likes: 0, handleLikePost: () => {}, isUpdating: false };
}

    // Инициализация количества лайков при монтировании и отслеживание обновлений likedBy
    useEffect(() => {
        if (likedBy.length === 0) {
            dispatch(fetchPostLikes(postId)); // Получаем список лайков, если он еще не загружен
        }
        setLikesCount(likedBy.length);
        setIsLiked(isPostLiked);
    }, [dispatch, likedBy, isPostLiked, postId]);

    // Обработчик для лайка и анлайка
    const handleLikePost = async () => {
        if (isUpdating) return;
        if (!authUser) {
            return toast({
                title: 'Error',
                description: 'You must be logged in to like a post',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
        setIsUpdating(true);

        try {
            if (isLiked) {
                await dispatch(unlikePost({ postId, userId: authUser.id }));
                setLikesCount((prev) => prev - 1);
            } else {
                await dispatch(likePost({ postId, userId: authUser.id }));
                setLikesCount((prev) => prev + 1);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update like status',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsUpdating(false);
        }
    };

    return { isLiked, likesCount, handleLikePost, isUpdating };
};

export default useLikePost;
