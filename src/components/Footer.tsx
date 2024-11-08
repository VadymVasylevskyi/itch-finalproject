import { Text, Flex, Link } from "@chakra-ui/react"

export default function Footer() {
    return (
      <footer>
        <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"} fontSize={12} color={"#737373"}>
            <Flex justifyContent="center" alignItems="center" h="160px" gap={"48px"} >
                <Link top={"/"}>Home</Link>
                <Link top={"/search"}>Search</Link>
                <Link top={"/explore"}>Explore</Link>
                <Link top={"/messages"}>Messages</Link>
                <Link top={"/notifications"}>Notifications</Link>
                <Link top={"/create"}>Create</Link>
            </Flex>
            <Text>© 2024 ICHgram</Text>
        </Flex>
      </footer>
    );
  }