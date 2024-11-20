import {Flex, GridItem, Image, Spinner, Text, useDisclosure,} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useUserProfile } from "../../utils/useUsers";
import { useGetComments } from "../../utils/useGetComments";
import { useState, useEffect } from "react";
import useLikes from "../../utils/useLikePost";
import ProfilePostModal from "../Sidebar/Posts/PostModal";
import api from "../../../api/axiosConfig";

export default function UserProfilePost(post) {
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

  const { comments, loading, setPostId, addComment, deleteComment, setComments } = useGetComments();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes_count || 0);
  const { likes, fetchLikes, addLike, removeLike } = useLikes();
  const postOwnerId = user_id;

  useEffect(() => {
    if (_id) {
      fetchLikes(_id);
    }
  }, [_id]);

  useEffect(() => {
    if (likes.length > 0 && userId) {
      const liked = likes.some((like) => like.user_id === userId);
      setIsLiked(liked);
    }
  }, [likes, userId]);

  const handleLike = async () => {
    if (!_id || !userId) return;

    if (isLiked) {
      await removeLike(_id, userId);
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      await addLike(_id, userId, postOwnerId);
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  const handleAddComment = async (comment: string) => {
    if (!_id || !userId) return;
  
    try {
      // Выполняем POST-запрос на сервер
      await api.post(`/comment/${_id}/${userId}`, { comment_text: comment });
      // После успешного добавления комментария обновляем список комментариев
      setComments((prev) => [...prev, { comment_text: comment, user_id: userId, user_name, _id: Date.now().toString() }]);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
    } catch (error) {
      console.error("Error deleting comment:", error);
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

      <ProfilePostModal
        isOpen={isOpen}
        onClose={onClose}
        image_url={image_url}
        comments={comments}
        likesCount={likesCount}
        isLiked={isLiked}
        handleLike={handleLike}
        handleAddComment={handleAddComment}
        handleDeleteComment={handleDeleteComment}
        caption={caption}
        created_at={created_at}
        profile_image={profile_image}
        user_name={user_name}
        userProfile={userProfile}
      />
    </>
  );
}
