import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Box, Text, InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react';
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../../utils/utils';
import { likePost, unlikePost, fetchPostLikes } from '../../../../store/slices/postSlice';
import { RootState } from '../../../../store/index';

interface PostFooterProps {
    postId: string;
    username: string;
    caption: string;
    initialLikesCount: number;
}

export default function PostFooter({ postId, username, caption, initialLikesCount }: PostFooterProps) {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state: RootState) => state.auth.user?.id);

        const post = useSelector((state: RootState) =>
        state.posts.userPosts.find((p) => p._id === postId) ||
        state.posts.publicPosts.find((p) => p._id === postId)
    );

    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post?.likes_count || initialLikesCount);

    const likedBy = post?.likedBy || []; 

    useEffect(() => {
        if (post) {
            dispatch(fetchPostLikes(postId)); 
        }
    }, [dispatch, postId]);
    
    useEffect(() => {
        if (currentUserId) {
            setIsLiked(likedBy.includes(currentUserId)); 
        }
    }, [currentUserId, likedBy]);
    
    const handleLike = () => {
        if (!currentUserId) return;
    
        if (isLiked) {
            dispatch(unlikePost({ postId, userId: currentUserId }));
            setIsLiked(false);
            setLikesCount((prevCount) => prevCount - 1);
        } else {
            dispatch(likePost({ postId, userId: currentUserId }));
            setIsLiked(true);
            setLikesCount((prevCount) => prevCount + 1);
        }
    };

    return (
        <Box my={10}>
            <Flex alignItems="center" gap={4} w="full" pt={0} mb={2} mt={4}>
                <Box onClick={handleLike} cursor="pointer" fontSize={18}>
                    {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>
                <Box cursor="pointer" fontSize={18}>
                    <CommentLogo />
                </Box>
            </Flex>
            <Text fontWeight={600} fontSize="sm">
                {likesCount} likes
            </Text>
            <Text fontSize="sm" fontWeight={700}>
                {username}{' '}
                <Text as="span" fontWeight={400}>
                    {caption}
                </Text>
            </Text>
            <Text fontSize="sm" color="gray.500">
                View all comments
            </Text>
            <Flex alignItems="center" gap={2} justifyContent="space-between" w="full">
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
            </Flex>
        </Box>
    );
}
