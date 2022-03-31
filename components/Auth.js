import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { supabase } from '../utils/supabaseinit';
const Auth = () => {
  const [submitted, setSubmitted] = useState(false);
  const emailRef = useRef();
  const magicLinkSubmitHandelr = (e) => {
    e.preventDefault();
    signIn(emailRef.current.value);
  };

  const signIn = async (email) => {
    const { error } = await supabase.auth.signIn({ email });
    if (error) {
      if (error.status == 429) alert('Wait for 60s and try again');
      console.log(error);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        h='100vh'
        textAlign='center'
        px='5'
      >
        <Box px='10' py='5' bg='yellow.400' color='black' borderRadius='lg'>
          <Heading as='h1' size='lg'>
            check your email to sign in
          </Heading>
          <Text>
            Do check spam folder of your email. If this is the case. Try to
            login again after marking it not sus.
          </Text>
        </Box>
      </Flex>
    );
  }
  return (
    <Flex justifyContent='center' alignItems='center' height='90vh'>
      <Box boxShadow='md' py='8' px='8' bg='transparent' borderRadius='lg'>
        <Heading as='h2' size='lg'>
          Sign in with Magic link
        </Heading>
        <Stack width={{ sm: 'md' }} mt='4'>
          <form onSubmit={magicLinkSubmitHandelr}>
            <FormControl>
              <FormHelperText>
                we will send you an email with signIn Link
              </FormHelperText>
              <Input
                mt='2'
                ref={emailRef}
                id='email'
                type='email'
                placeholder='Enter your email'
              />
            </FormControl>
            <FormControl mt='3'>
              <Button
                size='md'
                bg='primary'
                color='white'
                _hover={{ bg: 'primary_dark' }}
                type='submit'
              >
                Send
              </Button>
            </FormControl>
          </form>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Auth;
