import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import DayOfWeekChart from "./Chart/DayOfWeekChart";
import FootfallChart from "./Chart/FootfallChart";
import HourOfDayChart from "./Chart/HourOfDayChart";
import PeopleInsights from "./PeopleInsights";

// Data extracted from the PDF
const data = {
  footfall: {
    exposed: { audience: 301194, attributed: 275, rate: 0.091 },
    control: { audience: 15193717, attributed: 7395, rate: 0.049 },
  },
  gender: { female: 63, male: 37 },
  devices: [
    { name: "redmi", value: 12 },
    { name: "xiaomi", value: 18 },
    { name: "apple", value: 21 },
    { name: "samsung", value: 41 },
    { name: "vivo", value: 8 },
  ],
  ageGroups: [
    { age: "18-25", value: 24 },
    { age: "26-35", value: 27 },
    { age: "36-45", value: 36 },
    { age: "45+", value: 12 },
  ],
};

const AttributionAnalytics: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight={"bold"}
        sx={{ opacity: 0.7 }}
        gutterBottom
      >
        {t("attribution.analytics.attributionAnalytics")}
      </Typography>
      <Typography variant="subtitle2" gutterBottom fontWeight={"bolder"}>
      {t("attribution.analytics.attributionLiftIndex")}
        <span style={{ marginLeft: "10px" }}>185.714</span>
      </Typography>

      <Grid container spacing={2}>
        {/* Exposed Overview */}
        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="subtitle2" fontWeight={"bolder"} gutterBottom>
            {t("attribution.analytics.exposed")}
            </Typography>
            <Divider sx={{ marginBottom: "20px" }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div style={{ marginBottom: "20px" }}>
                  <Typography
                    variant="body2"
                    style={{ opacity: 0.7 }}
                    fontWeight={"bold"}
                    gutterBottom
                  >
                         {t("attribution.analytics.exposedAudience")}
                  </Typography>
                  <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                    {data.footfall.exposed.audience}
                  </div>
                </div>
                <div>
                  <Typography
                    variant="body2"
                    style={{ opacity: 0.7 }}
                    fontWeight={"bold"}
                    gutterBottom
                  >
                     {t("attribution.analytics.attributedFootfall")}
                  </Typography>
                  <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                    {data.footfall.exposed.attributed}
                  </div>
                </div>
              </Grid>
              <Grid item xs={6} display={"flex"} alignItems={"center"}>
                <div>
                  <Typography
                    variant="body2"
                    style={{ opacity: 0.7 }}
                    fontWeight={"bold"}
                    gutterBottom
                  >
                    {t("attribution.analytics.footfallRate")}
                  </Typography>
                  <div style={{ fontSize: "25px", fontWeight: "lighter" }}>
                    {data.footfall.exposed.rate}%
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="subtitle2" fontWeight={"bolder"} gutterBottom>
            {t("attribution.analytics.control")}
            </Typography>
            <Divider sx={{ marginBottom: "20px" }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div style={{ marginBottom: "20px" }}>
                  <Typography
                    variant="body2"
                    style={{ opacity: 0.7 }}
                    fontWeight={"bold"}
                    gutterBottom
                  >
                    {t("attribution.analytics.controlAudience")}
                  </Typography>
                  <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                    {data.footfall.control.audience}
                  </div>
                </div>
                <div>
                  <Typography
                    variant="body2"
                    style={{ opacity: 0.7 }}
                    fontWeight={"bold"}
                    gutterBottom
                  >  {t("attribution.analytics.attributedFootfall")}
                  </Typography>
                  <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                    {data.footfall.control.attributed}
                  </div>
                </div>
              </Grid>
              <Grid item xs={6} display={"flex"} alignItems={"center"}>
                <div>
                  <Typography
                    variant="body2"
                    style={{ opacity: 0.7 }}
                    fontWeight={"bold"}
                    gutterBottom
                  >
                    {t("attribution.analytics.footfallRate")}
                  </Typography>
                  <div style={{ fontSize: "25px", fontWeight: "lighter" }}>
                    {data.footfall.control.rate}%
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="subtitle2" fontWeight={"bolder"} gutterBottom>
            {t("attribution.analytics.attributedFootfall")}
            </Typography>
          </div>
          <FootfallChart type="attributed" />
        </Grid>

        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="subtitle2" fontWeight={"bolder"} gutterBottom>
            {t("attribution.analytics.control")}
            </Typography>
          </div>
          <FootfallChart type="control" />
        </Grid>

        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="subtitle2" fontWeight={"bolder"} gutterBottom>
            {t("attribution.analytics.attributedByDay")}
            </Typography>
          </div>
          <DayOfWeekChart type="attributed" />
        </Grid>

        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="subtitle2" fontWeight={"bolder"} gutterBottom>
            {t("attribution.analytics.controlByDay")}
            </Typography>
          </div>
          <DayOfWeekChart type="control" />
        </Grid>

        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="subtitle2" fontWeight={"bolder"} gutterBottom>
            {t("attribution.analytics.attributedByHour")}
            </Typography>
          </div>
          <HourOfDayChart type="attributed" />
        </Grid>

        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="subtitle2" fontWeight={"bolder"} gutterBottom>
            {t("attribution.analytics.controlByHour")}
            </Typography>
          </div>
          <HourOfDayChart type="control" />
        </Grid>
        <Grid item xs={12}>
          <div>
            <Typography variant="subtitle2" fontWeight={"bolder"} gutterBottom>
            {t("attribution.analytics.peopleInsights")}
            </Typography>
          </div>
          <PeopleInsights />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttributionAnalytics;
