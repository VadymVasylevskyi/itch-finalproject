import React, { useEffect, useState } from "react";
import { Box, Flex, Input, Button, Text, Avatar, Divider } from "@chakra-ui/react";
import { io, Socket } from "socket.io-client";
import useGetUserById from "../../utils/useGetUserById"; // Импорт вашего хука
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface ChatProps {
  targetUserId: string;
}

interface Message {
  _id: string;
  sender_id: string;
  receiver_id: string;
  message_text: string;
  created_at: string;
}

const Chat: React.FC<ChatProps> = ({ targetUserId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  // Получение данных пользователя для отправителя и получателя
  const { userProfile: targetUserProfile } = useGetUserById(targetUserId);
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);
  const { userProfile: currentUserProfile } = useGetUserById(currentUserId) // Замените на актуальный ID текущего пользователя

  useEffect(() => {
    const newSocket = io("http://localhost:5005", {
      auth: { token: localStorage.getItem("token") },
    });

    newSocket.on("loadMessages", (loadedMessages: Message[]) => {
      setMessages(loadedMessages);
    });

    newSocket.on("receiveMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && targetUserId) {
      socket.emit("joinRoom", { targetUserId });
    }
  }, [socket, targetUserId]);

  const handleSendMessage = () => {
    if (socket && newMessage.trim()) {
      socket.emit("sendMessage", {
        targetUserId,
        messageText: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <Box h="100%" display="flex" flexDirection="column">
        <Flex p={4} alignItems={"center"}>
            <Avatar size="md" src={targetUserProfile?.profile_image} />
            <Text ml={3} fontWeight={'bold'}>{targetUserProfile?.username}</Text>
            
        </Flex>
        <Divider  mt={6} />
      <Box flex="1" overflowY="auto" p={4}>
        {messages.map((msg) => (
          <Flex
            key={msg._id}
            justify={msg.sender_id === targetUserId ? "flex-start" : "flex-end"}
            mb={2}
            align="center"
          >
            {/* Иконка отправителя */}
            {msg.sender_id === targetUserId && targetUserProfile && (
              <Avatar
                name={targetUserProfile.username}
                src={targetUserProfile.profile_image}
                size="sm"
                mr={2}
              />
            )}

            {/* Иконка текущего пользователя, если это его сообщение */}
            {msg.sender_id !== targetUserId && currentUserProfile && (
              <Avatar
                name={currentUserProfile.username}
                src={currentUserProfile.profile_image}
                size="sm"
                mr={2}
              />
            )}
            <Flex direction="column">
            <Box
              bg={msg.sender_id === targetUserId ? "gray.100" : "blue.500"}
                color={msg.sender_id === targetUserId ? "black" : "white"}
              p={2}
              borderRadius="md"
            >
              <Flex direction="column">
                <Text>{msg.message_text}</Text>
                
              </Flex>
            </Box>
            <Text fontSize="xs" color={"gray.500"}>
                  {new Date(msg.created_at).toLocaleTimeString()}
                </Text>
            </Flex>
          </Flex>
        ))}
      </Box>

      <Flex p={4} borderTop="1px solid #dbdbdb">
        <Input
          placeholder="Write a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button ml={2} onClick={handleSendMessage}>
          Send
        </Button>
      </Flex>
    </Box>
  );
};

export default Chat;
