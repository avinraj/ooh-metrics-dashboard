import { createTheme, Theme } from "@mui/material/styles";

const getTheme = (mode: 'light' | 'dark'): Theme => {
  return createTheme({
    palette: {
      primary: {
        main: "#FFFF00", // Yellow for primary elements
        contrastText: "#000000", // Black text on yellow background
      },
      secondary: {
        main: mode === 'dark' ? "#000000" : "#eeeeee", // Light grey
        contrastText: "#000000", // black text on gray backgrounds.
      },
      background: {
        default: mode === 'dark' ? "#303030" : "#FFFFFF", // Dark or light background
        paper: mode === 'dark' ? "#424242" : "#F5F5F5", // Dark or light paper color
      },
      text: {
        primary: mode === 'dark' ? "#FFFFFF" : "#000000", // White text in dark mode, black text in light mode
        secondary: mode === 'dark' ? "#000000" : "#FFFFFF", // Black text in dark mode, white text in light mode
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputLabel-root': {
              color: '#000000', // Black label color by default
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#000000', // Ensure the label stays black when focused
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#000000',
              },
              '&:hover fieldset': {
                borderColor: '#000000',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#000000',
              },
            },
            '& .MuiInputBase-input': {
              color: '#000000', // Black text inside input
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 'bold',
          },
        },
      },
    },
  });
};

export default getTheme;
