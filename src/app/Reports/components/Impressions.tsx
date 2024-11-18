import { Typography } from "@mui/material";
import ImpressionsChart from "../components/ImpressionsChart";

const Impressions = () => {
  return (
    <div>
      <div>
        <Typography variant="h3" style={{marginBlock: '30px'}}>Impressions</Typography>
        <ImpressionsChart />
      </div>
    </div>
  );
};

export default Impressions;
