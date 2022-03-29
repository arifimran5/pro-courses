import React, { useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
  Text,
} from '@chakra-ui/react';

import { supabase } from '../../utils/supabaseinit';
import { DeleteIcon } from '@chakra-ui/icons';

const DeleteModal = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialRef = useRef();

  const deleteHandler = async () => {
    const { error } = await supabase.from('post').delete().eq('id', id);
    if (error) {
      toast({
        title: 'Error deleting post',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      onClose();
      window.location.reload();
      toast({
        title: 'Post deleted',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <Text w='100%' onClick={onOpen}>
        Delete <DeleteIcon ml='2' mb='1' />
      </Text>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        motionPreset='slideInBottom'
        size='sm'
        isCentered
      >
        <ModalOverlay backdropFilter='blur(2px)' />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button variant='ghost' mr={3} color='black' onClick={onClose}>
              Cancel
            </Button>
            <Button variant='solid' colorScheme='red' onClick={deleteHandler}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
