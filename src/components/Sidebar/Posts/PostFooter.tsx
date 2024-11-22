import { useEffect, useState } from 'react';
import { Flex, Box, Text, InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react';
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../../utils/utils';
import { useSelector } from 'react-redux';
import useLikes from '../../../utils/useLikePost';
import { RootState } from '../../../../store/index';

interface PostFooterProps {
    postId: string;
    username: string;
    caption: string;
    initialLikesCount: number;
    postOwnerId: string;
}

export default function PostFooter({ postId, username, caption, initialLikesCount, postOwnerId }: PostFooterProps) {
    const currentUserId = useSelector((state: RootState) => state.auth.user?.id);

    const { likes, fetchLikes, addLike, removeLike } = useLikes();
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikesCount);

    // Загрузка лайков при монтировании компонента
    useEffect(() => {
        if (postId) {
            fetchLikes(postId);
        }
    }, [postId]);

    // Определяем, лайкнул ли текущий пользователь
    useEffect(() => {
        if (likes.length > 0 && currentUserId) {
            const liked = likes.some((like) => like.user_id === currentUserId);
            setIsLiked(liked);
        }
    }, [likes, currentUserId]);

    const handleLike = async () => {
        if (!currentUserId || !postId) return;

        if (isLiked) {
            await removeLike(postId, currentUserId); // Удаляем лайк через хук
            setIsLiked(false);
            setLikesCount((prevCount) => prevCount - 1);
        } else {
            await addLike(postId, currentUserId, postOwnerId); // Добавляем лайк через хук
            setIsLiked(true);
            setLikesCount((prevCount) => prevCount + 1);
        }
    };

    return (
        <Box my={10}>
            <Flex alignItems="center" gap={4} w="full" pt={0} mb={2} mt={4}>
                {/* Кнопка лайка */}
                <Box onClick={handleLike} cursor="pointer" fontSize={18}>
                    {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>
                {/* Иконка комментария */}
                <Box cursor="pointer" fontSize={18}>
                    <CommentLogo />
                </Box>
            </Flex>
            {/* Количество лайков */}
            <Text fontWeight={600} fontSize="sm">
                {likesCount} likes
            </Text>
            {/* Подпись */}
            <Text fontSize="sm" fontWeight={700}>
                {username}{' '}
                <Text as="span" fontWeight={400}>
                    {caption}
                </Text>
            </Text>
            {/* Комментарии */}
            <Text fontSize="sm" color="gray.500">
                View all comments 
            </Text>
            {/* <Flex alignItems="center" gap={2} justifyContent="space-between" w="full">
                <InputGroup>
                    <Input variant="flushed" placeholder="Add a comment..." fontSize={14} />
                    <InputRightElement>
                        <Button
                            fontSize={14}
                            color="blue.500"
                            fontWeight={600}
                            cursor="pointer"
                            _hover={{ color: 'white' }}
                            bg="transparent"
                        >
                            Post
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Flex> */}
        </Box>
    );
}
