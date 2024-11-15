import { useState, useRef, DragEvent } from "react";
import {
  Box,
  Flex,
  Image,
  Link,
  Tooltip,
  Text,
  Button,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  VStack,
  Input,
  Textarea,
  useDisclosure
} from "@chakra-ui/react";
import api from "../../../api/axiosConfig"
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BiLogOut } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri"
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/authSlice";
import { useUserProfile } from "../../utils/useUsers";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import useShowToast from "../../utils/useShowToast";
import Counter from "../Counter";
import Emoji from "../Emoji";
import Notifications from "./Notifications";
import Search from "./Search";

export default function SideBar() {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const { userProfile} = useUserProfile(userId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSidebarContent, setActiveSidebarContent] = useState<
    string | null
  >(null);
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = useShowToast();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const maxWords = 2200;

  const handleEmojiSelect = (emoji: string) => {
    setPostText((prevText) => prevText + emoji);
  };

  const handleToggleSidebar = (contentId: string | null) => {
    if (contentId === "/search" || contentId === "/notifications") {
      if (activeSidebarContent === contentId) {
        setIsSidebarOpen(false);
        setActiveSidebarContent(null);
        setActiveLink(null);
      } else {
        setIsSidebarOpen(true);
        setActiveSidebarContent(contentId);
        setActiveLink(contentId);
      }
    } else {
      setActiveSidebarContent(null);
      setIsSidebarOpen(false);
      setActiveLink(contentId);
    }
  };


const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    }
  };

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
        showToast({
            title: "Error",
            description: "Please select an image before submitting the post",
            status: "error"
        });
        return;
    }

    const formData = new FormData();
    formData.append("caption", postText); 
    formData.append("image", selectedImage, selectedImage.name);
   
    try {
        const response = await api.post("/post/", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });

        
        if (response.status >= 200 && response.status < 300) {
            
            setPostText("");
            setSelectedImage(null);
            onClose();
            showToast({
                title: "Success",
                description: "Your post was successfully created!",
                status: "success"
            });
        } else {
            showToast({
                title: "Error",
                description: "Error occurred while submitting the post",
                status: "error"
            });
        }
    } catch (error) {
        // Обработка ошибки
        showToast({
            title: "Error",
            description: "Error occurred while submitting the post",
            status: "error"
        });
        // Ошибка запроса или сети
        console.error("Request error:", error.message);
        showToast({
            title: "Error",
            description: "Network or server error occurred.",
            status: "error"
        });
    }
};


  const getTextStyle = (route: string) => ({
    fontWeight:
      activeSidebarContent === route || pathname === route ? "bold" : "normal",
  });

  return (
    <div>
      {/* Затемняющий слой для основного контента */}
      {isSidebarOpen && (
        <Box
          position="fixed"
          top={0}
          left="340px"
          right={0}
          bottom={0}
          bg="blackAlpha.600"
          zIndex={20}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Box
        height={"100vh"}
        width="340px"
        borderRight={"1px solid #ddd"}
        py={8}
        position={"sticky"}
        top={0}
        left={0}
        px={{ base: 2, md: 4 }}
        zIndex={40}
        background="white"
      >
        <Flex direction={"column"} gap={10} w="full" height={"full"}>
          <Link
            to={"/"}
            as={RouterLink}
            pl={2}
            display={{ base: "none", md: "block" }}
            cursor="pointer"
          >
            <Image src="/icons/logo-small.svg" />
          </Link>
          <Flex direction={"column"} gap={5} cursor={"pointer"}>
            {/* Home */}
            <Tooltip
              hasArrow
              label={"Home"}
              placement="right"
              ml={1}
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              <Link
                display={"flex"}
                to={"/"}
                as={RouterLink}
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
                onClick={() => handleToggleSidebar("/")}
              >
                <Image
                  src={
                    activeLink === "/"
                      ? "/icons/home-filled.svg"
                      : "/icons/home.svg"
                  }
                  boxSize={25}
                />
                <Box fontWeight={activeLink === "/" ? "bold" : "normal"}>
                  Home
                </Box>
              </Link>
            </Tooltip>

            {/* Search */}
            <Tooltip
              hasArrow
              label={"Search"}
              placement="right"
              ml={1}
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              <Link
                display={"flex"}
                as="span"
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
                onClick={() => handleToggleSidebar("/search")}
              >
                <Image
                  src={
                    activeLink === "/search"
                      ? "/icons/search-filled.svg"
                      : "/icons/search.svg"
                  }
                  boxSize={25}
                />
                <Box fontWeight={activeLink === "/search" ? "bold" : "normal"}>
                  Search
                </Box>
              </Link>
            </Tooltip>

            {/* Explore */}
            <Tooltip
              hasArrow
              label={"Explore"}
              placement="right"
              ml={1}
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              <Link
                display={"flex"}
                to={"/explore"}
                as={RouterLink}
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
                onClick={() => handleToggleSidebar("/explore")}
              >
                <Image
                  src={
                    activeLink === "/explore"
                      ? "/icons/explore-filled.svg"
                      : "/icons/explore.svg"
                  }
                  boxSize={25}
                />
                <Box fontWeight={activeLink === "/explore" ? "bold" : "normal"}>
                  Explore
                </Box>
              </Link>
            </Tooltip>

            {/* Messages */}
            <Tooltip
              hasArrow
              label={"Messages"}
              placement="right"
              ml={1}
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              <Link
                display={"flex"}
                to={"/messages"}
                as={RouterLink}
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
                onClick={() => handleToggleSidebar("/messages")}
              >
                <Image
                  src={
                    activeLink === "/messages"
                      ? "/icons/messanger-filled.svg"
                      : "/icons/messanger.svg"
                  }
                  boxSize={25}
                />
                <Box
                  fontWeight={activeLink === "/messages" ? "bold" : "normal"}
                >
                  Messages
                </Box>
              </Link>
            </Tooltip>

            {/* Notifications */}
            <Tooltip
              hasArrow
              label={"Notifications"}
              placement="right"
              ml={1}
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              <Link
                display={"flex"}
                as="span"
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
                onClick={() => handleToggleSidebar("/notifications")}
              >
                <Image
                  src={
                    activeLink === "/notifications"
                      ? "/icons/notification-filled.svg"
                      : "/icons/notification.svg"
                  }
                  boxSize={25}
                />
                <Box
                  fontWeight={
                    activeLink === "/notifications" ? "bold" : "normal"
                  }
                >
                  Notifications
                </Box>
              </Link>
            </Tooltip>

            {/* Create */}
            <Tooltip
              hasArrow
              label={"Create"}
              placement="right"
              ml={1}
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              <Link
                display={"flex"}
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
                onClick={() => {
                  onOpen();
                  setActiveLink('/create'); 
                }}
              >
                <Image
                  src="/icons/create.svg"
                  boxSize={25}
                />
                <Box fontWeight={activeLink === "/create" ? "bold" : "normal"}>
                  Create
                </Box>
              </Link>
            </Tooltip>

            {/* Profile */}
            <Tooltip
              hasArrow
              label={"Profile"}
              placement="right"
              ml={1}
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              <Link
                display={"flex"}
                to={"/profile"}
                as={RouterLink}
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
                onClick={() => handleToggleSidebar("/profile")}
              >
                <Image src="/icons/profile-itch.svg" boxSize={25} />
                <Text
                  display={{ base: "none", md: "block" }}
                  style={getTextStyle("/profile")}
                >
                  Profile
                </Text>
              </Link>
            </Tooltip>

            <Tooltip
              hasArrow
              label={"Logout"}
              placement="right"
              ml={1}
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              <Flex
                onClick={handleLogout}
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "gray.300" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                mt={"auto"}
                justifyContent={{ base: "center", md: "flex-start" }}
              >
                <BiLogOut size={25} />
                <Button
                  display={{ base: "none", md: "block" }}
                  variant={"ghost"}
                  _hover={{ bg: "transparent" }}
                >
                  Logout
                </Button>
              </Flex>
            </Tooltip>
          </Flex>
        </Flex>
      </Box>

      {/* Motionbar для выезжающего контента */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: "340px",
              width: "300px",
              height: "100vh",
              backgroundColor: "white",
              zIndex: 25,
              borderRight: "1px solid #ddd",
            }}
          >
            {activeSidebarContent === "/search" && <Search />}
            {activeSidebarContent === "/notifications" && <Notifications />}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Modal for creating a post */}
      <Modal isOpen={isOpen} size={"4xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={0}>
          <ModalHeader padding={0}>
          <Flex
            justifyContent="center"
            alignItems="center"
            borderBottom="1px solid #dbdbdb"
            position="relative"
            p={2}
          >
            <Box fontWeight="semibold" color={"gray.600"}>Create new post</Box>
            <Text
              position="absolute"
              right={4}
              cursor="pointer"
              color="blue.500"
              fontWeight="semibold"
              onClick={handleSubmit}
            >
              Share
            </Text>
          </Flex>

          </ModalHeader>

          <ModalBody display="flex" padding={0}>
            <Box
              flex="1"
              bg={isDragging ? "gray.100" : "gray.50"}
              borderRight={"1px solid #dbdbdb"}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              display="flex"
              flexDirection={"column"}
              alignItems="center"
              justifyContent="center"
              minH="500px"
              minW={"550px"}
              overflow="hidden"
            >
              {selectedImage ? (
                <>
                  <Image src={URL.createObjectURL(selectedImage)} alt="selected image" />
                  <Button leftIcon={<RiDeleteBin6Line />} onClick={() => setSelectedImage(null)}>
                    Delete
                  </Button>
                </> ) : (
                  <>
                  <Image src="/upload.png" alt="upload" />
                  <Box textAlign="center">
                    <Text mt={4} fontSize="sm" color={"gray.300"}>
                      Drag photos here
                    </Text>
                    <Input ref={fileInputRef} type="file" accept="image/*" display="none" onChange={handleImageSelect} />
                    <Button
                      mt={4}
                      fontSize={"medium"}
                      variant={"ghost"}
                      color={"gray.500"}
                      onClick={handleSelectClick}
                    >
                      Select from computer
                    </Button>
                  </Box>
                  </>
                )
              }
              
            </Box>
            <VStack spacing={4} mt={4} minW={"35%"}>
              <Flex justifyContent={"left"} alignItems={"center"} gap={4} w='full' paddingLeft={"16px"}>
                
                  <Avatar size={"md"} name='As a Programmer' src={userProfile?.profile_image || ''}  />
                
                <Text fontSize={"sm"}>{userProfile?.username}</Text>
              </Flex>
              <Box flex="1" padding={0} w="full"  >
                <Flex position={"relative"} borderBottom={"1px solid #dbdbdb"} padding={4} paddingBottom={"45px"}>
                  <Textarea
                  name="caption"
                    mt={3}
                    placeholder="Your text..."
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    maxLength={maxWords}
                    resize="none"
                    border={"none"}
                    focusBorderColor="gray.200"
                    h="150px"
                  />
                  <Counter currentLength={postText.length} maxLength={maxWords} />
                  <Box position={"absolute"} left={"16px"} bottom={"6px"}>
                    <Emoji onEmojiSelect={handleEmojiSelect} />
                  </Box>
                </Flex>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
