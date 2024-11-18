import { useTheme } from "@mui/material";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

interface DataItem {
  group: string;
  DEVICE_COUNT: number;
}

interface AffinitiesChartProps {
  data: DataItem[];
}

const AffinitiesChart = ({ data }: AffinitiesChartProps) => {
  const theme = useTheme();
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const processData = () => {
    const groupedData = data.reduce((acc: Record<string, number>, item) => {
      const key = item.group;
      if (acc[key]) {
        acc[key] += 0;
      } else {
        acc[key] = item.DEVICE_COUNT;
      }
      return acc;
    }, {});

    const sortedData = Object.entries(groupedData).sort(
      (a, b) => b[1] - a[1] // Sort in descending order by value
    );

    return {
      labels: sortedData.map(([key]) => key),
      dataPoints: sortedData.map(([, value]) => value),
      detailedData: sortedData.map(([key, value]) => ({
        key,
        impressions: value,
      })),
    };
  };

  const { labels, dataPoints } = processData();

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (!ctx) return;

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Affinities",
            data: dataPoints,
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            borderRadius: 5,
          },
        ],
      };

      const options: any = {
        responsive: true,
        indexAxis: "y", // Make the chart horizontal
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
            beginAtZero: true,
            ticks: {
              color: theme.palette.text.primary,
            },
            grid: {
              color: "#333333",
            },
          },
          y: {
            ticks: {
              color: theme.palette.text.primary,
            },
            grid: {
              display: false,
            },
          },
        },
      };

      const affinitiesChart = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: options,
      });

      return () => {
        affinitiesChart.destroy();
      };
    }
  }, [labels, dataPoints, theme]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default AffinitiesChart;
