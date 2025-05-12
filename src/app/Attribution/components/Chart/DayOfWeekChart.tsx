import { useMediaQuery, useTheme } from "@mui/material";
import { attributionChartDataAndOptions } from "../../../Reports/components/mobile-ad/utils/chartUtils";
import AttributionChart from "./AttributionChart";

interface DayOfWeekChartProps {
  type: "control" | "attributed";
}

const DayOfWeekChart = ({ type }: DayOfWeekChartProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const attributedDataArr: any[] = [
    { name: "Monday", value: 117 },
    { name: "Tuesday", value: 155 },
    { name: "Wednesday", value: 134 },
    { name: "Thursday", value: 142 },
    { name: "Friday", value: 162 },
    { name: "Saturday", value: 121 },
    { name: "Sunday", value: 160 },
  ];

  const controlDataArr: any[] = [
    { name: "Monday", value: 121 },
    { name: "Tuesday", value: 125 },
    { name: "Wednesday", value: 110 },
    { name: "Thursday", value: 109 },
    { name: "Friday", value: 98 },
    { name: "Saturday", value: 87 },
    { name: "Sunday", value: 96 },
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

export default DayOfWeekChart;
