import AdUnitsIcon from "@mui/icons-material/AdUnits";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ElectricScooterIcon from "@mui/icons-material/ElectricScooter";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HikingIcon from "@mui/icons-material/Hiking";
import rickshawIcon from "../../../assets/auto-rickshaw.svg";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import TvIcon from "@mui/icons-material/Tv";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import MovieIcon from "@mui/icons-material/Movie";
import { LuPopcorn } from "react-icons/lu";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SET_SELECTED_ADTYPE } from "../../../store/actions";

interface AdTypeProps {
  onOpenSwitchModal: () => void;
  onSelectAdType: (adType: { label: string; icon: JSX.Element | null; value: string }) => void;
}

const AdType: React.FC<AdTypeProps> = ({ onOpenSwitchModal, onSelectAdType }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [expanded2, setExpanded2] = useState<string | false>(false);
  const selectedItem = useSelector((state: any) => state?.selectedAdType);
  const [selectedAdType, setSelectedAdType] = useState<{ label: string; icon: JSX.Element | null; value: string }>(
    selectedItem
  );

  const handleAccordionChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAccordionChange2 = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded2(isExpanded ? panel : false);
  };

  const handleButtonClick = (label: string, icon: any, value: any) => {
    const selectedAdType = { label, icon, value };
    onSelectAdType(selectedAdType); // Pass the selected ad type to the parent
    onOpenSwitchModal();
    setExpanded(false);
    setExpanded2(false);
    setSelectedAdType({ label, icon, value });
    dispatch({
      type: SET_SELECTED_ADTYPE,
      selectedAdType: selectedAdType,
    });
  };

  const adTypeConfig = [
    {
      title: t("adtype.Vehicle Ads"),
      options: [
        { label: t("adtype.vehicles.Cars"), icon: <DirectionsCarIcon />, value: "cars" },
        { label: t("adtype.vehicles.Buses"), icon: <DirectionsBusIcon />, value: "buses" },
        { label: t("adtype.vehicles.Trucks"), icon: <LocalShippingIcon />, value: "trucks" },
        { label: t("adtype.vehicles.e-scooter"), icon: <ElectricScooterIcon />, value: "escooters" },
        { label: t("adtype.vehicles.2-wheelers"), icon: <TwoWheelerIcon />, value: "twowheelers" },
        {
          label: t("adtype.vehicles.Rickshaws"),
          icon: <img src={rickshawIcon} alt="Rickshaw Icon" style={{ width: 24, height: 24 }} />,
          value: "rickshaws",
        },
        { label: t("adtype.vehicles.Robots"), icon: <SmartToyIcon />, value: "robots" },
      ],
    },
    {
      title: t("adtype.Digital Screens"),
      options: [
        { label: t("adtype.digitalScreens.digitalBillboards"), icon: <TvIcon />, value: "digitalBillboards" },
        { label: t("adtype.digitalScreens.Car Rooftoppers"), icon: <LocalTaxiIcon />, value: "carRooftoppers" },
        {
          label: t("adtype.digitalScreens.Van Digital Billboards"),
          icon: <LocalShippingIcon />,
          value: "vanBillboards",
        },
        { label: t("adtype.digitalScreens.Backpacks"), icon: <HikingIcon />, value: "backpacks" },
      ],
    },
    {
      title: t("adtype.Mobile Ads"),
      options: [],
      icon: <AdUnitsIcon />,
      value: "mobileAds",
    },
    {
      title: t("adtype.Cinema Theater"),
      options: [],
      icon: <MovieIcon />,
      value: "mobileAds",
    },
    {
      title: t("adtype.Static Billboards"),
      options: [],
      icon: <FilterFramesIcon />,
      value: "staticBillboards",
    },
  ];
  const renderButton = (label: string, icon: JSX.Element | null, value: string) => {
    const isSelected = selectedAdType?.label === label;

    return (
      <React.Fragment key={label}>
        <Button
          type="button"
          onClick={() => handleButtonClick(label, icon, value)}
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
            {selectedAdType?.icon}
            <span style={{ marginLeft: selectedAdType?.icon ? 8 : 0 }}>
              {selectedAdType?.label ? selectedAdType.label && t("sideBar.adType") : t("sideBar.adType")}
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {adTypeConfig.map(({ title, options, icon, value }) => (
            <Accordion
              key={title}
              elevation={0}
              expanded={expanded2 === title}
              onChange={handleAccordionChange2(title)}
              sx={{ backgroundColor: theme.palette.secondary.main }}
            >
              <AccordionSummary
                onClick={() => (!options?.length ? handleButtonClick(title, icon, value) : null)}
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
                  {options.map(({ label, icon, value }) => renderButton(label, icon, value))}
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
