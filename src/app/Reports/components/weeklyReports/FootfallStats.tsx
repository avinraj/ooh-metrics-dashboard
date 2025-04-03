import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import weeklyData from "../../../../Data/duroflexWeeklyReport.json";
import MobileAdChartTable from "../mobile-ad/MobileAdChartTable";
import { mobileAdChartDataAndOptions } from "../mobile-ad/utils/chartUtils";

const FootfallStats = () => {
    const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { footfallStats } = weeklyData;

  const processFootfallData = (dataset: any[]) => ({
    labels: dataset.map((item) => item.date), // Dates as labels
    totalFootfall: dataset.map((item) => item.total), // Total footfall count
  });

  const selectedData = footfallStats || [];
  const chartData = processFootfallData(selectedData);

  const { data, options } = mobileAdChartDataAndOptions(
    { labels: chartData.labels, impressionsData: chartData.totalFootfall, clicksData: [] },
    theme,
    isMobile
  );

  const tableColumns = [
    { label: "Date", accessor: "date" },
    { label: "Total Footfall", accessor: "totalFootfall" },
  ];

  const tableData = chartData.labels.map((label, index) => ({
    date: label,
    totalFootfall: chartData.totalFootfall[index],
  }));

  return (
    <div style={{ height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "5px",
            width: "fit-content",
            marginBlock: "25px",
          }}
        >
          <Typography variant="h3">Footfall Statistics</Typography>
        </Box>
      </div>

      <MobileAdChartTable
        tableData={tableData}
        tableColumns={tableColumns}
        buttons={[
          { label: t("reports.impressions.chart"), value: "Chart" },
          { label: t("reports.impressions.table"), value: "Table" },
        ]}
        onButtonClick={() => console.log("")}
        chartDataGenerated={{ data, options }}
      />
    </div>
  );
};
  
  export default FootfallStats;
  