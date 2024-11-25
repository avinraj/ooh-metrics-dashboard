import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { FaMapMarkerAlt } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FaHighlighter } from "react-icons/fa";
import { IoFootsteps } from "react-icons/io5";
import logo from "../../../assets/oohlogo.png";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

import { useDispatch } from "react-redux";
import { languages } from "../../../i18n/languages";
import { SET_SELECTED_MENU } from "../../../store/actions";
import StorageService from "../services/storage.serive";

import AdType from "./AdType";
import ReportsAcc from "./Reports";

const Sidebar: React.FC = () => {
  const locationVal = useLocation();
  const dispatch = useDispatch();
  const storageService = new StorageService();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("Highlight");
  const [selectedAdType, setSelectedAdType] = useState<{ label: string; icon: JSX.Element | null }>({
    label: "Cars",
    icon: <DirectionsCarIcon />,
  });

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
    { label: t("sideBar.highlight"), action: "Highlight", icon: <FaHighlighter />, path: "/highlight" },
    { label: t("sideBar.reports"), action: "Reports", icon: <IoEyeOutline />, path: "/reports" },
    { label: t("sideBar.mapView"), action: "Map View", icon: <FaMapMarkerAlt />, path: "/map-view" },
    { label: selectedAdType.label, action: "Cars", icon: selectedAdType.icon, path: "/cars" },
    { label: t("sideBar.attribution"), action: "Attribution", icon: <IoFootsteps />, path: "/attribution" },
    // { label: t("sideBar.adType"), action: "Ad Type", image: car, path: "" },

    // { label:t("sideBar.deviceIds"), action: "Device IDs", path: "/device-ids" },
    // { label:t("sideBar.logout"), action: "Log out", path: "/logout" },
  ];

  useEffect(() => {
    const currentPath = locationVal.pathname;
    const matchingMenuItem = menuItems.find((item) => item.path === currentPath);
    if (matchingMenuItem) {
      setSelectedItem(matchingMenuItem.action === "Reports" ? "impressions" : matchingMenuItem.action);
      dispatch({
        type: SET_SELECTED_MENU,
        selectedMenu: matchingMenuItem.action === "Reports" ? "impressions" : matchingMenuItem.action,
      });
    }
  }, []);

  const handleItemClick = (item: { action: string; path: string }) => {
    setSelectedItem(item.action);
    dispatch({
      type: SET_SELECTED_MENU,
      selectedMenu: item.action,
    });
    navigate(item.path);
    if (isMobile) setMenuOpen(false); // Close sidebar on mobile after selecting an item
  };

  const toggleDrawer = () => setMenuOpen(!menuOpen);

  const handleAdTypeSelect = (adType: { label: string; icon: JSX.Element | null }) => {
    console.log("Selected Ad Type:", adType);
    setSelectedAdType(adType);
  };
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
            <h2 style={{ color: theme.palette.primary.contrastText }}>OOHmetrics</h2>
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
            {languages.map((lang: any) => (
              <MenuItem key={lang?.code} value={lang?.code}>
                {`${lang?.name} (${lang?.code.toUpperCase()})`}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <List sx={{ padding: 2 }}>
          <Box sx={{ paddingTop: 1, paddingBottom: 1 }} key={"adType"}>
            <AdType onSelectAdType={handleAdTypeSelect} onOpenSwitchModal={() => console.log("Modal opened")} />
          </Box>
          {menuItems.map((item) =>
            item.action !== "Reports" ? (
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
                    {item.icon ? (
                      <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>{item.icon}</Box>
                    ) : (
                      ""
                      // <img src={item.image} alt={item.label} style={{ width: 25, height: 25, marginRight: 10 }} />
                    )}
                    <ListItemText
                      sx={{
                        color:
                          selectedItem === item.action ? theme.palette.primary.contrastText : theme.palette.text.primary,
                      }}
                      primary={item.label}
                    />
                  </ListItemButton>
                </ListItem>
              </React.Fragment>
            ) : (
              <Box sx={{ paddingBottom: 1 }} key={"Reports"}>
                <ReportsAcc
                  onOpenSwitchModal={(value) => {
                    handleItemClick({ action: value, path: "/reports" });
                  }}
                />
              </Box>
            )
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
