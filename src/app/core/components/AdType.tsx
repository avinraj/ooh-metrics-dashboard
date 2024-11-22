import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface AdTypeProps {
  onOpenSwitchModal: () => void;
}

const AdType: React.FC<AdTypeProps> = ({ onOpenSwitchModal }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [expanded2, setExpanded2] = useState<string | false>(false);

  const handleAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      // const panelExists = adTypeConfig.some(({ options }) =>
      //   options.includes(panel)
      // );
      // console.log(panelExists)
      // if (panelExists) {
      //   setExpanded(false);
      // }else setExpanded(panel);
    };
  const handleAccordionChange2 =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
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
    console.log(value);
    onOpenSwitchModal();
    setExpanded(false);
    setExpanded2(false);
  };

  const buttonStyle = {
    fontWeight: "bold",
    textAlign: "start",
    fontSize: "13px",
    color: theme.palette.text.primary,
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
      title: t("adtype.Vehicle Ads"),
      options: [
        t("adtype.vehicles.Cars"),
        t("adtype.vehicles.Buses"),
        t("adtype.vehicles.Trucks"),
        t("adtype.vehicles.Robots"),
        t("adtype.vehicles.e-scooter"),
        t("adtype.vehicles.Rickshaws"),
        t("adtype.vehicles.2-wheelers"),
      ],
    },
    {
      title: t("adtype.Digital Screens"),
      options: [
        t("adtype.digitalScreens.digitalBillboards"),
        t("adtype.digitalScreens.Car Rooftoppers"),
        t("adtype.digitalScreens.Van Digital Billboards"),
        t("adtype.digitalScreens.Backpacks"),
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
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: theme.palette.text.primary}} />}>
          <Typography sx={{ color: theme.palette.text.primary }}>{t("sideBar.adType")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {adTypeConfig.map(({ title, options }) => (
            <Accordion
              key={title}
              elevation={0}
              expanded={expanded2 === title}
              onChange={handleAccordionChange2(title)}
              sx={{backgroundColor: theme.palette.secondary.main}}
            >
              <AccordionSummary
                expandIcon={options.length ? <ExpandMoreIcon sx={{color: theme.palette.text.primary}} /> : null}
              >
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.primary, fontSize: "15px" }}
                >
                  {title}
                </Typography>
              </AccordionSummary>
              {options.length > 0 && (
                <AccordionDetails>
                  {options.map((option) => renderButton(option))}
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
