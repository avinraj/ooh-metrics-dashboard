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
      <Grid item xs={12}>
        <Typography variant="h3"> {t("highlights.welcome")}, Cocacola</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box mt={7}>
          <Typography variant="h3">
            <Box sx={{ backgroundColor: theme.palette.primary.main, display: "inline-block", padding: "0 8px" }}>
              Highlight
            </Box>
          </Typography>
        </Box>
      </Grid>

      <Grid container item xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} mt={7}>
        <Grid item xs={3}>
          <Card sx={{ backgroundColor: "#DEDEDE", minWidth: 200, padding: 1 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: "80px", fontWeight: "bold", margin: 0, padding: 0 }}>25</Typography>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={car} alt="" width={150} height={150} />
              </Box>

              <Box sx={{ backgroundColor: "black", color: "white", mt: 1, border: "1px solid black", borderRadius: 3 }}>
                <Typography variant="h6">TOTAL CARS</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ backgroundColor: "#DEDEDE", minWidth: 200, padding: 1 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
                33,500 <br />
                Miles
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={meter} alt="" style={{ margin: "0 auto" }} width={150} height={150} />
              </Box>
              <Box sx={{ backgroundColor: "black", color: "white", mt: 1, border: "1px solid black", borderRadius: 3 }}>
                <Typography>TOTAL MILES</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ backgroundColor: "#DEDEDE", minWidth: 200 }}>
            <Box sx={{ textAlign: "center" }} padding={2}>
              <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
                1,103,500 <br />
                Million
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={adIcon} alt="" width={120} height={120} />
              </Box>
              <Box sx={{ backgroundColor: "black", color: "white", mt: 1, border: "1px solid black", borderRadius: 3 }}>
                <Typography>TOTAL IMPRESSIONS</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ backgroundColor: "#DEDEDE", minWidth: 200 }}>
            <Box sx={{ textAlign: "center" }} padding={2}>
              <Typography sx={{ fontSize: "80px", fontWeight: "bold" }}>33</Typography>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={impression} alt="" width={120} height={120} />
              </Box>
              <Box sx={{ backgroundColor: "black", color: "white", mt: 1, border: "1px solid black", borderRadius: 3 }}>
                <Typography>IMPRESSIONS PER MILE</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HighLight;
