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
import React from 'react';
import DeleteModal from './DeleteModal';

const DashPost = ({ post, onDelete }) => {
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
            <Text size='md'>
              Edit
              <EditIcon ml='2' mb='1' />
            </Text>
          </MenuItem>
          <MenuItem _hover={{ bg: 'red.300' }}>
            <DeleteModal id={post.id} onDelete={onDelete} />
          </MenuItem>
        </MenuList>
      </Menu>

      <Heading fontSize='lg'>{post.title}</Heading>
      <Text>{post.review}</Text>
    </Box>
  );
};

export default DashPost;
