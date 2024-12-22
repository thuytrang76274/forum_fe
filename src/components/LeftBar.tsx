import { Box, List, ListSubheader } from "@mui/material";
import { CgSearch } from "react-icons/cg";
import { LuList } from "react-icons/lu";
import { FiTag } from "react-icons/fi";
import { GoQuestion } from "react-icons/go";
import { CgFileDocument } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import LeftBarItem from "./LeftBarItem";

const LeftBar = () => {
  return (
    <Box width="310px" bgcolor="white" sx={{ height: `calc(100vh - 84px)` }}>
      <Box marginTop="40px">
        <List>
          <LeftBarItem
            props={{
              text: "Search",
              path: "/search",
              icon: <CgSearch />,
            }}
          />
        </List>
        <List
          subheader={
            <ListSubheader sx={{ paddingX: "50px" }}>MENU</ListSubheader>
          }
        >
          <LeftBarItem
            props={{
              text: "Home",
              path: "/",
              icon: <LuList />,
            }}
          />
          <LeftBarItem
            props={{
              text: "Issue",
              path: "/issue",
              icon: <FiTag />,
            }}
          />
          <LeftBarItem
            props={{
              text: "Appendix",
              path: "/appendix",
              icon: <FiTag />,
            }}
          />
        </List>
        <List
          subheader={
            <ListSubheader sx={{ paddingX: "50px" }}>
              PERSONAL NAVIGATOR
            </ListSubheader>
          }
        >
          <LeftBarItem
            props={{
              text: "Your issue",
              path: "/my-issue",
              icon: <GoQuestion />,
            }}
          />
          <LeftBarItem
            props={{
              text: "Your question",
              path: "/my-issue",
              icon: <CgFileDocument />,
            }}
          />
          <LeftBarItem
            props={{
              text: "Your comment",
              path: "/my-comment",
              icon: <FaRegHeart />,
            }}
          />
        </List>
      </Box>
    </Box>
  );
};

export default LeftBar;
