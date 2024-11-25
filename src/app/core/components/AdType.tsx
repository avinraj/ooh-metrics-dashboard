import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Typography, useTheme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ElectricScooterIcon from "@mui/icons-material/ElectricScooter";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import { useTranslation } from "react-i18next";

interface AdTypeProps {
  onOpenSwitchModal: () => void;
  onSelectAdType: (adType: { label: string; icon: JSX.Element | null }) => void;
}

const AdType: React.FC<AdTypeProps> = ({ onOpenSwitchModal, onSelectAdType }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [expanded2, setExpanded2] = useState<string | false>(false);
  const [selectedAdType, setSelectedAdType] = useState<{ label: string; icon: JSX.Element | null }>({
    label: "Cars",
    icon: <DirectionsCarIcon />,
  });

  const handleAccordionChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAccordionChange2 = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded2(isExpanded ? panel : false);
  };

  const handleButtonClick = (value: string, icon: JSX.Element | null) => {
    const selectedAdType = { label: value, icon };
    onSelectAdType(selectedAdType); // Pass the selected ad type to the parent
    onOpenSwitchModal();
    setExpanded(false);
    setExpanded2(false);
    setSelectedAdType({ label: value, icon });
  };

  const adTypeConfig = [
    {
      title: t("adtype.Vehicle Ads"),
      options: [
        { label: t("adtype.vehicles.Cars"), icon: <DirectionsCarIcon /> },
        { label: t("adtype.vehicles.Buses"), icon: <DirectionsBusIcon /> },
        { label: t("adtype.vehicles.Trucks"), icon: <LocalShippingIcon /> },
        { label: t("adtype.vehicles.e-scooter"), icon: <ElectricScooterIcon /> },
        { label: t("adtype.vehicles.2-wheelers"), icon: <TwoWheelerIcon /> },
      ],
    },
    {
      title: t("adtype.Digital Screens"),
      options: [
        { label: t("adtype.digitalScreens.digitalBillboards"), icon: <DirectionsCarIcon /> },
        { label: t("adtype.digitalScreens.Car Rooftoppers"), icon: <DirectionsCarIcon /> },
        { label: t("adtype.digitalScreens.Van Digital Billboards"), icon: <LocalShippingIcon /> },
        { label: t("adtype.digitalScreens.Backpacks"), icon: <LocalShippingIcon /> },
      ],
    },
    {
      title: t("adtype.Mobile Ads"),
      options: [],
    },
    {
      title: t("adtype.Static Billboards"),
      options: [],
    },
  ];
  const renderButton = (label: string, icon: JSX.Element | null) => {
    const isSelected = selectedAdType.label === label;

    return (
      <>
        <Button
          type="button"
          onClick={() => handleButtonClick(label, icon)}
          sx={{
            fontWeight: "bold",
            textAlign: "start",
            fontSize: isSelected ? "20px" : "13px",
            color: "black",
            backgroundColor: "transparent",
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
      </>
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
          {adTypeConfig.map(({ title, options }) => (
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
                <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontSize: "15px" }}>
                  {title}
                </Typography>
              </AccordionSummary>
              {options.length > 0 && (
                <AccordionDetails>{options.map(({ label, icon }) => renderButton(label, icon))}</AccordionDetails>
              )}
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AdType;
