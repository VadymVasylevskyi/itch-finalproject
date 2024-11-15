import {
  Avatar,
  Button,
  Box,
  Divider,
  Flex,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useUserProfile } from "../../utils/useUsers";
import { timeAgo } from "../../utils/timeAgo";
import { useGetComments } from "../../utils/useGetComments";
import Comment from "../Comment/Comment";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../utils/utils";
import { useState, useEffect } from "react";
import useLikes from "../../utils/useLikePost";

export default function ProfilePost(post) {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const { userProfile } = useUserProfile(userId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    _id,
    user_id,
    user_name,
    profile_image,
    likes_count,
    comments_count,
    image_url,
    caption,
    created_at,
  } = post.post || {};
  const { comments, loading, setPostId } = useGetComments();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes_count || 0);
  const { likes, error, fetchLikes, addLike, removeLike } = useLikes();

  // Загружаем лайки при монтировании
  useEffect(() => {
    if (_id) {
      fetchLikes(_id);
    }
  }, [_id]);

  // Определяем, лайкнул ли текущий пользователь
  useEffect(() => {
    if (likes.length > 0 && userId) {
      const liked = likes.some((like) => like.user_id === userId);
      setIsLiked(liked);
    }
  }, [likes, userId]);

  const handleLike = async () => {
    if (!_id || !userId) return;

    if (isLiked) {
      // Удаление лайка
      await removeLike(_id, userId);
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      // Добавление лайка
      await addLike(_id, userId);
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  const handleOpen = () => {
    onOpen();
    if (_id) setPostId(_id);
  };

  if (!_id) return <Spinner />;
  if (loading) return <Spinner />;
  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={handleOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.500"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {likes_count}
              </Text>
            </Flex>

            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {comments_count}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Image
          src={image_url}
          alt="profile post"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
      </GridItem>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"white"} pb={5}>
            <Flex
              gap="4"
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"gray.300"}
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  src={image_url}
                  alt="profile post"
                  w="full"
                  h="full"
                  objectFit={"cover"}
                />
              </Flex>
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar
                      src={userProfile?.profile_image}
                      size={"sm"}
                      name="As a Programmer"
                    />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile?.username}
                    </Text>
                  </Flex>

                  
										<Button
											size={"sm"}
											bg={"transparent"}
											_hover={{ bg: "whiteAlpha.300", color: "red.600" }}
											borderRadius={4}
											p={1}
											// onClick={handleDeletePost}
											// isLoading={isDeleting}
										>
											<MdDelete size={20} cursor='pointer' />
										</Button>
									
                </Flex>

                <VStack
                  w="full"
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                  mt={4}
                >
                  <Flex direction={"column"}>
                    <Flex gap={2} alignItems={"start"}>
                      <Avatar
                        src={profile_image}
                        size={"sm"}
                        name="As a Programmer"
                      />

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
                  {/* COMMENTS */}
                  {comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                  ))}
                </VStack>
                <Flex alignItems="center" gap={4} w="full" pt={0} mb={2} mt={4}>
                  {/* Лайк */}
                  <Box onClick={handleLike} cursor="pointer" fontSize={18}>
                    {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
                  </Box>
                  {/* Комментарии */}
                  <Box cursor="pointer" fontSize={18} onClick={handleOpen}>
                    <CommentLogo />
                  </Box>
                </Flex>
                {/* Количество лайков */}
                <Text fontWeight={600} fontSize="sm">
                  {likesCount} likes
                </Text>
                <Flex
                  alignItems="center"
                  gap={2}
                  justifyContent="space-between"
                  w="full"
                >
                  <InputGroup>
                    <Input
                      variant="flushed"
                      placeholder="Add a comment..."
                      fontSize={14}
                    />
                    <InputRightElement>
                      <Button
                        fontSize={14}
                        color="blue.500"
                        fontWeight={600}
                        cursor="pointer"
                        _hover={{ color: "white" }}
                        bg="transparent"
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
    </>
  );
}
