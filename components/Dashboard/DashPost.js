import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  InfoIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

const DashPost = ({ post }) => {
  const [newPost, setNewPost] = useState(post);
  const onEdit = (data) => {
    setNewPost(data);
  };
  return (
    <Box
      boxShadow='1px 2px 10px #5B89FF21'
      px='5'
      py='3'
      borderRadius='xl'
      width={['95%', '80%']}
      maxW='40em'
    >
      <Menu>
        <MenuButton
          as={IconButton}
          border='none'
          aria-label='Options'
          icon={<ChevronDownIcon />}
          variant='outline'
        />
        <MenuList>
          <MenuItem _hover={{ bg: 'primary' }}>
            <EditModal post={post} onEdit={onEdit} />
          </MenuItem>
          <MenuItem _hover={{ bg: 'red.300' }}>
            <DeleteModal id={post.id} />
          </MenuItem>
        </MenuList>
      </Menu>

      <Heading fontSize='lg'>{newPost.title}</Heading>
      <Text>{newPost.review}</Text>
    </Box>
  );
};

export default DashPost;
