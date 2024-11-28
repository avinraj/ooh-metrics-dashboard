import React, { useState, useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Typography, useTheme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ElectricScooterIcon from "@mui/icons-material/ElectricScooter";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import { useTranslation } from "react-i18next";
import HikingIcon from "@mui/icons-material/Hiking";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { useDispatch } from "react-redux";
import { SET_SELECTED_ADTYPE } from "../../../store/actions";
import { useNavigate } from "react-router-dom";
import TvIcon from "@mui/icons-material/Tv";

interface AdTypeProps {
  onOpenSwitchModal: () => void;
  onSelectAdType: (adType: { label: string; icon: JSX.Element | null }) => void;
}

const AdType: React.FC<AdTypeProps> = ({ onOpenSwitchModal, onSelectAdType }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [expanded2, setExpanded2] = useState<string | false>(false);
  const options = [
    { label: t("adtype.vehicles.Cars"), icon: <DirectionsCarIcon />, path: "/cars" },
    { label: t("adtype.vehicles.Buses"), icon: <DirectionsBusIcon />, path: "/buses" },
    { label: t("adtype.vehicles.Trucks"), icon: <LocalShippingIcon />, path: "/trucks" },
    { label: t("adtype.vehicles.e-scooter"), icon: <ElectricScooterIcon />, path: "/escooters" },
    { label: t("adtype.vehicles.2-wheelers"), icon: <TwoWheelerIcon />, path: "/twowheelers" },
  ];
  const selectedItem = options.filter((item) => item.path === window.location.pathname);
  const [selectedAdType, setSelectedAdType] = useState<{ label: string; icon: JSX.Element | null; path: string }>(
    selectedItem[0]
  );
  useEffect(() => {
    if (selectedAdType) {
      dispatch({ type: SET_SELECTED_ADTYPE, selectedAdType: selectedAdType });
    }
  }, [selectedAdType, dispatch]);

  const handleAccordionChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAccordionChange2 = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded2(isExpanded ? panel : false);
  };

  const handleButtonClick = (value: string, icon: JSX.Element | null, path: string) => {
    const selectedAdType = { label: value, icon };
    onSelectAdType(selectedAdType); // Pass the selected ad type to the parent
    onOpenSwitchModal();
    setExpanded(false);
    setExpanded2(false);
    setSelectedAdType({ label: value, icon, path });
    dispatch({
      type: SET_SELECTED_ADTYPE,
      selectedAdType: selectedAdType,
    });

    // localStorage.setItem("adtype", selectedAdType.label);
    navigate(path);
  };

  const adTypeConfig = [
    {
      title: t("adtype.Vehicle Ads"),
      options: [
        { label: t("adtype.vehicles.Cars"), icon: <DirectionsCarIcon />, path: "/cars" },
        { label: t("adtype.vehicles.Buses"), icon: <DirectionsBusIcon />, path: "/buses" },
        { label: t("adtype.vehicles.Trucks"), icon: <LocalShippingIcon />, path: "/trucks" },
        { label: t("adtype.vehicles.e-scooter"), icon: <ElectricScooterIcon />, path: "/escooters" },
        { label: t("adtype.vehicles.2-wheelers"), icon: <TwoWheelerIcon />, path: "/twowheelers" },
      ],
    },
    {
      title: t("adtype.Digital Screens"),
      options: [
        { label: t("adtype.digitalScreens.digitalBillboards"), icon: <TvIcon />, path: "" },
        { label: t("adtype.digitalScreens.Car Rooftoppers"), icon: <LocalTaxiIcon />, path: "" },
        { label: t("adtype.digitalScreens.Van Digital Billboards"), icon: <LocalShippingIcon />, path: "" },
        { label: t("adtype.digitalScreens.Backpacks"), icon: <HikingIcon />, path: "" },
      ],
    },
    {
      title: t("adtype.Mobile Ads"),
      options: [],
      icon: <AdUnitsIcon />,
    },
    {
      title: t("adtype.Static Billboards"),
      options: [],
      icon: <LightbulbIcon />,
    },
  ];
  const renderButton = (label: string, icon: JSX.Element | null, path: string) => {
    const isSelected = selectedAdType.label === label;

    return (
      <React.Fragment key={label}>
        <Button
          type="button"
          onClick={() => handleButtonClick(label, icon, path)}
          sx={{
            fontWeight: "bold",
            textAlign: "start",
            fontSize: "13px",
            color: "black",
            backgroundColor: isSelected ? theme.palette.primary.main : "transparent",
            padding: "8px 0",
            textTransform: "none",
            width: "100%",
            justifyContent: "start",
            display: "flex",
            alignItems: "center", // Ensure icon alignment
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
            },
          }}
        >
          {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
          {label}
        </Button>
        <Divider component="li" />
      </React.Fragment>
    );
  };

  return (
    <div>
      <Accordion
        elevation={0}
        variant="outlined"
        sx={{
          background: "transparent",
          borderColor: theme.palette.text.disabled,
        }}
        expanded={expanded === "adType"}
        onChange={handleAccordionChange("adType")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ color: "black", display: "flex", alignItems: "center" }}>
            {selectedAdType.icon}
            <span style={{ marginLeft: selectedAdType.icon ? 8 : 0 }}>
              {selectedAdType.label ? selectedAdType.label && t("sideBar.adType") : t("sideBar.adType")}
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {adTypeConfig.map(({ title, options, icon }) => (
            <Accordion
              key={title}
              elevation={0}
              expanded={expanded2 === title}
              onChange={handleAccordionChange2(title)}
              sx={{ backgroundColor: theme.palette.secondary.main }}
            >
              <AccordionSummary
                expandIcon={options.length ? <ExpandMoreIcon sx={{ color: theme.palette.text.primary }} /> : null}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
                  {title}
                </Typography>
              </AccordionSummary>
              {options.length > 0 && (
                <AccordionDetails>
                  {options.map(({ label, icon, path }) => renderButton(label, icon, path))}
                </AccordionDetails>
              )}
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AdType;
