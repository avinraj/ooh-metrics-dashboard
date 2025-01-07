import { Box, Card, Grid, Typography, useTheme } from "@mui/material";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import HikingIcon from "@mui/icons-material/Hiking";
import ElectricScooterIcon from "@mui/icons-material/ElectricScooter";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import TvIcon from "@mui/icons-material/Tv";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import MovieIcon from "@mui/icons-material/Movie";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// Import assets
import carIcon from "../../assets/images__1_-removebg-preview copy.png";
import adIcon from "../../assets/addIcon.png";
import impressionIcon from "../../assets/impressions.png";
import ctrIcon from "../../assets/ctr.png";
import meterIcon from "../../assets/speed-meter-outline-512.webp";
import autoIcon from "../../assets/auto-rickshaw.svg";

const adTypeData: any = {
  cars: { label: "TOTAL CARS", icon: carIcon },
  buses: { label: "TOTAL BUSES", icon: DirectionsBusIcon },
  trucks: { label: "TOTAL TRUCKS", icon: LocalShippingIcon },
  escooters: { label: "TOTAL E-SCOOTERS", icon: ElectricScooterIcon },
  twowheelers: { label: "TOTAL 2-WHEELERS", icon: TwoWheelerIcon },
  autorickshaw: { label: "TOTAL RICKSHAWS", icon: autoIcon },
  robots: { label: "TOTAL ROBOTS", icon: SmartToyIcon },
  digitalBillboards: { label: "TOTAL DIGITAL BILLBOARDS", icon: TvIcon },
  carRooftoppers: { label: "TOTAL CAR ROOFTOPPERS", icon: LocalTaxiIcon },
  vanBillboards: { label: "TOTAL VAN BILLBOARDS", icon: LocalShippingIcon },
  backpacks: { label: "TOTAL HUMANS", icon: HikingIcon },
  mobileAds: { label: "TOTAL IMPRESSIONS", icon: AdUnitsIcon },
  staticBillboards: { label: "TOTAL SCREENS", icon: FilterFramesIcon },
  cinemaTheaters: { label: "TOTAL CINEMA THEATRES", icon: MovieIcon },
};

const HighLight = () => {
  const theme = useTheme();
  const { selectedAdType } = useSelector((state: any) => state?.selectedAdType);
  console.log(selectedAdType, "Ad Type");
  const { t } = useTranslation();

  // Extract the current ad type's data
  const currentAdType = adTypeData[selectedAdType?.value] || {
    label: "",
    icon: carIcon,
  };

  console.log(currentAdType, "Current");

  // Cards Data
  const cards = [
    {
      value: 25,
      label: currentAdType.label,
      icon: currentAdType.icon,
    },
    {
      value: "33,500 miles",
      label:
        selectedAdType?.value === "mobileAds" ? "TOTAL CLICKS" : "TOTAL MILES",
      icon: selectedAdType?.value === "mobileAds" ? AdsClickIcon : meterIcon,
    },
    {
      value: "1,103,500 m",
      label:
        selectedAdType?.value === "mobileAds"
          ? "TOTAL REACH"
          : "TOTAL IMPRESSIONS",
      icon: selectedAdType?.value === "mobileAds" ? impressionIcon : adIcon,
    },
    {
      value: 33,
      label:
        selectedAdType?.value === "mobileAds" ? "CTR" : "IMPRESSIONS PER MILE",
      icon: selectedAdType?.value === "mobileAds" ? ctrIcon : impressionIcon,
    },
  ];

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: theme.palette.primary.dark,
          width: "100%",
          height: "100vh",
          padding: 1,
        }}
      >
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Typography variant="h3" color={theme.palette.text.primary}>
            {t("highlights.welcome")}, Zoho
          </Typography>
        </Grid>

        {/* Highlight Title */}
        <Grid item xs={12}>
          <Box mt={7}>
            <Typography variant="h3" color={theme.palette.text.primary}>
              <Box sx={{ display: "inline-block", padding: "0 8px" }}>
                {t("highlights.highlight")}
              </Box>
            </Typography>
          </Box>
        </Grid>

        {/* Cards Section */}
        <Grid
          container
          item
          xs={12}
          spacing={4}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          mt={7}
        >
          {cards.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  backgroundColor: "#DEDEDE",
                  padding: 2,
                  textAlign: "center",
                }}
              >
                {/* Value */}
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color={theme.palette.primary.contrastText}
                >
                  {item.value}
                </Typography>

                {/* Icon */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  {typeof item.icon === "string" ? (
                    <img
                      src={item.icon}
                      alt={item.label}
                      width={120}
                      height={120}
                    />
                  ) : (
                    <item.icon style={{ fontSize: 120 }} />
                  )}
                </Box>

                {/* Label */}
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.dark,
                    mt: 2,
                    border: "1px solid black",
                    borderRadius: 3,
                    padding: "4px 8px",
                  }}
                >
                  <Typography variant="h6" color={theme.palette.text.primary}>
                    <b>{item.label}</b>
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HighLight;
