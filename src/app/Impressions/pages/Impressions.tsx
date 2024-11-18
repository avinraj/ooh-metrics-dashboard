import { Typography, useTheme } from "@mui/material";
import ImpressionsChart from "../components/ImpressionsChart";

const Impressions = () => {
  const theme = useTheme();
  return (
    <div>
      <div>
        <Typography variant="h3">Impressions</Typography>
        <ImpressionsChart />
      </div>
    </div>
  );
};

export default Impressions;
