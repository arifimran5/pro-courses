import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DashPost from './DashPost';

const DashPostList = ({ posts }) => {
  // const [postsState, setPostsState] = useState(posts);

  return (
    <Flex alignItems='center' flexDirection='column' gap='5' mt='12' mb='5'>
      {posts.map((post) => (
        <DashPost key={post.id} post={post} />
      ))}
    </Flex>
  );
};

export default DashPostList;
