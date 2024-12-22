import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import { IoStarOutline } from "react-icons/io5";
import { PostDto } from "../dtos";

const PostDetail = ({ post }: { post: PostDto | undefined }) => {
  const handleListAssignee = (currentPost: PostDto | undefined) => {
    const assigneeLength = currentPost?.issue?.assignees?.length;
    if (assigneeLength === undefined || assigneeLength === 0) return "--";
    let result = "";
    for (let i = 0; i < assigneeLength - 1; ++i) {
      const assignee = currentPost?.issue?.assignees[i];
      result = result.concat(`${assignee?.name ?? assignee?.username}, `);
    }
    const lastAssignee = currentPost?.issue?.assignees[assigneeLength - 1];
    return result.concat(`${lastAssignee?.name ?? lastAssignee?.username}`);
  };
  return (
    <Box
      width="277px"
      marginTop="40px"
      sx={{
        height: `calc(100vh - 84px - 40px)`,
      }}
    >
      <Card>
        <CardHeader avatar={<IoStarOutline />} title="Details" />
        <CardContent sx={{ paddingTop: "0" }}>
          {post && (
            <Stack spacing="10px">
              <Box>
                <Typography fontSize="13px" fontWeight="700">
                  Customer
                </Typography>
                <Typography fontSize="13px">
                  {post?.issue?.customer?.description ??
                    post?.issue?.customer?.codeName}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize="13px" fontWeight="700">
                  Assignee
                </Typography>
                <Typography fontSize="13px">
                  {handleListAssignee(post)}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize="13px" fontWeight="700">
                  Reporter
                </Typography>
                <Typography fontSize="13px">{post.createdBy}</Typography>
              </Box>
              <Box>
                <Typography fontSize="13px" fontWeight="700">
                  Type
                </Typography>
                <Typography fontSize="13px">
                  {post.issue?.type?.description ?? post.issue?.type?.codeName}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize="13px" fontWeight="700">
                  Version
                </Typography>
                <Typography fontSize="13px">{post.issue?.version}</Typography>
              </Box>
              <Box>
                <Typography fontSize="13px" fontWeight="700">
                  Module
                </Typography>
                <Typography fontSize="13px">
                  {post.module?.description ?? post.module?.codeName}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize="13px" fontWeight="700">
                  Apply for
                </Typography>
                <Typography fontSize="13px">
                  {post.applyFor?.replace("_", " ")}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize="13px" fontWeight="700">
                  Due date
                </Typography>
                <Typography fontSize="13px">{post.issue?.dueDate}</Typography>
              </Box>
              <Box>
                <Typography fontSize="13px" fontWeight="700">
                  Is appendix
                </Typography>
                <Typography fontSize="13px">
                  {post.issue?.isAppendix ? "Yes" : "No"}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize="13px" fontWeight="700">
                  Is deal customer
                </Typography>
                <Typography fontSize="13px">
                  {post.issue?.isDealCustomer ? "Yes" : "No"}
                </Typography>
              </Box>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostDetail;
