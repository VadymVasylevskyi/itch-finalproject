import { Container, Grid, GridItem } from '@chakra-ui/react'
import Post from './Post'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts } from "../../../../store/slices/postSlice"; // ваш слайс
import { RootState } from "../../../../store";

export default function FeedPosts() {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);;
  const { userPosts, loading, error } = useSelector((state: RootState) => state.posts);
  
  useEffect(() => {
      
      dispatch(fetchUserPosts());
      
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;
  console.log(userPosts)
  return (
    <Container maxW={"100%"} py={10} px={2}>
      <Grid templateColumns='repeat(2, 1fr)' gap={6}>
      {userPosts.map((post) => (
        <GridItem w='full'>
          <Post key={post._id} username={post.user_name} img={post.image_url} avatar={post.profile_image} caption={post.caption} likes_count={post.likes_count} postId={post._id} userId={post.user_id} currentUserId={currentUserId}/>
        </GridItem>
      ))}
      </Grid>
    </Container>
  )
}
