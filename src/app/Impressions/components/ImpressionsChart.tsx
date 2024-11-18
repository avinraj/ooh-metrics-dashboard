import { Button, useTheme } from "@mui/material";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

const buttonStyles = {
    padding: 5,
    minWidth: "60px",
    border: "black",
    borderStyle: "groove",
    borderWidth: "thin",
    borderRadius: "0px",
  };

const ImpressionsChart = () => {
  const theme = useTheme();
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return; // Check if chartRef.current is null

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return; // Check if context is null

    // Sample data for the chart
    const data = {
      labels: [
        "28 May",
        "31 May",
        "3 Jun",
        "6 Jun",
        "9 Jun",
        "12 Jun",
        "15 Jun",
        "18 Jun",
        "21 Jun",
        "24 Jun",
        "27 Jun",
        "30 Jun",
        "3 Jul",
        "6 Jul",
        "9 Jul",
        "12 Jul",
        "15 Jul",
        "18 Jul",
        "21 Jul",
        "24 Jul",
        "27 Jul",
        "30 Jul",
        "2 Aug",
        "5 Aug",
        "8 Aug",
        "11 Aug",
        "14 Aug",
        "17 Aug",
        "20 Aug",
        "23 Aug",
        "26 Aug",
        "29 Aug",
        "1 Sep",
        "4 Sep",
        "7 Sep",
        "10 Sep",
        "13 Sep",
        "16 Sep",
        "19 Sep",
        "22 Sep",
        "25 Sep",
        "28 Sep",
        "1 Oct",
        "4 Oct",
        "7 Oct",
        "10 Oct",
        "13 Oct",
        "16 Oct",
        "19 Oct",
        "22 Oct",
        "25 Oct",
        "28 Oct",
        "31 Oct",
        "3 Nov",
        "6 Nov",
        "9 Nov",
        "12 Nov",
        "15 Nov",
      ],
      datasets: [
        {
          label: "Impressions",
          data: [
            5000, 2000, 0, 0, 500, 0, 1000, 0, 0, 2000, 0, 3000, 0, 0, 1000, 0,
            0, 500, 0, 200, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 5000, 10000, 0, 0, 600000, 0, 0, 50000, 10000, 0,
            0, 0, 50000, 30000, 0,
          ],
          backgroundColor: theme.palette.primary.main, // green color
          borderColor: theme.palette.primary.main,
          borderRadius: 5,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          font: {
            size: 44,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: theme.palette.text.primary,
            maxRotation: 90,
            minRotation: 45,
          },
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: theme.palette.text.primary,
          },
          grid: {
            color: "#333333",
          },
        },
      },
    };

    // Create chart instance
    const impressionsChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    // Cleanup function to destroy the chart on component unmount
    return () => {
      impressionsChart.destroy();
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "8px",
        position: 'relative'
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "5px",
          right: 10,
          zIndex: 10,
          display: "flex",
          margin: "10px",
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '95%'
        }}
      >
        <div>Other contents</div>
        <div style={{display: 'flex'}}>
          <div style={{ display: "flex", marginRight: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              style={buttonStyles}
            >
              Data
            </Button>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              style={buttonStyles}
            >
              Vehicle
            </Button>
          </div>

          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              style={buttonStyles}
            >
              Chart
            </Button>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              style={buttonStyles}
            >
              Table
            </Button>
          </div>
        </div>
      </div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ImpressionsChart;
