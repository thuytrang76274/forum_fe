import { BrowserRouter } from "react-router";
import AppRouter from "./routes/AppRouter";
import NavBar from "./components/NavBar";
import { THEME_ID, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import AppProvider from "./store/AppProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <ThemeProvider theme={{ [THEME_ID]: theme }}>
        <AppProvider>
          <BrowserRouter>
            <NavBar />
            <AppRouter />
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
