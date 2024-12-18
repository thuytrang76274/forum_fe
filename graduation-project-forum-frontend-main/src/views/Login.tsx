import { Grid2 } from "@mui/material";
import home from "../assets/home.png";
import { LoginForm } from "../components";

const Login = () => {
  return (
    <Grid2 container bgcolor={"#FAFAFA"} sx={{ height: `calc(100vh - 84px)` }}>
      <Grid2 size={5}>
        <LoginForm />
      </Grid2>
      <Grid2 size={7} sx={{ height: `calc(100vh - 84px)` }}>
        <img
          src={home}
          alt="Home"
          width="100%"
          style={{ height: `calc(100vh - 84px)` }}
        />
      </Grid2>
    </Grid2>
  );
};

export default Login;
