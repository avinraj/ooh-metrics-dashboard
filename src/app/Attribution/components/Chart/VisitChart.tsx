import { useMediaQuery, useTheme } from "@mui/material";
import { attributionChartDataAndOptions } from "../../../Reports/components/mobile-ad/utils/chartUtils";
import AttributionChart from "./AttributionChart";

interface VisitChartProps {
  type: "control" | "attributed";
}

const VisitChart = ({ type }: VisitChartProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const attributedDataArr: any[] = [
    { name: "0", value: 18 },
    { name: "1", value: 14 },
    { name: "2", value: 22 },
    { name: "3", value: 10 },
    { name: "4", value: 12 },
    { name: "5", value: 10 },
    { name: "6", value: 8 },
    { name: "7", value: 6 },
  ];

  const controlDataArr: any[] = [
    { name: "1", value: 42 },
    { name: "2", value: 23 },
    { name: "3", value: 18 },
    { name: "4", value: 10 },
    { name: "5", value: 7 },
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
    theme.palette.primary.main,
    true
  );

  return (
    <div style={{ height: "100%", width: "99%" }}>
      <AttributionChart chartDataGenerated={{ data, options }} />
    </div>
  );
};

export default VisitChart;
