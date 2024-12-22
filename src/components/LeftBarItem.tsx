import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router";

type Props = {
  text: string;
  icon: JSX.Element;
  path: string;
};

const LeftBarItem = ({ props }: { props: Props }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onClickItem = () => {
    navigate(props.path);
  };
  return (
    <ListItemButton
      selected={pathname === props.path}
      sx={{
        paddingX: "50px",
        paddingY: "11px",
      }}
      onClick={onClickItem}
    >
      <ListItemIcon sx={{ minWidth: "30px" }}>{props.icon}</ListItemIcon>
      <ListItemText>
        <Typography fontSize="13px">{props.text}</Typography>
      </ListItemText>
    </ListItemButton>
  );
};

export default LeftBarItem;
