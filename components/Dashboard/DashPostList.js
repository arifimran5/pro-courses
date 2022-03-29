import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import DashPost from './DashPost';

const DashPostList = ({ posts }) => {
  const postsByDate = posts.sort(
    (a, b) => Number(new Date(b.created_at)) - Number(new Date(a.created_at))
  );
  const [postsState, setPostsState] = useState(postsByDate);
  const deletePost = (id) => {
    setPostsState(postsState.filter((post) => post.id !== id));
  };
  return (
    <Flex alignItems='center' flexDirection='column' gap='5' mt='12' mb='5'>
      {postsState.map((post) => (
        <DashPost key={post.id} post={post} onDelete={deletePost} />
      ))}
    </Flex>
  );
};

export default DashPostList;
