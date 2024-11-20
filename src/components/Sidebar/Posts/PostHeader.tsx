import { useEffect, useState } from "react";
import { Avatar, Box, Flex, Link, Text } from "@chakra-ui/react";
import useFollow from "../../../utils/useFollow";

interface PostHeaderProps {
  username: string;
  avatar: string;
  postUserId: string;
  currentUserId: string;
}

export default function PostHeader({
  username,
  avatar,
  postUserId,
  currentUserId,
}: PostHeaderProps) {
  const { following, fetchFollowing, followUser, unfollowUser, loading } =
    useFollow();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  console.log(postUserId)
  // console.log(postUserId)
  // Проверяем, подписан ли текущий пользователь на автора поста
  useEffect(() => {
    if (!currentUserId || !postUserId) return;

    const checkFollowing = async () => {
      console.log("Fetching following for user:", currentUserId);
      try {
        const data = await fetchFollowing(currentUserId); // Получаем данные
        const isFollowed = data.some(
          (follow) => follow.followed_user_id === postUserId
        );
        setIsFollowing(isFollowed);
      } catch (error) {
        console.error("Error checking following status:", error);
      }
    };

    checkFollowing();
  }, [currentUserId, postUserId]);

  const handleFollowToggle = async () => {
    if (!currentUserId || !postUserId) return;

    try {
      setLoadingFollow(true); // Устанавливаем состояние загрузки
      if (isFollowing) {
        
        await unfollowUser(currentUserId, postUserId);
        setIsFollowing(false);
      } else {
        
        await followUser(currentUserId, postUserId);
        setIsFollowing(true);
      }
      setLoadingFollow(false);
    } catch (error) {
      console.error("Error toggling follow state:", error);
      setLoadingFollow(false);
    }
  };

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
      my={2}
    >
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={avatar} size={"sm"} />
        <Flex fontSize={12} fontWeight={"bold"} gap="2">
          <Link href={`/user/${postUserId}`}>{username}</Link>

          <Box color={"gray.500"}>&#183; 1w</Box>
        </Flex>
      </Flex>
      {currentUserId !== postUserId && (
        <Box cursor={"pointer"} onClick={handleFollowToggle}>
          <Text
            fontSize={12}
            color={isFollowing ? "red.500" : "blue.500"}
            fontWeight={"bold"}
            _hover={{ color: isFollowing ? "red.700" : "blue.700" }}
            transition={"0.2s ease-in-out"}
          >
            {loadingFollow ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
          </Text>
        </Box>
      )}
    </Flex>
  );
}
