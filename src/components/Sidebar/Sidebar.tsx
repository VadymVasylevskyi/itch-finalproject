import { useState } from "react";
import { Box, Flex, Image, Link, Tooltip, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Notifications from "./Notifications";
import Search from "./Search";

export default function SideBar() {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSidebarContent, setActiveSidebarContent] = useState<string | null>(null);

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
  
  
  
  const getTextStyle = (route: string) => ({
    fontWeight: activeSidebarContent === route || pathname === route ? "bold" : "normal",
  });
  

  return (
    <div className="relative z-10">
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
        borderRight={"1px solid #000"}
        py={8}
        position={"fixed"}
        top={0}
        left={0}
        px={{ base: 2, md: 4 }}
        zIndex={40}
        background="white"
      >
        <Flex direction={"column"} gap={10} w="full" height={"full"}>
          <Link to={"/"} as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor="pointer">
            <Image src="/icons/logo-small.svg" />
          </Link>
          <Flex direction={"column"} gap={5} cursor={"pointer"}>
            {/* Home */}
            <Tooltip hasArrow label={"Home"} placement="right" ml={1} openDelay={500} display={{ base: "block", md: "none" }}>
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
                <Image src={activeLink === "/" ? "/icons/home-filled.svg" : "/icons/home.svg"} boxSize={25} />
                <Box fontWeight={activeLink === "/" ? "bold" : "normal"}>Home</Box>
              </Link>
            </Tooltip>

            {/* Search */}
            <Tooltip hasArrow label={"Search"} placement="right" ml={1} openDelay={500} display={{ base: "block", md: "none" }}>
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
                <Image src={activeLink === "/search" ? "/icons/search-filled.svg" : "/icons/search.svg"} boxSize={25} />
                <Box fontWeight={activeLink === "/search" ? "bold" : "normal"}>Search</Box>
              </Link>
            </Tooltip>

            {/* Explore */}
            <Tooltip hasArrow label={"Explore"} placement="right" ml={1} openDelay={500} display={{ base: "block", md: "none" }}>
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
                <Image src={activeLink === "/explore" ? "/icons/explore-filled.svg" : "/icons/explore.svg"} boxSize={25} />
                <Box fontWeight={activeLink === "/explore" ? "bold" : "normal"}>Explore</Box>
              </Link>
            </Tooltip>

            {/* Messages */}
            <Tooltip hasArrow label={"Messages"} placement="right" ml={1} openDelay={500} display={{ base: "block", md: "none" }}>
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
                <Image src={activeLink === "/messages" ? "/icons/messanger-filled.svg" : "/icons/messanger.svg"} boxSize={25} />
                <Box fontWeight={activeLink === "/messages" ? "bold" : "normal"}>Messages</Box>
              </Link>
            </Tooltip>

            {/* Notifications */}
            <Tooltip hasArrow label={"Notifications"} placement="right" ml={1} openDelay={500} display={{ base: "block", md: "none" }}>
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
                <Image src={activeLink === "/notifications" ? "/icons/notification-filled.svg" : "/icons/notification.svg"} boxSize={25} />
                <Box fontWeight={activeLink === "/notifications" ? "bold" : "normal"}>Notifications</Box>
              </Link>
            </Tooltip>

            {/* Create */}
            <Tooltip hasArrow label={"Create"} placement="right" ml={1} openDelay={500} display={{ base: "block", md: "none" }}>
              <Link
                display={"flex"}
                to={"/create"}
                as={RouterLink}
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
                onClick={() => handleToggleSidebar("/create")}
              >
                <Image src={activeLink === "/create" ? "/icons/create.svg" : "/icons/create.svg"} boxSize={25} />
                <Box fontWeight={activeLink === "/create" ? "bold" : "normal"}>Create</Box>
              </Link>
            </Tooltip>

            {/* Profile */}
            <Tooltip hasArrow label={"Profile"} placement="right" ml={1} openDelay={500} display={{ base: "block", md: "none" }}>
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
                <Text display={{ base: "none", md: "block" }} style={getTextStyle("/profile")}>
                  Profile
                </Text>
              </Link>
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
              left: "340px", // Располагаем Motionbar рядом с Sidebar
              width: "300px",
              height: "100vh",
              backgroundColor: "white",
              zIndex: 25,
              borderLeft: "1px solid #ddd",
              borderTopRightRadius: "16px",
              borderBottomRightRadius: "16px",
            }}
          >
            {activeSidebarContent === "/search" && <Search />}
            {activeSidebarContent === "/notifications" && <Notifications />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
