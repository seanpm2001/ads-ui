import { createTheme } from "@mui/material";
import { styles } from "style/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
    h1: {
      ...styles.FontDesktopHeadingH1,
      lineHeight: "unset",
    },
    h2: {
      ...styles.FontDesktopHeadingH2,
      lineHeight: "unset",
    },
    h3: {
      ...styles.FontDesktopHeadingH3,
      lineHeight: "unset",
    },
    h4: {
      ...styles.FontDesktopHeadingH4,
      lineHeight: "unset",
    },
    subtitle1: {
      fontFamily: "Poppins",
    },
    subtitle2: {
      fontFamily: "Poppins",
    },
    body1: {
      fontFamily: "Poppins",
    },
    body2: {
      fontFamily: "Poppins",
    },
  },
  palette: {
    primary: {
      main: styles.ColorLightPrimary50,
    },
    secondary: {
      main: styles.ColorLightSecondary50,
    },
    background: {
      default: "#F1F3F5",
      paper: "white",
    },
    text: {
      primary: styles.ColorLightTextPrimary,
      secondary: styles.ColorLightTextSecondary,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...ownerState,
          borderRadius: "1000px",
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
