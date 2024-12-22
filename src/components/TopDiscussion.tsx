import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { IoStarOutline } from "react-icons/io5";
import TopDiscussionItem from "./TopDiscussionItem";

const TopDiscussion = () => {
  return (
    <Box width="277px" marginTop="40px">
      <Card>
        <CardHeader avatar={<IoStarOutline />} title="Top discussion today" />
        <CardContent sx={{ paddingX: "0", paddingTop: "0" }}>
          <TopDiscussionItem />
          <TopDiscussionItem />
          <TopDiscussionItem />
          <TopDiscussionItem />
          <TopDiscussionItem />
        </CardContent>
      </Card>
    </Box>
  );
};

export default TopDiscussion;
