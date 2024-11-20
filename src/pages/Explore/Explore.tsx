import { Container, Grid, GridItem } from '@chakra-ui/react'
import Post from '../../components/Sidebar/Posts/Post'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicPosts } from "../../../store/slices/postSlice"; // ваш слайс
import { RootState } from "../../../store";

export default function FeedPosts() {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);
  const { publicPosts, loading, error } = useSelector((state: RootState) => state.posts);
  
  useEffect(() => {
      
      dispatch(fetchPublicPosts());
      
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;
  return (
    <Container maxW={"container.lg"} py={10} px={2}>
      <Grid templateColumns='repeat(2, 1fr)' gap={6}>
        
        {publicPosts.map((post) => (
          <GridItem w='100%'>
        <Post key={post._id} username={post.user_name} img={post.image_url} avatar={post.profile_image} caption={post.caption} likes_count={post.likes_count} postId={post._id} userId={post.user_id} currentUserId={currentUserId}/>
        </GridItem>
      ))}
        
      </Grid>
      
    </Container>
  )
}