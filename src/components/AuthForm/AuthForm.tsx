import { Box, Button, Flex, Image, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const handleAuth = () => {
        if (!inputs.email || !inputs.password) {
            alert('Please fill all fields');
            return;
        }
        navigate('/');
    };

    const handleForgotPassword = () => {
        navigate('/reset');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <>
            <Box border={"1px solid gray"} borderRadius={4} padding={5}>
                <VStack spacing={4}>
                    <Image src='/logo-large.svg' h={24} cursor={"pointer"} alt='Ichgkam' />
                    <Input
                        placeholder='Email'
                        fontSize={14}
                        value={inputs.email}
                        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                    />
                    <Input
                        placeholder='Password'
                        fontSize={14}
                        type="password"
                        value={inputs.password}
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    />

                    <Button w={"full"} colorScheme="blue" size={'sm'} fontSize={14} onClick={handleAuth}>
                        Login
                    </Button>
                    <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={'full'}>
                        <Box flex={2} h={'1px'} bg={'gray'} />
                        <Text mx={1} color={'#737373'} fontSize={'13px'} fontWeight={'semibold'}>OR</Text>
                        <Box flex={2} h={'1px'} bg={'gray'} />
                    </Flex>
                    <Text
                        mx='2'
                        fontSize={"12px"}
                        color={'#00376B'}
                        cursor="pointer"
                        onClick={handleForgotPassword}
                    >
                        Forgot password?
                    </Text>
                </VStack>
            </Box>
            <Box border={'1px solid gray'} borderRadius={4} padding={5}>
                <Flex justifyContent={"center"} alignItems={"center"}>
                    <Box mx={2} fontSize={13}>
                        Don't have an account?
                    </Box>
                    <Box
                        cursor={"pointer"}
                        fontSize={'14px'}
                        color={'#0095f6'}
                        fontWeight={'semibold'}
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </Box>
                </Flex>
            </Box>
        </>
    );
}
