import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const Main = () => {
  return (
    <Box textAlign='center' px={{ base: '4', sm: '14', md: '20', lg: '24' }}>
      <Heading
        mt={['24', '28']}
        color='primary_dark'
        fontWeight='black'
        letterSpacing='tighter'
        lineHeight='none'
        fontSize={{ base: '5xl', sm: '6xl', md: '8xl' }}
      >
        Welcome to <br /> Pro-Courses
      </Heading>
      <Text mt='4' fontSize={['lg', '2xl']} color='#717171' fontWeight='medium'>
        Write a review about the courses you have taken
      </Text>
      <Link href='/login' passHref>
        <Button
          size='md'
          bg='primary'
          color='white'
          mt={['8', '16']}
          rightIcon={<ArrowForwardIcon />}
          _hover={{ bg: 'primary_dark' }}
        >
          Get Started
        </Button>
      </Link>
    </Box>
  );
};

export default Main;
