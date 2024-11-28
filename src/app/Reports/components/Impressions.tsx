import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ImpressionsChart, { buttonStyles } from "../components/ImpressionsChart";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Impressions = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [groupBy, setGroupBy] = useState<"date" | "vehicle">("date");
  const getButtonStyle = (isActive: boolean) => ({
    ...buttonStyles,
    backgroundColor: isActive
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
    fontWeight: isActive ? "bold" : "normal",
    color: theme.palette.text.primary,
    fontSize: isMobile ? "10px" : "15px",
  });
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "5px",
            width: "fit-content",
            marginBlock: "25px",
          }}
        >
          <Typography variant="h3">
            {" "}
            {t("reports.impressions.impressions")}
          </Typography>
        </Box>
        {/* Date and Vehicle Buttons */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            disableElevation
            style={getButtonStyle(groupBy === "date")}
            onClick={() => setGroupBy("date")}
          >
            {t("reports.impressions.date")}
          </Button>
          <Button
            variant="contained"
            disableElevation
            style={getButtonStyle(groupBy === "vehicle")}
            onClick={() => setGroupBy("vehicle")}
          >
            {t("reports.impressions.vehicle")}
          </Button>
        </div>
      </div>

      {/* Pass groupBy to ImpressionsChart */}
      <ImpressionsChart groupBy={groupBy} />
    </div>
  );
};

export default Impressions;
