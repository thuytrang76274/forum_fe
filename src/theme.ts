import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: "13px",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          fontSize: "13px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "13px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "13px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "13px",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontSize: "13px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "white",
          color: "black",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#FCF4EC",
            "&:hover": {
              backgroundColor: "#FCF4EC",
            },
            "&:click": {
              backgroundColor: "#F48023",
            },
          },
        },
      },
    },
  },
});
