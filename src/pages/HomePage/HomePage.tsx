import { Flex, Box, Container } from "@chakra-ui/react"
import FeedPosts from "../../components/Sidebar/Posts/FeedPosts"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchUserProfile } from "../../../store/slices/userProfileSlice"

export const HomePage = () => {
 const dispatch = useDispatch()

 useEffect(() => {
    dispatch(fetchUserProfile())
    , [dispatch] } )
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        
          <FeedPosts />
        
      
      </Flex>
    </Container>
  )
}
