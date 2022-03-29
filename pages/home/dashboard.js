import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useUser } from '../../components/context/auth.context';
import { supabase } from '../../utils/supabaseinit';
import DashPostList from '../../components/Dashboard/DashPostList';
import { ArrowBackIcon } from '@chakra-ui/icons';

const Dashboard = ({ data }) => {
  const { username } = useUser();
  console.log(data);
  return (
    <div>
      {' '}
      <Head>
        <title>Dashboard | {username}</title>
        <meta name='description' content='Home page of pro-courses' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box
        ml={['5', '10']}
        mt='3'
        bg='primary'
        w='max-content'
        px='3'
        py='2'
        borderRadius='md'
        color='white'
        fontSize='sm'
        _hover={{
          color: 'gray.800',
          transform: 'translateX(-3px)',
          transition: 'all .2s ease-in-out',
        }}
      >
        <Link href='/home' passHref>
          <Text as='a'>
            <ArrowBackIcon boxSize='3' mb='1' mr='2' />
            Back to Home
          </Text>
        </Link>
      </Box>
      <Heading textAlign='center' mt='5'>
        Dashboard
      </Heading>
      <Text textAlign='center'>Your posts 📪</Text>
      <DashPostList posts={data} />
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const { data, error } = await supabase
    .from('post')
    .select('*')
    .eq('user', user.email);
  if (!user) {
    return {
      props: {},
      redirect: { destination: '/', permanent: false },
    };
  }
  return { props: { user, data, error } };
}

export default Dashboard;
