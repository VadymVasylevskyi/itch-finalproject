import { Container } from '@chakra-ui/react'
import Post from './Post'

export default function FeedPosts() {
  return (
    <Container maxW={"45%"} py={10} px={2}>
      <Post img='/img2.png' username="John_Doe" avatar='/img2.png' />
      <Post img='/img2.png' username="John_Doe" avatar='/img2.png' />
      <Post img='/img2.png' username="John_Doe" avatar='/img2.png' />
      <Post img='/img2.png' username="John_Doe" avatar='/img2.png' />
    </Container>
  )
}
