import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  Stack,
  Grid2,
  IconButton,
} from "@mui/material";
import { BiComment } from "react-icons/bi";
import { useNavigate, Link } from "react-router";
import { baseImageUrl } from "../axios/config";
import { PostDto } from "../dtos";

const ItemViewAppendix = ({ post }: { post: PostDto }) => {
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
  const navigate = useNavigate();
  return (
    <Box width="100%">
      <Card>
        <CardActionArea
          onClick={(e) => {
            e.preventDefault();
            navigate(`/post/${post.id}`);
          }}
        >
          <CardHeader />
          <CardContent sx={{ paddingTop: "0px" }}>
            <Stack spacing="10px">
              <Typography fontWeight="700" variant="body2">
                {post.title}
              </Typography>
              <Typography variant="body2">
                <strong>Issue: </strong>
                {`"${post.issue?.content}"`}
              </Typography>
              <Typography variant="body2">
                <strong>Description: </strong>
                {`"${post.description}"`}
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
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default ItemViewAppendix;
