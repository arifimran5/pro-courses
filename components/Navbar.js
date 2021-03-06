import React from 'react';
import Link from 'next/link';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  Flex,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useUser } from './context/auth.context';

const Navbar = () => {
  const { session } = useUser();
  const NavbarButtonSize = useBreakpointValue({ base: 'sm', sm: 'md' });
  return (
    <>
      <Flex
        justifyContent='space-between'
        alignItems='center'
        px={{ base: '4', sm: '14', md: '20', lg: '24' }}
        py='5'
      >
        <Heading fontWeight='black' fontSize='1.5rem' color='primary_dark'>
          <span style={{ color: '#5B89FF' }}>PRO</span> COURSES
        </Heading>
        {!session && (
          <Link href='/login' passHref>
            <Button
              size={NavbarButtonSize}
              bg='primary'
              color='white'
              rightIcon={<ArrowForwardIcon />}
              _hover={{ bg: 'primary_dark' }}
            >
              Get Started
            </Button>
          </Link>
        )}
        {session && (
          <Link href='/home' passHref>
            <Button
              size={NavbarButtonSize}
              bg='primary'
              color='white'
              rightIcon={<ArrowForwardIcon />}
              _hover={{ bg: 'primary_dark' }}
            >
              Home Page
            </Button>
          </Link>
        )}
      </Flex>
      <Divider />
    </>
  );
};

export default Navbar;
