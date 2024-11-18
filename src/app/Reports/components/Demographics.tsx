import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import data from "../../../Data/demographics.json";

const Demographics = () => {
  const theme = useTheme(); // Use the theme from ImpressionsChart
  const chartRefs: any = {
    age: useRef(null),
    education: useRef(null),
    income: useRef(null),
    ethnicity: useRef(null),
  };
  const [chartTypes, setChartTypes] = useState<any>({
    age: "bar",
    education: "bar",
    income: "doughnut",
    ethnicity: "polarArea",
  });

  const handleChartTypeChange = (category: string) => (event: any) => {
    const value = event.target.value;
    console.log(category, value);
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
          labels: {
            color: theme.palette.text.primary,
          },
          position:
            chartType === "bar" || chartType === "horizontalBar"
              ? "top"
              : "left", // Position legend on the left for doughnut charts
        },
      },
    };

    if (chartType === "bar" || chartType === "horizontalBar") {
      chartOptions.scales = {
        x: {
          grid: { color: theme.palette.grey[500] },
          ticks: { color: theme.palette.text.primary },
        },
        y: {
          grid: { color: theme.palette.grey[500] },
          ticks: { color: theme.palette.text.primary },
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
              chartType === "doughnut" || chartType === "polarArea"
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
        <Typography variant="h3" style={{ marginBlock: "30px" }}>
          Demographics
        </Typography>
        <div
          style={{
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "8px",
          }}
        >
          <Grid
            container
            spacing={2}
            style={{ margin: "0px", width: "100%", paddingRight: "16px" }}
          >
            {["Age", "Education", "Income", "Ethnicity"].map((category) => (
              <Grid item xs={6} key={category}>
                <Box
                  sx={{
                    p: 2,
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderRadius: "10px",
                  }}
                >
                  <Typography variant="h6" color="text.primary" gutterBottom>
                    {category}
                  </Typography>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <FormControl variant="outlined">
                      <InputLabel
                        style={{ color: theme.palette.text.primary }}
                        id={`${category}-chart-type-label`}
                      >
                        Chart Type
                      </InputLabel>
                      <Select
                        labelId={`${category}-chart-type-label`}
                        value={chartTypes[category.toLowerCase()]}
                        onChange={handleChartTypeChange(category.toLowerCase())}
                        label="Chart Type"
                      >
                        <MenuItem value="bar">Vertical Bar</MenuItem>
                        <MenuItem value="horizontalBar">
                          Horizontal Bar
                        </MenuItem>
                        <MenuItem value="doughnut">Doughnut Chart</MenuItem>
                        <MenuItem value="polarArea">Polar Chart</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <canvas ref={chartRefs[category.toLowerCase()]}></canvas>
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Demographics;
