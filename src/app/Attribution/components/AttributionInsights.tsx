import {
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import VisitChart from "./Chart/VisitChart";

const AttributionInsights: React.FC = () => {
  const { t} = useTranslation()

  const data = {
    stores: [
      {
        name: "H&M Viviana Mall Mumbai",
        location: "Mumbai",
        footfall: "400606",
      },
      { name: "H&M 1 MG Bangalore", location: "Bangalore", footfall: "560008" },
    ],
    locations: [
      "400059",
      "400072",
      "203001",
      "140301"
    ]
  };

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight={"bold"}
        sx={{ opacity: 0.5 }}
        gutterBottom
      >
         {t("attribution.advanced.advancedAttributionInsights")}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="subtitle2" fontWeight={"bolder"} gutterBottom>
            {t("attribution.advanced.leadTimeVisit")}
            </Typography>
          </div>
          <VisitChart type="attributed" />
        </Grid>

        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="subtitle2" fontWeight={"bolder"} gutterBottom>
            {t("attribution.advanced.exposureVisit")}
            </Typography>
          </div>
          <VisitChart type="control" />
        </Grid>
        {/* Exposed Overview */}
        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="subtitle2" fontWeight={"bolder"} gutterBottom>
            {t("attribution.advanced.topStores")}
            </Typography>
          </div>
          <TableContainer
            sx={{
              borderStyle: "solid",
              borderRadius: "8px",
              borderWidth: "1px",
              borderColor: "#80808054",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>  {t("attribution.advanced.storeName")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.stores.map((store, index) => (
                  <TableRow key={index}>
                    <TableCell>{store.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="subtitle2" fontWeight={"bolder"} gutterBottom>
            {t("attribution.advanced.topHomeLocations")}
            </Typography>
          </div>
          <TableContainer
            sx={{
              borderStyle: "solid",
              borderRadius: "8px",
              borderWidth: "1px",
              borderColor: "#80808054",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>            {t("attribution.advanced.homeLocations")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.locations.map((loc, index) => (
                  <TableRow key={index}>
                    <TableCell>{loc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttributionInsights;
