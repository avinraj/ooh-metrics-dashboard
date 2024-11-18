import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Box, CssBaseline, IconButton, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import getTheme from "./theme/themes";

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const customTheme = getTheme(mode);

  // Toggle mode between light and dark
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router>
      <Box sx={{ position: "relative", height: "100vh" }}>
          <AppRoutes />
          <IconButton
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              backgroundColor: customTheme.palette.primary.main,
              color: customTheme.palette.primary.contrastText,
              '&:hover': {
                backgroundColor: customTheme.palette.primary.dark,
              }
            }}
            onClick={toggleMode}
          >
            {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
