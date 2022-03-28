import { Box } from '@chakra-ui/react';
import Head from 'next/head';
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
      <Head>
        <title>Login | Pro-Courses</title>
        <meta name='description' content='Login page of pro-courses' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Auth />
    </Box>
  );
};

export default Login;
