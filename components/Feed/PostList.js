import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Post from './Post';

const PostList = ({ posts }) => {
  return (
    <Flex alignItems='center' flexDirection='column' gap='5' mt='12' mb='5'>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </Flex>
  );
};

export default PostList;
