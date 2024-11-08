import { AvatarGroup, Flex, Avatar, VStack, Text, Button } from '@chakra-ui/react'

export default function ProfileHeader() {
  return (
    <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}> 
      <AvatarGroup size={"xl"} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
        <Avatar name='As a Programmer' src='/profile-big-logo.png'  />
      </AvatarGroup>

      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex gap={4}
					direction={{ base: "column", sm: "row" }}
					justifyContent={{ base: "center", sm: "flex-start" }}
					alignItems={"center"}
					w={"full"}>
        <Text fontSize={"sm"}>John_Doe</Text>
        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
							<Button
								bg={"gray.200"}
								color={"black"}
								_hover={{ bg: "whiteAlpha.800" }}
								size={{ base: "xs", md: "sm" }}
								
							>
								Edit Profile
							</Button>
						</Flex>
        </Flex>
            <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
					<Text fontSize={{ base: "xs", md: "sm" }}>
						<Text as='span' fontWeight={"bold"} mr={1}>
							50
						</Text>
						Posts
					</Text>
					<Text fontSize={{ base: "xs", md: "sm" }}>
						<Text as='span' fontWeight={"bold"} mr={1}>
							20
						</Text>
						Followers
					</Text>
					<Text fontSize={{ base: "xs", md: "sm" }}>
						<Text as='span' fontWeight={"bold"} mr={1}>
							10
						</Text>
						Following
					</Text>
				</Flex>
				<Text fontSize={"sm"} noOfLines={3}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci officia commodi fugiat, architecto est distinctio. Velit quo atque aut, quasi, minus veniam deserunt unde illo, quod consectetur dicta doloribus soluta consequuntur nostrum! Velit officia voluptates temporibus debitis, adipisci, perspiciatis natus blanditiis hic cum architecto ducimus error delectus dolorem corporis culpa.</Text>
      </VStack>

    </Flex>
  )
}
