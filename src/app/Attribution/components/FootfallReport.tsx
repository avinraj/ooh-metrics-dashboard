import { Box } from "@mui/material";
import React from "react";
import AttributionAnalytics from "./AttributionAnalytics";
import AttributionInsights from "./AttributionInsights";
import MapAttribute from "./MapAttribute";

const FootfallReport: React.FC = () => {
  return (
    <Box sx={{marginTop: '10px'}}>
      <MapAttribute />
      <AttributionAnalytics />
      <AttributionInsights />
    </Box>
  );
};

export default FootfallReport;
