import { Box, Image } from '@chakra-ui/react';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

interface PostProps {
    img: string;
    username: string;
    avatar: string;
    caption: string;
    likes_count: number;
    postId: string;
    
    }

export default function Post({ img, username, avatar, caption, likes_count, postId }: PostProps) {
  return (
    <>
    <PostHeader username={username} avatar={avatar}/>
    <Box my={4} borderRadius={4} overflow={"hidden"}>
        <Image src={img} />
    </Box>
    <PostFooter username={username} caption={caption} initialLikesCount={likes_count} postId={postId} />
    </>
  )
}
