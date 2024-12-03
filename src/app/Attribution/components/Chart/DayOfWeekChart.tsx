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
    { name: "Monday", value: 12 },
    { name: "Tuesday", value: 18 },
    { name: "Wednesday", value: 21 },
    { name: "Thursday", value: 21 },
    { name: "Friday", value: 12 },
    { name: "Saturday", value: 18 },
    { name: "Sunday", value: 41 },
  ];

  const controlDataArr: any[] = [
    { name: "Monday", value: 4 },
    { name: "Tuesday", value: 66 },
    { name: "Wednesday", value: 34 },
    { name: "Thursday", value: 23 },
    { name: "Friday", value: 27 },
    { name: "Saturday", value: 18 },
    { name: "Sunday", value: 8 },
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
