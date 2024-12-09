import { useTranslation } from "react-i18next";
import { clickData } from "../../../../Data/mobileAdReports.json";
import MobileAdChartTable from "./MobileAdChartTable";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { mobileAdChartDataAndOptions } from "./utils/chartUtils";

const AppsOrSiteChart = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 

  const tableColumns = Object.keys(clickData[0]).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the column label
    accessor: key,
    format: (value: any) => value, // Optionally format values
  }));

  const processData = () => {
    const groupedData = clickData.reduce(
      (
        acc: Record<
          string,
          { clicks: number; impressions: number; ctr: number }
        >,
        item
      ) => {
        const key = `${item.name}`;
        if (acc[key]) {
          acc[key].clicks += item.clicks;
          acc[key].impressions += item.impressions;
          acc[key].ctr += item.ctr;
        } else {
          acc[key] = {
            clicks: item.clicks,
            impressions: item.impressions,
            ctr: item.ctr,
          };
        }
        return acc;
      },
      {}
    );

    // Sorting by clicks in descending order
    const sortedData = Object.entries(groupedData).sort(
      (a, b) => b[1].clicks - a[1].clicks
    );

    // Extracting labels and data points
    return {
      labels: sortedData.map(([key]) => key),
      clicksData: sortedData.map(([, value]) => value.clicks),
      impressionsData: sortedData.map(([, value]) => value.impressions),
      ctrData: sortedData.map(([, value]) => value.ctr), // CTR Calculation
    };
  };

  const chartData = processData();

  const { data, options } = mobileAdChartDataAndOptions(
    chartData,
    theme,
    isMobile
  );

  return (
    <div style={{height: "100%"}}>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          padding: "5px",
          width: "fit-content",
          marginBlock: "25px",
        }}
      >
        <Typography variant="h3">{t("reports.appsOrWebsites.byAppOrWebsites")}</Typography>
      </Box>
      <MobileAdChartTable
        tableData={clickData}
        tableColumns={tableColumns}
        buttons={[
          { label: t("reports.impressions.chart"), value: "Chart" },
          { label: t("reports.impressions.table"), value: "Table" },
        ]}
        onButtonClick={(value) => console.log(`Switched to: ${value}`)}
        chartDataGenerated={{ data, options }}
      />
    </div>
  );
};

export default AppsOrSiteChart;
