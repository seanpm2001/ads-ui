import {
  createTheme,
  experimental_extendTheme as extendTheme,
} from "@mui/material";
import {
  color,
  font,
  spacing,
  gradient,
  typography,
} from "@brave/leo/tokens/css";

export const theme = extendTheme({
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
  // palette: {
  //   primary: {
  //     main: color.light.primary["50"],
  //   },
  //   secondary: {
  //     main: "#4C54D2",
  //   },
  //   background: {
  //     default: "#F1F3F5",
  //     paper: "white",
  //   },
  //   text: {
  //     primary: "#343546",
  //     secondary: "#A0A1B2",
  //   },
  // },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: color.light.primary["50"],
        },
        // secondary: {
        //   main: 'rgb(252, 147, 120)',
        // },
        // background: {
        //   default: "#F1F3F5",
        //   paper: "white",
        // },
        // text: {
        //   primary: color.text.primary,
        //   secondary: color.text.secondary,
        // },
      },
    },
  },
  // },
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
