import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Typography, useTheme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ElectricScooterIcon from "@mui/icons-material/ElectricScooter";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";

interface AdTypeProps {
  onOpenSwitchModal: () => void;
  onSelectAdType: (adType: { label: string; icon: JSX.Element | null }) => void;
}

const AdType: React.FC<AdTypeProps> = ({ onOpenSwitchModal, onSelectAdType }) => {
  const theme = useTheme();
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
      title: "Vehicle Wraps",
      options: [
        { label: "Cars", icon: <DirectionsCarIcon /> },
        { label: "Buses", icon: <DirectionsBusIcon /> },
        { label: "Trucks", icon: <LocalShippingIcon /> },
        { label: "E-scooter", icon: <ElectricScooterIcon /> },
        { label: "2-wheelers", icon: <TwoWheelerIcon /> },
      ],
    },
    {
      title: "Digital Screens",
      options: [
        { label: "Car Rooftoppers", icon: <DirectionsCarIcon /> },
        { label: "Van Digital Billboards", icon: <LocalShippingIcon /> },
      ],
    },
    {
      title: "Mobile Ads",
      options: [],
    },
    {
      title: "Static Billboards",
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
        sx={{ background: "transparent" }}
        expanded={expanded === "adType"}
        onChange={handleAccordionChange("adType")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ color: "black", display: "flex", alignItems: "center" }}>
            {selectedAdType.icon}
            <span style={{ marginLeft: selectedAdType.icon ? 8 : 0 }}>
              {selectedAdType.label ? selectedAdType.label && "Ad Type" : "Ad Type"}
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {adTypeConfig.map(({ title, options }) => (
            <Accordion key={title} elevation={0} expanded={expanded2 === title} onChange={handleAccordionChange2(title)}>
              <AccordionSummary expandIcon={options.length ? <ExpandMoreIcon /> : null}>
                <Typography variant="body1" sx={{ color: "black", fontSize: "15px" }}>
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
