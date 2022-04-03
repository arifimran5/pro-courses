import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useRef, useState } from 'react';
import { supabase } from '../utils/supabaseinit';
const Auth = () => {
  const [submitted, setSubmitted] = useState(false);

  const googleSignInHandler = async () => {
    const { error } = await supabase.auth.signIn({
      provider: 'google',
    });
    if (error) {
      if (error.status == 429) alert('Wait for 60s and try again');
      console.log(error);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <Flex justifyContent='center' alignItems='center' height='90vh'>
      <Box
        boxShadow='md'
        py='8'
        px='8'
        width='400px'
        textAlign='center'
        bg='transparent'
        borderRadius='lg'
      >
        <Heading as='h2' size='lg'>
          Sign In
        </Heading>
        <Button
          mt='5'
          w='full'
          leftIcon={<FcGoogle />}
          onClick={googleSignInHandler}
        >
          Google
        </Button>
      </Box>
    </Flex>
  );
};

export default Auth;
