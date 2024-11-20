import { Container, Flex } from '@chakra-ui/react'
import UserProfileHeader from '../../components/UserProfile/userProfileHeader'
import UserProfilePosts from '../../components/UserProfile/userProfilePosts'

export default function UserProfilePage() {
  return (
    <Container maxW="container.lg" py={5}>
        <Flex py={10} px={4} pl={4} w={"full"} mx={"auto"} flexDirection={"column"}>
            <UserProfileHeader />
        </Flex>
        <Flex px={2} maxW={"full"} mx={"auto"} borderTop={"1px solid"} borderColor={"gray.300"} direction={"column"}>
            
            <UserProfilePosts />
        </Flex>
        
    </Container>
  )
}
