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
import React from 'react';

const Auth = () => {
  return (
    <Flex justifyContent='center' alignItems='center' height='90vh'>
      <Box boxShadow='md' py='8' px='6' bg='gray.50' borderRadius='lg'>
        <Heading as='h2' size='lg' textAlign='center'>
          Sign in with Magic link
        </Heading>
        <Stack width={{ sm: 'md' }} mt='4'>
          <form>
            <FormControl>
              <Input id='email' type='email' placeholder='Enter your email' />
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
