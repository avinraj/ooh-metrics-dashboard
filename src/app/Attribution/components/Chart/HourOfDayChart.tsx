import { useMediaQuery, useTheme } from "@mui/material";
import { attributionChartDataAndOptions } from "../../../Reports/components/mobile-ad/utils/chartUtils";
import AttributionChart from "./AttributionChart";

interface HourOfDayChartProps {
  type: "control" | "attributed";
}

const HourOfDayChart = ({ type }: HourOfDayChartProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const attributedDataArr: any[] = [
    { name: "10", value: 49 },
    { name: "11", value: 47 },
    { name: "12", value: 51 },
    { name: "13", value: 60 },
    { name: "14", value: 106 },
    { name: "15", value: 67 },
    { name: "16", value: 110 },
    { name: "17", value: 115 },
    { name: "18", value: 134 },
    { name: "19", value: 81 },
    { name: "20", value: 92 },
    { name: "21", value: 79 },
  ];

  const controlDataArr: any[] = [
    { name: "10", value: 47 },
    { name: "11", value: 51 },
    { name: "12", value: 49 },
    { name: "13", value: 62 },
    { name: "14", value: 56 },
    { name: "15", value: 52 },
    { name: "16", value: 65 },
    { name: "17", value: 71 },
    { name: "18", value: 85 },
    { name: "19", value: 79 },
    { name: "20", value: 76 },
    { name: "21", value: 53 },
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
    <div style={{ height: "100%", width: "99%" }}>
      <AttributionChart chartDataGenerated={{ data, options }} />
    </div>
  );
};

export default HourOfDayChart;
