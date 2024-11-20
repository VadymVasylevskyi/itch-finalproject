import { useEffect, useState } from "react";
import { Box, Flex, Avatar, Text, List, ListItem } from "@chakra-ui/react";
import api from '../../../api/axiosConfig'
interface User {
    _id: string;
    username: string;
    profile_image?: string;
  }

  interface UserListProps {
    onSelectUser: (userId: string) => void;
    selectedUserId: string | null;
  }

const UserList: React.FC<UserListProps> = ({ selectedUserId, onSelectUser }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await api.get('/user/all');
          setUsers(response.data); 
          setLoading(false);
        } catch (err: any) {
          setError(err.response?.data?.message || 'Ошибка загрузки пользователей');
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);
    
    if (loading) return <div>Загрузка пользователей...</div>;
    if (error) return <div>Ошибка: {error}</div>;
  
  return (
    <List>
      {users.map((user) => (
        <ListItem
          key={user._id}
          onClick={() => onSelectUser(user._id)}
          cursor="pointer"
          bg={user._id === selectedUserId ? "blue.50" : "white"}
          _hover={{ bg: "gray.100" }}
          mb={4}
        >
          <Flex align="center" p={3}>
            <Avatar size="sm" src={user.profile_image} />
            <Text ml={3}>{user.username}</Text>
          </Flex>
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
