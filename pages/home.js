import { Box, Button, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import { useUser } from '../components/context/auth.context';
const Home = () => {
  const { user, logout, username } = useUser();
  return (
    <Box>
      <Head>
        <title>Home | Pro-Courses</title>
        <meta name='description' content='Home page of pro-courses' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Heading>Hello {username}</Heading>

      <Button onClick={() => logout()}>Logout</Button>
    </Box>
  );
};

export default Home;
