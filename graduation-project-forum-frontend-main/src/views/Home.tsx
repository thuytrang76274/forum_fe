import { Box, Stack } from "@mui/material";
import { FilterPost, LeftBar, ListViewPost } from "../components";
import TopDiscussion from "../components/TopDiscussion";

function Home() {
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
          <FilterPost />
          <ListViewPost />
        </Box>
        <TopDiscussion />
      </Box>
    </Stack>
  );
}

export default Home;
