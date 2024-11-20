import { InputGroup, Text, VStack, Input, InputRightElement, Button, Image, Flex, Avatar, Box, Link } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useShowToast from "../../utils/useShowToast";
import api from "../../../api/axiosConfig";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState(""); // Состояние для строки поиска
  const [searchResults, setSearchResults] = useState<any[]>([]); // Состояние для результатов поиска
  const [isSearching, setIsSearching] = useState(false);
  
  
  const showToast = useShowToast();

  const fetchUsersBySearchQuery = async (query: string) => {
    try {
      const response = await api.get("/search/users", {
        params: { query }, // Передаём строку поиска как параметр
      });

      if (!response.data || response.data.length === 0) {
        throw new Error("User not found");
      }

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to fetch users");
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]); // Очистить результаты, если строка поиска пуста
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await fetchUsersBySearchQuery(searchQuery);
        setSearchResults(results);
        showToast({ title: "Success", description: "Users fetched successfully!", status: "success" });
      } catch (error: any) {
        showToast({ title: "Error", description: error.message, status: "error" });
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500); // Задержка в 500 мс перед отправкой запроса

    return () => clearTimeout(timer); // Очистить таймер при изменении строки поиска
  }, [searchQuery, showToast]);
  console.log(searchResults);
  return (
    <VStack padding={4}>
      <Text fontWeight={"bold"} fontSize={"xl"} alignSelf={"start"} mb={"25px"}>Search</Text>
      <InputGroup>
        <Input placeholder="Search" bg={'gray.300'} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></Input>
        <InputRightElement h='full'>
          <Button variant={"ghost"} size={"sm"} onClick={() => setSearchQuery("")} bg={"transparent"}>
            <Image src='/icons/delsearchbar.svg' h='full' w='full' />
          </Button>
        </InputRightElement>
      </InputGroup>
      <Text fontWeight={"bold"} fontSize={"xl"} alignSelf={"start"} mb={"25px"} mt={"25px"}>Recent:</Text>
      <VStack align="start" spacing={4} w="full">
        {searchResults.map((user) => (
          <Box key={user._id} w='full'>
          <Flex gap={4}>
          <Avatar src={user.profile_image} size={"xs"} />
          <Link href={`user/${user._id}`}>
            <Text>
            {user.username}
            </Text>
          </Link>
            
          </Flex>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}