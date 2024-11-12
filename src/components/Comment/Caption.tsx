import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import { useSelector } from "react-redux";

interface Post {
    caption: string;
    createdAt: string;
}

const Caption = ({ post }: { post: Post }) => {
    // Получение userProfile из Redux store
    const userProfile = useSelector((state: { userProfile: { username: string; profile_image: string } }) => state.userProfile); 

    return (
        <Flex gap={4}>
            <Link to={`/${userProfile.username}`}>
                <Avatar src={userProfile.profile_image} size={"sm"} /> {/* Маппинг на profile_image */}
            </Link>
            <Flex direction={"column"}>
                <Flex gap={2} alignItems={"center"}>
                    <Link to={`/${userProfile.username}`}>
                        <Text fontWeight={"bold"} fontSize={12}>
                            {userProfile.username}
                        </Text>
                    </Link>
                    <Text fontSize={14}>{post.caption}</Text>
                </Flex>
                <Text fontSize={12} color={"gray"}>
                    {timeAgo(new Date(post.createdAt).getTime())}
                </Text>
            </Flex>
        </Flex>
    );
};

export default Caption;
