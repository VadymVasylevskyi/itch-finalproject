import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import UserProfilePost from "./userProfilePost";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPublicPosts } from "../../../store/slices/postSlice";

const UserProfilePosts = () => {
	
const dispatch = useDispatch();
  
const { publicPosts, loading, error } = useSelector((state: RootState) => state.posts);
const {userId} = useParams();
console.log(userId)
useEffect(() => {
      
      dispatch(fetchPublicPosts());
      
  }, [dispatch]);
	
  const userPosts = publicPosts.filter(post => post.user_id === userId);
	const noPostsFound = !loading && userPosts.length === 0;
	if (noPostsFound) return <NoPostsFound />;
  console.log(userPosts)
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
						<UserProfilePost 
			post={post} key={post._id} 
			/> ))}
				</>
			)}
		</Grid>
	);
};

export default UserProfilePosts;

const NoPostsFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Text fontSize={"2xl"}>No Posts Found🤔</Text>
		</Flex>
	);
};
