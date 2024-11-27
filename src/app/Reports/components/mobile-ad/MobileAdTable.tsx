import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

interface TableColumn {
  label: string; // Header label
  accessor: string; // Key in the data object
  format?: (value: any) => React.ReactNode; // Optional formatter for values
}

interface MobileAdTableProps {
  columns: TableColumn[];
  data: Record<string, any>[]; // Array of objects representing rows
}

const MobileAdTable = ({ columns, data }: MobileAdTableProps) => {
  return (
    <TableContainer style={{ borderTopStyle: "ridge" }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.accessor}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
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
  );
};

export default MobileAdTable;
