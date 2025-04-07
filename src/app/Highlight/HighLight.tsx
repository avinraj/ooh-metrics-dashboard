import { Box, Card, Grid, Typography, useTheme } from "@mui/material";
// import AdsClickIcon from "@mui/icons-material/AdsClick";
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
// import ctrIcon from "../../assets/ctr.png";
import meterIcon from "../../assets/speed-meter-outline-512.webp";
import autoIcon from "../../assets/auto-rickshaw.svg";
import StorageService from "../core/services/storage.serive";
import { duroflexEmail } from "../../Data/users";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import SpeedIcon from "@mui/icons-material/Speed";

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
  const storageService = new StorageService();
  const email = storageService.get("local", "email");

  // Extract the current ad type's data
  const currentAdType = adTypeData[selectedAdType?.value] || {
    label: "",
    icon: carIcon,
  };

  console.log(currentAdType, "Current");

  // Cards Data
  const cards = [
    // {
    //   value: 25,
    //   label: currentAdType.label,
    //   icon: currentAdType.icon,
    // },
    {
      value: "203,054",
      label: "UNIQUE USER REACH",
      icon: PeopleIcon,
    },
    {
      value: "23%",
      label:
        selectedAdType?.value === "mobileAds" ? "CAMPAIGN PACING" : "TOTAL MILES",
      icon: selectedAdType?.value === "mobileAds" ?  SpeedIcon : meterIcon,
    },
    {
      value: "173,333.29",
      label:
        selectedAdType?.value === "mobileAds"
          ? "TOTAL BUDGET"
          : "TOTAL IMPRESSIONS",
      icon: selectedAdType?.value === "mobileAds" ? AttachMoneyIcon : adIcon,
    },
    {
      value:" 1,333,333",
      label:
        selectedAdType?.value === "mobileAds" ? "TOTAL IMPRESSION GOAL" : "IMPRESSIONS PER MILE",
      icon: selectedAdType?.value === "mobileAds" ? impressionIcon : impressionIcon,
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
          height: "97vh",
          padding: 1,
        }}
      >
        {/* Highlight Title */}
        <Grid item xs={12}>
          <Box mt={3}>
            <Typography variant="h3" color={theme.palette.text.primary}>
              <Box sx={{ display: "inline-block", padding: "0 8px" }}>
                {t("highlights.highlight")}
              </Box>
            </Typography>
          </Box>
        </Grid>

        {/* campaign card */}
        {email === duroflexEmail && (
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
            mt={1}
          >
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  backgroundColor: "#DEDEDE",
                  padding: 2,
                  textAlign: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ textAlign: "start" }}>
                      Campaign Name:
                    </div>{" "}
                    <strong>Duroflex April Campaign</strong>
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ textAlign: "start" }}>
                      Campaign Duration:
                    </div>{" "}
                    <strong> 24-03-2025 to 24-04-2025</strong>
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ textAlign: "start" }}>
                      Campaign Type:
                    </div>
                    <strong> Mobile Ads</strong>
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ textAlign: "start" }}>Location:</div>
                    <strong>19 Duroflex Stores</strong>
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ textAlign: "start" }}>
                      Competitor Targeting:
                    </div>{" "}
                    <strong> YES</strong>
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ textAlign: "start" }}>
                      Tracking URL:
                    </div>{" "}
                    <strong> YES</strong>
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ textAlign: "start" }}>
                      Footfall Analysis:
                    </div>{" "}
                    <strong> YES</strong>
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        )}

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
          mt={1}
        >
          {cards.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  backgroundColor: "#DEDEDE",
                  padding: 2,
                  height: "250px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                {/* Value */}
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color={theme.palette.primary.contrastText}
                  sx={{ mt: 1 }}
                >
                  {item.value}
                </Typography>

                {/* Icon */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexGrow: 1,
                    mt: 1,
                  }}
                >
                  {typeof item.icon === "string" ? (
                    <img
                      src={item.icon}
                      alt={item.label}
                      width={60}
                      height={60}
                      style={{ objectFit: "contain" }}
                    />
                  ) : (
                    <item.icon style={{ fontSize: 60, color: "black" }} />
                  )}
                </Box>

                {/* Label */}
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.dark,
                    mt: 2,
                    border: "2px solid black",
                    borderRadius: "3px",
                    padding: "6px 12px",
                    width: "100%",
                  }}
                >
                  <Typography variant="body1" color={theme.palette.text.primary}>
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
