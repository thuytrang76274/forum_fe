import { Stack } from "@mui/material";
import ItemViewPost from "./ItemViewPost";

const ListViewPost = () => {
  return (
    <Stack marginTop="45px" spacing="45px">
      <ItemViewPost id={1} />
      <ItemViewPost id={2} />
    </Stack>
  );
};

export default ListViewPost;
