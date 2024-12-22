import { Stack, Box, CircularProgress } from "@mui/material";
import { PostDto } from "../dtos";
import ItemViewAppendix from "./ItemViewAppendix";

const ListViewAppendix = ({
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
        posts.map((p) => <ItemViewAppendix post={p} />)
      )}
    </Stack>
  );
};

export default ListViewAppendix;
