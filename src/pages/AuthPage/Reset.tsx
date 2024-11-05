import { Flex, Container, VStack, Box, Button, Image, Input, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
export default function Reset() {
    const navigate = useNavigate()
    const handleSignUp = () => {
        navigate('/signup')
    }
    const handleLogIn = () => {
        navigate('/login');
    };
  return (
    <Flex minH={'100vh'} justifyContent={"center"} alignItems={"center"}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"}>
         <VStack align={"stretch"} spacing={0}>
           <Box border={"1px solid gray"} borderTopRadius={4} borderBottom={0} padding={5} paddingX={45} maxW={"350px"}>
                    <VStack spacing={4}>
                        <Image src='/icons/trouble.svg' h={24} cursor={"pointer"} alt='Ichgkam' />
                        <Text fontSize={16} color={'#000'} fontWeight={"bold"} textAlign={"center"}>Trouble logging In?</Text>
                        <Text fontSize={12} color={'#737373'} textAlign={"center"}>Enter your email, phone, or username and we'll send you a link to get back into your account.</Text>
                        <Input
                            placeholder='Email'
                            fontSize={14}
                            />
                        <Button w={"full"} colorScheme="blue" size={'sm'} fontSize={14}>Reset your password</Button>
                        <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={'full'}>
                        <Box flex={2} h={'1px'} bg={'gray'} />
                        <Text mx={1} color={'#737373'} fontSize={'13px'} fontWeight={'semibold'}>OR</Text>
                        <Box flex={2} h={'1px'} bg={'gray'} />
                    </Flex>
                    <Text
                        mx='2'
                        fontSize={"14px"}
                        color={'#000'}
                        cursor="pointer"
                        fontWeight={"bold"}
                        onClick={handleSignUp}
                        marginBottom={85}
                    >
                        Create new account
                    </Text>
                    
                    </VStack>
                </Box>
                <Box border={"1px solid gray"} justifyItems={"center"} padding={"13px"} margin={0}>
                        <Text onClick={handleLogIn} fontSize={14} color={"#000"} fontWeight={"bold"} cursor={"pointer"}>Back to login</Text>
                </Box>
            </VStack>
        </Flex>
        </Container>
    </Flex>
  )
}
