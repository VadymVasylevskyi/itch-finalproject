import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {useUserProfile} from "../../utils/useUsers";
import { Box, Flex, Avatar, Text  } from "@chakra-ui/react";
import UserList from "./UserList";
import Chat from "./Chat";
export default function Messages(){
    
    const currentUserId = useSelector((state: RootState) => state.auth.user?.id);
    const { userProfile } = useUserProfile(currentUserId);
    
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const searchParams = useParams();
    const { userId } = useParams<{ userId: string }>();
    useEffect(() => {
      
      if (userId) {
        setSelectedUserId(userId);
      } else {
        const recentChats = JSON.parse(localStorage.getItem("recentChats") || "[]");
        if (recentChats.length > 0) {
          setSelectedUserId(recentChats[0]._id);
        }
      }
    }, [searchParams]);
    return (
        <Flex h={'100vh'}>
          <Box h={"100%"} maxW={"350px"} border={"1px solid #dbdbdb"}  w={"100%"}>
            <Box position={"sticky"} top={"0"}>
              <Flex alignItems={"center"} gap={4} p={4}>
                <Avatar size={"sm"} src={userProfile?.profile_image} />
                <Text>{userProfile?.username}</Text>
              </Flex>
              <UserList onSelectUser={setSelectedUserId} selectedUserId={selectedUserId} />
            </Box>
          </Box>
          <Box flex={"1"}>
            {selectedUserId ? (
              <Chat targetUserId={selectedUserId} />
            ) : ( <Text color={"gray.500"} textAlign={"center"} marginTop={"350px"}>Select a user to chat</Text>)}
          </Box>
        </Flex>
    );
}