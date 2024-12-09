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
    { name: "8", value: 12 },
    { name: "9", value: 18 },
    { name: "10", value: 21 },
    { name: "11", value: 21 },
    { name: "12", value: 12 },
    { name: "13", value: 18 },
    { name: "15", value: 41 },
    { name: "16", value: 23 },
    { name: "17", value: 15 },
    { name: "18", value: 32 },
    { name: "19", value: 5 },
    { name: "20", value: 10 },
    { name: "21", value: 9 },
    { name: "22", value: 3 },
  ];

  const controlDataArr: any[] = [
    { name: "8", value: 14 },
    { name: "9", value: 56 },
    { name: "10", value: 34 },
    { name: "11", value: 22 },
    { name: "12", value: 16 },
    { name: "13", value: 17 },
    { name: "15", value: 45 },
    { name: "16", value: 23 },
    { name: "17", value: 64 },
    { name: "18", value: 22 },
    { name: "19", value: 7 },
    { name: "20", value: 75 },
    { name: "21", value: 43 },
    { name: "22", value: 6 },
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
