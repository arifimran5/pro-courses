import React from 'react';
import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { getUserNameFromEmail } from '../../utils/getUserNameUtil';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { supabase } from '../../utils/supabaseinit';

const Post = (post) => {
  const username = getUserNameFromEmail(post.user);
  return (
    <Box
      boxShadow='1px 2px 10px #5B89FF21'
      px='5'
      py='3'
      width={['95%', '80%']}
      maxW='40em'
    >
      <Text
        fontWeight='medium'
        letterSpacing='wide'
        py='1'
        px='2'
        bg='primary'
        mb='2'
        w='max-content'
        fontSize='smaller'
        color='gray.50'
      >
        @{username}
      </Text>
      <a href={post.link} target='_blank' rel='noopener noreferrer'>
        <Heading fontSize='lg' _hover={{ color: 'gray.500' }}>
          {post.title} <ExternalLinkIcon ml='2' mb='1' boxSize='4' />
        </Heading>
      </a>
      <Text fontSize='sm' color='primary'>
        ~ by {post.course_creator}
      </Text>
      <Text>{post.review}</Text>
      <Flex alignItems='center' mt='2'>
        <Rating rating={post.rating} />
        <Text fontWeight='medium' fontSize='sm' ml='5'>
          {post.isFree ? 'Free ✅' : 'Paid 💰'}
        </Text>
      </Flex>
    </Box>
  );
};

const Rating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push('⭐');
  }

  return (
    <>
      {stars.map((star, index) => (
        <Text letterSpacing='tighter' display='inline' key={index}>
          {star}
        </Text>
      ))}
    </>
  );
};

export default Post;
