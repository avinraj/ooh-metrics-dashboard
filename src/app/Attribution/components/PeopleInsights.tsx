import {
  Box,
  Grid,
  LinearProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DevicesChart from "./Chart/DevicesChart";
import ProgressCircle from "../../core/components/ProgressCircle"; // Import the ProgressCircle component
import {
  Chart,
  ArcElement,
  DoughnutController,
  Legend,
  Tooltip,
} from "chart.js";
import { useTranslation } from "react-i18next";

// Register required components for Chart.js
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const PeopleInsights: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Example data for male and female percentages
  const femalePercentage = 65; // Female percentage (example: 65%)
  const malePercentage = 35; // Male percentage (example: 35%)

  const ageGroup = [
    { label: "18-25", value: 24 },
    { label: "26-35", value: 27 },
    { label: "36-45", value: 36 },
    { label: "46 +", value: 12 },
  ];

  const segments = [
    { label: "Travellers", value: 2.0 },
    { label: "Professionals", value: 6.2 },
    { label: "Affluents", value: 3.9 },
    { label: "Students", value: 1.4 },
  ];

  return (
    <Box sx={{ padding: theme.spacing(2) }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6} sx={{ height: "100%" }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                fontWeight={"bolder"}
                fontSize={16}
                color="grey"
                gutterBottom
              >
                {t("attribution.analytics.devices")}
              </Typography>
              <Box
                sx={{
                  height: "300px", // Ensure a set height for the chart container
                  width: "100%",
                  marginTop: "-55px",
                }}
              >
                <DevicesChart />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Reusable Circular Progresses for Female and Male Percentage */}
        <Grid item xs={12} md={6} sx={{ height: "100%" }}>
          <Box
            sx={{
              height: "240px", // Ensure a set height for the chart container
              width: "100%",
              display: "grid",
              alignItems: "center",
            }}
          >
            <Grid
              container
              sx={{
                position: "relative",
                bottom: isMobile ? "40%" : "20%",
                height: isMobile ? "85px" : "140px",
              }}
            >
              <Grid item xs={12}>
                {" "}
                <Typography
                  variant="subtitle2"
                  fontWeight={"bolder"}
                  fontSize={16}
                  color="grey"
                  gutterBottom
                >
                  {t("attribution.analytics.gender")}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <ProgressCircle
                  label={t("attribution.analytics.female")}
                  value={femalePercentage}
                  color="primary" // You can change the color if needed
                />
              </Grid>
              <Grid item xs={6}>
                {" "}
                <ProgressCircle
                  label={t("attribution.analytics.male")}
                  value={malePercentage}
                  color="#FFC107" // You can change the color if needed
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={{ height: "100%" }}>
          <Box
            sx={{
              width: "100%",
              display: "grid",
              alignItems: "center",
            }}
          >
            <Grid
              container
              sx={{ position: "relative", bottom: isMobile ? "40%" : "20%" }}
            >
              <Grid item xs={12}>
                {" "}
                <Typography
                  variant="subtitle2"
                  fontWeight={"bolder"}
                  fontSize={16}
                  color="grey"
                  gutterBottom
                >
                  {t("attribution.analytics.ageGroup")}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                {ageGroup.map((age) => (
                  <Grid
                    container
                    key={age.label}
                    sx={{
                      marginBottom: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Grid item xs={2}>
                      <Typography variant="body2">{age.label}</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <LinearProgress
                        variant="determinate"
                        value={age.value}
                        sx={{
                          marginInline: "10px",
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: theme.palette.primary.main,
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 5,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      {" "}
                      <Typography variant="body2">{age.value}%</Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={{ height: "100%" }}>
          <Box
            sx={{
              width: "100%",
              display: "grid",
              alignItems: "center",
            }}
          >
            <Grid
              container
              sx={{ position: "relative", bottom: isMobile ? "40%" : "20%" }}
            >
              <Grid item xs={12}>
                {" "}
                <Typography
                  variant="subtitle2"
                  fontWeight={"bolder"}
                  fontSize={16}
                  color="grey"
                  gutterBottom
                >
                  {t("attribution.analytics.segments")}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {segments.map((segment) => (
                  <Grid
                    container
                    key={segment.label}
                    sx={{
                      marginBottom: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Grid item xs={2}>
                      <Typography variant="body2">{segment.label}</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <LinearProgress
                        variant="determinate"
                        value={segment.value}
                        sx={{
                          marginInline: "10px",
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: theme.palette.primary.main,
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 5,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      {" "}
                      <Typography variant="body2">{segment.value}x</Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PeopleInsights;
