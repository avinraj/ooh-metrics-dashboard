import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Box, CssBaseline, IconButton, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import getTheme from "./theme/themes";
import { useTranslation } from "react-i18next";
import StorageService from "./app/core/services/storage.serive";
import { languages } from "./i18n/languages";

function App() {
  const storageService = new StorageService();
  const [mode, setMode] = useState<"light" | "dark">("light");
  const customTheme = getTheme(mode);
  const { i18n } = useTranslation();

  useEffect(() => {
    const selectedLang: any = storageService.get("local", "i18nextLng", false);
    const languageToSet = languages.some((lang) => lang.code === selectedLang)
      ? selectedLang
      : "en";
    i18n.changeLanguage(languageToSet);
  }, [i18n]);

  // Toggle mode between light and dark
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
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
              "&:hover": {
                backgroundColor: customTheme.palette.primary.dark,
              },
            }}
            onClick={toggleMode}
          >
            {mode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
