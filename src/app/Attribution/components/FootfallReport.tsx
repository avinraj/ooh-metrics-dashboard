import { Box } from "@mui/material";
import React from "react";
import AttributionAnalytics from "./AttributionAnalytics";
import AttributionInsights from "./AttributionInsights";

const FootfallReport: React.FC = () => {
  return (
    <Box>
      <AttributionAnalytics />
      <AttributionInsights />
    </Box>
  );
};

export default FootfallReport;
