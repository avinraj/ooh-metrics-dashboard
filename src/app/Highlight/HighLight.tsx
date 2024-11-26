import { Box, Card, Grid, Typography, useTheme } from "@mui/material";
import car from "../../assets/images__1_-removebg-preview.png";
import meter from "../../assets/speed-meter-outline-512.webp";
import adIcon from "../../assets/addIcon.png";
import impression from "../../assets/impressions.png";
import { useTranslation } from "react-i18next";

const HighLight = () => {
  const theme = useTheme();

  const { t } = useTranslation();
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: theme.palette.primary.dark,
          width: "100%",
          height: "100vh",
          padding: 1,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" color={theme.palette.text.primary}>
            {" "}
            {t("highlights.welcome")}, Zoho
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box mt={7}>
            <Typography variant="h3">
              <Box sx={{ display: "inline-block", padding: "0 8px" }}>{t("highlights.highlight")}</Box>
            </Typography>
          </Box>
        </Grid>

        <Grid
          container
          item
          xs={12}
          spacing={4}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          mt={7}
        >
          {[
            { value: 25, label: "TOTAL CARS", icon: car },
            { value: "33,500 miles", label: "TOTAL MILES", icon: meter },
            { value: "1,103,500 million", label: "TOTAL IMPRESSIONS", icon: adIcon },
            { value: 33, label: "IMPRESSIONS PER MILE", icon: impression },
          ].map((item, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <Card sx={{ backgroundColor: "#DEDEDE", padding: 2, textAlign: "center" }}>
                <Typography variant="h4" fontWeight={"bold"} color={theme.palette.primary.contrastText}>
                  {item.value}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
                  <img src={item.icon} alt={item.label} width={120} height={120} />
                </Box>
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    mt: 2,
                    border: "1px solid black",
                    borderRadius: 3,
                    padding: "4px 8px",
                  }}
                >
                  <Typography variant="h6" color={theme.palette.primary.contrastText}>
                    <b>{item.label}</b>
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HighLight;
