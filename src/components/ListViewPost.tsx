import { Box, CircularProgress, Stack } from "@mui/material";
import ItemViewPost from "./ItemViewPost";
import { PostDto } from "../dtos";

const ListViewPost = ({
  posts,
  loading,
}: {
  posts: PostDto[];
  loading: boolean;
}) => {
  return (
    <Stack marginTop="45px" spacing="45px">
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        posts.map((p) => <ItemViewPost post={p} />)
      )}
    </Stack>
  );
};

export default ListViewPost;
