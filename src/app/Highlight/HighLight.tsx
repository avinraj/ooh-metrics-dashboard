import { Box, Card, Grid, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import adIcon from "../../assets/addIcon.png";
import impression from "../../assets/impressions.png";
import meter from "../../assets/speed-meter-outline-512.webp";

const HighLight = () => {
  const theme = useTheme();
  const { selectedAdType } = useSelector((state: any) => state?.selectedAdType);

  useEffect(() => {}, [selectedAdType]);

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
            <Typography variant="h3" color={theme.palette.text.primary}>
              <Box sx={{ display: "inline-block", padding: "0 8px" }}>
                {t("highlights.highlight")}
              </Box>
            </Typography>
          </Box>
        </Grid>

        <Grid
          container
          item
          xs={12}
          style={{ margin: "0px", marginTop: "40px" }}
        >
          {[
            {
              value: 25,
              label: `TOTAL ${
                selectedAdType?.label ? selectedAdType.label.toUpperCase() : ""
              }`,
              icon: (
                <div style={{ height: "80px" }}>{selectedAdType?.icon}</div>
              ),
            },
            { value: "33,500 miles", label: "TOTAL MILES", icon: meter },
            { value: "1,103,500 m", label: "TOTAL IMPRESSIONS", icon: adIcon },
            { value: 33, label: "IMPRESSIONS PER MILE", icon: impression },
          ].map((item: any, index) => (
            <Grid
              item
              xs={12}
              sm={3}
              key={index}
              style={{
                display: "flex",
                paddingInline: "15px",
                paddingBlock: "10px",
              }}
            >
              <Card
                sx={{
                  backgroundColor: "#DEDEDE",
                  padding: 2,
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  display: "grid",
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight={"bold"}
                  color={theme.palette.primary.contrastText}
                >
                  {item.value}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBlock: "10px",
                  }}
                >
                  {index === 0 ? (
                    item.icon
                  ) : (
                    <img
                      src={item.icon}
                      alt={item.label}
                      width={80}
                      height={80}
                    />
                  )}
                </Box>
                <div
                  style={{ display: "flex", alignItems: "end", width: "100%" }}
                >
                  <Box
                    sx={{
                      backgroundColor: theme.palette.primary.dark,
                      border: "1px solid black",
                      borderRadius: 3,
                      padding: "4px 8px",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6" color={theme.palette.text.primary}>
                      <b>{item.label}</b>
                    </Typography>
                  </Box>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HighLight;
