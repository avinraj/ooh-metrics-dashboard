import {
    ArcElement,
    Chart,
    DoughnutController,
    Legend,
    Tooltip,
} from "chart.js";
import React, { useEffect, useRef } from "react";

// Register required components for Chart.js
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const DevicesChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstance: any = useRef<Chart | null>(null);

  const devicesData = [
    { PROFILE_INDEX: 1, DEVICE_COUNT: 910, group: "redmi", percent: 12 },
    { PROFILE_INDEX: 2, DEVICE_COUNT: 270, group: "xiaomi", percent: 18 },
    { PROFILE_INDEX: 3, DEVICE_COUNT: 430, group: "apple", percent: 21 },
    { PROFILE_INDEX: 4, DEVICE_COUNT: 500, group: "samsung", percent: 41 },
    { PROFILE_INDEX: 5, DEVICE_COUNT: 500, group: "vivo", percent: 8 },
  ];

  const groupedDevicesData = devicesData.reduce(
    (acc: Record<string, number>, item) => {
      acc[item.group] = (acc[item.group] || 0) + item.percent;
      return acc;
    },
    {}
  );

  const devicesLabels = Object.keys(groupedDevicesData);
  const devicesValues = Object.values(groupedDevicesData);

  const yellowShades = [
    "#FFEB3B", // Light Yellow
    "#FFC107", // Amber
    "#FF9800", // Orange
    "#FF5722", // Deep Orange
    "#FFD600", // Bright Yellow
  ];

  const totalPercent = devicesValues.reduce((sum, value) => sum + value, 0);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    // Destroy the previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new Chart instance
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: devicesLabels,
        datasets: [
          {
            data: devicesValues,
            backgroundColor: yellowShades,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: "Devices",
            align: "start",
            font: {
              size: 16,
            },
          },
          legend: {
            display: true,
            position: "right",
            labels: {
              boxWidth: 20,
              padding: 15,
              generateLabels: (chart) => {
                const { data } = chart;
                const dataset: any = data.datasets[0];
                const backgroundColors = dataset.backgroundColor as string[];

                return (
                  data.labels?.map((label, index) => {
                    const value = dataset.data[index] as number; // Explicitly cast as number
                    const percentage = ((value / totalPercent) * 100).toFixed(
                      2
                    );
                    return {
                      text: `${label} (${percentage}%)`,
                      fillStyle: backgroundColors[index],
                      strokeStyle: backgroundColors[index],
                      hidden: dataset.hidden?.[index] ?? false, // Ensure hidden property is handled
                      index,
                    };
                  }) ?? []
                );
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const dataset = tooltipItem.raw;
                return `${tooltipItem.label}: ${dataset}%`;
              },
            },
          },
        },
        animation: {
          animateScale: true,
        },
      },
    });

    return () => {
      // Cleanup chart instance on component unmount
      chartInstance.current?.destroy();
    };
  }, [devicesLabels, devicesValues]);

  return (
    <div style={{ height: "100%", width: "99%" }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default DevicesChart;
