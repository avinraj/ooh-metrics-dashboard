import { Button, useMediaQuery, useTheme } from "@mui/material";
import Chart from "chart.js/auto";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";
import impressionsData from "../../../Data/impressions.json";
import ImpressionsTable from "./ImpressionsTable";
import { truncateLabel } from "./mobile-ad/utils/chartUtils";

interface ImpressionsChartProps {
  groupBy: "date" | "vehicle";
}

export const buttonStyles = {
  padding: 5,
  minWidth: "60px",
  border: "black",
  borderStyle: "groove",
  borderWidth: "thin",
  borderRadius: "0px",
  height: "fit-content",
};

const ImpressionsChart: React.FC<ImpressionsChartProps> = ({ groupBy }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const chartRef = useRef<HTMLCanvasElement | null>(null);
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

    const formatToDDMMM = (dateStr: string) => {
      return moment(dateStr).format("DD-MMM");
    };

    return {
      labels:
        groupBy === "date"
          ? Object.keys(groupedData).map(formatToDDMMM)
          : Object.keys(groupedData),
      dataPoints: Object.values(groupedData),
      detailedData: Object.entries(groupedData).map(([key, impressions]) => ({
        key: groupBy === "date" ? formatToDDMMM(key) : key,
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

      const options: any = {
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
              callback: function (value: any) {
                const label = labels[value as number];
                return isMobile ? truncateLabel(label, 3) : label;
              },
            },
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: theme.palette.text.primary,
              callback: function (value: any) {
                return isMobile ? truncateLabel(value, 3) : value;
              },
            },
            grid: {
              display: false,
              // color: "#333333",
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
    color: theme.palette.text.primary,
    fontSize: isMobile ? "10px" : "15px",
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
          right: isMobile ? 3 : 10,
          zIndex: 10,
          display: "flex",
          margin: "10px",
          alignItems: "center",
          justifyContent: "space-between",
          width: "95%",
        }}
      >
        <div>
          <span style={{ display: isMobile ? "none" : "flex" }}>
            Other contents
          </span>
        </div>

        <div style={{ display: "flex" }}>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            style={getButtonStyle(activeGroup2 === "Chart")}
            onClick={() => setActiveGroup2("Chart")}
          >
            {t("reports.impressions.chart")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            style={getButtonStyle(activeGroup2 === "Table")}
            onClick={() => setActiveGroup2("Table")}
          >
            {t("reports.impressions.table")}
          </Button>
        </div>
      </div>
      {activeGroup2 === "Chart" ? (
        <canvas ref={chartRef} />
      ) : (
        <div style={{ paddingTop: "6%" }}>
          <ImpressionsTable data={impressionsData} groupBy={groupBy} />
        </div>
      )}
    </div>
  );
};

export default ImpressionsChart;
