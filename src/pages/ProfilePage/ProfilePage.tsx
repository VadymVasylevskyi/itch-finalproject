import { Container, Flex } from '@chakra-ui/react'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import ProfilePosts from '../../components/Profile/ProfilePosts'

export default function ProfilePage() {
  return (
    <Container maxW="container.lg" py={5}>
        <Flex py={10} px={4} pl={4} w={"full"} mx={"auto"} flexDirection={"column"}>
            <ProfileHeader />
        </Flex>
        <Flex px={2} maxW={"full"} mx={"auto"} borderTop={"1px solid"} borderColor={"gray.300"} direction={"column"}>
            
            <ProfilePosts />
        </Flex>
        
    </Container>
  )
}
