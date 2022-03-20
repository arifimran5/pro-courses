import { Box, Button, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useUser } from '../components/context/auth.context';
import PostList from '../components/Feed/PostList';
import { supabase } from '../utils/supabaseinit';

const Home = ({ user, data, error }) => {
  const router = useRouter();
  const { logout, username } = useUser();

  const logoutHandler = () => {
    logout();
    router.push('/');
  };

  return (
    <Box>
      <Head>
        <title>Home | Pro-Courses</title>
        <meta name='description' content='Home page of pro-courses' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Heading>Hello {username}</Heading>

      <Button onClick={logoutHandler}>Logout</Button>
      <PostList posts={data} />
    </Box>
  );
};

export async function getServerSideProps({ req }) {
  const { data, error } = await supabase.from('post').select('*');
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      props: {},
      redirect: { destination: '/', permanent: false },
    };
  }
  return { props: { user, data, error } };
}

export default Home;
