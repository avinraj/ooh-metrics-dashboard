import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import React, { useState } from "react";

// Helper function to format data by month or vehicle, summing values for the same date
const formatData = (data: any[], groupBy: "date" | "vehicle") => {
  const groupedData: Record<string, any[]> = data.reduce(
    (acc: any, item: any) => {
      // Group by date (month) or vehicle
      const key =
        groupBy === "date"
          ? new Date(item.date).toLocaleString("default", {
              month: "long",
              year: "numeric",
            }) // Group by month
          : item.asset; // Group by vehicle

      // If the key already exists, sum the values
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {}
  );

  // Now we sum the values for each group
  return Object.entries(groupedData).map(([key, entries]) => {
    const totalImpressions = entries.reduce(
      (sum: any, entry: any) => sum + entry.impressions,
      0
    );
    const totalMiles = entries.reduce(
      (sum: any, entry: any) => sum + entry.totalDistance,
      0
    );
    const avgImpressions = totalImpressions / entries.length || 0;
    const impressionsPerMile = totalMiles ? totalImpressions / totalMiles : 0;

    return {
      key,
      entries,
      totalImpressions,
      totalMiles,
      avgImpressions,
      impressionsPerMile,
    };
  });
};

// Function to aggregate impressions and distances for the same date
const aggregateSameDate = (entries: any[]) => {
  const aggregated: Record<string, any> = {};

  entries.forEach((entry) => {
    const date = entry.date;
    if (!aggregated[date]) {
      aggregated[date] = { ...entry };
    } else {
      aggregated[date].impressions += entry.impressions;
      aggregated[date].totalDistance += entry.totalDistance;
    }
  });

  return Object.values(aggregated);
};

interface ImpressionsTableProps {
  data: any[]; // Data should be an array of impressions
  groupBy: "date" | "vehicle"; // Grouping criteria: date or vehicle
}

const ImpressionsTable: React.FC<ImpressionsTableProps> = ({
  data,
  groupBy,
}) => {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const formattedData = formatData(data, groupBy);

  const handleRowClick = (key: any) => {
    setOpenGroup(openGroup === key ? null : key);
  };

  if (!formattedData.length) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <TableContainer style={{borderTopStyle: 'ridge'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">{groupBy === "date" ? "Month" : "Vehicle"}</TableCell>
              <TableCell>Impressions (total)</TableCell>
              <TableCell>Impressions (avg.)</TableCell>
              <TableCell>Impressions per mile (avg.)</TableCell>
              <TableCell>Miles (total)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formattedData.map((groupData) => (
              <React.Fragment key={groupData.key}>
                <TableRow onClick={() => handleRowClick(groupData.key)}>
                  <TableCell>
                    <IconButton size="small">
                      {openGroup === groupData.key ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                    {groupData.key}
                  </TableCell>
                  <TableCell>
                    {groupData.totalImpressions.toLocaleString()}
                  </TableCell>
                  <TableCell>{groupData.avgImpressions.toFixed(2)}</TableCell>
                  <TableCell>
                    {groupData.impressionsPerMile.toFixed(2)}
                  </TableCell>
                  <TableCell>{groupData.totalMiles.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={5}
                  >
                    <Collapse
                      in={openGroup === groupData.key}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box margin={1}>
                        <Table size="small">
                          <TableBody>
                            {aggregateSameDate(groupData.entries).map(
                              (entry, entryIndex) => (
                                <TableRow
                                  key={`${groupData.key}-${entry.date}-${entryIndex}`}
                                >
                                  <TableCell>{entry.date}</TableCell>
                                  <TableCell>
                                    {entry.impressions.toLocaleString()}
                                  </TableCell>
                                  <TableCell>
                                    {entry.impressions.toFixed(2)}
                                  </TableCell>
                                  <TableCell>
                                    {(
                                      entry.impressions / entry.totalDistance
                                    ).toFixed(2)}
                                  </TableCell>
                                  <TableCell>
                                    {entry.totalDistance.toFixed(2)}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ImpressionsTable;
