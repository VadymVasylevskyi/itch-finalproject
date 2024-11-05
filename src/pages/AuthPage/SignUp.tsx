import { Flex, Container, Box, Image, VStack, Input, Button, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignUp() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        fullname: '',
        username: '',
        password: '',
    });

    const handleAuth = () => {
        if (!inputs.email || !inputs.password) {
            alert('Please fill all fields');
            return;
        }
        navigate('/login');
    };
    const handleLogIn = () => {
        navigate('/login');
    };
  return (
    <Flex minH={'100vh'} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"}>
         <VStack spacing={4} align={"stretch"}>
           <Box border={"1px solid gray"} borderRadius={4} padding={5} maxW={"350px"}>
                    <VStack spacing={4}>
                        <Image src='/logo-large.svg' h={24} cursor={"pointer"} alt='Ichgkam' />
                        <Input
                            placeholder='Email'
                            fontSize={14}
                            value={inputs.email}
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        />
                        <Input
                            placeholder='Full Name'
                            fontSize={14}
                            value={inputs.fullname}
                            onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
                        />
                        <Input
                            placeholder='Username'
                            fontSize={14}
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                        <Input
                            placeholder='Password'
                            fontSize={14}
                            type="password"
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                            />
                        <Text fontSize={12} color={'#737373'} textAlign={"center"}>People who use our service may have uploaded your contact information to Instagram. Learn More</Text>
                        <Text fontSize={12} color={'#737373'} textAlign={"center"}>By signing up, you agree to our Terms, Privacy Policy and Cokies Policy.</Text>
                        <Button w={"full"} colorScheme="blue" size={'sm'} fontSize={14} onClick={handleAuth}>
                            Sign up
                        </Button>
                        
                    </VStack>
                </Box>
                <Box border={'1px solid gray'} borderRadius={4} padding={5}>
                    <Flex justifyContent={"center"} alignItems={"center"}>
                        <Box mx={2} fontSize={13}>
                            Have an account?
                        </Box>
                        <Box
                            cursor={"pointer"}
                            fontSize={'14px'}
                            color={'#0095f6'}
                            fontWeight={'semibold'}
                            onClick={handleLogIn}
                        >
                            Log in
                        </Box>
                    </Flex>
                </Box>
            </VStack> 
        </Flex>
        
        
      </Container>
    </Flex>
  )
}
