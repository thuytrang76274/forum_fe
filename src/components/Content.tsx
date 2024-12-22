import { Box } from "@mui/material";
import SubView from "./SubView";

const Content = () => {
  return (
    <Box display="flex" sx={{ height: `calc(100vh - 84px)` }}>
      <SubView />
    </Box>
  );
};

export default Content;
