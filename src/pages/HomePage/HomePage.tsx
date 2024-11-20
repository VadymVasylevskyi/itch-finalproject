import { Flex, Container, Grid, GridItem } from "@chakra-ui/react"
import FeedPosts from "../../components/Sidebar/Posts/FeedPosts"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../../../store"
import { useEffect } from "react"
import { fetchUserProfile } from "../../../store/slices/userProfileSlice"

export const HomePage = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
 const dispatch: AppDispatch = useDispatch()

 useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, userId]);
  return (
    <Container maxW={"container.lg"}>
      <Grid templateColumns='repeat(2, 1fr)' gap={6}>
        <GridItem w='100%'>
          <FeedPosts />
        </GridItem>
        
          
        
      
      </Grid>
    </Container>
  )
}
