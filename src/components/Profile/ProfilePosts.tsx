import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
import {useUserPosts} from "../../utils/usePosts";



const ProfilePosts = () => {
	
	const { userPosts, loading} = useUserPosts();
	

	const noPostsFound = !loading && userPosts.length === 0;
	if (noPostsFound) return <NoPostsFound />;

	return (
		<Grid
			templateColumns={{
				sm: "repeat(1, 1fr)",
				md: "repeat(3, 1fr)",
			}}
			gap={1}
			columnGap={1}
		>
			{loading &&
				[0, 1, 2].map((_, idx) => (
					<VStack key={idx} alignItems={"flex-start"} gap={4}>
						<Skeleton w={"full"}>
							<Box h='300px'>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}

			{!loading && (
				<>
					{userPosts.map((post) => (
						<ProfilePost 
			post={post} key={post._id} 
			/> ))}
				</>
			)}
		</Grid>
	);
};

export default ProfilePosts;

const NoPostsFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Text fontSize={"2xl"}>No Posts Found🤔</Text>
		</Flex>
	);
};
