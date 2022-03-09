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
    const { error, data } = await supabase.auth.signIn({ email });
    if (error) {
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
      <Box boxShadow='md' py='8' px='6' bg='gray.50' borderRadius='lg'>
        <Heading as='h2' size='lg' textAlign='center'>
          Sign in with Magic link
        </Heading>
        <Stack width={{ sm: 'md' }} mt='4'>
          <form onSubmit={magicLinkSubmitHandelr}>
            <FormControl>
              <Input
                ref={emailRef}
                id='email'
                type='email'
                placeholder='Enter your email'
              />
              <FormHelperText>
                we will send you an email with signIn Link
              </FormHelperText>
            </FormControl>
            <FormControl mt='3'>
              <Button size='sm' type='submit'>
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
