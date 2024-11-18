import { Box, Grid, useTheme } from "@mui/material";
import profile from "../../../assets/Screenshot 2024-11-12 234726.png";
import carwrap from "../../../assets/carwrap-removebg-preview.png";
import digitalscreen from "../../../assets/images-removebg-preview.png";
const AdType = () => {
  const theme = useTheme()
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ backgroundColor: theme.palette.primary.contrastText, padding: 2 }}>
          <Box sx={{ border: "1px solid #fff", borderRadius: 3 }}>
            <Box sx={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
              <img src={profile} alt="" width={80} height={80} />
            </Box>
            <h3 style={{ color: "rgb(78, 214, 78)", textAlign: "center" }}>Nickelytics Demo</h3>
          </Box>
          <Box sx={{ border: "1px solid #fff", borderRadius: 3, color: theme.palette.background.default, marginTop: 3, padding: 2 }}>
            {" "}
            AD type
            <Box
              sx={{
                border: "1px solid #fff",
                borderRadius: 3,
                color: theme.palette.background.default,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <img src={carwrap} alt="" width={80} height={80} />
              Vehicle wraps
            </Box>
            <Box
              sx={{
                border: "1px solid #fff",
                borderRadius: 3,
                color: theme.palette.background.default,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                marginTop: 3,
              }}
            >
              <img src={digitalscreen} alt="" width={80} height={80} />
              Digital screens
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AdType;
