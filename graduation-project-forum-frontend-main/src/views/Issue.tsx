import { Box, Stack } from "@mui/material";
import { FilterIssue, LeftBar, ListViewIssue } from "../components";

function Issue() {
  return (
    <Stack direction="row" bgcolor="#FAFAFA">
      <LeftBar />
      <Box display="flex" sx={{ height: `calc(100vh - 84px)` }}>
        <Box
          marginX="50px"
          marginTop="40px"
          sx={{
            height: `calc(100vh - 84px - 40px)`,
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <FilterIssue />
          <ListViewIssue />
        </Box>
      </Box>
    </Stack>
  );
}

export default Issue;
