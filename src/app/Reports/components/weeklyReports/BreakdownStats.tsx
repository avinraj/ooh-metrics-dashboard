import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import weeklyData from "../../../../Data/duroflexWeeklyReport.json";
import { buttonStyles } from "../ImpressionsChart";
import { mobileAdChartDataAndOptions } from "../mobile-ad/utils/chartUtils";
import MobileAdChartTable from "../mobile-ad/MobileAdChartTable";

const BreakdownStats = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedDataset, setSelectedDataset] = useState("duroflex_banglore");

  const { OSAndCreativeStats } = weeklyData;
  const datasetOptions: any = {
    OS_stats: OSAndCreativeStats.OS_stats,
    overall: OSAndCreativeStats.overall,
    duroflex_banglore: OSAndCreativeStats.duroflex_banglore,
    duroflex_banglore_competitors:
      OSAndCreativeStats.duroflex_banglore_competitors,
  };

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

  // Process JSON data dynamically
  const processData = (dataset: any[]) => {
    return {
      labels: dataset.map((item) => item.OS || item.adSize), // Use 'OS' for OS_stats, 'adSize' for others
      impressionsData: dataset.map((item) => item.impressions),
      clicksData: dataset.map((item) => item.clicks),
      ctrData: dataset.map((item) => item.ctr), // Directly use CTR from JSON
    };
  };

  // Select dataset dynamically
  const selectedData = datasetOptions[selectedDataset] || [];
  const chartData = processData(selectedData);
  const { data, options } = mobileAdChartDataAndOptions(
    chartData,
    theme,
    isMobile
  );

  const tableColumns = ["Category", "Impressions", "Clicks", "CTR"].map(
    (key) => ({
      label: key,
      accessor: key.toLowerCase(),
      format: (value: any) => (key === "CTR" ? `${value}%` : value),
    })
  );

  const tableData = chartData.labels.map((label, index) => ({
    category: label,
    impressions: chartData.impressionsData[index],
    clicks: chartData.clicksData[index],
    ctr: `${chartData.ctrData[index]}%`,
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
          <Typography variant="h3">OS & Creative Breakdown</Typography>
        </Box>
        <div style={{ display: "flex", alignItems: "center" }}>
          {[
            { label: "OS Stats", value: "OS_stats" },
            { label: "Overall", value: "overall" },
            { label: "Duroflex Bangalore", value: "duroflex_banglore" },
            {
              label: "Competitors",
              value: "duroflex_banglore_competitors",
            },
          ].map((button) => (
            <Button
              key={button.value}
              variant="contained"
              color="primary"
              disableElevation
              style={getButtonStyle(selectedDataset === button.value)}
              onClick={() => setSelectedDataset(button.value)}
            >
              {button.label}
            </Button>
          ))}
        </div>
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
export default BreakdownStats;
