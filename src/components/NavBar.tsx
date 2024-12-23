import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import { AppContext } from "../store";
import { FiPlusCircle } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import AppAvatar from "./AppAvatar";
import { useLocation } from "react-router";
import React from "react";

const DialogCreateIssue = React.lazy(() => import("./DialogCreateIssue"));

const NavBar = () => {
  const { state } = useContext(AppContext);
  const { pathname } = useLocation();
  const getNameOfNavBar = () => {
    if (pathname === "/") return "Home";
    if (pathname.startsWith("/post")) return "Post";
    if (pathname.startsWith("/issue")) return "Issue";
    if (pathname.startsWith("/appendix")) return "Appendix";
    return "";
  };
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <AppBar position="sticky" sx={{ height: "84px" }}>
      <Toolbar sx={{ height: "84px" }}>
        <IconButton>
          <img src={logo} alt="Logo" />
        </IconButton>
        <Typography color="black">N3T</Typography>
        {state.user && (
          <>
            <Typography
              fontWeight="700"
              sx={{ marginLeft: "265px", color: "#808080", flexGrow: 1 }}
            >
              {getNameOfNavBar()}
            </Typography>
            <Box display="flex" alignContent="center">
              <Box alignContent="center">
                <Button
                  variant="contained"
                  startIcon={<FiPlusCircle />}
                  onClick={handleOpen}
                  sx={{
                    textTransform: "none",
                    paddingX: "20px",
                    paddingY: "12px",
                    bgcolor: "#F48023",
                  }}
                >
                  <Typography fontSize="13px" fontWeight="700">
                    Create Issue
                  </Typography>
                </Button>
              </Box>

              <Badge variant="dot" overlap="circular" color="primary">
                <IconButton size="large" sx={{ marginLeft: "30px" }}>
                  <GoBell />
                </IconButton>
              </Badge>
              <AppAvatar />
            </Box>
            <DialogCreateIssue open={open} setOpen={setOpen} />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
