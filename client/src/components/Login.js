import {
    Button,
    InputGroup,
    Checkbox,
    Flex,
    Text,
    FormControl,
    InputRightElement,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalWrapper';


export default function Login() {
    const { Login, errors } = useContext(GlobalContext);
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleLogin = async () => {
        try {
            await Login(formData);
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
        }
    };

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Sign in to your account</Heading>
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" value={formData.email} onChange={handleInputChange} />
                        {errors && errors.email && (
                            <Text color="red.500">{errors.email[0]}</Text>
                        )}
                    </FormControl>
                    <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} value={formData.password}
                                    onChange={handleInputChange} />

                                <InputRightElement h={'full'}>

                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {errors && errors.password && (
                                <Text color="red.500">{errors.password[0]}</Text>
                            )}
                        </FormControl>
                    <Stack spacing={6}>
                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}>
                            <Checkbox>Remember me</Checkbox>
                            <text color={'blue.500'}>New Account</text>
                        </Stack>
                        <Button colorScheme={'blue'} variant={'solid'} onClick={handleLogin}>
                            Sign in
                        </Button>
                    </Stack>
                </Stack>
            </Flex>

            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                    }
                />
            </Flex>
        </Stack>
    )
}