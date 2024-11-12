import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Flex,
    Box,
    Button,
    Text,
    Image,
    VStack,
    Input,
    Textarea
    
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'

  export default function CreatePost() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={0}>
          <ModalHeader>
            <Flex justifyContent={"space-between"} borderBottom={"1px solid #737373"}>
                <Box>Create post</Box>
                <Text cursor={"pointer"} color={"blue.500"}>Share</Text>
            </Flex>
            
          </ModalHeader>
          
          <ModalBody display="flex">
           
            <Box
              flex="1"
            //   bg={isDragging ? "gray.100" : "gray.50"}
              rounded="lg"
              border="1px"
              borderColor="gray.200"
            //   onDragOver={handleDragOver}
            //   onDragLeave={handleDragLeave}
            //   onDrop={handleDrop}
              display="flex"
              alignItems="center"
              justifyContent="center"
              minH="500px"
              position="relative"
              overflow="hidden"
            >
                    <Image src='/upload.png' alt='upload' />
                    <Box textAlign="center">
                  <Image src="/icons/media.svg" alt="Media" boxSize="40" />
                  <Text mt={4} fontSize="lg">
                    Drag photos and videos here
                  </Text>
                  <Input
                    type="file"
                    accept="image/*"
                    display="none"
                    
                  />
                  <Button mt={4} >
                    Select from computer
                  </Button>
                </Box>
                </Box>
                <VStack spacing={4} mt={4}>
                    
                </VStack>
                <Textarea
                mt={3}
                placeholder="Write a caption..."
                // value={postText}
                // onChange={(e) => setPostText(e.target.value)}
                // maxLength={maxWords}
                resize="none"
                focusBorderColor="gray.200"
                h="150px"
              />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Post
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }