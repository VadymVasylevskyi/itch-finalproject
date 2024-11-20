import { Container } from '@chakra-ui/react'
import Post from './Post'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts } from "../../../../store/slices/postSlice"; // ваш слайс
import { RootState } from "../../../../store";

export default function FeedPosts(userId: string) {
  const dispatch = useDispatch();
  const currentUserId = userId;
  const { userPosts, loading, error } = useSelector((state: RootState) => state.posts);
  
  useEffect(() => {
      
      dispatch(fetchUserPosts());
      
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;
  console.log(userPosts)
  return (
    <Container maxW={"45%"} py={10} px={2}>
      {userPosts.map((post) => (
        <Post key={post._id} username={post.user_name} img={post.image_url} avatar={post.profile_image} caption={post.caption} likes_count={post.likes_count} postId={post._id} userId={post.user_id} currentUser={currentUserId}/>
      ))}
    </Container>
  )
}
