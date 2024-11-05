import { Flex, Container, Box, Image, VStack } from '@chakra-ui/react'
import AuthForm from '../../components/AuthForm/AuthForm'
export default function Login() {
  return (
    <Flex minH={'100vh'} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={5}>
          <Box display={{base:"none", md:"block"}}>
            <Image src="/auth.png" h={580} alt='smartphone' />
          </Box>
          <VStack spacing={4} align={"stretch"}>
            <AuthForm />
          </VStack>
        </Flex>
        
        
      </Container>
    </Flex>
  )
}
