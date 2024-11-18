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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

import logo from "../../../assets/oohlogo.png";
import car from "../../../assets/1023401.png";
import audience from "../../../assets/audience-removebg-preview.png";
import eye from "../../../assets/eye.png";
import location from "../../../assets/location.png";
import carLogo from "../../../assets/car-removebg-preview.png";
import AdType from "./AdType";

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("Highlight");

  const menuItems = [
    { label: "Ad Type", action: "Ad Type", image: car, path: "/ad-type" },
    { label: "Highlight", action: "Highlight", path: "/highlight" },
    { label: "Reports", action: "Reports", image: eye, path: "/reports" },
    { label: "Audience", action: "Audience", image: audience, path: "/audience" },
    { label: "Map View", action: "Map View", image: location, path: "/map-view" },
    { label: "Cars", action: "Cars", image: carLogo, path: "/cars" },
    { label: "Attribution", action: "Attribution", path: "/attribution" },
    { label: "Device IDs", action: "Device IDs", path: "/device-ids" },
    { label: "Log out", action: "Log out", path: "/logout" },
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
          sx={{ position: "absolute", top: 16, left: 16 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={!isMobile || menuOpen}
        onClose={toggleDrawer}
        sx={{
          width: isMobile ? 0 : 220,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 220,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            backgroundColor: theme.palette.primary.main,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          <img src={logo} alt="OOH Logo" style={{ marginRight: 10, height: "40px" }} />
          <h2 style={{ color: theme.palette.primary.contrastText }}>OOH METRICS</h2>
        </Box>
        <List sx={{ padding: 2 }}>
          {menuItems.map((item) => (
            <React.Fragment key={item.label}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleItemClick(item)}
                  sx={{
                    backgroundColor:
                      selectedItem === item.action
                        ? theme.palette.primary.main
                        : theme.palette.background.default,
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
                    <img
                      src={item.image}
                      alt={item.label}
                      style={{ width: 54, height: 54, marginRight: 10 }}
                    />
                  )}
                  <ListItemText
                    sx={{
                      color:
                        selectedItem === item.action
                          ? theme.palette.primary.contrastText
                          : theme.palette.text.primary,
                    }}
                    primary={item.label}
                  />
                </ListItemButton>
              </ListItem>
              {selectedItem === "Ad Type" && item.action === "Ad Type" && (
                <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
                  <AdType />
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
