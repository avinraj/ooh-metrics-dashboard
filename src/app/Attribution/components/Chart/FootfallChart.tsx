import { useMediaQuery, useTheme } from "@mui/material";
import { attributionChartDataAndOptions } from "../../../Reports/components/mobile-ad/utils/chartUtils";
import AttributionChart from "./AttributionChart";
import { useTranslation } from "react-i18next";

interface FootfallChartProps {
  type: "control" | "attributed";
}

const FootfallChart = ({ type }: FootfallChartProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const attributedDataArr: any[] = [
    { name: "2025-03-24", value: 21 },
    { name: "2025-03-25", value: 29 },
    { name: "2025-03-26", value: 35 },
    { name: "2025-03-27", value: 38 },
    { name: "2025-03-28", value: 41 },
    { name: "2025-03-29", value: 32 },
    { name: "2025-03-30", value: 46 },
    { name: "2025-03-31", value: 27 },
    { name: "2025-04-01", value: 38 },
    { name: "2025-04-02", value: 27 },
    { name: "2025-04-03", value: 31 },
    { name: "2025-04-04", value: 37 },
    { name: "2025-04-05", value: 26 },
    { name: "2025-04-06", value: 31 },
    { name: "2025-04-07", value: 22 },
    { name: "2025-04-08", value: 42 },
    { name: "2025-04-09", value: 23 },
    { name: "2025-04-10", value: 24 },
    { name: "2025-04-11", value: 33 },
    { name: "2025-04-12", value: 35 },
    { name: "2025-04-13", value: 40 },
    { name: "2025-04-14", value: 23 },
    { name: "2025-04-15", value: 22 },
    { name: "2025-04-16", value: 27 },
    { name: "2025-04-17", value: 23 },
    { name: "2025-04-18", value: 31 },
    { name: "2025-04-19", value: 15 },
    { name: "2025-04-20", value: 32 },
    { name: "2025-04-21", value: 12 },
    { name: "2025-04-22", value: 13 },
    { name: "2025-04-23", value: 12 },
    { name: "2025-04-24", value: 17 },
    { name: "2025-04-25", value: 20 },
    { name: "2025-04-26", value: 13 },
    { name: "2025-04-27", value: 11 },
    { name: "2025-04-28", value: 12 },
    { name: "2025-04-29", value: 11 },
    { name: "2025-04-30", value: 10 },
    { name: "2025-05-01", value: 9 },
    { name: "2025-05-02", value: 0 },
  ];

  const controlDataArr: any[] = [
    { name: "2025-03-24", value: 30 },
    { name: "2025-03-25", value: 25 },
    { name: "2025-03-26", value: 21 },
    { name: "2025-03-27", value: 16 },
    { name: "2025-03-28", value: 20 },
    { name: "2025-03-29", value: 17 },
    { name: "2025-03-30", value: 27 },
    { name: "2025-03-31", value: 21 },
    { name: "2025-04-01", value: 29 },
    { name: "2025-04-02", value: 17 },
    { name: "2025-04-03", value: 17 },
    { name: "2025-04-04", value: 19 },
    { name: "2025-04-05", value: 17 },
    { name: "2025-04-06", value: 16 },
    { name: "2025-04-07", value: 19 },
    { name: "2025-04-08", value: 16 },
    { name: "2025-04-09", value: 19 },
    { name: "2025-04-10", value: 18 },
    { name: "2025-04-11", value: 20 },
    { name: "2025-04-12", value: 17 },
    { name: "2025-04-13", value: 16 },
    { name: "2025-04-14", value: 16 },
    { name: "2025-04-15", value: 18 },
    { name: "2025-04-16", value: 18 },
    { name: "2025-04-17", value: 19 },
    { name: "2025-04-18", value: 14 },
    { name: "2025-04-19", value: 13 },
    { name: "2025-04-20", value: 12 },
    { name: "2025-04-21", value: 15 },
    { name: "2025-04-22", value: 17 },
    { name: "2025-04-23", value: 21 },
    { name: "2025-04-24", value: 23 },
    { name: "2025-04-25", value: 25 },
    { name: "2025-04-26", value: 23 },
    { name: "2025-04-27", value: 25 },
    { name: "2025-04-28", value: 20 },
    { name: "2025-04-29", value: 20 },
    { name: "2025-04-30", value: 14 },
    { name: "2025-05-01", value: 16 },
    { name: "2025-05-02", value: 0 },
  ];

  const processData = () => {
    const dataArr = type === "control" ? controlDataArr : attributedDataArr;
    const groupedData = dataArr.reduce(
      (acc: Record<string, { value: number }>, item) => {
        const key = `${item.name}`;
        if (acc[key]) {
          acc[key].value += item.value;
        } else {
          acc[key] = {
            value: item.value,
          };
        }
        return acc;
      },
      {}
    );

    // Sorting by clicks in descending order
    const sortedData = Object.entries(groupedData);

    // Extracting labels and data points
    return {
      labels: sortedData.map(([key]) => key),
      attributeData: sortedData.map(([, value]) => value.value),
    };
  };

  const chartData = processData();

  const { data, options } = attributionChartDataAndOptions(
    chartData,
    theme,
    isMobile,
    type === "control" ? "#FFD600" : theme.palette.primary.main
  );

  return (
    <div>
      <div style={{ height: "100%", width: "99%" }}>
        <AttributionChart chartDataGenerated={{ data, options }} />
      </div>
      <div style={{ fontSize: "13px", fontWeight: "lighter", opacity: "0.5" }}>
        {type === "control"
          ? `*${t("attribution.analytics.controlFootfallNote")}`
          : `*${t("attribution.analytics.attributedFootfallNote")}`}
      </div>
    </div>
  );
};

export default FootfallChart;
