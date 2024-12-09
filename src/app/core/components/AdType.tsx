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
import MovieIcon from "@mui/icons-material/Movie";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SET_SELECTED_ADTYPE } from "../../../store/actions";
import StorageService from "../services/storage.serive";

interface AdTypeProps {
  onOpenSwitchModal: () => void;

  onSelectAdType: (adType: { label: string; icon: JSX.Element | null; value: string }) => void;
}

const AdType: React.FC<AdTypeProps> = ({ onOpenSwitchModal, onSelectAdType }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const storageService = new StorageService();

  const [expanded, setExpanded] = useState<string | false>(false);
  const [expanded2, setExpanded2] = useState<string | false>(false);
  const selectedItem = useSelector((state: any) => state?.selectedAdType);
  const [selectedAdType, setSelectedAdType] = useState<{
    label: string;
    icon: JSX.Element | null;
    value: string;
  }>(selectedItem);

  const handleAccordionChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAccordionChange2 = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded2(isExpanded ? panel : false);
  };

  const handleButtonClick = (label: string, icon: any, value: any) => {
    const selectedVal = { label, icon, value };
    onSelectAdType(selectedVal); // Pass the selected ad type to the parent
    onOpenSwitchModal();
    setExpanded(false);
    setExpanded2(false);
    setSelectedAdType({ label, icon, value });
    dispatch({
      type: SET_SELECTED_ADTYPE,
      selectedAdType: selectedVal,
    });
    storageService.set("local", "adType", value);
  };

  const adTypeConfig = [
    {
      title: t("adtype.Vehicle Ads"),
      options: [
        {
          label: t("adtype.vehicles.Cars"),
          icon: <DirectionsCarIcon style={{ width: "100%", height: "100%" }} />,
          value: "cars",
        },
        {
          label: t("adtype.vehicles.Buses"),
          icon: <DirectionsBusIcon style={{ width: "100%", height: "100%" }} />,
          value: "buses",
        },
        {
          label: t("adtype.vehicles.Trucks"),
          icon: <LocalShippingIcon style={{ width: "100%", height: "100%" }} />,
          value: "trucks",
        },
        {
          label: t("adtype.vehicles.e-scooter"),
          icon: <ElectricScooterIcon style={{ width: "100%", height: "100%" }} />,
          value: "escooters",
        },
        {
          label: t("adtype.vehicles.2-wheelers"),
          icon: <TwoWheelerIcon style={{ width: "100%", height: "100%" }} />,
          value: "twowheelers",
        },
        {
          label: t("adtype.vehicles.autorickshaw"),
          icon: <img src={rickshawIcon} alt="Rickshaw Icon" style={{ width: "120%", height: "120%" }} />,
          value: "autorickshaw",
        },
        {
          label: t("adtype.vehicles.robots"),
          icon: <SmartToyIcon style={{ width: "100%", height: "100%" }} />,
          value: "robots",
        },
      ],
    },
    {
      title: t("adtype.Digital Screens"),
      options: [
        {
          label: t("adtype.digitalScreens.digitalBillboards"),
          icon: <TvIcon style={{ width: "100%", height: "100%" }} />,
          value: "digitalBillboards",
        },
        {
          label: t("adtype.digitalScreens.Car Rooftoppers"),
          icon: <LocalTaxiIcon style={{ width: "100%", height: "100%" }} />,
          value: "carRooftoppers",
        },
        {
          label: t("adtype.digitalScreens.Van Digital Billboards"),
          icon: <LocalShippingIcon style={{ width: "100%", height: "100%" }} />,
          value: "digitalBillboards",
        },
        {
          label: t("adtype.digitalScreens.Backpacks"),
          icon: <HikingIcon style={{ width: "100%", height: "100%" }} />,
          value: "backpacks",
        },
      ],
    },
    {
      title: t("adtype.Mobile Ads"),
      options: [],
      icon: <AdUnitsIcon style={{ width: "100%", height: "100%" }} />,
      value: "mobileAds",
    },
    {
      title: t("adtype.Static Billboards"),
      options: [],
      icon: <FilterFramesIcon style={{ width: "100%", height: "100%" }} />,
      value: "statisBillboards",
    },
    {
      title: t("adtype.Cinema Theater"),
      options: [],
      icon: <MovieIcon style={{ width: "100%", height: "100%" }} />,
      value: "cinemaTheaters",
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
          {icon && <span style={{ marginRight: 8, height: "25px" }}>{icon}</span>}
          {label}
        </Button>
        <Divider component="li" />
      </React.Fragment>
    );
  };

  useEffect(() => {
    const defaultAdTypeValue: any = storageService.get("local", "adType");

    const findDefaultAdType = (adTypeConfig: any[], value: string) => {
      for (const adType of adTypeConfig) {
        // Check at the parent level
        if (adType.value === value) {
          return { label: adType?.title, icon: adType?.icon, value: adType?.value };
        }
        // Check in the nested options array
        if (adType.options?.length) {
          const matchedOption = adType.options.find((option: any) => option.value === value);
          if (matchedOption) {
            return matchedOption;
          }
        }
      }
      return null; // Return null if no match is found
    };

    // Fallback to Cars data if no match is found
    const fallbackAdType = {
      label: t("adtype.vehicles.Cars"),
      icon: <DirectionsCarIcon />,
      value: "cars",
    };

    //const defaultAdType = defaultAdTypeValue ? findDefaultAdType(adTypeConfig, defaultAdTypeValue) || fallbackAdType : fallbackAdType;
    const defaultAdType = (defaultAdTypeValue && findDefaultAdType(adTypeConfig, defaultAdTypeValue)) || fallbackAdType;

    setSelectedAdType(defaultAdType);
    dispatch({
      type: SET_SELECTED_ADTYPE,
      selectedAdType: defaultAdType,
    });
  }, []);

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
            <span style={{ marginRight: 8, height: "25px" }}>{selectedAdType?.icon}</span>
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
                  {icon && <span style={{ marginRight: 8, height: "25px" }}>{icon}</span>}
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
