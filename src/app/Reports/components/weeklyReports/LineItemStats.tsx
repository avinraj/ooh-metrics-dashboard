import { useState } from "react";
import weeklyData from "../../../../Data/duroflexWeeklyReport.json";

import { useTranslation } from "react-i18next";
import { buttonStyles } from "../ImpressionsChart";
import { mobileAdChartDataAndOptions } from "../mobile-ad/utils/chartUtils";
import MobileAdChartTable from "../mobile-ad/MobileAdChartTable";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const LineItemStats = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedDataset, setSelectedDataset] = useState("duroflex_banglore");
  const lineItemData = weeklyData.lineItemStats.duroflex_banglore;
  const lineItemDataCompetitor =
    weeklyData.lineItemStats.duroflex_banglore_competitors;

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
  const processData = (dataset: any[]) => {
    const sortedData = dataset.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return {
      labels: sortedData.map((item) => item.date), // Dates as labels
      clicksData: sortedData.map((item) => item.clicks),
      impressionsData: sortedData.map((item) => item.impressions),
      ctrData: sortedData.map((item) => item.ctr), // Fetching CTR directly from JSON
    };
  };

  // Choose dataset based on selection
  const selectedData =
    selectedDataset === "duroflex_banglore"
      ? lineItemData
      : lineItemDataCompetitor;

  const chartData = processData(selectedData);
  const { data, options } = mobileAdChartDataAndOptions(
    chartData,
    theme,
    isMobile
  );

  const tableColumns = ["Date", "Impressions", "Clicks", "CTR"].map((key) => ({
    label: key,
    accessor: key.toLowerCase(),
    format: (value: any) => (key === "CTR" ? `${value}%` : value),
  }));

  // Convert processed chart data to table format
  const tableData = chartData.labels.map((label, index) => ({
    date: label,
    impressions: chartData.impressionsData[index],
    clicks: chartData.clicksData[index],
    ctr: `${chartData.ctrData[index]}`,
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
          <Typography variant="h3">Line Item-Wise Stats</Typography>
        </Box>
        <div style={{ display: "flex", alignItems: "center" }}>
          {[
            { label: "Duroflex Banglore", value: "duroflex_banglore" },
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

export default LineItemStats;
