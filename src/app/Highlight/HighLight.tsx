import { Box, Card, Grid, Typography, useTheme } from "@mui/material";
import car from "../../assets/images__1_-removebg-preview copy.png";
import adIcon from "../../assets/addIcon.png";
import impression from "../../assets/impressions.png";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ctr from "../../assets/ctr.png";
import meter from "../../assets/speed-meter-outline-512.webp";
import autoIcon from "../../assets/auto-rickshaw.svg";
import HikingIcon from "@mui/icons-material/Hiking";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const HighLight = () => {
  const theme = useTheme();
  const { selectedAdType } = useSelector((state: any) => state?.selectedAdType);

  const { t } = useTranslation();
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
        <Grid item xs={12}>
          <Typography variant="h3" color={theme.palette.text.primary}>
            {" "}
            {t("highlights.welcome")}, Zoho
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box mt={7}>
            <Typography variant="h3" color={theme.palette.text.primary}>
              <Box sx={{ display: "inline-block", padding: "0 8px" }}>{t("highlights.highlight")}</Box>
            </Typography>
          </Box>
        </Grid>

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
          {[
            {
              value: 25,
              label:
                selectedAdType?.value === "cars"
                  ? "TOTAL CARS"
                  : selectedAdType?.value === "buses"
                  ? "TOTAL BUSES"
                  : selectedAdType?.value === "trucks"
                  ? "TOTAL TRUCKS"
                  : selectedAdType?.value === "escooters"
                  ? "TOTAL E-SCOOTER"
                  : selectedAdType?.value === "twowheelers"
                  ? "TOTAL 2-WHEELERS"
                  : selectedAdType?.value === "rickshaws"
                  ? "TOTAL RICKSHAWS"
                  : selectedAdType?.value === "robots"
                  ? "TOTAL ROBOTS"
                  : selectedAdType?.value === "digitalBillboards"
                  ? "TOTAL DIGITAL BILLBOARDS"
                  : selectedAdType?.value === "carRooftoppers"
                  ? "TOTAL CAR ROOFTOPPERS"
                  : selectedAdType?.value === "vanBillboards"
                  ? "TOTAL VAN BILLBOARDS"
                  : selectedAdType?.value === "backpacks"
                  ? "TOTAL HUMANS"
                  : selectedAdType?.value === "mobileAds"
                  ? "TOTAL IMPRESSIONS"
                  : selectedAdType?.value === "staticBillboards"
                  ? "TOTAL SCREENS"
                  : "",
              icon:
                selectedAdType?.value === "robots"
                  ? SmartToyIcon
                  : selectedAdType?.value === "staticBillboards"
                  ? FilterFramesIcon
                  : selectedAdType?.value === "trucks"
                  ? LocalShippingIcon
                  : selectedAdType?.value === "buses"
                  ? DirectionsBusIcon
                  : selectedAdType?.value === "twowheelers"
                  ? TwoWheelerIcon
                  : selectedAdType?.value === "backpacks"
                  ? HikingIcon
                  : selectedAdType?.value === "rickshaws"
                  ? autoIcon
                  : selectedAdType?.value === "mobileAds"
                  ? adIcon
                  : car,
            },
            {
              value: "33,500 miles",
              label: selectedAdType?.value === "mobileAds" ? "TOTAL CLICKS" : "TOTAL MILES",
              icon: selectedAdType?.value === "mobileAds" ? AdsClickIcon : meter,
            },
            {
              value: "1,103,500 m",
              label: selectedAdType?.value === "mobileAds" ? "TOTAL REACH" : "TOTAL IMPRESSIONS",
              icon: selectedAdType?.value === "mobileAds" ? impression : adIcon,
            },
            {
              value: 33,
              label: selectedAdType?.value === "mobileAds" ? "CTR" : "IMPRESSIONS PER MILE",
              icon: selectedAdType?.value === "mobileAds" ? ctr : impression,
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <Card sx={{ backgroundColor: "#DEDEDE", padding: 2, textAlign: "center" }}>
                <Typography variant="h4" fontWeight={"bold"} color={theme.palette.primary.contrastText}>
                  {item.value}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
                  {typeof item.icon === "string" ? (
                    <img src={item.icon} alt={item.label} width={120} height={120} />
                  ) : (
                    <item.icon style={{ fontSize: 120 }} />
                  )}
                </Box>
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
