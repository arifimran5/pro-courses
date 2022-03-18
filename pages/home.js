import { Box, Button, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useUser } from '../components/context/auth.context';
import { supabase } from '../utils/supabaseinit';
const Home = () => {
  // const router = useRouter();
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

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } };
  }

  // If there is a user, return it.
  return { props: { user } };
}

export default Home;
