import {
  Box,
  Card,
  CardHeader,
  Avatar,
  Chip,
  CardContent,
  Stack,
  Typography,
  Grid2,
  IconButton,
  CardActions,
  Button,
  Link,
} from "@mui/material";
import dayjs from "dayjs";
import { BiComment } from "react-icons/bi";
import { PostDto } from "../dtos";
import DialogUpdatePost from "./DialogUpdatePost";
import { useState } from "react";
import DialogAddComment from "./DialogAddComment";
import { baseImageUrl } from "../axios/config";
import Comment from "./Comment";

const PostDetailMain = ({ post }: { post: PostDto | undefined }) => {
  const [openUpdatePost, setOpenUpdatePost] = useState<boolean>(false);
  const [openAddComment, setOpenAddComment] = useState<boolean>(false);
  const renderSolutions = (currentPost: PostDto) => {
    if (currentPost.comments?.length === 0) {
      return undefined;
    }
    const solutions = currentPost.comments?.filter(
      (c) => c.isSolution === true
    );
    return (
      solutions?.length > 0 && (
        <Box
          component="section"
          sx={{ border: "1px solid black" }}
          padding="5px"
        >
          <Typography fontSize="13px" fontWeight="700">
            Solutions:
          </Typography>
          {solutions?.map((c) => (
            <Typography fontSize="13px">
              {`${c.createdBy}: "${c.content}"`}
            </Typography>
          ))}
        </Box>
      )
    );
  };
  return (
    post && (
      <>
        <Box width="100%">
          <Card>
            <CardHeader
              avatar={<Avatar>{post?.createdBy?.charAt(0)}</Avatar>}
              action={
                <Chip
                  sx={{ bgcolor: "#FCF4EC" }}
                  label={
                    <Typography color="#F48023" fontSize="10px">
                      {post.status?.replace("_", " ")}
                    </Typography>
                  }
                />
              }
              title={post.createdBy}
              subheader={dayjs(post.modifiedAt).format("DD/MM/YYYY")}
            />
            <CardContent sx={{ paddingTop: "0px" }}>
              <Stack spacing="10px">
                <Typography fontWeight="700" variant="body2">
                  {post.title}
                </Typography>
                <Typography variant="body2">
                  <strong>Issue: </strong>
                  {post.issue?.content}
                </Typography>
                <Typography variant="body2">
                  <strong>Description: </strong>
                  {post.description}
                </Typography>
                <Typography fontSize="13px">
                  <Link href={post.issue?.penpotPrototypeLink}>
                    Prototype link
                  </Link>
                </Typography>
                <Box
                  marginTop="10px"
                  component="section"
                  display="flex"
                  justifyContent="center"
                >
                  <img
                    src={`${baseImageUrl}/${post.issue?.image?.imageUrl}`}
                    alt="Issue"
                    width="400px"
                    height="100%"
                  />
                </Box>
                <Grid2 container>
                  <Grid2 size={11} display="flex" alignItems="center">
                    <Stack direction="row" spacing="10px">
                      <Box>
                        <Typography
                          variant="body2"
                          fontSize="10px"
                          sx={{
                            background: "#EAEAEA",
                            paddingX: "10px",
                            paddingY: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <strong>Customer: </strong>
                          {post.issue?.customer?.description ??
                            post.issue?.customer?.codeName}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          fontSize="10px"
                          sx={{
                            background: "#EAEAEA",
                            paddingX: "10px",
                            paddingY: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <strong>Version: </strong>
                          {post.issue?.version}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          fontSize="10px"
                          sx={{
                            background: "#EAEAEA",
                            paddingX: "10px",
                            paddingY: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <strong>Type: </strong>
                          {post.issue?.type?.description ??
                            post.issue?.type?.codeName}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          fontSize="10px"
                          sx={{
                            background: "#EAEAEA",
                            paddingX: "10px",
                            paddingY: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <strong>Module: </strong>
                          {post.module?.description ?? post.module?.codeName}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          fontSize="10px"
                          sx={{
                            background: "#EAEAEA",
                            paddingX: "10px",
                            paddingY: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <strong>Due date: </strong>
                          {post.issue?.dueDate}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid2>
                  <Grid2 size={1} display="flex" alignItems="center">
                    <IconButton size="small">
                      <BiComment />
                    </IconButton>
                    <Typography variant="body2">
                      {post.comments?.length}
                    </Typography>
                  </Grid2>
                  <Grid2 size={12}>
                    <hr />
                  </Grid2>
                </Grid2>
                {renderSolutions(post)}
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setOpenUpdatePost(true)}
                sx={{
                  border: "1px solid #F48023",
                  "&:hover": {
                    background: "#FCF4EC",
                  },
                }}
              >
                <Typography fontSize="13px" sx={{ color: "#F48023" }}>
                  Edit post
                </Typography>
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setOpenAddComment(true)}
                sx={{
                  border: "1px solid #F48023",
                  "&:hover": {
                    background: "#FCF4EC",
                  },
                }}
              >
                <Typography fontSize="13px" sx={{ color: "#F48023" }}>
                  Add comment
                </Typography>
              </Button>
            </CardActions>
          </Card>
          {post.comments?.length > 0 && (
            <>
              <Typography fontSize="15px" fontWeight="700" marginTop="16px">
                Suggestions
              </Typography>
              {post.comments?.map((c) => (
                <Comment comment={c} />
              ))}
            </>
          )}
        </Box>
        <DialogUpdatePost
          currentPostId={post.id}
          openUpdatePost={openUpdatePost}
          setOpenUpdatePost={setOpenUpdatePost}
        />
        <DialogAddComment
          currentPostId={post.id}
          openAddComment={openAddComment}
          setOpenAddComment={setOpenAddComment}
        />
      </>
    )
  );
};

export default PostDetailMain;
