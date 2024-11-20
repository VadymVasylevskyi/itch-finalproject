import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import useGetUserById from "../../utils/useGetUserById";

interface CommentProps {
    comment: {
        _id: string;
        user_id: string;
        comment_text: string;
        created_at: string;
    };
}

const Comment = ({ comment }: CommentProps) => {
    const {user_id, comment_text, created_at} = comment;
    const {user, loading} = useGetUserById(user_id);
    console.log(comment)
    if (loading) return <CommentSkeleton />;

    return (
        <Flex gap={4}>
            {user && (
                <>
                    <Link to={`user/${user.user_id}`}>
                        <Avatar src={user.profile_image} size={"sm"} />
                    </Link>
                    <Flex direction={"column"}>
                        <Flex gap={2} alignItems={"center"}>
                            <Link to={`user/${user.user_id}`}>
                                <Text fontWeight={"bold"} fontSize={12}>
                                    {user.username}
                                </Text>
                            </Link>
                            <Text fontSize={14}>{comment_text}</Text>
                        </Flex>
                        <Text fontSize={12} color={"gray"}>
                            {timeAgo(created_at)}
                        </Text>
                    </Flex>
                </>
            )}
        </Flex>
    );
};

export default Comment;

const CommentSkeleton = () => {
    return (
        <Flex gap={4} w={"full"} alignItems={"center"}>
            <SkeletonCircle h={10} w="10" />
            <Flex gap={1} flexDir={"column"}>
                <Skeleton height={2} width={100} />
                <Skeleton height={2} width={50} />
            </Flex>
        </Flex>
    );
};
