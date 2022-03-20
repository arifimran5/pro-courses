import { Box, Heading, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { getUserNameFromEmail } from '../../utils/getUserNameUtil';
import { supabase } from '../../utils/supabaseinit';

const Post = (post) => {
  const username = getUserNameFromEmail(post.user);

  return (
    <Box shadow='md' px='5' py='3' width={['95%', '80%']} maxW='40em'>
      <Heading fontSize='md'>{post.title}</Heading>
      <Text color='gray.400'>~ {post.course_creator}</Text>
      <Text>post by: @{username}</Text>
      <Text>{post.review}</Text>
      <Text>{post.isFree ? 'FREE ✅' : 'PAID 💰'}</Text>
      <Link color='blue.400' href={post.link}>
        Link
      </Link>
    </Box>
  );
};

export default Post;
