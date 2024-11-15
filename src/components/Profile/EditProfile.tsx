import {
    Avatar,
    Box,
    Button,
    Container,
    Flex,
    Input,
    Text,
    Textarea,
    VStack,
  } from "@chakra-ui/react";
  import Counter from "../Counter";
  import { useState, useEffect } from "react";
  import { useSelector } from "react-redux";
  import { RootState } from "../../../store";
  import { useUserProfile } from "../../utils/useUsers";
  import api from "../../../api/axiosConfig"; 
  import useShowToast from "../../utils/useShowToast";
  
  export default function EditProfile() {
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const { userProfile } = useUserProfile(userId);
    const [postText, setPostText] = useState(userProfile?.bio || "");
    const [userName, setUserName] = useState(userProfile?.username || "");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const maxWords = 150;
    const showToast = useShowToast();
  
    useEffect(() => {
      setPostText(userProfile?.bio || "");
      setUserName(userProfile?.username || "");
    }, [userProfile]);
  
    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        setSelectedImage(file);
      }
    };
  
    const handleSave = async () => {
      setIsSaving(true);
  
      const formData = new FormData();
      formData.append("username", userName);
      formData.append("bio", postText);
      if (selectedImage) {
        formData.append("profile_image", selectedImage);
      }
  
      try {
        await api.put("/user/current", formData);
        showToast({ title: 'Success', description: 'Profile updated successfully', status: 'success' });
      } catch (error) {
        console.error("Error updating profile:", error);
        showToast({ title: 'Error', description: 'Could not update profile', status: 'error' });
      } finally {
        setIsSaving(false);
      }
    };
  
    return (
      <Container maxW={"container.md"} padding={4}>
        <VStack align="stretch" spacing={4} maxW={"610px"}>
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            alignSelf="start"
            marginBottom={"45px"}
            marginTop={"30px"}
          >
            Edit Profile
          </Text>
          <Flex bg={"gray.200"} borderRadius={16} padding={4} gap={4} align="center">
            {selectedImage ? (
                <Avatar  src={URL.createObjectURL(selectedImage)} />
            ) : (<Avatar  src={userProfile?.profile_image} />)}
            
            <VStack alignItems={"start"} gap={2} flex={1}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                {userProfile?.username}
              </Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                {userProfile?.bio}
              </Text>
            </VStack>
            <Button
              colorScheme="blue"
              size="sm"
              fontSize={"sm"}
              paddingX={"24px"}
              borderRadius={12}
              onClick={() => document.getElementById("imageUpload")?.click()}
            >
              New photo
            </Button>
            <Input
              id="imageUpload"
              type="file"
              display="none"
              accept="image/*"
              onChange={handleImageSelect}
            />
          </Flex>
          <VStack alignItems={"start"} gap={4}>
            <Text mb="15px" fontWeight={"bold"}>
              Username
            </Text>
            <Input
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Text mb="15px" fontWeight={"bold"}>
              About
            </Text>
            <Box position={"relative"} w="full">
              <Textarea
                name="about"
                mt={3}
                placeholder="About..."
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                maxLength={maxWords}
                resize="none"
                focusBorderColor="gray.200"
                h="150px"
                border={"1px solid #dbdbdb"}
              />
              <Counter currentLength={postText.length} maxLength={maxWords} />
            </Box>
          </VStack>
          <Button
            colorScheme="blue"
            maxWidth={"350px"}
            size="md"
            fontSize={"sm"}
            paddingX={"24px"}
            borderRadius={12}
            mt={"65px"}
            onClick={handleSave}
            isLoading={isSaving}
            disabled={!userName || !postText}
          >
            Save
          </Button>
        </VStack>
      </Container>
    );
  }
  