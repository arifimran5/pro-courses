import React, { useEffect, useState } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUser } from '../components/context/auth.context';
import AddPostModal from '../components/Feed/AddPostModal';
import PostList from '../components/Feed/PostList';
import { supabase } from '../utils/supabaseinit';

const Home = ({ user, data, error }) => {
  const [postData, setPostData] = useState(data);
  const router = useRouter();
  const { logout, username } = useUser();

  const logoutHandler = () => {
    logout();
    router.push('/');
  };

  const postHandler = (data) => {
    setPostData([...postData, data]);
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
      <AddPostModal onPost={postHandler} />
      <PostList posts={postData} />
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
