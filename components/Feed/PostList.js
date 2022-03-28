import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Flex } from '@chakra-ui/react';
const Post = dynamic(() => import('./Post'));

const PostList = ({ posts }) => {
  const postsByDate = posts.sort(
    (a, b) => Number(new Date(b.created_at)) - Number(new Date(a.created_at))
  );
  return (
    <Flex alignItems='center' flexDirection='column' gap='5' mt='12' mb='5'>
      {postsByDate.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </Flex>
  );
};

export default PostList;
