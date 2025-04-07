import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
import React from "react";
import data from "../../../Data/trackingUrl.json";
import TrackingUrlMap from "./TrackingUrlMap";
import { useTranslation } from "react-i18next";

const TrackingUrl: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Box sx={{ width: "100%" }}>
      <TrackingUrlMap />
      <Box
        sx={{
          overflowX: "auto",
          backgroundColor: theme.palette.secondary.main,
          borderRadius: "5px",
          marginTop: "10px",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("attribution.trackingurl.dateAndTime")}</TableCell>
                <TableCell>{t("attribution.trackingurl.campaignId")}</TableCell>
                <TableCell>{t("attribution.trackingurl.deviceModel")}</TableCell>
                <TableCell>{t("attribution.trackingurl.deviceType")}</TableCell>
                <TableCell>{t("attribution.trackingurl.deviceVendor")}</TableCell>
                <TableCell>{t("attribution.trackingurl.ipAddress")}</TableCell>
                <TableCell>{t("attribution.trackingurl.city")}</TableCell>
                <TableCell>{t("attribution.trackingurl.state")}</TableCell>
                <TableCell>{t("attribution.trackingurl.country")}</TableCell>
                <TableCell>{t("attribution.trackingurl.url")}</TableCell>
                <TableCell>{t("attribution.trackingurl.trackingurl")}</TableCell>
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
                    <a href={obj.url} target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
                      {obj.url}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a href={obj.trackingUrl} target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
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
