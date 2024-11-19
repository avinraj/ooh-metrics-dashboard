import { Typography } from "@mui/material";
import ImpressionsChart from "../components/ImpressionsChart";
import { useTranslation } from "react-i18next";

const Impressions = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div>
        <Typography variant="h3" style={{marginBlock: '30px'}}>{t('reports.impressions.impressions')}</Typography>
        <ImpressionsChart />
      </div>
    </div>
  );
};

export default Impressions;
