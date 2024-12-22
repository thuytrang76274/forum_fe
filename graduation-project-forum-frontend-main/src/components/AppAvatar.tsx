import {
  Avatar,
  Badge,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { useAppStore } from "../hooks";
import { useNavigate } from "react-router-dom";

const AppAvatar = () => {
  const { state, dispatch } = useAppStore();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("user");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };
  return (
    <>
      <Badge badgeContent="0" overlap="circular" color="warning">
        <IconButton
          id="user-select"
          size="large"
          aria-controls={open ? "user-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ marginLeft: "30px" }}
        >
          <Avatar>{state.user?.name?.charAt(0)}</Avatar>
        </IconButton>
      </Badge>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        MenuListProps={{
          "aria-labelledby": "user-select",
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <IoSettingsOutline />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <IoLogOutOutline />
          </ListItemIcon>
          Log out
        </MenuItem>
      </Menu>
    </>
  );
};

export default AppAvatar;
