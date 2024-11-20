import { Box, Button, Flex, Image, Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/slices/authSlice";
import { RootState, AppDispatch } from "../../../store";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import useShowToast from "../../utils/useShowToast";

export default function AuthForm() {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.auth); 
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const showToast = useShowToast();

    const handleAuth = async () => {
        if (!inputs.email || !inputs.password) {
            showToast({
                title: 'Login failed',
                description: 'Please fill in all fields',
                status: 'error',
            });
            return;
        }
        
        const result = await dispatch(login({ email: inputs.email, password: inputs.password }));

        
        if (result.meta.requestStatus === 'fulfilled') {
            console.log("Login successful:", result.payload);
            navigate('/');
        } else {
            
            showToast({
                title: 'Login failed',
                description: 'Please check your credentials',
                status: 'error',
            });
        }
    };

    const handleForgotPassword = () => {
        navigate('/reset');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <>
            <Box border={"1px solid gray"} borderRadius={4} padding={5} minW={"300px"}>
                <VStack spacing={4}>
                    <Image src='/logo-large.svg' h={24} cursor={"pointer"} alt='Ichgkam' />
                    <Input
                        placeholder='Email'
                        fontSize={14}
                        value={inputs.email}
                        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                    />
                    <InputGroup>
                    <Input
                        placeholder='Password'
                        fontSize={14}
                        type={showPassword ? "text" : "password"}
                        value={inputs.password}
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    />
                    <InputRightElement h='full'>
					          <Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
						        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
					          </Button>
				          </InputRightElement>
                    </InputGroup>
                    <Button
                        w={"full"}
                        colorScheme="blue"
                        size={'sm'}
                        fontSize={14}
                        onClick={handleAuth}
                        isLoading={loading}  // показываем загрузку
                    >
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
