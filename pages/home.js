import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  IconButton,
  Flex,
  Text,
  Divider,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUser } from '../components/context/auth.context';
import AddPostModal from '../components/Feed/AddPostModal';
import PostList from '../components/Feed/PostList';
import { supabase } from '../utils/supabaseinit';
import Avatar from 'boring-avatars';
import Link from 'next/link';

const Home = ({ user, data, error }) => {
  const [postData, setPostData] = useState(data);
  const [isFireFox, setFireFox] = useState(null);
  const router = useRouter();
  const { logout, username } = useUser();

  useEffect(() => {
    let firefox =
      window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    setFireFox(firefox ?? true);
  }, []);

  const logoutHandler = () => {
    logout();
    router.push('/');
  };

  const postHandler = (data) => {
    setPostData([data, ...postData]);
  };

  return (
    <Box>
      <Head>
        <title>Home | Pro-Courses</title>
        <meta name='description' content='Home page of pro-courses' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box position='sticky' top='0' filter='auto' backdropFilter='blur(1px)'>
        <Flex
          justifyContent='space-between'
          alignItems='center'
          px={{ base: '4', sm: '14', md: '20', lg: '24' }}
          py='4'
          bg={isFireFox ? '#fafafa99' : '#fafafa50'}
        >
          <Link href='/home' passHref>
            <a>
              <Heading
                fontWeight='black'
                fontSize='1.5rem'
                color='primary_dark'
              >
                <span style={{ color: '#5B89FF' }}>PRO</span> COURSES
              </Heading>
            </a>
          </Link>
          <Box>
            <Menu>
              <MenuButton
                as={IconButton}
                border='none'
                aria-label='Options'
                icon={<Avatar size='42' name={username} variant='beam' />}
                variant='outline'
              />
              <MenuList>
                <MenuItem>
                  <Heading size='md'>Hi {username} 👋</Heading>
                </MenuItem>
                <MenuItem>
                  {' '}
                  <AddPostModal onPost={postHandler} />
                </MenuItem>
                <MenuItem>
                  {' '}
                  <Button as='a' width='100%' onClick={logoutHandler}>
                    Logout
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
        <Divider />
      </Box>
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
