import { useMediaQuery, useTheme } from "@mui/material";
import { Chart } from "chart.js";
import { useEffect, useRef } from "react";

interface AttributionChartProps {
  chartDataGenerated: {
    data: any;
    options: any;
  };
}

const AttributionChart = ({ chartDataGenerated }: AttributionChartProps) => {
  const theme = useTheme();
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!chartRef.current) return;

    const { data, options } = chartDataGenerated;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const mobileAdChart = new Chart(ctx, {
      type: "bar", // Set primary type to bar
      data: data,
      options: options,
    });

    return () => {
      mobileAdChart.destroy();
    };
  }, [chartDataGenerated]);

  return (
    <div
      style={{
        height: isMobile ? "auto" : "100%",
      }}
    >
      <div style={{ height: "100%" }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default AttributionChart;
