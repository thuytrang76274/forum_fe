import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useAppStore } from "../hooks";
import { ResponseDto, UserDto, UserState } from "../dtos";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";

import { useState } from "react";
import { getUserProfile, login } from "../axios/user";

interface LoginTextField {
  value: string;
  hasError: boolean;
  helperText: undefined | string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { dispatch } = useAppStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<LoginTextField>({
    value: "",
    hasError: false,
    helperText: undefined,
  });
  const [password, setPassword] = useState<LoginTextField>({
    value: "",
    hasError: false,
    helperText: undefined,
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleLogin = async () => {
    try {
      let response = await login({
        username: username.value,
        password: password.value,
      });
      const responseDto: ResponseDto = response.data;
      const myUser: UserState = {
        token: responseDto.data.token,
        username: username.value,
        name: "",
        role: "",
      };
      response = await getUserProfile(myUser.token!);
      const user: UserDto = response.data.data;
      myUser.name = user.name;
      myUser.role = user.type;
      localStorage.setItem("user", JSON.stringify(myUser));
      dispatch({
        type: "LOGIN",
        payload: myUser,
      });
      navigate("/");
    } catch (e) {
      console.log(e);
      localStorage.removeItem("user");
      dispatch({
        type: "LOGOUT",
      });
      navigate("/login");
    }
  };
  const onClickLogin = () => {
    handleLogin();
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{ height: `calc(100vh - 84px)` }}
    >
      <Stack marginX="100px" spacing={"20px"}>
        <Typography fontWeight="700" variant="h5">
          We've Missed You!
        </Typography>
        <Typography variant="body1">
          More than 150 questions are waiting for your wise suggestions!
        </Typography>
        <Stack spacing="10px">
          <TextField
            label="Username"
            fullWidth
            helperText={username.helperText}
            error={username.hasError}
            value={username.value}
            onChange={(e) =>
              setUsername({
                value: e.target.value,
                hasError: e.target.value.trim() === "",
                helperText:
                  e.target.value.trim() === ""
                    ? "Please fill in the username"
                    : undefined,
              })
            }
          />
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              error={password.hasError}
              value={password.value}
              onChange={(e) =>
                setPassword({
                  value: e.target.value,
                  hasError: e.target.value === "",
                  helperText:
                    e.target.value.trim() === ""
                      ? "Please fill in the password"
                      : undefined,
                })
              }
              id="outlined-adornment-password"
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <MdOutlineVisibilityOff />
                    ) : (
                      <MdOutlineVisibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            {password.helperText && (
              <FormHelperText error>{password.helperText}</FormHelperText>
            )}
          </FormControl>
          <Button
            sx={{ textTransform: "none", bgcolor: "#F48023" }}
            variant="contained"
            onClick={onClickLogin}
            fullWidth
          >
            <Typography fontWeight="500">Login</Typography>
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LoginForm;
