import { Brightness4, Brightness7 } from "@mui/icons-material";
import {
  Box,
  CssBaseline,
  IconButton,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import StorageService from "./app/core/services/storage.serive";
import { languages } from "./i18n/languages";
import AppRoutes from "./routes/AppRoutes";
import getTheme from "./theme/themes";

function App() {
  const storageService = new StorageService();
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const customTheme = getTheme(mode, isMobile);
  const { i18n } = useTranslation();

  // Get the current route path using useLocation hook inside Router
  return (
    <Router>
      <AppContent
        storageService={storageService}
        mode={mode}
        setMode={setMode}
        customTheme={customTheme}
        i18n={i18n}
      />
    </Router>
  );
}

const AppContent = ({
  storageService,
  mode,
  setMode,
  customTheme,
  i18n,
}: any) => {

  useEffect(() => {
    const selectedLang: any = storageService.get("local", "i18nextLng", false);
    const languageToSet = languages.some((lang) => lang.code === selectedLang)
      ? selectedLang
      : "en";
    i18n.changeLanguage(languageToSet);
  }, [i18n]);

  // Toggle mode between light and dark
  const toggleMode = () => {
    setMode((prevMode: string) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box sx={{ position: "relative", height: "auto" }}>
        <AppRoutes />
        <IconButton
          sx={{
            display: "grid",
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
    </ThemeProvider>
  );
};

export default App;
