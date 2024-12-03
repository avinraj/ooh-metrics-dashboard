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
    { name: "2024-10-01", value: 12 },
    { name: "2024-10-02", value: 18 },
    { name: "2024-10-03", value: 21 },
    { name: "2024-10-04", value: 41 },
    { name: "2024-10-05", value: 8 },
    { name: "2024-10-06", value: 12 },
    { name: "2024-10-07", value: 18 },
    { name: "2024-10-08", value: 21 },
    { name: "2024-10-09", value: 41 },
    { name: "2024-10-10", value: 8 },
    { name: "2024-10-11", value: 12 },
    { name: "2024-10-12", value: 18 },
    { name: "2024-10-13", value: 21 },
    { name: "2024-10-15", value: 41 },
    { name: "2024-10-15", value: 8 },
  ];

  const controlDataArr: any[] = [
    { name: "2024-10-01", value: 34 },
    { name: "2024-10-02", value: 32 },
    { name: "2024-10-03", value: 43 },
    { name: "2024-10-04", value: 4 },
    { name: "2024-10-05", value: 66 },
    { name: "2024-10-06", value: 3 },
    { name: "2024-10-07", value: 34 },
    { name: "2024-10-08", value: 7 },
    { name: "2024-10-09", value: 43 },
    { name: "2024-10-10", value: 23 },
    { name: "2024-10-11", value: 15 },
    { name: "2024-10-12", value: 27 },
    { name: "2024-10-13", value: 18 },
    { name: "2024-10-15", value: 41 },
    { name: "2024-10-15", value: 8 },
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
