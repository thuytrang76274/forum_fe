import { Box } from "@mui/material";
import Filter from "./FilterPost";
import ListView from "./ListViewPost";

const MainView = () => {
  return (
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
      <Filter />
      <ListView />
    </Box>
  );
};

export default MainView;
