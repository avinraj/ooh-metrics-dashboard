import LinkIcon from "@mui/icons-material/Link";
import PeopleIcon from "@mui/icons-material/People";
import QrCodeIcon from "@mui/icons-material/QrCode";
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import FilterPanel from "../../MapView/components/FilterPanel";
import FootfallReport from "../components/FootfallReport";
import { buttonStyles } from "../../Reports/components/ImpressionsChart";

const Attribution = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedOption, setSelectedOption] = useState<string>("footfall");

  const getButtonStyle = (isActive: boolean) => ({
    ...buttonStyles,
    backgroundColor: isActive
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
    fontWeight: isActive ? "bold" : "normal",
    color: theme.palette.text.primary,
    maxHeight: "fit-content",
    fontSize: isMobile ? "10px" : "15px",
  });

  const handleClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Grid container>
      {/* Filter Panel */}
      <Grid item xs={12} display="flex" alignItems="center" gap={3}>
        <FilterPanel
          campaigns={["Campaign 1", "Campaign 2", "Campaign 3"]}
          vehicles={["Car 1", "Car 2", "Car 3"]}
          selectedCampaign={"Campaign 1"}
          selectedVehicle={"Car 1"}
          dateRange={{
            startDate: new Date(new Date().setDate(1)),
            endDate: new Date(),
          }}
          onCampaignChange={() => {}}
          onVehicleChange={() => {}}
          onDateRangeSelect={() => {}}
        />
      </Grid>

      <div
        style={{
          display: isMobile ? "grid" : "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "5px",
            width: "fit-content",
            marginBlock: "25px",
          }}
        >
          <Typography variant="h3">{t("attribution.attribution")}</Typography>
        </Box>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "fit-contents",
          }}
        >
          {[
            {
              label: t("attribution.qrcode"),
              value: "qrCode",
              icon: <QrCodeIcon sx={{ marginRight: 1 }} />,
            },
            {
              label: t("attribution.trackingurl"),
              value: "trackingUrl",
              icon: <LinkIcon sx={{ marginRight: 1 }} />,
            },
            {
              label: t("attribution.footfall"),
              value: "footfall",
              icon: <PeopleIcon sx={{ marginRight: 1 }} />,
            },
          ].map((button) => (
            <Button
              key={button.value}
              variant="contained"
              color="primary"
              disableElevation
              style={getButtonStyle(selectedOption === button.value)}
              onClick={() => handleClick(button.value)}
            >
              {!isMobile ? button.icon : null}
              {button.label}
            </Button>
          ))}
        </div>
      </div>

      {selectedOption === "footfall" ? <FootfallReport /> : null}
    </Grid>
  );
};

export default Attribution;
