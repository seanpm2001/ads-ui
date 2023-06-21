import {createTheme} from "@mui/material";
import {styles} from "style/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
    h1: {
      fontSize: "18px",
      fontWeight: 400,
    },
    h2: {
      fontSize: "14px",
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: styles.ColorLightPrimary50,
    },
    secondary: {
      main: styles.ColorLightSecondary50
    },
    background: {
      default: "#F1F3F5",
      paper: "white",
    },
    text: {
      primary: "#343546",
      secondary: "#A0A1B2",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...ownerState,
          borderRadius: "30px",
        }),
      },
    },
    MuiCard: {
      defaultProps: {
        sx: {
          p: 3,
        },
      },
    },
  },
});
