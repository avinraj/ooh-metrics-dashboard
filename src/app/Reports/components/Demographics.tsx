import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import data from "../../../Data/demographics.json";
import { useTranslation } from "react-i18next";
import { truncateLabel } from "./mobile-ad/utils/chartUtils";

const Demographics = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const chartRefs: any = {
    age: useRef(null),
    education: useRef(null),
    income: useRef(null),
    ethnicity: useRef(null),
  };
  const [chartTypes, setChartTypes] = useState<any>({
    age: "bar",
    education: "horizontalBar",
    income: "line",
    ethnicity: "doughnut",
  });

  const handleChartTypeChange = (category: string) => (event: any) => {
    const value = event.target.value;
    setChartTypes((prev: any) => ({ ...prev, [category]: value }));
  };

  const createChart = (category: string, chartRef: any, chartType: any) => {
    const categoryData = data.filter((item) => item.category === category);

    // Group by label (group) and sum DEVICE_COUNT
    const groupedData = categoryData.reduce((acc: any, item: any) => {
      if (acc[item.group]) {
        acc[item.group] += item.DEVICE_COUNT;
      } else {
        acc[item.group] = item.DEVICE_COUNT;
      }
      return acc;
    }, {});

    // Extract the grouped labels and counts
    const labels = Object.keys(groupedData);
    const counts = Object.values(groupedData);

    // Define different shades of yellow for doughnut chart
    const yellowShades = [
      "#FFEB3B", // Light Yellow
      "#FFC107", // Amber
      "#FF9800", // Orange
      "#FF5722", // Deep Orange
      "#FFD600", // Bright Yellow
    ];

    // Set up chart options
    const chartOptions: any = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
          // labels: {
          //   color: theme.palette.text.primary,
          // },
          // position:
          //   chartType === "bar" ||
          //   chartType === "horizontalBar" ||
          //   chartType === "line"
          //     ? "top"
          //     : "left", // Position legend on the left for doughnut charts
        },
      },
      animations: {
        y: {
          easing: "easeInOutElastic",
          from: (ctx: any) => {
            if (ctx.type === "data") {
              if (ctx.mode === "default" && !ctx.dropped) {
                ctx.dropped = true;
                return 0;
              }
            }
          },
        },
      },
    };

    if (
      chartType === "bar" ||
      chartType === "horizontalBar" ||
      chartType === "line"
    ) {
      chartOptions.scales = {
        x: {
          grid: { display: false },
          ticks: {
            color: theme.palette.text.primary,
            callback: function (value: any) {
              const label =
                chartType === "horizontalBar" ? value : labels[value as number];
              return isMobile ? truncateLabel(label, 3) : label;
            },
          },
        },
        y: {
          grid: { display: false },
          ticks: {
            color: theme.palette.text.primary,
            callback: function (value: any) {
              let val =
                chartType === "horizontalBar" ? labels[value as number] : value;
              return isMobile ? truncateLabel(val, 3) : val;
            },
          },
          beginAtZero: true,
        },
      };
      chartOptions.indexAxis = chartType === "horizontalBar" ? "y" : "x";
    }

    // Return the chart with yellow colors for doughnut chart
    return new Chart(chartRef.current, {
      type: chartType !== "horizontalBar" ? chartType : "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: `${category}`,
            data: counts,
            backgroundColor:
              chartType === "doughnut"
                ? yellowShades
                : theme.palette.primary.main, // Apply yellow shades for doughnut chart
          },
        ],
      },
      options: chartOptions,
    });
  };

  useEffect(() => {
    // Create charts for all categories with their respective chart type
    const charts = {
      age: createChart("Age", chartRefs.age, chartTypes.age),
      education: createChart(
        "Education",
        chartRefs.education,
        chartTypes.education
      ),
      income: createChart("Income", chartRefs.income, chartTypes.income),
      ethnicity: createChart(
        "Ethnicity",
        chartRefs.ethnicity,
        chartTypes.ethnicity
      ),
    };

    // Cleanup function to destroy charts
    return () => {
      Object.values(charts).forEach((chart: any) => chart.destroy());
    };
  }, [theme, chartTypes]); // Re-run effect when chart types change

  return (
    <div>
      <div>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "5px",
            width: "fit-content",
            marginBlock: "25px",
          }}
        >
          <Typography variant="h3">
            {t("reports.demographics.demographics")}
          </Typography>
        </Box>
        <div
          style={{
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "8px",
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="space-evenly"
            style={{ margin: "0px", width: "100%" }}
          >
            {["Age", "Education", "Income", "Ethnicity"].map(
              (category, index) => (
                <Grid
                  item
                  xs={11}
                  md={5.8}
                  key={category}
                  style={{
                    paddingLeft: "0px",
                    paddingBottom: "16px",
                    paddingTop: index < 2 ? "16px" : "0px",
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderRadius: "10px",
                      height: "100%",
                    }}
                  >
                    <Typography variant="h6" color="text.primary" gutterBottom>
                      {t(`reports.demographics.${category.toLowerCase()}`)}
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <FormControl variant="outlined">
                        <InputLabel
                          style={{ color: theme.palette.text.primary }}
                          id={`${category}-chart-type-label`}
                        >
                          {t("reports.demographics.chartType")}
                        </InputLabel>
                        <Select
                          size="small"
                          labelId={`${category}-chart-type-label`}
                          value={chartTypes[category.toLowerCase()]}
                          onChange={handleChartTypeChange(
                            category.toLowerCase()
                          )}
                          label="Chart Type"
                        >
                          <MenuItem value="bar">
                            {" "}
                            {t("reports.demographics.verticalBar")}
                          </MenuItem>
                          <MenuItem value="horizontalBar">
                            {t("reports.demographics.horizontalBar")}
                          </MenuItem>
                          <MenuItem value="doughnut">
                            {" "}
                            {t("reports.demographics.doughnutChart")}
                          </MenuItem>
                          <MenuItem value="line">
                            {t("reports.demographics.lineChart")}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>

                    <canvas
                      ref={chartRefs[category.toLowerCase()]}
                      style={{ maxHeight: "250px", minHeight: "250px" }}
                    ></canvas>
                  </Box>
                </Grid>
              )
            )}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Demographics;
