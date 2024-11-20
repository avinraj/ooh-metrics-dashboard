import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logo from "../../../assets/oohlogo.png";
import car from "../../../assets/1023401.png";
import eye from "../../../assets/eye.png";
import location from "../../../assets/location.png";
import carLogo from "../../../assets/car-removebg-preview.png";
import markerIcon from "../../../assets/marker.png";
import footstep from "../../../assets/footsteps.png";
import AdType from "./AdType";
import StorageService from "../services/storage.serive";
import AdPage from "../../Adtype/AdPage";

const Sidebar: React.FC = () => {
  const storageService = new StorageService();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("Highlight");

  const { t, i18n } = useTranslation();
  const defaultLang = storageService.get("local", "i18nextLng", false);
  const [language, setLanguage] = useState(defaultLang ? defaultLang : "en");

  const handleLanguageChange = (event: any) => {
    const selectedLanguage = event.target.value as string;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);

    // Adjust RTL if Arabic is selected
    document.body.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
  };

  const menuItems = [
    { label: t("sideBar.adType"), action: "Ad Type", image: car, path: "/AdType" },
    { label: t("sideBar.highlight"), action: "Highlight", image: markerIcon, path: "/highlight" },
    { label: t("sideBar.reports"), action: "Reports", image: eye, path: "/reports" },

    { label: t("sideBar.mapView"), action: "Map View", image: location, path: "/map-view" },
    { label: t("sideBar.cars"), action: "Cars", image: carLogo, path: "/cars" },
    { label: t("sideBar.attribution"), action: "Attribution", image: footstep, path: "/attribution" },
    // { label:t("sideBar.deviceIds"), action: "Device IDs", path: "/device-ids" },
    // { label:t("sideBar.logout"), action: "Log out", path: "/logout" },
  ];

  const handleItemClick = (item: { action: string; path: string }) => {
    setSelectedItem(item.action);
    navigate(item.path);
    if (isMobile) setMenuOpen(false); // Close sidebar on mobile after selecting an item
  };

  const toggleDrawer = () => setMenuOpen(!menuOpen);

  return (
    <>
      {isMobile && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{
            position: "absolute",
            top: 16,
            [language === "ar" ? "right" : "left"]: 16, // Correctly toggle between right and left based on language
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor={language === "ar" ? "right" : "left"}
        open={!isMobile || menuOpen}
        onClose={toggleDrawer}
        sx={{
          width: isMobile ? 0 : "18%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile ? "70%" : "18%",
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <Box
          sx={{
            padding: 2,
            backgroundColor: theme.palette.primary.main,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={logo} alt="OOH Logo" style={{ marginRight: 10, height: "40px" }} />
            <h2 style={{ color: theme.palette.primary.contrastText }}>OOH METRICS</h2>
          </div>

          <Select
            value={language}
            onChange={handleLanguageChange}
            size="small"
            sx={{
              color: theme.palette.primary.contrastText,
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="ar">العربية</MenuItem>
          </Select>
        </Box>
        <List sx={{ padding: 2 }}>
          {menuItems.map((item) => (
            <React.Fragment key={item.label}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleItemClick(item)}
                  sx={{
                    backgroundColor:
                      selectedItem === item.action ? theme.palette.primary.main : theme.palette.background.default,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                    },
                    border: selectedItem === item.action ? "1px solid transparent" : "1px solid #ccc",
                    borderRadius: "2px",
                    marginBottom: "8px",
                    fontSize: "20px",
                  }}
                >
                  {item.image && (
                    <img src={item.image} alt={item.label} style={{ width: 25, height: 25, marginRight: 10 }} />
                  )}
                  <ListItemText
                    sx={{
                      color: selectedItem === item.action ? theme.palette.primary.contrastText : theme.palette.text.primary,
                    }}
                    primary={item.label}
                  />
                </ListItemButton>
              </ListItem>
              {selectedItem === "Ad Type" && item.action === "Ad Type" && (
                <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
                  <AdPage />
                </Box>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
