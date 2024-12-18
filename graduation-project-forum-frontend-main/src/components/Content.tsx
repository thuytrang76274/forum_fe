import { Box } from "@mui/material";
import MainView from "./MainView";
import SubView from "./SubView";

const Content = () => {
  return (
    <Box display="flex" sx={{ height: `calc(100vh - 84px)` }}>
      <MainView />
      <SubView />
    </Box>
  );
};

export default Content;
