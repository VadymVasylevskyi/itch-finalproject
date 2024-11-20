import { AvatarGroup, Flex, Avatar, VStack, Text, Button } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import useGetUserById from '../../utils/useGetUserById'
import { useState } from 'react'
export default function UserProfileHeader() {
	const {userId} = useParams<{ userId: string }>()
	const { userProfile } = useGetUserById(userId || '');
	const [follow, setFollow] = useState(false);

	const handleFollow  = () => {
		setFollow(!follow);
	}
	
  return (
    <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}> 
      <AvatarGroup size={"xl"} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
        <Avatar  src={userProfile?.profile_image}  />
      </AvatarGroup>

      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex gap={4}
					direction={{ base: "column", sm: "row" }}
					justifyContent={{ base: "center", sm: "flex-start" }}
					alignItems={"center"}
					w={"full"}>
        <Text fontSize={"sm"} fontWeight={"bold"}>{userProfile?.username}</Text>
        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
							<Button
								bg={"blue.400"}
								color={follow ? "red.300" : "white"}
								_hover={{ bg: "blue.600" }}
								size={{ base: "xs", md: "sm" }}
								onClick={handleFollow}
							>
								{follow ? "Unfollow" : "Follow"}
							</Button>
						</Flex>
        </Flex>
            <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
					<Text fontSize={{ base: "xs", md: "sm" }}>
						<Text as='span' fontWeight={"bold"} mr={1}>
							{userProfile?.posts_count}
						</Text>
						Posts
					</Text>
					<Text fontSize={{ base: "xs", md: "sm" }}>
						<Text as='span' fontWeight={"bold"} mr={1}>
							{userProfile?.followers_count}
						</Text>
						Followers
					</Text>
					<Text fontSize={{ base: "xs", md: "sm" }}>
						<Text as='span' fontWeight={"bold"} mr={1}>
							{userProfile?.following_count}
						</Text>
						Following
					</Text>
				</Flex>
				<Text fontSize={"sm"} noOfLines={3}>{userProfile?.bio}</Text>
      </VStack>

    </Flex>
  )
}
