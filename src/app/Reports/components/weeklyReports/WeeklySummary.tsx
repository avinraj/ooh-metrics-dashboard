import { Box, Typography, useMediaQuery, useTheme, Card, CardContent, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import weeklyData from "../../../../Data/duroflexWeeklyReport.json";
import MobileAdChartTable from "../mobile-ad/MobileAdChartTable";
import { mobileAdChartDataAndOptions } from "../mobile-ad/utils/chartUtils";

const WeeklySummary = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { summary } = weeklyData;

  const processSummaryData = (dataset: any[]) => ({
    labels: dataset.map((item) => item.date),
    impressions: dataset.map((item) => item.impressions),
    clicks: dataset.map((item) => item.clicks),
    ctr: dataset.map((item) => item.ctr),
    spend: dataset.map((item) => item.spend),
  });

  const selectedData = summary || [];
  const chartData = processSummaryData(selectedData);

  const { data, options } = mobileAdChartDataAndOptions(
    {
      labels: chartData.labels,
      impressionsData: chartData.impressions,
      clicksData: chartData.clicks,
      ctrData: chartData.ctr,
    },
    theme,
    isMobile
  );

  const tableColumns = [
    { label: "Date", accessor: "date" },
    { label: "Impressions", accessor: "impressions" },
    { label: "Clicks", accessor: "clicks" },
    { label: "CTR", accessor: "ctr" },
    { label: "Spend", accessor: "spend" },
  ];

  const tableData = chartData.labels.map((label, index) => ({
    date: label,
    impressions: chartData.impressions[index],
    clicks: chartData.clicks[index],
    ctr: `${chartData.ctr[index]}%`,
    spend: `₹ ${chartData.spend[index]}`,
  }));

  return (
    <div style={{ height: "100%" }}>
      <div>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "5px",
            width: "fit-content",
            marginBlock: "25px",
          }}
        >
          <Typography variant="h3">Overall Summary</Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ height: "95%", display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="body1">
            <strong>Report Date:</strong> {weeklyData?.reportDate ?? ""}
          </Typography>
          <Typography variant="body1">
            <strong>Unique User Reach:</strong>{" "}
            {weeklyData?.uniqueUserReach ?? ""}
          </Typography>
          <Typography variant="body1">
            <strong>Campaign Pacing:</strong> {weeklyData?.campaignPacing ?? ""}
          </Typography>
          <Typography variant="body1">
            <strong>Total Budget:</strong> {weeklyData?.totalBudget ?? ""}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "20px" }}>
            <strong>Total Impression Goal:</strong>{" "}
            {weeklyData?.totalImpressionGoal ?? ""}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
          {/* Campaign Details */}
    <Grid item xs={12} sm={6}>
      <Card sx={{ height: "95%", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "10px" }}
          >
            Campaign Details
          </Typography>
          <Typography variant="body1">
            <strong>Campaign Name:</strong>{" "}
            {weeklyData?.campaign?.campaignName ?? ""}
          </Typography>
          <Typography variant="body1">
            <strong>Start Date:</strong> {weeklyData?.campaign?.startDate ?? ""}
          </Typography>
          <Typography variant="body1">
            <strong>End Date:</strong> {weeklyData?.campaign?.endDate ?? ""}
          </Typography>
          <Typography variant="body1">
            <strong>Delivered Impressions:</strong>{" "}
            {weeklyData?.campaign?.impressions ?? ""}
          </Typography>
          <Typography variant="body1">
            <strong>Delivered Clicks:</strong>{" "}
            {weeklyData?.campaign?.clicks ?? ""}
          </Typography>
          <Typography variant="body1">
            <strong>Avg. CTR:</strong> {weeklyData?.campaign?.avgCTR ?? ""}
          </Typography>
          <Typography variant="body1">
            <strong>CPM (INR):</strong> {weeklyData?.campaign?.cpm ?? ""}
          </Typography>
          <Typography variant="body1">
            <strong>Total Amount Spent (INR):</strong>{" "}
            {weeklyData?.campaign?.spend ?? ""}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
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

export default WeeklySummary;
