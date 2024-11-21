import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

interface AdTypeProps {
  onOpenSwitchModal: () => void;
}

const AdType: React.FC<AdTypeProps> = ({ onOpenSwitchModal }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [expanded2, setExpanded2] = useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
    // const panelExists = adTypeConfig.some(({ options }) =>
    //   options.includes(panel)
    // );
    // console.log(panelExists)
    // if (panelExists) {
    //   setExpanded(false);
    // }else setExpanded(panel);
  };
  const handleAccordionChange2 = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded2(isExpanded ? panel : false);
    // const panelExists = adTypeConfig.some(({ options }) =>
    //   options.includes(panel)
    // );
    // console.log(panelExists)
    // if (panelExists) {
    //   setExpanded(false);
    // }else setExpanded(panel);
  };

  const handleButtonClick = (value: string) => {
    console.log(value)
    onOpenSwitchModal();
    setExpanded(false);
    setExpanded2(false);
  };

  const buttonStyle = {
    fontWeight: "bold",
    textAlign: "start",
    fontSize: "13px",
    color: "black",
    padding: "8px 0",
    textTransform: "none",
    width: "100%",
    justifyContent: "start",
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  };

  const renderButton = (label: string) => (
    <div key={label}>
      <Button
        type="button"
        onClick={() => {
          handleButtonClick(label);
        }}
        sx={buttonStyle}
      >
        {label}
      </Button>
      <Divider component="li" />
    </div>
  );

  const adTypeConfig = [
    {
      title: "Vehicle Wraps",
      options: ["Cars", "Buses", "Trucks", "Robots", "E-scooter", "Rickshaws", "2-wheelers"],
    },
    {
      title: "Digital Screens",
      options: ["Car Rooftoppers", "Van Digital Billboards", "Backpack Billboards"],
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
          <Typography sx={{ color: "black" }}>Ad Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {adTypeConfig.map(({ title, options }) => (
            <Accordion key={title} elevation={0} expanded={expanded2 === title} onChange={handleAccordionChange2(title)}>
              <AccordionSummary expandIcon={options.length ? <ExpandMoreIcon /> : null}>
                <Typography variant="body1" sx={{ color: "black", fontSize: "15px" }}>
                  {title}
                </Typography>
              </AccordionSummary>
              {options.length > 0 && <AccordionDetails>{options.map((option) => renderButton(option))}</AccordionDetails>}
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AdType;
