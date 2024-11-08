import { Flex, Box, Container } from "@chakra-ui/react"
import FeedPosts from "../../components/Sidebar/Posts/FeedPosts"

export const HomePage = () => {
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        
          <FeedPosts />
        
      
      </Flex>
    </Container>
  )
}
