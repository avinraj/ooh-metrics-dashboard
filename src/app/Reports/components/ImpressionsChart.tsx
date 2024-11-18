import { Button, useTheme } from "@mui/material";
import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import impressionsData from "../../../Data/impressions.json";
import ImpressionsTable from "./ImpressionsTable";

const buttonStyles = {
  padding: 5,
  minWidth: "60px",
  border: "black",
  borderStyle: "groove",
  borderWidth: "thin",
  borderRadius: "0px"
};

const ImpressionsChart = () => {
  const theme = useTheme();
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [groupBy, setGroupBy] = useState<"date" | "vehicle">("date");
  const [activeGroup1, setActiveGroup1] = useState("Date");
  const [activeGroup2, setActiveGroup2] = useState("Chart");

  const processData = (groupBy: "date" | "vehicle") => {
    const groupedData = impressionsData.reduce((acc: any, item: any) => {
      const key = groupBy === "date" ? item.date : item.asset;
      if (acc[key]) {
        acc[key] += item.impressions;
      } else {
        acc[key] = item.impressions;
      }
      return acc;
    }, {});

    return {
      labels: Object.keys(groupedData),
      dataPoints: Object.values(groupedData),
      detailedData: Object.entries(groupedData).map(([key, impressions]) => ({
        key,
        impressions,
      })),
    };
  };

  const { labels, dataPoints } = processData(groupBy);

  useEffect(() => {
    if (activeGroup2 === "Chart" && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (!ctx) return;

      const data = {
        labels: labels,
        datasets: [
          {
            label: "Impressions",
            data: dataPoints,
            backgroundColor: theme.palette.primary.main,
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

      const impressionsChart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: options,
      });

      return () => {
        impressionsChart.destroy();
      };
    }
  }, [labels, dataPoints, theme, groupBy, activeGroup2]);

  const getButtonStyle = (isActive: boolean) => ({
    ...buttonStyles,
    backgroundColor: isActive
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
    fontWeight: isActive ? "bold" : "normal",
    color: theme.palette.text.primary
  });

  return (
    <div
      style={{
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "8px",
        position: "relative",
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
          alignItems: "center",
          justifyContent: "space-between",
          width: "95%",
        }}
      >
        <div>Other contents</div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", marginRight: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              style={getButtonStyle(activeGroup1 === "Date")}
              onClick={() => {
                setActiveGroup1("Date");
                setGroupBy("date");
              }}
            >
              Date
            </Button>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              style={getButtonStyle(activeGroup1 === "Vehicle")}
              onClick={() => {
                setActiveGroup1("Vehicle");
                setGroupBy("vehicle");
              }}
            >
              Vehicle
            </Button>
          </div>

          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              style={getButtonStyle(activeGroup2 === "Chart")}
              onClick={() => setActiveGroup2("Chart")}
            >
              Chart
            </Button>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              style={getButtonStyle(activeGroup2 === "Table")}
              onClick={() => setActiveGroup2("Table")}
            >
              Table
            </Button>
          </div>
        </div>
      </div>
      {activeGroup2 === "Chart" ? (
        <canvas ref={chartRef} />
      ) : (
        <div style={{paddingTop: '6%'}}>
          <ImpressionsTable data={impressionsData} groupBy={groupBy} />
        </div>
      )}
    </div>
  );
};

export default ImpressionsChart;
