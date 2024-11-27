import { Button, useTheme } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Chart } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { buttonStyles } from "../ImpressionsChart";

interface MobileAdChartTableProps {
//   chartData: {
//     labels: string[];
//     clicksData: number[];
//     impressionsData?: number[];
//     ctrData?: number[];
//   };
  tableData: Record<string, any>[];
  tableColumns: {
    label: string;
    accessor: string;
    format?: (value: any) => React.ReactNode;
  }[];
  buttons?: { label: string; value: string }[];
  onButtonClick?: (value: string) => void;
  chartDataGenerated: {
    data: any;
    options: any;
  };
}

const MobileAdChartTable = ({
  tableData,
  tableColumns,
  buttons = [
    { label: "Chart", value: "Chart" },
    { label: "Table", value: "Table" },
  ],
  onButtonClick,
  chartDataGenerated,
}: MobileAdChartTableProps) => {
  const theme = useTheme();
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [activeGroup, setActiveGroup] = useState(buttons[0]?.value || "Chart");

  const getButtonStyle = (isActive: boolean) => ({
    ...buttonStyles,
    backgroundColor: isActive
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
    fontWeight: isActive ? "bold" : "normal",
    color: theme.palette.text.primary,
  });

  useEffect(() => {
    if (activeGroup !== "Chart" || !chartRef.current) return;

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
  }, [chartDataGenerated, activeGroup]);

  const handleButtonClick = (value: string) => {
    setActiveGroup(value);
    if (onButtonClick) onButtonClick(value);
  };

  return (
    <div
      style={{
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "5px",
          right: 10,
          zIndex: 10,
          display: "flex",
          margin: "10px",
          alignItems: "center",
          justifyContent: "end",
          width: "95%",
        }}
      >
        <div style={{ display: "flex" }}>
          {buttons.map((button) => (
            <Button
              key={button.value}
              variant="contained"
              color="primary"
              disableElevation
              style={getButtonStyle(activeGroup === button.value)}
              onClick={() => handleButtonClick(button.value)}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </div>
      {activeGroup === "Chart" ? (
        <div>
          <canvas ref={chartRef} />
        </div>
      ) : (
        <div style={{ paddingTop: "6%" }}>
          <TableContainer style={{ borderTopStyle: "ridge" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableColumns.map((column) => (
                    <TableCell key={column.accessor}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    {tableColumns.map((column) => (
                      <TableCell key={column.accessor}>
                        {column.format
                          ? column.format(row[column.accessor])
                          : row[column.accessor]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default MobileAdChartTable;
