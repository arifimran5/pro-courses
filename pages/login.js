import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import Auth from '../components/Auth';
import { useUser } from '../components/context/auth.context';

const Login = () => {
  const { user } = useUser();
  const router = useRouter();

  if (user) {
    router.push('/home');
  }
  return (
    <Box>
      <Auth />
    </Box>
  );
};

export default Login;
