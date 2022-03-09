import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { useUser } from '../components/context/auth.context';
const Home = () => {
  const { user, session } = useUser();
  console.log({ user, session });
  return (
    <Box>
      {/* <Heading></Heading> */}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Box>
  );
};

export default Home;
