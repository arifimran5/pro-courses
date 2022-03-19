import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
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
      <Box textAlign='center'>
        <Heading as='h1' size='lg'>
          check your email to sign in
        </Heading>
      </Box>
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
              <Button size='md' colorScheme='green' type='submit'>
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
