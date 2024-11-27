import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { byDayAndHour } from "../../../../Data/mobileAdReports.json";
import { mobileAdChartDataAndOptions } from "./utils/chartUtils";
import MobileAdChartTable from "./MobileAdChartTable";
import { useState } from "react";
import { buttonStyles } from "../ImpressionsChart";

const DayAndHourChart = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedChart, setSelectedChart] = useState("day");

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

  const tableColumns = Object.keys(byDayAndHour[0])
    .filter((key) => (selectedChart === "day" ? key !== "hour" : key !== "day"))
    .map((key) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      accessor: key,
      format: (value: any) => value, // Optionally format values
    }));

  const processData = (value: string) => {
    const groupedData = byDayAndHour.reduce(
      (
        acc: Record<
          string,
          { clicks: number; impressions: number; ctr: number }
        >,
        item
      ) => {
        const key = value === "day" ? `${item.day}` : `${item.hour}`;
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

  const chartData = processData("day");
  const chartData2 = processData("hour");

  const { data, options } = mobileAdChartDataAndOptions(
    chartData,
    theme,
    isMobile
  );

  const { data: data2, options: options2 } = mobileAdChartDataAndOptions(
    chartData2,
    theme,
    isMobile
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "5px",
            width: "fit-content",
            marginBlock: "25px",
          }}
        >
          <Typography variant="h3">{t("reports.dayAndHour.byDayAndHour")}</Typography>
        </Box>
        <div style={{ display: "flex", alignItems: "center" }}>
          {[
            { label: t("reports.dayAndHour.dayChart"), value: "day" },
            { label: t("reports.dayAndHour.hourChart"), value: "hour" },
          ].map((button) => (
            <Button
              key={button.value}
              variant="contained"
              color="primary"
              disableElevation
              style={getButtonStyle(selectedChart === button.value)}
              onClick={() => setSelectedChart(button.value)}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </div>
      <MobileAdChartTable
        tableData={byDayAndHour}
        tableColumns={tableColumns}
        buttons={[
          { label: t("reports.impressions.chart"), value: "Chart" },
          { label: t("reports.impressions.table"), value: "Table" },
        ]}
        onButtonClick={() => console.log("")}
        chartDataGenerated={
          selectedChart === "day"
            ? { data, options }
            : { data: data2, options: options2 }
        }
      />
    </div>
  );
};

export default DayAndHourChart;
