import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import React from "react";
import data from "../../../Data/trackingUrl.json";
import TrackingUrlMap from "./TrackingUrlMap";

const TrackingUrl: React.FC = () => {
  const theme = useTheme();
  return (
    <Box sx={{width: "100%"}}>
        <TrackingUrlMap />
      <Box
        sx={{
          overflowX: "auto",
          backgroundColor: theme.palette.secondary.main,
          borderRadius: "5px",
          marginTop: "10px"
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date & Time</TableCell>
                <TableCell>CampaignId</TableCell>
                <TableCell>Device model</TableCell>
                <TableCell>Device Type</TableCell>
                <TableCell>Device Vendor</TableCell>
                <TableCell>IP Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Url</TableCell>
                <TableCell>Tracking URL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((obj, index) => (
                <TableRow key={index}>
                  <TableCell>{obj.dataTime}</TableCell>
                  <TableCell>{obj.campaignId}</TableCell>
                  <TableCell>{obj.deviceModel}</TableCell>
                  <TableCell>{obj.deviceType}</TableCell>
                  <TableCell>{obj.deviceVendor}</TableCell>
                  <TableCell>{obj.ipAddress}</TableCell>
                  <TableCell>{obj.city}</TableCell>
                  <TableCell>{obj.state}</TableCell>
                  <TableCell>{obj.country}</TableCell>
                  <TableCell>
                    <a
                      href={obj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "blue" }}
                    >
                      {obj.url}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a
                      href={obj.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "blue" }}
                    >
                      {obj.trackingUrl}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TrackingUrl;
