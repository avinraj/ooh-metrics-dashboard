import { Box, Typography, useTheme } from "@mui/material";
import ImpressionsChart from "../components/ImpressionsChart";
import { useTranslation } from "react-i18next";

const Impressions = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <div>
      <div>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "5px",
            width: "fit-content",
            marginBlock: "25px",
          }}
        >
          <Typography variant="h3">
            {t("reports.impressions.impressions")}
          </Typography>
        </Box>
        <ImpressionsChart />
      </div>
    </div>
  );
};

export default Impressions;
