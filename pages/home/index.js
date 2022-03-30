import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Divider,
  MenuDivider,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUser } from '../../components/context/auth.context';
import AddPostModal from '../../components/Feed/AddPostModal';
import PostList from '../../components/Feed/PostList';
import { supabase } from '../../utils/supabaseinit';
import Avatar from 'boring-avatars';
import Link from 'next/link';

const Home = () => {
  const [isFireFox, setFireFox] = useState(null);
  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { logout, username } = useUser();

  useEffect(() => {
    let firefox =
      window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    const fetchData = async () => {
      const { data, error } = await supabase.from('post').select('*');
      setClientData(data);
    };
    fetchData();

    setLoading(false);
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
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <Box position='sticky' top='0' filter='auto' backdropFilter='blur(1px)'>
        <Flex
          justifyContent='space-between'
          alignItems='center'
          px={{ base: '4', sm: '14', md: '20', lg: '24' }}
          py='4'
          bg={isFireFox ? '#fafafa99' : '#fafafa50'}
        >
          <Link href='/' passHref>
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
          <Box zIndex='20'>
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
                  <Link href='/home/dashboard' passHref>
                    <Text
                      w='100%'
                      textAlign='center'
                      fontWeight='medium'
                      as='a'
                    >
                      Dashboard
                    </Text>
                  </Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                  {' '}
                  <AddPostModal onPost={postHandler} />
                </MenuItem>
                <MenuItem>
                  {' '}
                  <Button
                    color='black'
                    _hover={{ bg: 'primary_dark', color: 'white' }}
                    as='a'
                    width='100%'
                    onClick={logoutHandler}
                  >
                    Logout
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
        <Divider />
      </Box>
      {loading && (
        <Heading textAlign='center' mt='5'>
          Loading🥲
        </Heading>
      )}
      {!loading && <PostList posts={clientData} />}
    </Box>
  );
};

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return {
      props: {},
      redirect: { destination: '/', permanent: false },
    };
  }
  return { props: {} };
}

export default Home;
