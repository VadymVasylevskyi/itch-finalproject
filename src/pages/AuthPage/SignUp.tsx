import { Flex, Container, Box, Image, VStack, Input, Button, Text, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { validation } from '../../utils/Validation.tsx';
import BASE_URL from '../../utils/utils';

interface SignUpInputs {
  email: string;
  fullname: string;
  username: string;
  password: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<SignUpInputs>({
    email: '',
    fullname: '',
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key in keyof SignUpInputs]?: string }>({});

  const handleChange = (field: keyof SignUpInputs, value: string) => {
    setInputs((prevInputs) => ({ ...prevInputs, [field]: value }));
  };

  const handleAuth = async () => {
    const [isValid, validationErrors] = validation({
      email: inputs.email,
      full_name: inputs.fullname,
      username: inputs.username,
      password: inputs.password,
    });

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        email: inputs.email,
        full_name: inputs.fullname,
        username: inputs.username,
        password: inputs.password,
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/login');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert('An error occurred. Please try again.');
    }
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
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                {errors.email && <Text color="red.500" fontSize={12}>{errors.email}</Text>}
                
                <Input
                  placeholder='Full Name'
                  fontSize={14}
                  value={inputs.fullname}
                  onChange={(e) => handleChange('fullname', e.target.value)}
                />
                {errors.fullname && <Text color="red.500" fontSize={12}>{errors.fullname}</Text>}
                
                <Input
                  placeholder='Username'
                  fontSize={14}
                  value={inputs.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                />
                {errors.username && <Text color="red.500" fontSize={12}>{errors.username}</Text>}
                <InputGroup>
                  <Input
                    placeholder='Password'
                    fontSize={14}
                    type={showPassword ? "text" : "password"}
                    value={inputs.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                  />
                  <InputRightElement h='full'>
					          <Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
						        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
					          </Button>
				          </InputRightElement>  
                </InputGroup>
                {errors.password && <Text color="red.500" fontSize={12}>{errors.password}</Text>}

                <Text fontSize={12} color={'#737373'} textAlign={"center"}>
                  People who use our service may have uploaded your contact information to Instagram. Learn More
                </Text>
                <Text fontSize={12} color={'#737373'} textAlign={"center"}>
                  By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
                </Text>
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
  );
}
