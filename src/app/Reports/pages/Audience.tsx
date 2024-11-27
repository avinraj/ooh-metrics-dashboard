import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import data from "../../../Data/audience.json";
import laptopImag from "../../../assets/laptop-img-2.png";
import phoneImg from "../../../assets/phone-img-2.png";

export const DeviceChart = ({ phoneCount, laptopCount }: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container spacing={2} justifyContent="center" height={"100%"}>
      <Grid
        item
        xs={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px",
        }}
      >
        <Box sx={{ position: "relative", textAlign: "center" }}>
          <img
            src={phoneImg}
            alt="phone"
            style={{
              width: isMobile ? "35px" : "66px",
              height: isMobile ? "70px" : "130px",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: theme.palette.text.primary,
              fontSize: isMobile ? "10px" : "20px",
            }}
          >
            {phoneCount ? phoneCount : 0}%
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px",
        }}
      >
        <Box sx={{ position: "relative", textAlign: "center" }}>
          <img
            src={laptopImag}
            alt="laptop"
            style={{
              width: isMobile ? "75px" : "175px",
              height: isMobile ? "90px" : "140px",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: theme.palette.text.primary,
              fontSize: isMobile ? "10px" : "20px",
            }}
          >
            {laptopCount ? laptopCount : 0}%
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const Audience = () => {
  const { t } = useTranslation();
  const theme = useTheme(); // Use the theme from ImpressionsChart
  const chartRefs: any = {
    gender: useRef(null),
    age: useRef(null),
    device: useRef(null),
    source: useRef(null),
    sec: useRef(null),
  };
  const chartTypes = {
    gender: "doughnut",
    age: "horizontalBar",
    device: "bar",
    source: "horizontalBar",
    sec: "bar",
  };

  const createChart = (category: string, chartRef: any, chartType: any) => {
    const categoryData = data.filter((item) => item.category === category);
  
    // Group by label (group) and sum values
    const groupedData = categoryData.reduce((acc: any, item: any) => {
      const value = ["gender", "age"].includes(category) ? item.percent : item.DEVICE_COUNT;
      if (acc[item.group]) {
        acc[item.group] += value;
      } else {
        acc[item.group] = value;
      }
      return acc;
    }, {});
  
    // Extract the grouped labels and values
    const labels = Object.keys(groupedData);
    const values = Object.values(groupedData);
  
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
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: any) => {
              const dataset = tooltipItem.dataset.data[tooltipItem.dataIndex];
              return ["gender", "age"].includes(category)
                ? `${tooltipItem.label}: ${dataset}%`
                : `${tooltipItem.label}: ${dataset}`;
            },
          },
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
  
    if (chartType === "bar" || chartType === "horizontalBar") {
      const isPercentageChart = ["gender", "age"].includes(category);
    
      chartOptions.scales = {
        x: {
          grid: { display: false },
          ticks: { color: theme.palette.text.primary },
          ...(chartType === "horizontalBar" && isPercentageChart && {
            max: 100, // Ensure percentage charts don't exceed 100
          }),
        },
        y: {
          grid: { display: false },
          ticks: { color: theme.palette.text.primary },
          beginAtZero: true,
          ...(chartType !== "horizontalBar" && isPercentageChart && {
            max: 100, // Set y-axis max to 100 for percentages
          }),
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
            data: values,
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
      gender: createChart("gender", chartRefs.gender, chartTypes.gender),
      age: createChart("age", chartRefs.age, chartTypes.age),
      device: createChart("device", chartRefs.device, chartTypes.device),
      source: createChart("source", chartRefs.source, chartTypes.source),
      sec: createChart("sec", chartRefs.sec, chartTypes.sec),
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
          <Typography variant="h3">{t("audience.audience")}</Typography>
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
            {[
              {
                label: "Clicks by Gender",
                value: "gender",
                translateKey: "clicksByGender",
              },
              {
                label: "Clicks by Device",
                value: "device",
                translateKey: "clicksByDevice",
              },
              {
                label: "Clicks by Age",
                value: "age",
                translateKey: "clicksByAge",
              },
              {
                label: "Clicks by Source",
                value: "source",
                translateKey: "clicksBySource",
              },
              { label: "CTR by SEC", value: "sec", translateKey: "ctrBySec" },
            ].map((category, index) => (
              <Grid
                item
                xs={11}
                md={5.8}
                key={category.value}
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
                    {t(`audience.${category.translateKey}`)}
                  </Typography>
                  {category.value !== "device" ? (
                    <canvas
                      ref={chartRefs[category.value]}
                      style={{ maxHeight: "250px", minHeight: "250px" }}
                    ></canvas>
                  ) : (
                    <DeviceChart phoneCount={35} laptopCount={65} />
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Audience;
