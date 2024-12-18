import { Box, Stack } from "@mui/material";
import { LeftBar, PostDetail, PostDetailMain } from "../components";
import { useEffect, useState } from "react";
import { CommentDto, PostDto } from "../dtos";
import { getSinglePost } from "../axios/post";
import { useAppStore } from "../hooks";
import { getListCommentByPost } from "../axios/comment";
import { useParams } from "react-router";

const SinglePost = () => {
  const params = useParams();
  const postId = params.id;
  const [post, setPost] = useState<PostDto | undefined>(undefined);
  const [comments, setComments] = useState<CommentDto[]>([]);
  const { state } = useAppStore();
  const getPost = async () => {
    try {
      let response = await getSinglePost(
        Number(postId as string),
        state.user.token
      );
      const postResponse: PostDto = response.data.data;
      response = await getListCommentByPost(
        Number(postId as string),
        state.user.token
      );
      const commentsResponse: CommentDto[] = response.data.data;
      setPost(postResponse);
      setComments(commentsResponse);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    try {
      getPost();
    } catch (e) {
      console.log(e);
    }
  }, [post, comments]);
  return (
    <Stack direction="row" bgcolor="#FAFAFA">
      <LeftBar />
      <Box display="flex" sx={{ height: `calc(100vh - 84px)` }}>
        <Box
          width="725px"
          marginX="50px"
          marginTop="40px"
          sx={{
            height: `calc(100vh - 84px - 40px)`,
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <PostDetailMain post={post} comments={comments} />
        </Box>
        <PostDetail post={post} />
      </Box>
    </Stack>
  );
};

export default SinglePost;
