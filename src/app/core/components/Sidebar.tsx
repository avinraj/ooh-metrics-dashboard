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

import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { FaHighlighter, FaMapMarkerAlt } from "react-icons/fa";
import { IoFootsteps } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../assets/oohlogo.png";
import { languages } from "../../../i18n/languages";
import { SET_SELECTED_MENU } from "../../../store/actions";
import StorageService from "../services/storage.serive";

import AdType from "./AdType";
import ConfirmModal from "./ConfirmModel";
import ReportsAcc from "./Reports";

const Sidebar = () => {
  const locationVal = useLocation();
  const dispatch = useDispatch();

  const storageService = new StorageService();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("Highlight");
  const [modalOpen, setModalOpen] = useState(false);

  const { t, i18n } = useTranslation();
  const defaultLang = storageService.get("local", "i18nextLng", false);
  const [language, setLanguage] = useState(defaultLang ? defaultLang : "en");

  const handleLanguageChange = (event: any) => {
    const selectedLanguage = event.target.value as string;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);

    // Adjust RTL if Arabic is selected
    document.body.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
    window.location.reload();
  };

  const { selectedAdType } = useSelector((state: any) => state?.selectedAdType);

  const [menuItems, setMenuItems] = useState([
    {
      label: t("sideBar.highlight"),
      action: "Highlight",
      icon: <FaHighlighter />,
      path: "/highlight",
    },
    {
      label: t("sideBar.reports"),
      action: "Reports",
      icon: <AssessmentIcon />,
      path: "/reports",
    },
    {
      label: t("sideBar.mapView"),
      action: "Map View",
      icon: <FaMapMarkerAlt />,
      path: "/map-view",
    },
    {
      label: t("sideBar.attribution"),
      action: "Attribution",
      icon: <IoFootsteps />,
      path: "/attribution",
    },
    // { label: t("sideBar.adType"), action: "Ad Type", image: car, path: "" },

    // { label:t("sideBar.deviceIds"), action: "Device IDs", path: "/device-ids" },
    {
      label: t("sideBar.logout"),
      action: "Logout",
      icon: <LogoutIcon />,
      path: "",
    },
  ]);

  useEffect(() => {
    if (selectedAdType?.value === "mobileAds") {
      setMenuItems((prevItems) => {
        const updatedItems = [...prevItems.filter((item) => item.action !== "Audience")];
        updatedItems.splice(4, 0, {
          label: t("audience.audience"),
          action: "Audience",
          icon: <GroupsIcon />,
          path: "/audience",
        });
        return updatedItems;
      });
    } else {
      setMenuItems((prevItems) => prevItems.filter((item) => item.action !== "Audience"));
    }
    setMenuItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.action !== "Vehicles");
      updatedItems.splice(2, 0, {
        label: selectedAdType?.label,
        action: "Vehicles",
        icon: selectedAdType?.icon,
        path: "/vehicles",
      });
      return updatedItems;
    });
  }, [selectedAdType]);

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
    if (item.action !== "Logout") {
      setSelectedItem(item.action);
      dispatch({
        type: SET_SELECTED_MENU,
        selectedMenu: item.action,
      });
      navigate(item.path);
      if (isMobile) setMenuOpen(false);
    } else setModalOpen(true);
  };

  const onLogout = async () => {
    storageService.remove("local", "token");
    navigate("/");
  };
  const toggleDrawer = () => setMenuOpen(!menuOpen);

  const handleAdTypeSelect = (adType: { label: string; icon: JSX.Element | null; value: string }) => {
    console.log("Selected Ad Type:", adType);
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
          width: isMobile || language === "ar" ? 0 : "18%",
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
        <List sx={{ padding: 2 }} key={"adType"}>
          <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
            <AdType onSelectAdType={handleAdTypeSelect} onOpenSwitchModal={() => {}} />
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
                    {item.icon && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: 2,
                          height: "25px",
                        }}
                      >
                        {item.icon}
                      </Box>
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
              <Box sx={{ paddingBottom: 1 }} key={item?.label}>
                <ReportsAcc
                  icon={<RemoveRedEyeOutlinedIcon style={{ marginRight: 13 }} />} // Add the icon here
                  onOpenSwitchModal={(value) => {
                    handleItemClick({ action: value, path: "/reports" });
                  }}
                />
              </Box>
            )
          )}
        </List>
      </Drawer>
      <ConfirmModal
        open={modalOpen}
        message="Are you sure you want to log out?"
        onConfirm={() => onLogout()}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;
