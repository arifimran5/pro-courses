import React, { useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from '@chakra-ui/react';
import { useUser } from '../context/auth.context';
import { supabase } from '../../utils/supabaseinit';
import { v4 as uuidv4 } from 'uuid';

const AddPostModal = ({ onPost }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [link, setLink] = useState('');
  const [review, setReview] = useState('');
  const [isFree, setIsFree] = useState('free');
  const [rating, setRating] = useState(1);
  const [postCreateError, setPostCreateError] = useState(false);
  const [formFocus, setFormFocus] = useState(false);
  const [formError, setFormError] = useState(false);
  const toast = useToast();

  const { user } = useUser();

  const initialRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      title == '' ||
      creator == '' ||
      link == '' ||
      review == '' ||
      !formFocus
    ) {
      setFormError(true);
      toast({
        title: 'Please fill out all details',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    } else {
      postHandler();
      setTitle('');
      setCreator('');
      setLink('');
      setReview('');
    }
  };

  const postHandler = async () => {
    const data = {
      title,
      course_creator: creator,
      link,
      review,
      isFree: isFree === 'free' ? true : false,
      rating: rating * 1,
      user: user.email,
    };
    onPost({ ...data, id: uuidv4(), created_at: new Date() });
    const { error } = await supabase.from('post').insert(data);
    if (error) {
      setPostCreateError(true);
      alert('Error creating post');
    } else {
      toast({
        title: 'Post created.',
        // description: 'Lesss go!!',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    }
  };
  return (
    <>
      <Button
        as='a'
        bg='primary'
        width='100%'
        color='white'
        _hover={{ bg: 'primary_dark' }}
        onClick={onOpen}
      >
        Add Review
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        motionPreset='slideInBottom'
        size='xl'
        isCentered
      >
        <ModalOverlay backdropFilter='blur(2px)' />
        <ModalContent>
          <ModalHeader>Add Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onFocus={() => setFormFocus(true)}>
              <Stack>
                <FormControl>
                  <FormLabel htmlFor='title'>Course Title</FormLabel>
                  <Input
                    id='title'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    ref={initialRef}
                    placeholder='Learn blockchain'
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='creator'>Creator</FormLabel>
                  <Input
                    id='creator'
                    onChange={(e) => setCreator(e.target.value)}
                    value={creator}
                    placeholder='John invisible'
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='link'>Link</FormLabel>
                  <Input
                    id='link'
                    onChange={(e) => setLink(e.target.value)}
                    value={link}
                    placeholder='https://xyz.com/learn-blockchain'
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='review'>Review</FormLabel>
                  <Textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    id='review'
                    placeholder='Tell us about the course'
                  />
                </FormControl>
                <Stack direction='row'>
                  <FormControl>
                    <FormLabel htmlFor='isfree'>Free or Paid</FormLabel>
                    <RadioGroup id='isfree' onChange={setIsFree} value={isFree}>
                      <Stack direction='column'>
                        <Radio value='free'>✅</Radio>
                        <Radio value='paid'>💰</Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor='rating'>Rating</FormLabel>
                    <NumberInput
                      onChange={setRating}
                      id='rating'
                      defaultValue={rating}
                      min={1}
                      max={5}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Stack>
              </Stack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='ghost' onClick={submitHandler}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPostModal;
