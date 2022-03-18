import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import Auth from '../components/Auth';
import { useUser } from '../components/context/auth.context';

const Login = () => {
  const { session } = useUser();
  const router = useRouter();

  if (session) {
    router.push('/home');
  }
  return (
    <Box>
      <Auth />
    </Box>
  );
};

export default Login;
