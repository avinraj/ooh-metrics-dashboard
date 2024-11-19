import { Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import affinitiesData from "../../../Data/affinities.json";
import AffinitiesChart from "./AffinitiesChart";
import { useTranslation } from "react-i18next";

const Affinities = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  // Extract, sort, and filter top unique device counts
  const uniqueTopDevices = [];
  const groupSet = new Set();

  for (const item of affinitiesData.sort(
    (a, b) => b.DEVICE_COUNT - a.DEVICE_COUNT
  )) {
    if (!groupSet.has(item.group)) {
      groupSet.add(item.group);
      uniqueTopDevices.push(item);
    }
    if (uniqueTopDevices.length === 4) break; // Stop after 4 unique items
  }

  return (
    <div>
      <div>
        <Typography variant="h3" style={{marginBlock: '30px'}}>{t("reports.affinities.affinities")}</Typography>
        <div
          style={{
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "8px",
          }}
        >
          <Grid container spacing={2} padding={1} style={{ paddingBottom: 0 }}>
            {uniqueTopDevices.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  elevation={0}
                  style={{ background: "none", borderStyle: "solid", borderWidth: '1px' }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      style={{ fontWeight: "bold", textAlign: "center" }}
                      color={theme.palette.text.primary}
                    >
                      {item.percent.toLocaleString()} %
                      {/* Format for readability */}
                    </Typography>
                    <Typography
                      variant="h6"
                      color={theme.palette.text.primary}
                      style={{ textAlign: "center" }}
                    >
                      {item.group}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <AffinitiesChart data={affinitiesData} />
        </div>
      </div>
    </div>
  );
};

export default Affinities;
