import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    Flex,
    Avatar,
    VStack,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Box,
    Image,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { MdDelete } from 'react-icons/md';
  import Comment from '../../Comment/Comment'; // Импорт компонента для комментариев
  import { NotificationsLogo, UnlikeLogo, CommentLogo } from '../../../utils/utils'; // Ваши иконки
  import { timeAgo } from '../../../utils/timeAgo'; // Ваша функция для отображения времени
  
  interface ProfilePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    image_url: string;
    comments: any[];
    likesCount: number;
    isLiked: boolean;
    handleLike: () => void;
    handleAddComment: (comment: string) => void;
    handleDeleteComment: (commentId: string) => void;
    caption: string;
    created_at: string;
    profile_image: string;
    user_name: string;
    userProfile: any; // Замените `any` на точный тип, если он известен
  }
  
  export default function ProfilePostModal({
    isOpen,
    onClose,
    image_url,
    comments,
    likesCount,
    isLiked,
    handleLike,
    handleAddComment,
    handleDeleteComment,
    caption,
    created_at,
    profile_image,
    user_name,
    userProfile,
  }: ProfilePostModalProps) {
    const [commentText, setCommentText] = useState("");
  
    const handleCommentSubmit = () => {
      if (commentText.trim()) {
        handleAddComment(commentText); // Убедитесь, что эта строка не вызывает ошибок
        setCommentText(""); // Очищаем поле после отправки
      }
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"white"} p={0} borderRadius={4}>
            <Flex
              gap="4"
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              {/* Изображение */}
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"gray.300"}
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={image_url} alt="profile post" w="full" h="full" objectFit={"cover"} />
              </Flex>
  
              {/* Правая сторона */}
              <Flex flex={1} flexDir={"column"} p={6} display={{ base: "none", md: "flex" }}>
                {/* Заголовок */}
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar src={profile_image} size={"sm"} name={user_name} />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {user_name}
                    </Text>
                  </Flex>
                </Flex>
  
                {/* Тело: описание и комментарии */}
                <VStack w="full" alignItems={"start"} maxH={"350px"} overflowY={"auto"} mt={4}>
                  <Flex direction={"column"}>
                    <Flex gap={2} alignItems={"start"}>
                      <Avatar src={profile_image} size={"sm"} name={user_name} />
                      <Text fontSize={14}>
                        <Text fontWeight={"bold"} fontSize={12}>
                          {user_name}
                        </Text>
                        {caption}
                      </Text>
                    </Flex>
                    <Text fontSize={12} color={"gray"}>
                      {timeAgo(created_at)}
                    </Text>
                  </Flex>
  
                  {/* Комментарии */}
                  {comments.map((comment) => (
                    <Flex
                      key={comment._id}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      w="full"
                      px={2}
                    >
                      <Flex gap={2} alignItems={"center"}>
                        <Avatar src={userProfile?.profile_image} size={"xs"} />
                        <Text fontSize={14}>
                          <Text fontWeight={"bold"} fontSize={12}>
                            {userProfile?.username}
                          </Text>
                          {comment.comment_text}
                        </Text>
                      </Flex>
                      <Button
                        size={"xs"}
                        bg={"transparent"}
                        _hover={{ bg: "red.100", color: "red.600" }}
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        <MdDelete size={16} />
                      </Button>
                    </Flex>
                  ))}
                </VStack>
  
                {/* Действия */}
                <Flex alignItems="center" gap={4} w="full" pt={0} mb={2} mt={4}>
                  <Box onClick={handleLike} cursor="pointer" fontSize={18}>
                    {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
                  </Box>
                  <Box cursor="pointer" fontSize={18}>
                    <CommentLogo />
                  </Box>
                </Flex>
                <Text fontWeight={600} fontSize="sm">
                  {likesCount} likes
                </Text>
  
                {/* Поле ввода комментариев */}
                <Flex alignItems="center" gap={2} justifyContent="space-between" w="full">
                  <InputGroup>
                    <Input
                      variant="flushed"
                      placeholder="Add a comment..."
                      fontSize={14}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleCommentSubmit();
                        }
                      }}
                    />
                    <InputRightElement>
                      <Button
                        fontSize={14}
                        color="blue.500"
                        fontWeight={600}
                        cursor="pointer"
                        _hover={{ color: "blue.700" }}
                        bg="transparent"
                        onClick={handleCommentSubmit}
                      >
                        Post
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  