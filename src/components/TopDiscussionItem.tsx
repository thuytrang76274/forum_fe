import { Avatar, Box, Icon, ListItemButton, Typography } from "@mui/material";
import { BiComment } from "react-icons/bi";

const TopDiscussionItem = () => {
  return (
    <ListItemButton sx={{ paddingX: "16px" }}>
      <Box>
        <Typography fontSize="11px" fontWeight="700">
          Automatically sends inventory emails at 0:00 every day to customers?
        </Typography>
        <Box display="flex" alignItems="center" marginTop="5px">
          <Avatar sx={{ height: "22px", width: "22px" }}>
            <Typography fontSize="10px">T</Typography>
          </Avatar>
          <Typography fontSize="10px" marginLeft="5px" sx={{ flexGrow: 1 }}>
            PDD_Thy.Nguyen
          </Typography>
          <Icon fontSize="small">
            <BiComment />
          </Icon>
          <Typography fontSize="10px">15</Typography>
        </Box>
      </Box>
    </ListItemButton>
  );
};

export default TopDiscussionItem;
