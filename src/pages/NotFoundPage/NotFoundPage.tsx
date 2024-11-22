import { Flex, Container, Box, Image, VStack, Text } from '@chakra-ui/react'

export default function NotFoundPage() {
  return (
    <Flex minH={'100vh'} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={5}>
          <Box display={{base:"none", md:"block"}}>
            <Image src="/auth.png" h='auto' alt='smartphone' />
          </Box>
          <VStack spacing={4} align={"stretch"}>
            <Text fontSize="2xl" fontWeight="bold">Oops, page not Found (404 Error)</Text>
            <Text fontSize="xl">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</Text>
          </VStack>
        </Flex>
        
        
      </Container>
    </Flex>
  )
}
