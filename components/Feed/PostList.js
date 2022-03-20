import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Post from './Post';

const PostList = ({ posts }) => {
  return (
    <Flex justifyContent='center' mt='12'>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </Flex>
  );
};

export default PostList;
